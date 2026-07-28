"use client"

import { useMemo, useState } from "react"
import { Search, X, FileText } from "lucide-react"
import type { Post } from "@/lib/posts"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { sortWithOrderAndDate } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function ArticlesBrowser({ 
  allPosts, 
  allTags,
  showTags = true,
  fromCategory = false
}: { 
  allPosts: Post[], 
  allTags: string[],
  showTags?: boolean,
  fromCategory?: boolean
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [activeTags, setActiveTags] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) || []
  )

  // Sync local state to URL query parameters
  const updateUrlParams = (newQuery: string, newTags: string[]) => {
    const params = new URLSearchParams()
    if (newQuery.trim()) {
      params.set("q", newQuery.trim())
    }
    if (newTags.length > 0) {
      params.set("tags", newTags.join(","))
    }
    const newSearch = params.toString()
    const currentSearch = searchParams.toString()
    if (newSearch !== currentSearch) {
      router.replace(`${pathname}?${newSearch}`, { scroll: false })
    }
  }

  function handleQueryChange(value: string) {
    setQuery(value)
    updateUrlParams(value, activeTags)
  }

  function toggleTag(tag: string) {
    const newTags = activeTags.includes(tag) ? [] : [tag]
    setActiveTags(newTags)
    updateUrlParams(query, newTags)
  }

  function clearFilters() {
    setQuery("")
    setActiveTags([])
    updateUrlParams("", [])
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
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search articles by title, topic, or tag..."
          aria-label="Search articles"
          className="w-full rounded-lg border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30 focus:ring-2 focus:ring-ring/40"
        />
      </div>

      {/* Tag filters */}
      {showTags && (
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
      )}

      {/* Results count */}
      <p className="mb-6 text-sm text-muted-foreground" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {hasFilters ? " found" : ""}
      </p>

      {/* Results */}
      {filtered.length > 0 ? (
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                key={post.slug}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/20"
              >
                <Link href={`/articles/${post.slug}?${new URLSearchParams({
                  ...(query.trim() ? { q: query.trim() } : {}),
                  ...(activeTags.length > 0 ? { tags: activeTags.join(",") } : {}),
                  ...(fromCategory ? { from: post.category.toLowerCase() } : {})
                }).toString()}`} className="absolute inset-0 z-0">
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
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
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
