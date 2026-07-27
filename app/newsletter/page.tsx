import { Metadata } from "next";
import { BlogHeader } from "@/components/layout/blog-header";
import { BlogFooter } from "@/components/layout/blog-footer";
import { NewsletterCta } from "@/components/shared/newsletter-cta";
import { FadeIn } from "@/components/shared/motion";
import { LatestArticles } from "@/components/articles/latest-articles";
import { Mail, Zap, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe to my newsletter for the latest articles and updates.",
};

export default function NewsletterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BlogHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 lg:py-24">
          <FadeIn>
            <NewsletterCta />
          </FadeIn>

          <FadeIn delay={0.2} className="mt-20">
            <div className="grid gap-10 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Zap className="size-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Weekly Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Practical advice, system design breakdowns, and learnings from real-world engineering.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="size-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Early Access</h3>
                <p className="text-sm text-muted-foreground">
                  Subscribers get to read my latest essays and articles before they're published anywhere else.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="size-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Zero Spam</h3>
                <p className="text-sm text-muted-foreground">
                  I respect your inbox. Only high-quality content, no spam, and you can unsubscribe at any time.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-24">
            <div className="pt-8 border-t border-border">
              <LatestArticles limit={3} />
            </div>
          </FadeIn>
        </div>
      </main>
      <BlogFooter />
    </div>
  );
}
