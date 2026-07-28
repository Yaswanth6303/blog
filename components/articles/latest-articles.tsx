import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { getAllPosts } from "@/lib/posts";

/**
 * A compact index rather than the full archive — the homepage should get
 * visitors to the writing, not be the writing. Browsing lives on /articles.
 */
export async function LatestArticles({ limit = 3 }: { limit?: number }) {
  // Featured posts get their own section above this one, so skipping them here
  // keeps the homepage from showing the same article twice.
  const posts = (await getAllPosts())
    .filter((post) => !post.featured)
    .slice(0, limit);

  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="latest-heading" className="w-full">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2
          id="latest-heading"
          className="font-serif text-2xl font-bold tracking-tight"
        >
          Latest articles
        </h2>
        <Link
          href="/articles"
          className="group inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          All articles
          <Icon icon="lucide:arrow-right" className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/articles/${post.slug}`}
              className="group flex flex-col gap-2 py-5 transition-colors sm:flex-row sm:items-baseline sm:gap-6"
            >
              <span className="shrink-0 text-sm text-muted-foreground sm:w-32">
                {post.date}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-balance font-serif text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                  {post.title}
                </span>
                <span className="mt-1 line-clamp-2 block text-pretty text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </span>
              </span>

              <span className="shrink-0 text-sm text-muted-foreground">
                {post.readingTime}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
