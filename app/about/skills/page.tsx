import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { TechIcon } from "@/components/shared/tech-icon";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";

export const metadata = {
  title: "Skills | About",
  description: "Technologies, programming languages, and tools I use.",
};

const stackCategories = [
  {
    title: "Languages",
    skills: ["Java", "Go", "TypeScript", "Python", "Rust"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Backend & DBs",
    skills: ["Node.js", "Express.js", "Bun", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["Docker", "Kubernetes", "Linux", "Git", "CI/CD"],
  },
];

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <FadeIn>
        <Link
          href="/about"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon icon="lucide:arrow-left" className="size-4" />
          Back to Menu
        </Link>

        <div className="flex flex-col gap-8">
          <div className="w-full">
            <h1
              id="stack-heading"
              className="text-balance font-serif text-3xl font-bold tracking-tight md:text-4xl"
            >
              What I Build With
            </h1>
            <div className="mt-4 text-pretty leading-relaxed text-foreground">
              <p>
                I enjoy building software that combines clean design with solid
                engineering. Beyond frameworks, I love understanding how things
                work under the hood—from operating systems and networking to
                distributed systems, cloud infrastructure, and performance.
              </p>
            </div>
          </div>

          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
            {stackCategories.map((category) => (
              <StaggerItem
                key={category.title}
                className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/50"
              >
                <h3 className="mb-4 font-semibold tracking-tight text-primary">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-md bg-secondary/60 px-2.5 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary"
                    >
                      <TechIcon name={skill} className="mr-2 text-base" />
                      {skill}
                    </span>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </FadeIn>
    </div>
  );
}
