import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BlogHeader } from "@/components/layout/blog-header";
import { FeaturedPost } from "@/components/articles/featured-post";
import { FeaturedProjects } from "@/components/projects/featured-projects";
import { LatestArticles } from "@/components/articles/latest-articles";
import { BlogFooter } from "@/components/layout/blog-footer";
import { FadeIn } from "@/components/shared/motion";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />

      <main>
        {/* Hero — leads with who I am, since this is the front door to both
            the writing and the work. */}
        <section className="border-b border-border bg-secondary">
          <FadeIn
            direction="down"
            className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-12 text-center md:flex-row md:px-6 md:py-16 md:text-left"
          >
            <Image
              src="/images/author-avatar.png"
              alt="Yaswanth Gudivada"
              width={480}
              height={480}
              priority
              className="size-28 shrink-0 rounded-full border border-border object-cover shadow-sm md:size-36"
            />

            <div className="min-w-0">
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Software engineer · Bengaluru
              </p>
              <h1 className="text-balance font-serif text-4xl font-bold tracking-tight md:text-5xl">
                Hi, I&apos;m Yaswanth Gudivada.
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
                I build backend services and developer tooling, and I write
                about what I learn along the way — systems, architecture, and
                the details that only show up once something is in production.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  View my work
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/articles"
                  className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  Read the articles
                </Link>
                <Link
                  href="/about/resume"
                  className="group relative inline-flex items-center justify-center rounded-md p-px"
                >
                  <span className="absolute inset-0 rounded-sm bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />
                  <span className="relative inline-flex h-full w-full items-center justify-center rounded-sm bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors group-hover:bg-background/80">
                    My Resume
                  </span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <FadeIn delay={0.2}>
            <FeaturedProjects />
          </FadeIn>
          <FadeIn delay={0.25}>
            <FeaturedPost />
          </FadeIn>
          <FadeIn delay={0.3}>
            <LatestArticles limit={3} />
          </FadeIn>
        </div>
      </main>

      <BlogFooter />
    </div>
  );
}
