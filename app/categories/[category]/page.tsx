import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { BlogHeader } from "@/components/layout/blog-header"
import { BlogFooter } from "@/components/layout/blog-footer"
import { ArticlesBrowser } from "@/components/articles/articles-browser"
import { getAllPosts, getAllTags, getAllCategories } from "@/lib/posts"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { sortWithOrderAndDate } from "@/lib/utils"

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((c) => ({
    category: c.name.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const decodedCategory = decodeURIComponent(resolvedParams.category)
  const categoryName = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)
  
  return {
    title: `${categoryName} Articles`,
    description: `Browse all articles related to ${categoryName}.`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params
  const allPosts = await getAllPosts()
  const allTags = await getAllTags()
  
  // Filter posts by category and sort by order
  const decodedCategory = decodeURIComponent(resolvedParams.category).toLowerCase()
  const categoryPosts = allPosts
    .filter((post) => post.category?.toLowerCase() === decodedCategory)
    .sort(sortWithOrderAndDate)
  
  if (categoryPosts.length === 0) {
    notFound()
  }

  const categoryName = categoryPosts[0].category // Get actual formatted name
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />

      <main>
        {/* Intro */}
        <section className="border-b border-border bg-secondary">
          <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
            <div className="mb-4">
              <Link 
                href="/categories" 
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="mr-2 size-4" />
                All Categories
              </Link>
            </div>
            
            <div className="text-center">
              <p className="mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">Category</p>
              <h1 className="mx-auto max-w-3xl text-balance font-serif text-4xl font-bold tracking-tight md:text-5xl">
                {categoryName}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                {categoryPosts.length} {categoryPosts.length === 1 ? 'article' : 'articles'} in this collection.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <Suspense fallback={<div>Loading articles...</div>}>
            <ArticlesBrowser allPosts={categoryPosts} allTags={allTags} showTags={false} fromCategory={true} />
          </Suspense>
        </div>
      </main>

      <BlogFooter />
    </div>
  )
}
