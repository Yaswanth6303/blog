import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Resend } from "resend";
import { render } from "@react-email/components";
import BlogNotificationEmail from "../emails/BlogNotification";
import React from "react";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "newsletter@yourdomain.com";

if (!RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY environment variable.");
  process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);

async function broadcast(slug: string) {
  try {
    // 1. Fetch the post data
    const postsDir = path.join(process.cwd(), "content", "blogs");
    const filePath = path.join(postsDir, `${slug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`Post not found: ${filePath}`);
      process.exit(1);
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    if (!data.title || !data.excerpt) {
      console.error("Post must have a 'title' and 'excerpt' in frontmatter.");
      process.exit(1);
    }

    console.log(`Broadcasting: ${data.title}`);

    // 2. Fetch subscribers from PostgreSQL Database
    const { PrismaClient } = require('@prisma/client');
    const { Pool } = require('pg');
    const { PrismaPg } = require('@prisma/adapter-pg');
    
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    const subscribers = await prisma.subscriber.findMany({
      where: { active: true },
      select: { email: true }
    });

    const emails = subscribers.map((s: { email: string }) => s.email);
    console.log(`Found ${emails.length} active subscribers in the database.`);

    if (emails.length === 0) {
      console.log("No subscribers found. Exiting.");
      await prisma.$disconnect();
      process.exit(0);
    }

    // 3. Render HTML template
    const html = await render(
      React.createElement(BlogNotificationEmail, {
        postTitle: data.title,
        postExcerpt: data.excerpt,
        postSlug: slug,
        baseUrl: BASE_URL,
      })
    );

    // 4. Batch send emails
    const BATCH_SIZE = 50;
    for (let i = 0; i < emails.length; i += BATCH_SIZE) {
      const batchEmails = emails.slice(i, i + BATCH_SIZE);
      const batchPayload = batchEmails.map((email: string) => ({
        from: `Yaswanth Gudivada <${FROM_EMAIL}>`,
        to: [email],
        subject: `New Article: ${data.title}`,
        html: html,
      }));

      const { error } = await resend.batch.send(batchPayload);

      if (error) {
        console.error(`Error sending batch ${i / BATCH_SIZE + 1}:`, error);
      } else {
        console.log(`Successfully sent batch ${i / BATCH_SIZE + 1}.`);
      }
    }

    await prisma.$disconnect();
    console.log("Broadcast complete!");
  } catch (err) {
    console.error("Broadcast failed:", err);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("Usage: npx tsx scripts/broadcast.ts <post-slug>");
  process.exit(1);
}

broadcast(args[0]);
