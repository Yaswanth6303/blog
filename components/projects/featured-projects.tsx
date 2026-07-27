import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedProjects } from "@/lib/projects"
import { ProjectCard } from "@/components/projects/project-card"
import { StaggerContainer, StaggerItem } from "@/components/shared/motion"

export async function FeaturedProjects() {
  const featured = await getFeaturedProjects()
  // Two is the cap: this is a teaser for /projects, not the full list.
  const projects = featured.slice(0, 2)

  if (projects.length === 0) return null

  const solo = projects.length === 1

  return (
    <section aria-labelledby="projects-heading" className="mb-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2
          id="projects-heading"
          className="font-serif text-2xl font-bold tracking-tight"
        >
          Selected projects
        </h2>
        <Link
          href="/projects"
          className="group inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          All projects
          <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <StaggerContainer
        className={`grid gap-6 ${solo ? "grid-cols-1" : "sm:grid-cols-2"}`}
      >
        {projects.map((project) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} wide={solo} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
