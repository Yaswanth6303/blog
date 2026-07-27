import type { Metadata } from "next"
import Link from "next/link"
import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { getAllCategories } from "@/lib/posts"
import { ArrowRight, FileText } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse articles by category.",
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />

      <main>
        {/* Intro */}
        <section className="border-b border-border bg-secondary">
          <FadeIn direction="down" className="mx-auto max-w-6xl px-4 py-6 text-center md:px-6 md:py-8">
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">Topics</p>
            <h1 className="mx-auto max-w-3xl text-balance font-serif text-4xl font-bold tracking-tight md:text-5xl">
              Explore by category
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Deep dives into software architecture, artificial intelligence, cloud computing, and more.
            </p>
          </FadeIn>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          {categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-24 text-center">
              <div className="rounded-full bg-secondary p-4">
                <FileText className="size-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">No categories found</h3>
              <p className="mt-2 text-base text-muted-foreground max-w-sm">
                There are currently no topics to display. Check back soon for new content!
              </p>
            </div>
          ) : (
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <StaggerItem key={category.name}>
                  <Link
                    href={`/categories/${category.name.toLowerCase()}`}
                    className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-md"
                  >
                    {category.featuredImage && (
                      <>
                        <img 
                          src={category.featuredImage} 
                          alt="" 
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          aria-hidden="true"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-90" />
                      </>
                    )}
                    
                    {/* Fallback gradient if no image */}
                    {!category.featuredImage && (
                      <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 transition-opacity group-hover:opacity-80" />
                    )}

                    <div className="relative z-10">
                      <h2 className={`mb-2 font-serif text-3xl font-bold tracking-tight ${category.featuredImage ? 'text-white' : 'text-foreground'}`}>
                        {category.name}
                      </h2>
                      <div className={`flex items-center justify-between text-sm ${category.featuredImage ? 'text-white/80' : 'text-muted-foreground'}`}>
                        <span>{category.count} {category.count === 1 ? 'article' : 'articles'}</span>
                        <ArrowRight className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </section>
      </main>

      <BlogFooter />
    </div>
  )
}
