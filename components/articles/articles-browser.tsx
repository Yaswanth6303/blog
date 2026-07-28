"use client"

import { useMemo, useState } from "react"
import { Search, X, FileText } from "lucide-react"
import type { Post } from "@/lib/posts"
import Link from "next/link"
import { sortWithOrderAndDate } from "@/lib/utils"

export function ArticlesBrowser({ allPosts, allTags }: { allPosts: Post[], allTags: string[] }) {
  const [query, setQuery] = useState("")
  const [activeTags, setActiveTags] = useState<string[]>([])

  if (allPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-24 text-center">
        <div className="rounded-full bg-secondary p-4">
          <FileText className="size-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-tight">No articles published yet</h3>
        <p className="mt-2 text-base text-muted-foreground max-w-sm">
          I am currently working on some exciting new content. Check back soon for fresh essays and articles!
        </p>
      </div>
    )
  }

  function toggleTag(tag: string) {
    setActiveTags((prev) => (prev.includes(tag) ? [] : [tag]))
  }

  function clearFilters() {
    setQuery("")
    setActiveTags([])
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    
    // First, filter the results
    let results = allPosts.filter((post) => {
      const matchesQuery =
        q === "" ||
        post.title?.toLowerCase().includes(q) ||
        post.excerpt?.toLowerCase().includes(q) ||
        post.category?.toLowerCase().includes(q) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(q))

      const matchesTags = activeTags.length === 0 || activeTags.every((tag) => post.tags.includes(tag))

      return matchesQuery && matchesTags
    })

    // Then, apply dynamic sorting
    if (activeTags.length > 0) {
      // If a tag is selected, sort by explicitly defined order (1, 2, 3...)
      results = [...results].sort(sortWithOrderAndDate)
    }
    // If no tag is selected, we keep the default sort (newest first) from allPosts

    return results
  }, [query, activeTags, allPosts])

  const hasFilters = query.trim() !== "" || activeTags.length > 0

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles by title, topic, or tag..."
          aria-label="Search articles"
          className="w-full rounded-lg border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30 focus:ring-2 focus:ring-ring/40"
        />
      </div>

      {/* Tag filters */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium text-muted-foreground">Tags:</span>
        {allTags.map((tag) => {
          const active = activeTags.includes(tag)
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={active}
              onClick={() => toggleTag(tag)}
              className={
                active
                  ? "rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground"
                  : "rounded-full border border-border px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              }
            >
              {tag}
            </button>
          )
        })}
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-3.5" aria-hidden="true" />
            Clear
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-muted-foreground" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {hasFilters ? " found" : ""}
      </p>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((post) => (
            <article
              key={post.slug}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/20"
            >
              <Link href={`/articles/${post.slug}`} className="absolute inset-0 z-0">
                <span className="sr-only">Read article: {post.title}</span>
              </Link>
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
                <ul className="relative z-10 flex flex-wrap gap-2 pt-1" aria-label="Tags">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <button
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent"
                      >
                        {tag}
                      </button>
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
                    <span>
                      {" · "}
                      {post.date} · {post.readingTime}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="font-serif text-lg font-semibold">No articles found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search term or clear your filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
