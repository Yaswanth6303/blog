"use client";

import { Mail, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "already" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to subscribe");
      }

      // Keep the form up for an address that is already on the list, so the
      // reader can correct a typo or try a different one.
      if (data.status === "already_subscribed") {
        setStatus("already");
        setMessage(data.message || "This email is already subscribed.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "Thanks for subscribing! You're on the list.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="newsletter" aria-labelledby="newsletter-heading">
      <div className="rounded-xl border border-border bg-secondary px-6 py-10 text-center md:px-12 md:py-14">
        <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Mail className="size-5" aria-hidden="true" />
        </span>
        <h2
          id="newsletter-heading"
          className="text-balance font-serif text-2xl font-bold tracking-tight md:text-3xl"
        >
          Get my latest articles in your inbox
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Subscribe to my digital notebook. Get fresh articles, technical
          insights, and ideas delivered straight to your inbox. No spam,
          unsubscribe anytime.
        </p>

        {status === "success" ? (
          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-md bg-green-500/10 px-4 py-3 text-sm font-medium text-green-600 dark:text-green-400">
            <CheckCircle2 className="size-4" />
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              placeholder="you@example.com"
              className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm outline-none ring-ring/50 transition focus-visible:ring-2 disabled:opacity-50"
            />
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        )}
        
        {status === "already" && (
          <div
            role="status"
            className="mx-auto mt-3 flex max-w-md items-center justify-center gap-2 text-sm font-medium text-foreground"
          >
            <Info className="size-4 shrink-0" aria-hidden="true" />
            {message}
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="mx-auto mt-3 flex max-w-md items-center justify-center gap-2 text-sm font-medium text-destructive"
          >
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            {message}
          </div>
        )}
      </div>
    </section>
  );
}
