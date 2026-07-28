import { getAllCategories, getAllPosts } from "@/lib/posts"
import Link from "next/link"
import { StaggerContainer, StaggerItem } from "@/components/shared/motion"
import { Icon } from "@/components/ui/icon"

export async function ArticleGrid() {
  const posts = await getAllPosts()
  const categories = await getAllCategories()
  
  // Optionally filter out featured post if you don't want it repeated, 
  // but keeping it simple for now, we'll just show them all except maybe the featured one.
  // Actually, wait, let's just show all posts that aren't featured to match original behavior.
  const gridPosts = posts.filter(p => !p.featured)

  return (
    <section aria-labelledby="latest-heading" className="mb-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2 id="latest-heading" className="font-serif text-2xl font-bold tracking-tight">
          Latest articles
        </h2>
        {gridPosts.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Filter by category">
            <li key="All">
              <button
                type="button"
                className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground"
              >
                All
              </button>
            </li>
            {categories.map((category) => (
              <li key={category.name}>
                <button
                  type="button"
                  className="rounded-full border border-border px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {gridPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-24 text-center">
          <div className="rounded-full bg-secondary p-4">
            <Icon icon="lucide:file-text" className="size-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-xl font-semibold tracking-tight">No articles published yet</h3>
          <p className="mt-2 text-base text-muted-foreground max-w-sm">
            I am currently working on some exciting new content. Check back soon for fresh essays and articles!
          </p>
        </div>
      ) : (
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {gridPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <article
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/20"
              >
              <Link href={`/articles/${post.slug}`} className="flex flex-1 flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {post.category}
                  </span>
                  <h3 className="text-balance font-serif text-xl font-semibold leading-snug tracking-tight">
                    {post.title}
                  </h3>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <ul className="flex flex-wrap gap-2 pt-1" aria-label="Tags">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center gap-3 pt-3">
                    <img
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      className="size-8 rounded-full object-cover"
                    />
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{post.author.name}</span>
                      <span> · {post.date} · {post.readingTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </section>
  )
}
