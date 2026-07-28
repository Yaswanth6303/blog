import type { Metadata } from "next"
import { Icon } from "@/components/ui/icon"
import { BlogHeader } from "@/components/layout/blog-header"
import { BlogFooter } from "@/components/layout/blog-footer"
import { ProjectCard } from "@/components/projects/project-card"

import { getAllProjects } from "@/lib/projects"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Things I have designed, built, and shipped — with the reasoning behind them.",
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />

      <main>
        <section className="border-b border-border bg-secondary">
          <FadeIn
            direction="down"
            className="mx-auto max-w-6xl px-4 py-6 text-center md:px-6 md:py-8"
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Selected work
            </p>
            <h1 className="mx-auto max-w-3xl text-balance font-serif text-4xl font-bold tracking-tight md:text-5xl">
              Things I have built.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Each one is a write-up rather than a screenshot — the problem, the
              decisions, and what I would do differently.
            </p>
          </FadeIn>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-24 text-center">
              <div className="rounded-full bg-secondary p-4">
                <Icon icon="lucide:folder-git-2" className="size-8 text-muted-foreground" />
              </div>
              <h2 className="mt-4 text-xl font-semibold tracking-tight">
                No projects published yet
              </h2>
              <p className="mt-2 max-w-sm text-base text-muted-foreground">
                Write-ups are on the way. In the meantime, the articles cover
                what I have been working on.
              </p>
            </div>
          ) : (
            // Same grid as the articles browser, so projects and posts read as
            // the same kind of card.
            <StaggerContainer className="grid gap-6 sm:grid-cols-2">
              {projects.map((project) => (
                <StaggerItem key={project.slug}>
                  <ProjectCard project={project} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </main>

      <BlogFooter />
    </div>
  )
}
