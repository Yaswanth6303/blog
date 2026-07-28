import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScaleUp,
} from "@/components/shared/motion";

export const metadata = {
  title: "Philosophy & Interests | About",
  description: "My learning philosophy, goals, and what I'm passionate about.",
};

const interests = [
  {
    icon: "lucide:code-2",
    title: "Software Engineering",
    description:
      "Building robust, scalable applications that solve meaningful real-world problems.",
  },
  {
    icon: "lucide:network",
    title: "Web3",
    description:
      "Fascinated by decentralized technologies, smart contracts, and the future of the internet.",
  },
  {
    icon: "lucide:cloud",
    title: "Cloud & Backend",
    description:
      "Working with cloud-native architectures, databases, and writing clean backend services.",
  },
  {
    icon: "lucide:target",
    title: "AI & Machine Learning",
    description:
      "Exploring the intersection of artificial intelligence and developer tools to shape the future.",
  },
];

export default function PhilosophyPage() {
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

        <div className="flex flex-col gap-16">
          <FadeIn direction="down" aria-labelledby="interests-heading">
            <h1
              id="interests-heading"
              className="mb-8 text-balance font-serif text-3xl font-bold tracking-tight md:text-4xl"
            >
              What I&apos;m Passionate About
            </h1>
            <StaggerContainer className="grid gap-6 sm:grid-cols-2">
              {interests.map((value) => {
                return (
                  <StaggerItem
                    key={value.title}
                    className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground">
                      <Icon
                        icon={value.icon}
                        className="size-5"
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <h3 className="font-bold">{value.title}</h3>
                      <p className="mt-1 text-pretty text-sm leading-relaxed text-foreground">
                        {value.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </FadeIn>

          <FadeIn
            delay={0.1}
            className="grid gap-12 md:grid-cols-2"
            aria-label="Philosophy and Goals"
          >
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-balance font-serif text-2xl font-bold tracking-tight">
                <Icon icon="lucide:book-open" className="size-6 text-primary" />
                My Learning Philosophy
              </h2>
              <div className="flex flex-col gap-4 text-pretty leading-relaxed text-foreground">
                <p>
                  Technology evolves every day, and I believe the best engineers
                  are lifelong learners. Rather than simply following tutorials,
                  I prefer understanding the underlying concepts.
                </p>
                <p>
                  Whether it&apos;s implementing data structures from scratch,
                  experimenting with new architectures, reading technical books,
                  or exploring open-source projects, I enjoy learning by
                  building.
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-4 flex items-center gap-2 text-balance font-serif text-2xl font-bold tracking-tight">
                <Icon icon="lucide:target" className="size-6 text-primary" />
                My Goal
              </h2>
              <div className="flex flex-col gap-4 text-pretty leading-relaxed text-foreground">
                <p>
                  My long-term goal is to become an engineer who builds
                  impactful software at scale while contributing to the
                  developer community through open source, technical writing,
                  and continuous learning.
                </p>
                <p>
                  I&apos;m particularly interested in working on products
                  involving cloud infrastructure, distributed systems,
                  artificial intelligence, and developer experience.
                </p>
              </div>
            </div>
          </FadeIn>

          <ScaleUp
            delay={0.2}
            className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center shadow-sm"
            aria-label="Beyond Coding"
          >
            <Icon icon="lucide:heart" className="mx-auto mb-4 size-8 text-primary" />
            <h2 className="text-balance font-serif text-3xl font-bold tracking-tight">
              Beyond Coding
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-foreground">
              Outside of development, I enjoy reading technical books,
              documenting what I learn, and sharing knowledge with others. I
              believe that teaching is one of the best ways to deepen
              understanding. This blog serves as my digital notebook.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-pretty font-medium text-foreground">
              I&apos;m always excited to connect with fellow developers,
              students, engineers, and technology enthusiasts. I&apos;m always
              happy to learn from others. Thanks for visiting my blog!
            </p>
          </ScaleUp>
        </div>
      </FadeIn>
    </div>
  );
}
