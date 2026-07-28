"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const topics = [
  "General inquiry",
  "Guest post pitch",
  "Advertising",
  "Feedback",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      topic: formData.get("topic"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center rounded-xl border border-border bg-secondary px-6 py-14 text-center"
      >
        <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>
        <h2 className="font-serif text-2xl font-bold tracking-tight">
          Message sent
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-pretty leading-relaxed text-muted-foreground">
          Thanks for reaching out. We&apos;ll get back to you within a couple of
          business days.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-6 md:p-8"
      aria-labelledby="contact-form-heading"
    >
      <h2
        id="contact-form-heading"
        className="font-serif text-xl font-semibold tracking-tight"
      >
        Send me a message
      </h2>
      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="size-4" />
          {error}
        </div>
      )}
      <div className="mt-6 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Jane Doe"
              className="rounded-md border border-input bg-background px-4 py-2 text-sm outline-none ring-ring/50 transition focus-visible:ring-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="rounded-md border border-input bg-background px-4 py-2 text-sm outline-none ring-ring/50 transition focus-visible:ring-2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="topic" className="text-sm font-medium">
            Topic
          </label>
          <select
            id="topic"
            name="topic"
            className="rounded-md border border-input bg-background px-4 py-2 text-sm outline-none ring-ring/50 transition focus-visible:ring-2"
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Tell us what's on your mind..."
            className="resize-y rounded-md border border-input bg-background px-4 py-2 text-sm outline-none ring-ring/50 transition focus-visible:ring-2"
          />
        </div>
        <Button type="submit" className="sm:w-fit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </div>
    </form>
  );
}
