import type { Metadata } from "next";
import Image from "next/image";
import {
  Code2,
  Server,
  Database,
  Cloud,
  BookOpen,
  Target,
  Heart,
  Terminal,
} from "lucide-react";
import { BlogHeader } from "@/components/blog-header";
import { BlogFooter } from "@/components/blog-footer";
import { NewsletterCta } from "@/components/newsletter-cta";
import { FadeIn, StaggerContainer, StaggerItem, ScaleUp } from "@/components/motion";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Yaswanth Gudivada — software engineer, lifelong learner, and tech enthusiast.",
};

const interests = [
  {
    icon: Code2,
    title: "Software Engineering",
    description:
      "Building robust, scalable applications that solve meaningful real-world problems.",
  },
  {
    icon: Server,
    title: "Distributed Systems & HPC",
    description:
      "Fascinated by how modern systems are designed to scale and perform at high levels.",
  },
  {
    icon: Cloud,
    title: "Cloud & Backend",
    description:
      "Working with cloud-native architectures, databases, and writing clean backend services.",
  },
  {
    icon: Target,
    title: "AI & Machine Learning",
    description:
      "Exploring the intersection of artificial intelligence and developer tools to shape the future.",
  },
];

const stackCategories = [
  {
    title: "Languages",
    skills: ["Java", "Go", "TypeScript", "Python", "Rust"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS"],
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

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <BlogHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          {/* Intro */}
          <FadeIn direction="down" className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              About Me
            </p>
            <h1 className="mt-3 text-balance font-serif text-4xl font-bold tracking-tight md:text-5xl">
              Software engineer, lifelong learner.
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Hi, I&apos;m Yaswanth Gudivada — currently pursuing my Master of
              Computer Applications (MCA) at RV College of Engineering (RVCE),
              Bengaluru. I enjoy building software that solves real-world
              problems and exploring technologies that shape the future.
            </p>
          </FadeIn>

          {/* Author profile */}
          <FadeIn
            delay={0.1}
            className="mt-12 grid items-center gap-8 md:grid-cols-[240px_1fr]"
            aria-labelledby="author-heading"
          >
            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="flex h-60 w-60 items-center justify-center bg-secondary md:h-80 md:w-full">
                <Image
                  src="/images/author-avatar.png"
                  alt="Author's profile picture"
                  width={480}
                  height={480}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
            <div>
              <h2
                id="author-heading"
                className="font-serif text-3xl font-bold tracking-tight"
              >
                My Journey
              </h2>
              <div className="mt-4 flex flex-col gap-4 text-pretty leading-relaxed text-muted-foreground">
                <p>
                  My journey into technology began with curiosity rather than
                  convention. Coming from a biology background before
                  transitioning into computer science, I learned that
                  persistence and consistency matter more than where you start.
                </p>
                <p>
                  Today, that curiosity drives me to dive deep into everything
                  from algorithms and distributed systems to artificial
                  intelligence, cloud computing, and high-performance computing.
                  I believe that software engineering isn&apos;t just about
                  writing code—it&apos;s about understanding systems, solving
                  meaningful problems, and creating products that people
                  genuinely enjoy using.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Interests */}
          <FadeIn delay={0.2} className="mt-16" aria-labelledby="interests-heading">
            <h2
              id="interests-heading"
              className="text-balance font-serif text-3xl font-bold tracking-tight"
            >
              What I&apos;m Passionate About
            </h2>
            <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2">
              {interests.map((value) => {
                const Icon = value.icon;
                return (
                  <StaggerItem
                    key={value.title}
                    className="flex gap-4 rounded-xl border border-border bg-card p-6"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-medium">{value.title}</h3>
                      <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </FadeIn>

          {/* Stack & Building */}
          <FadeIn
            delay={0.3}
            className="mt-16 grid gap-8 md:grid-cols-2"
            aria-labelledby="stack-heading"
          >
            <div>
              <h2
                id="stack-heading"
                className="text-balance font-serif text-3xl font-bold tracking-tight"
              >
                What I Build With
              </h2>
              <div className="mt-4 flex flex-col gap-4 text-pretty leading-relaxed text-muted-foreground">
                <p>
                  I enjoy creating applications that combine clean design with
                  robust engineering principles. Beyond learning frameworks, I
                  love understanding how things work under the hood—whether
                  it&apos;s operating systems, networking, distributed
                  architectures, or performance optimization.
                </p>
              </div>
            </div>

            <StaggerContainer className="grid gap-4 sm:grid-cols-2">
              {stackCategories.map((category) => (
                <StaggerItem
                  key={category.title}
                  className="rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <h3 className="mb-3 font-semibold tracking-tight">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-secondary/50 px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>

          {/* Philosophy & Goals */}
          <FadeIn
            delay={0.4}
            className="mt-16 grid gap-12 md:grid-cols-2"
            aria-label="Philosophy and Goals"
          >
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-balance font-serif text-2xl font-bold tracking-tight">
                <BookOpen className="size-6 text-primary" />
                My Learning Philosophy
              </h2>
              <div className="flex flex-col gap-4 text-pretty leading-relaxed text-muted-foreground">
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
                <Target className="size-6 text-primary" />
                My Goal
              </h2>
              <div className="flex flex-col gap-4 text-pretty leading-relaxed text-muted-foreground">
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

          {/* Beyond Coding & Outro */}
          <ScaleUp
            delay={0.5}
            className="mt-16 rounded-2xl border border-border bg-card p-8 md:p-12 text-center"
            aria-label="Beyond Coding"
          >
            <Heart className="mx-auto mb-4 size-8 text-primary" />
            <h2 className="text-balance font-serif text-3xl font-bold tracking-tight">
              Beyond Coding
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
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

        <NewsletterCta />
      </main>
      <BlogFooter />
    </div>
  );
}
