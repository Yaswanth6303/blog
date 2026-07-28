import Link from "next/link";
import { ExternalLink, CalendarDays } from "lucide-react";
import { Github } from "@/components/shared/icons";
import { TechIcon } from "@/components/shared/tech-icon";
import type { Project } from "@/lib/projects";

const statusStyles: Record<Project["status"], string> = {
  shipped:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "in-progress":
    "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  archived:
    "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

const statusLabels: Record<Project["status"], string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
};

// The only non-monochrome pixels on the card — small enough to read as a status
// light rather than as brand colour.
const statusDots: Record<Project["status"], string> = {
  shipped: "bg-emerald-500",
  "in-progress": "bg-amber-500",
  archived: "bg-rose-500",
};

export function ProjectCard({
  project,
  /** Side-by-side layout, so a lone card fills the row instead of leaving a
      hole next to it in a two-column grid. */
  wide = false,
}: {
  project: Project;
  wide?: boolean;
}) {
  if (wide) return <ProjectCardFeature project={project} />;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-sm hover:border-foreground/20">
      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0">
        <span className="sr-only">View project: {project.title}</span>
      </Link>

      <div className="relative aspect-video overflow-hidden border-b border-border">
        <img
          src={project.image || "/placeholder.svg"}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80 border border-white/10"
          >
            <ExternalLink className="size-4" />
            <span className="sr-only">Live demo</span>
          </a>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[project.status]}`}
          >
            <span
              className={`size-1.5 rounded-full ${statusDots[project.status]}`}
              aria-hidden="true"
            />
            {statusLabels[project.status]}
          </span>
        </div>

        <h3 className="mb-2 font-serif text-xl font-bold leading-snug tracking-tight text-foreground">
          {project.title}
        </h3>

        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <ul className="mb-6 flex flex-wrap gap-2" aria-label="Built with">
          {project.stack.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
            >
              {tech}
            </li>
          ))}
          {project.stack.length > 4 && (
            <li className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
              +{project.stack.length - 4}
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-4">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-muted-foreground"
              >
                <Github className="size-3.5" aria-hidden="true" />
                Source
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-muted-foreground"
              >
                <ExternalLink className="size-3.5" aria-hidden="true" />
                Live
              </a>
            )}
          </div>
          {project.period && (
            <span className="text-xs text-muted-foreground font-medium">
              {project.period}
            </span>
          )}
        </div>
      </div>
    </article>
  );
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
                <TechIcon
                  name={tech}
                  className="size-4 text-muted-foreground"
                />
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
                <Github className="size-4" aria-hidden="true" />
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
                <ExternalLink className="size-4" aria-hidden="true" />
                Live Demo
                <span className="sr-only"> of {project.title}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
