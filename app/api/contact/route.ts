import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/emails/ContactEmail";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_EMAIL || "mail@yourdomain.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "newsletter@yourdomain.com"; // Resend requires sending from a verified domain

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  topic: z.string().min(1, "Topic is required"),
  message: z.string().min(1, "Message is required"),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = contactSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 },
      );
    }

    const { name, email, topic, message } = result.data;

    if (!process.env.RESEND_API_KEY) {
      console.warn("Skipping email: RESEND_API_KEY is missing");
      // Simulate successful submission for development
      return NextResponse.json({ success: true });
    }

    await resend.emails.send({
      from: `Contact Form <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name}: ${topic}`,
      react: ContactEmail({ name, email, topic, message }),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact Form Error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
