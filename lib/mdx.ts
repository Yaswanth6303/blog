import rehypePrettyCode from "rehype-pretty-code"
import remarkGfm from "remark-gfm"
import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import type { Heading } from "@/components/articles/table-of-contents"

/**
 * Pulls h2/h3 out of raw MDX for the table of contents. The ids have to match
 * the ones `mdxComponents` generates at render time, so both sides slugify the
 * same way — lowercase, non-alphanumerics collapsed to a single dash.
 */
export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = []

  content.split("\n").forEach((line) => {
    const match = line.match(/^(#{2,3})\s+(.+)$/)
    if (!match) return

    const level = match[1].length
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
      .replace(/<[^>]*>?/gm, "")
      .replace(/[*_~`]/g, "")

    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    headings.push({ id, text, level })
  })

  return headings
}

/** Shared by articles and project case studies so both render identically. */
export const mdxOptions: MDXRemoteProps["options"] = {
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
}

/** Wrapper classes for inline `code` inside prose. */
export const proseClassName =
  "text-lg w-full [&_code:not(pre_code)]:relative [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:bg-muted [&_code:not(pre_code)]:px-[0.3rem] [&_code:not(pre_code)]:py-[0.2rem] [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-sm [&_code:not(pre_code)]:font-semibold [&_code:not(pre_code)]:text-foreground"
