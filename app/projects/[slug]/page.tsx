import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  GitBranch,
  UserRound,
} from "lucide-react";
import { BlogHeader } from "@/components/layout/blog-header";
import { BlogFooter } from "@/components/layout/blog-footer";

import { TableOfContents } from "@/components/articles/table-of-contents";
import { FadeIn } from "@/components/shared/motion";
import { ReadingProgress } from "@/components/articles/reading-progress";
import { mdxComponents } from "@/components/articles/mdx-components";
import { TechIcon } from "@/components/shared/tech-icon";
import { extractHeadings, mdxOptions, proseClassName } from "@/lib/mdx";
import { getAllProjects, type Project } from "@/lib/projects";

const statusLabels: Record<Project["status"], string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
};

const statusStyles: Record<Project["status"], string> = {
  shipped: "border-border bg-secondary text-secondary-foreground",
  "in-progress": "border-primary/30 bg-primary/10 text-foreground",
  archived: "border-border bg-transparent text-muted-foreground",
};

const statusDots: Record<Project["status"], string> = {
  shipped: "bg-emerald-500",
  "in-progress": "bg-amber-500",
  archived: "bg-muted-foreground/50",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = (await getAllProjects()).find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
  };
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allProjects = await getAllProjects();
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const others = allProjects.filter((p) => p.slug !== slug).slice(0, 2);
  const headings = extractHeadings(project.content);

  // Status stays as the pill in the hero rather than repeating as a row here.
  const meta = [
    project.role && { label: "Role", value: project.role, icon: UserRound },
    project.period && {
      label: "Timeline",
      value: project.period,
      icon: CalendarDays,
    },
  ].filter(Boolean) as {
    label: string;
    value: string;
    icon: typeof CalendarDays;
  }[];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ReadingProgress />
      <BlogHeader />

      <main>
        <article className="py-12 md:pt-16 md:pb-12">
          <FadeIn delay={0.1} className="mx-auto max-w-5xl px-4 md:px-6">
            <div className="mb-8">
              <Link
                href="/projects"
                className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="mr-2 size-4" />
                Back to projects
              </Link>
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Copy first, image beside it — the summary and both actions stay
                  above the fold instead of sitting under a full-width banner. */}
              <div className="order-2 lg:order-1">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[project.status]}`}
                >
                  <span
                    className={`size-1.5 rounded-full ${statusDots[project.status]}`}
                    aria-hidden="true"
                  />
                  {statusLabels[project.status]}
                </span>

                <h1 className="mt-5 text-balance font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                  {project.title}
                </h1>

                <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>

                {(project.repo || project.demo) && (
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                        View live
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                      >
                        <GitBranch className="size-4" aria-hidden="true" />
                        Source code
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="order-1 overflow-hidden rounded-2xl border border-border bg-muted/20 shadow-lg lg:order-2">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={`${project.title} screenshot`}
                  className="aspect-video h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Meta and stack, divided so the two kinds of information read
                as separate columns rather than one long ragged block. */}
            {(meta.length > 0 || project.stack.length > 0) && (
              <div className="mt-10 grid gap-8 border-t border-border pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-12">
                {meta.length > 0 && (
                  <dl className="space-y-6 md:border-r md:border-border md:pr-12">
                    {meta.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className="flex items-center gap-4"
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                            <Icon className="size-4" aria-hidden="true" />
                          </span>

                          <div className="min-w-0 flex-1">
                            <dt className="text-sm text-muted-foreground">
                              {item.label}
                            </dt>
                            <dd className="mt-0.5 font-medium text-foreground">
                              {item.value}
                            </dd>
                          </div>
                        </div>
                      );
                    })}
                  </dl>
                )}

                {project.stack.length > 0 && (
                  <div>
                    <h2 className="text-sm text-muted-foreground">
                      Tech stack
                    </h2>
                    <ul className="mt-4 flex flex-wrap gap-2.5">
                      {project.stack.map((tech) => (
                        <li
                          key={tech}
                          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground"
                        >
                          <TechIcon
                            name={tech}
                            className="size-4 text-muted-foreground"
                          />
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </FadeIn>

          {/* Gap the old full-width banner used to provide between the hero
              block and the case study itself. */}
          <div className="mx-auto mt-12 w-full max-w-7xl px-4 md:mt-16 md:px-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_minmax(auto,768px)_1fr] xl:gap-12">
              <div className="hidden lg:block" />

              <FadeIn delay={0.3} className="w-full min-w-0">
                <div className={proseClassName}>
                  <MDXRemote
                    source={project.content}
                    components={mdxComponents}
                    options={mdxOptions}
                  />
                </div>

                {others.length > 0 && (
                  <div className="mt-12 border-t border-border pt-8">
                    <h2 className="mb-8 text-center font-serif text-2xl font-semibold tracking-tight text-foreground">
                      More projects
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {others.map((other) => (
                        <Link
                          key={other.slug}
                          href={`/projects/${other.slug}`}
                          className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md"
                        >
                          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {statusLabels[other.status]}
                          </div>
                          <h3 className="line-clamp-2 font-serif text-xl font-medium leading-snug tracking-tight text-foreground">
                            {other.title}
                          </h3>
                          <p className="mt-auto line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                            {other.summary}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </FadeIn>

              <div className="hidden justify-start lg:flex xl:justify-start xl:pl-8">
                <aside className="sticky top-24 max-h-[calc(100vh-6rem)] w-62.5 self-start overflow-y-auto">
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
