import * as React from "react";
import type { MDXComponents } from "mdx/types";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogHeader } from "@/components/blog-header";
import { BlogFooter } from "@/components/blog-footer";
import { NewsletterCta } from "@/components/newsletter-cta";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TableOfContents, type Heading } from "@/components/table-of-contents";
import { FadeIn, ScaleUp } from "@/components/motion";
import { ReadingProgress } from "@/components/reading-progress";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/code-block";

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split("\n");

  lines.forEach((line) => {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2]
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
        .replace(/<[^>]*>?/gm, "")
        .replace(/[*_~`]/g, "");

      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      headings.push({ id, text, level });
    }
  });

  return headings;
}

/* ------------------------------------------------------------------ */
/* Slug helper — walks nested nodes so `## Some `code` heading` works  */
/* ------------------------------------------------------------------ */

function nodeToText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean")
    return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (React.isValidElement(node)) {
    return nodeToText((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

export function generateId(children: React.ReactNode): string {
  return nodeToText(children)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/* ------------------------------------------------------------------ */
/* Heading factory — anchor id + hover permalink, no repetition        */
/* ------------------------------------------------------------------ */

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

function heading(Tag: HeadingTag, className: string) {
  const Heading = ({
    children,
    ...props
  }: React.ComponentPropsWithoutRef<HeadingTag>) => {
    const id = generateId(children);
    return (
      <Tag id={id} className={`group scroll-m-24 ${className}`} {...props}>
        {children}
        {id ? (
          <a
            href={`#${id}`}
            aria-label="Link to this section"
            className="ml-2 text-muted-foreground/40 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 no-underline"
          >
            #
          </a>
        ) : null}
      </Tag>
    );
  };
  Heading.displayName = `MDX${Tag.toUpperCase()}`;
  return Heading;
}

/* ------------------------------------------------------------------ */
/* Components                                                          */
/* ------------------------------------------------------------------ */

export const mdxComponents: MDXComponents = {
  /* --- headings --- */
  h1: heading("h1", "text-4xl font-bold tracking-tight mb-6 mt-12"),
  h2: heading("h2", "font-serif text-3xl font-bold tracking-tight mb-6 mt-12"),
  h3: heading(
    "h3",
    "font-serif text-2xl font-semibold tracking-tight mb-4 mt-8",
  ),
  h4: heading("h4", "text-xl font-semibold tracking-tight mb-4 mt-8"),
  h5: heading("h5", "text-lg font-semibold tracking-tight mb-4 mt-8"),
  h6: heading(
    "h6",
    "text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3 mt-8",
  ),

  /* --- text --- */
  p: ({ children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p className="leading-7 not-first:mt-6 text-foreground" {...props}>
      {children}
    </p>
  ),
  strong: ({
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-bold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.ComponentPropsWithoutRef<"em">) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  del: ({ children, ...props }: React.ComponentPropsWithoutRef<"del">) => (
    <del className="text-muted-foreground/70 line-through" {...props}>
      {children}
    </del>
  ),
  mark: ({ children, ...props }: React.ComponentPropsWithoutRef<"mark">) => (
    <mark className="rounded bg-primary/15 px-1 text-foreground" {...props}>
      {children}
    </mark>
  ),
  small: ({ children, ...props }: React.ComponentPropsWithoutRef<"small">) => (
    <small className="text-sm text-muted-foreground" {...props}>
      {children}
    </small>
  ),
  sub: ({ children, ...props }: React.ComponentPropsWithoutRef<"sub">) => (
    <sub className="text-xs" {...props}>
      {children}
    </sub>
  ),
  sup: ({ children, ...props }: React.ComponentPropsWithoutRef<"sup">) => (
    <sup className="text-xs" {...props}>
      {children}
    </sup>
  ),
  kbd: ({ children, ...props }: React.ComponentPropsWithoutRef<"kbd">) => (
    <kbd
      className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground shadow-sm"
      {...props}
    >
      {children}
    </kbd>
  ),
  abbr: ({ children, ...props }: React.ComponentPropsWithoutRef<"abbr">) => (
    <abbr
      className="cursor-help underline decoration-dotted underline-offset-4"
      {...props}
    >
      {children}
    </abbr>
  ),
  br: (props: React.ComponentPropsWithoutRef<"br">) => <br {...props} />,

  /* --- links: internal via next/link, external gets rel + target --- */
  a: ({
    href = "",
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"a">) => {
    const className =
      "font-medium text-primary underline underline-offset-4 hover:text-primary/80";

    if (href.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },

  /* --- lists (incl. GFM task lists) --- */
  ul: ({ children, ...props }: React.ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-6 ml-6 list-disc [&>li]:mt-2 text-foreground [&:has(input[type=checkbox])]:ml-0 [&:has(input[type=checkbox])]:list-none"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="my-6 ml-6 list-decimal [&>li]:mt-2 text-foreground"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.ComponentPropsWithoutRef<"li">) => (
    <li className="text-foreground [&>p]:mt-0" {...props}>
      {children}
    </li>
  ),
  input: ({
    type,
    checked,
    ...props
  }: React.ComponentPropsWithoutRef<"input">) =>
    type === "checkbox" ? (
      <input
        type="checkbox"
        checked={checked}
        disabled
        readOnly
        className="mr-2 h-4 w-4 translate-y-0.5 accent-primary"
        {...props}
      />
    ) : (
      <input type={type} {...props} />
    ),

  /* --- definition lists --- */
  dl: ({ children, ...props }: React.ComponentPropsWithoutRef<"dl">) => (
    <dl className="my-6 space-y-3" {...props}>
      {children}
    </dl>
  ),
  dt: ({ children, ...props }: React.ComponentPropsWithoutRef<"dt">) => (
    <dt className="font-semibold text-foreground" {...props}>
      {children}
    </dt>
  ),
  dd: ({ children, ...props }: React.ComponentPropsWithoutRef<"dd">) => (
    <dd className="ml-6 text-foreground" {...props}>
      {children}
    </dd>
  ),

  /* --- quotes & rules --- */
  blockquote: ({
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-8 border-l-4 border-primary pl-6 font-serif text-xl italic text-foreground [&>p]:mt-0"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props: React.ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-10 border-border" {...props} />
  ),

  /* --- code --- */
  pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
    <CodeBlock {...props} />
  ),

  /* --- tables --- */
  table: ({ children, ...props }: React.ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: React.ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-secondary/20" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: React.ComponentPropsWithoutRef<"tbody">) => (
    <tbody {...props}>{children}</tbody>
  ),
  tfoot: ({ children, ...props }: React.ComponentPropsWithoutRef<"tfoot">) => (
    <tfoot className="bg-secondary/10 font-medium text-foreground" {...props}>
      {children}
    </tfoot>
  ),
  tr: ({ children, ...props }: React.ComponentPropsWithoutRef<"tr">) => (
    <tr className="transition-colors hover:bg-muted/30" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: React.ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-border px-4 py-3 font-semibold text-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.ComponentPropsWithoutRef<"td">) => (
    <td
      className="border-b border-border/50 px-4 py-3 text-foreground"
      {...props}
    >
      {children}
    </td>
  ),
  caption: ({
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"caption">) => (
    <caption
      className="mt-3 caption-bottom text-sm text-muted-foreground"
      {...props}
    >
      {children}
    </caption>
  ),

  /* --- media & embeds --- */
  img: ({ src, alt, ...props }: React.ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      loading="lazy"
      decoding="async"
      className="my-8 w-full rounded-xl border border-border bg-muted/20 object-cover shadow-sm"
      {...props}
    />
  ),
  figure: ({
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"figure">) => (
    <figure className="my-8 [&>img]:my-0" {...props}>
      {children}
    </figure>
  ),
  figcaption: ({
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"figcaption">) => (
    <figcaption
      className="mt-3 text-center text-sm text-muted-foreground"
      {...props}
    >
      {children}
    </figcaption>
  ),
  video: (props: React.ComponentPropsWithoutRef<"video">) => (
    <video
      controls
      className="my-8 w-full rounded-xl border border-border shadow-sm"
      {...props}
    />
  ),
  iframe: (props: React.ComponentPropsWithoutRef<"iframe">) => (
    <div className="my-8 aspect-video w-full overflow-hidden rounded-xl border border-border">
      <iframe className="h-full w-full" allowFullScreen {...props} />
    </div>
  ),

  /* --- details / summary --- */
  details: ({
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"details">) => (
    <details
      className="my-6 rounded-lg border border-border bg-muted/20 px-5 py-4 [&[open]>summary]:mb-3"
      {...props}
    >
      {children}
    </details>
  ),
  summary: ({
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"summary">) => (
    <summary
      className="cursor-pointer font-medium text-foreground marker:text-muted-foreground"
      {...props}
    >
      {children}
    </summary>
  ),

  /* --- footnotes (remark-gfm renders them into a <section>) --- */
  section: ({
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"section">) => (
    <section
      className="mt-12 border-t border-border pt-6 text-sm [&_h2]:text-base [&_h2]:mt-0 [&_h2]:mb-3 [&_p]:text-sm"
      {...props}
    >
      {children}
    </section>
  ),
};

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
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

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
                <div className="text-lg w-full [&_code:not(pre_code)]:relative [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:bg-muted [&_code:not(pre_code)]:px-[0.3rem] [&_code:not(pre_code)]:py-[0.2rem] [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-sm [&_code:not(pre_code)]:font-semibold [&_code:not(pre_code)]:text-foreground">
                  <MDXRemote
                    source={post.content}
                    components={mdxComponents}
                    options={{
                      mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [
                          [
                            rehypePrettyCode,
                            {
                              theme: "dracula",
                              keepBackground: false,
                            },
                          ],
                        ],
                      },
                    }}
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
                    <h3 className="mb-8 text-center font-serif text-2xl font-semibold tracking-tight text-foreground">
                      Continue reading
                    </h3>
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

                <div className="mt-12">
                  <NewsletterCta />
                </div>
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
