import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogHeader } from "@/components/layout/blog-header";
import { BlogFooter } from "@/components/layout/blog-footer";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TableOfContents } from "@/components/articles/table-of-contents";
import { FadeIn, ScaleUp } from "@/components/shared/motion";
import { ReadingProgress } from "@/components/articles/reading-progress";
import { mdxComponents } from "@/components/articles/mdx-components";
import { extractHeadings, mdxOptions, proseClassName } from "@/lib/mdx";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === resolvedParams.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex(
    (p) => p.slug === resolvedParams.slug,
  );

  if (currentIndex === -1) {
    notFound();
  }

  const post = allPosts[currentIndex];
  const nextPost =
    allPosts.length > 1
      ? currentIndex > 0
        ? allPosts[currentIndex - 1]
        : allPosts[allPosts.length - 1]
      : null;
  const prevPost =
    allPosts.length > 1
      ? currentIndex < allPosts.length - 1
        ? allPosts[currentIndex + 1]
        : allPosts[0]
      : null;

  const headings = extractHeadings(post.content);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ReadingProgress />
      <BlogHeader />

      <main>
        <article className="py-12 md:pt-16 md:pb-12">
          <FadeIn delay={0.1} className="mx-auto max-w-5xl px-4 md:px-6">
            <div className="mb-8">
              <Link
                href="/articles"
                className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="mr-2 size-4" />
                Back to articles
              </Link>
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6">
                <span className="inline-flex items-center rounded-full border border-border/50 bg-secondary/30 px-3 py-1 text-xs font-semibold tracking-wider text-secondary-foreground uppercase backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              <h1 className="mb-6 text-balance font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl md:leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mb-14 flex items-center justify-center gap-4">
                <img
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  className="size-11 rounded-full border border-border/50 object-cover shadow-sm"
                />
                <div className="text-left">
                  <p className="font-semibold text-foreground">
                    {post.author.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {post.date} &middot; {post.readingTime}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <ScaleUp
            delay={0.2}
            className="mx-auto mb-16 max-w-5xl px-4 md:mb-24 md:px-6"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 bg-muted/20 shadow-2xl md:rounded-3xl">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </ScaleUp>

          <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(auto,768px)_1fr] gap-8 xl:gap-12">
              {/* Empty left column to perfectly balance the grid */}
              <div className="hidden lg:block"></div>

              {/* Center column: Main Article Content */}
              <FadeIn delay={0.3} className="w-full min-w-0">
                <div className={proseClassName}>
                  <MDXRemote
                    source={post.content}
                    components={mdxComponents}
                    options={mdxOptions}
                  />
                </div>

                <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-2">
                  <span className="text-sm font-medium mr-2 pt-1">Tags:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Previous and Next Navigation */}
                {(prevPost || nextPost) && (
                  <div className="mt-12 border-t border-border pt-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {prevPost ? (
                        <Link
                          href={`/articles/${prevPost.slug}`}
                          className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md"
                        >
                          <div className="flex items-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
                            Previous
                          </div>
                          <h4 className="font-serif text-xl font-medium leading-snug tracking-tight text-foreground line-clamp-2">
                            {prevPost.title}
                          </h4>
                          <p className="mt-auto text-sm leading-relaxed text-muted-foreground line-clamp-2">
                            {prevPost.excerpt}
                          </p>
                        </Link>
                      ) : (
                        <div /> /* Empty placeholder for alignment */
                      )}

                      {nextPost && (
                        <Link
                          href={`/articles/${nextPost.slug}`}
                          className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 text-right transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md"
                        >
                          <div className="flex items-center justify-end text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Next
                            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                          </div>
                          <h4 className="font-serif text-xl font-medium leading-snug tracking-tight text-foreground line-clamp-2">
                            {nextPost.title}
                          </h4>
                          <p className="mt-auto text-sm leading-relaxed text-muted-foreground line-clamp-2">
                            {nextPost.excerpt}
                          </p>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </FadeIn>

              {/* Right column: Table of Contents */}
              <div className="hidden lg:flex justify-start xl:justify-start xl:pl-8">
                <aside className="sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto w-62.5">
                  <TableOfContents headings={headings} />
                </aside>
              </div>
            </div>
          </div>
        </article>
      </main>

      <BlogFooter />
    </div>
  );
}
