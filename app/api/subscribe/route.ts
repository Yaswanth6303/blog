import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Resend } from 'resend';
import WelcomeEmail from '@/emails/WelcomeEmail';
import { unsubscribeUrl } from '@/lib/unsubscribe';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "newsletter@yourdomain.com";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Normalized before the uniqueness check so "Me@Example.com" and
// "me@example.com" cannot become two rows.
const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email('Valid email is required'),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = subscribeSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { email } = result.data;

    // Check if the subscriber already exists
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      // If they exist but were inactive, reactivate them
      if (!existingSubscriber.active) {
        await prisma.subscriber.update({
          where: { email },
          data: { active: true },
        });
        return NextResponse.json({
          success: true,
          status: "reactivated",
          message: "Welcome back! Your subscription is active again.",
        });
      }

      return NextResponse.json({
        success: true,
        status: "already_subscribed",
        message: "This email is already subscribed.",
      });
    }

    // Add new subscriber. A duplicate can still slip past the check above if
    // two requests race, so the unique-constraint violation is handled too.
    let created;
    try {
      created = await prisma.subscriber.create({
        data: {
          email,
        },
        select: { unsubscribeToken: true },
      });
    } catch (error: any) {
      if (error?.code === "P2002") {
        return NextResponse.json({
          success: true,
          status: "already_subscribed",
          message: "This email is already subscribed.",
        });
      }
      throw error;
    }

    // Send Welcome Email
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: `Yaswanth Gudivada <${FROM_EMAIL}>`,
        to: email,
        subject: 'Welcome to the newsletter!',
        react: WelcomeEmail({
          baseUrl: BASE_URL,
          unsubscribeUrl: unsubscribeUrl(created.unsubscribeToken, BASE_URL),
        }),
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl(created.unsubscribeToken, BASE_URL)}>`,
        },
      });
    } else {
      console.warn("Skipping Welcome Email: RESEND_API_KEY is missing");
    }

    return NextResponse.json({
      success: true,
      status: "subscribed",
      message: "Thanks for subscribing! You're on the list.",
    });
  } catch (error: any) {
    console.error("Subscription Error:", error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
