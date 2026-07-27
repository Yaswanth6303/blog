import Link from "next/link"
import { ArrowUpRight, CalendarDays, GitBranch } from "lucide-react"
import { TechIcon } from "@/components/shared/tech-icon"
import type { Project } from "@/lib/projects"

const statusStyles: Record<Project["status"], string> = {
  shipped: "border-border bg-secondary text-secondary-foreground",
  "in-progress": "border-primary/30 bg-primary/10 text-foreground",
  archived: "border-border bg-transparent text-muted-foreground",
}

const statusLabels: Record<Project["status"], string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
}

// The only non-monochrome pixels on the card — small enough to read as a status
// light rather than as brand colour.
const statusDots: Record<Project["status"], string> = {
  shipped: "bg-emerald-500",
  "in-progress": "bg-amber-500",
  archived: "bg-muted-foreground/50",
}

export function ProjectCard({
  project,
  /** Side-by-side layout, so a lone card fills the row instead of leaving a
      hole next to it in a two-column grid. */
  wide = false,
}: {
  project: Project
  wide?: boolean
}) {
  if (wide) return <ProjectCardFeature project={project} />

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/20">
      <Link
        href={`/projects/${project.slug}`}
        className="flex flex-1 flex-col focus-visible:outline-none"
      >
        {/* Covers the whole card so the title is the only tab stop, leaving the
            repo/demo links below independently focusable. */}
        <span className="absolute inset-0 z-0" aria-hidden="true" />

        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.image || "/placeholder.svg"}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-3">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[project.status]}`}
            >
              {statusLabels[project.status]}
            </span>
            {project.period && (
              <span className="text-xs text-muted-foreground">
                {project.period}
              </span>
            )}
          </div>

          <h3 className="text-balance font-serif text-xl font-semibold leading-snug tracking-tight">
            {project.title}
          </h3>

          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>

          <ul className="flex flex-wrap gap-2 pt-1" aria-label="Built with">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </Link>

      {(project.repo || project.demo) && (
        <div className="relative z-10 flex items-center gap-4 border-t border-border px-5 py-3">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitBranch className="size-3.5" aria-hidden="true" />
              Source
              <span className="sr-only"> code for {project.title}</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
              Live
              <span className="sr-only"> demo of {project.title}</span>
            </a>
          )}
        </div>
      )}
    </article>
  )
}

/**
 * Hero treatment used when a single project stands alone. Wider type, boxed
 * tech chips, and the two actions promoted to real buttons in the bottom right
 * — the filled one uses --primary, so it matches the header's Subscribe button
 * in both themes rather than introducing an accent colour.
 */
function ProjectCardFeature({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/20 sm:flex-row">
      <div className="relative aspect-video overflow-hidden sm:aspect-auto sm:w-2/5 sm:shrink-0">
        <img
          src={project.image || "/placeholder.svg"}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[project.status]}`}
          >
            <span
              className={`size-1.5 rounded-full ${statusDots[project.status]}`}
              aria-hidden="true"
            />
            {statusLabels[project.status]}
          </span>

          {project.period && (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays className="size-3.5" aria-hidden="true" />
              {project.period}
            </span>
          )}
        </div>

        <h3 className="text-balance font-serif text-2xl font-bold leading-tight tracking-tight md:text-3xl">
          <Link
            href={`/projects/${project.slug}`}
            className="focus-visible:outline-none"
          >
            {/* Stretched link: the image and body stay clickable while the two
                action buttons below remain separately focusable. */}
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {project.title}
          </Link>
        </h3>

        <p className="text-pretty leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        {project.stack.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Built with">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-1.5 text-sm font-medium text-foreground"
              >
                <TechIcon name={tech} className="size-4 text-muted-foreground" />
                {tech}
              </li>
            ))}
          </ul>
        )}

        {(project.repo || project.demo) && (
          <div className="relative z-10 mt-auto flex flex-wrap items-center justify-end gap-3 border-t border-border pt-5">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <GitBranch className="size-4" aria-hidden="true" />
                Source
                <span className="sr-only"> code for {project.title}</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <ArrowUpRight className="size-4" aria-hidden="true" />
                Live Demo
                <span className="sr-only"> of {project.title}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
