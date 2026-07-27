import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { getFeaturedPosts } from "@/lib/posts"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export async function FeaturedPost() {
  const posts = await getFeaturedPosts()
  
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="featured-heading" className="mb-16">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            Featured
          </span>
          <h2 id="featured-heading" className="text-sm font-medium text-muted-foreground">
            {posts.length > 1
              ? `${posts.length} picks worth starting with`
              : "Worth starting with"}
          </h2>
        </div>
      </div>

      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {posts.map((post) => (
            <CarouselItem key={post.slug}>
              <article className="grid gap-6 overflow-hidden rounded-xl border border-border bg-card md:grid-cols-2">
                <Link href={`/articles/${post.slug}`} className="relative aspect-16/10 md:aspect-auto overflow-hidden group block">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{post.category}</span>
                  <h3 className="text-balance font-serif text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                    <Link href={`/articles/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-pretty leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      className="size-9 rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-medium">{post.author.name}</p>
                      <p className="text-muted-foreground">
                        {post.date} &middot; {post.readingTime}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link href={`/articles/${post.slug}`} className={buttonVariants()}>
                      Read article
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
        {posts.length > 1 && (
          <div className="flex items-center justify-end gap-2 mt-4 pr-2">
            <CarouselPrevious className="static transform-none border-border" />
            <CarouselNext className="static transform-none border-border" />
          </div>
        )}
      </Carousel>
    </section>
  )
}
