import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { FadeIn } from "@/components/shared/motion";

export const metadata = {
  title: "Resume | About",
  description: "View and download my resume.",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <FadeIn>
        <Link 
          href="/about"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Menu
        </Link>
        
        <div className="flex flex-col gap-8">
          <FadeIn direction="down">
            <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
              Resume
            </h1>
            <p className="text-muted-foreground">
              A comprehensive overview of my experience, education, and skills.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center shadow-sm transition-all hover:border-primary/50">
              <FileText className="mb-4 size-12 text-primary" />
              <h2 className="mb-2 text-xl font-semibold tracking-tight">Yaswanth Gudivada - Resume</h2>
              <p className="mb-8 text-sm text-muted-foreground">
                Last updated: May 2026
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://shellcraft.online/pdfs/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  View Resume
                </a>
                <a
                  href="https://shellcraft.online/pdfs/resume.pdf"
                  download="Yaswanth_Gudivada_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </FadeIn>
    </div>
  );
}
