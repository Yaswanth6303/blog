import { BlogHeader } from "@/components/blog-header"
import { FeaturedPost } from "@/components/featured-post"
import { ArticleGrid } from "@/components/article-grid"
import { NewsletterCta } from "@/components/newsletter-cta"
import { BlogFooter } from "@/components/blog-footer"
import { FadeIn } from "@/components/motion"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />

      <main>
        {/* Hero intro */}
        <section className="border-b border-border bg-secondary">
          <FadeIn direction="down" className="mx-auto max-w-6xl px-4 py-6 text-center md:px-6 md:py-8">
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              My Digital Notebook
            </p>
            <h1 className="mx-auto max-w-3xl text-balance font-serif text-4xl font-bold tracking-tight md:text-5xl">
              Software engineering, system design, and continuous learning.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              A space for ideas, code, and continuous learning. Fresh essays and articles, published frequently.
            </p>
          </FadeIn>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <FadeIn delay={0.2}>
            <FeaturedPost />
          </FadeIn>
          <FadeIn delay={0.3}>
            <ArticleGrid />
          </FadeIn>
          <FadeIn delay={0.4}>
            <NewsletterCta />
          </FadeIn>
        </div>
      </main>

      <BlogFooter />
    </div>
  )
}
