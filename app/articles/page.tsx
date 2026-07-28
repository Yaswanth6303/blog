import type { Metadata } from "next"
import { BlogHeader } from "@/components/layout/blog-header"
import { BlogFooter } from "@/components/layout/blog-footer"
import { ArticlesBrowser } from "@/components/articles/articles-browser"
import { getAllPosts, getAllTags } from "@/lib/posts"
import { FadeIn } from "@/components/shared/motion"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Articles",
  description: "Browse and search every article, filtered by topic and tag.",
}

export default async function ArticlesPage() {
  const allPosts = await getAllPosts()
  const allTags = await getAllTags()
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />

      <main>
        {/* Intro */}
        <section className="border-b border-border bg-secondary">
          <FadeIn direction="down" className="mx-auto max-w-6xl px-4 py-6 text-center md:px-6 md:py-8">
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">The archive</p>
            <h1 className="mx-auto max-w-3xl text-balance font-serif text-4xl font-bold tracking-tight md:text-5xl">
              Every article, in one place.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Search the full collection or filter by the tags that interest you most.
            </p>
          </FadeIn>
        </section>

        <FadeIn delay={0.2} className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <Suspense fallback={<div>Loading articles...</div>}>
            <ArticlesBrowser allPosts={allPosts} allTags={allTags} />
          </Suspense>
        </FadeIn>
      </main>

      <BlogFooter />
    </div>
  )
}
