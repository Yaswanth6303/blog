import * as React from "react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { CodeBlock } from "@/components/shared/code-block";

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
