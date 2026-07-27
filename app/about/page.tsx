import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/shared/motion";

const menuItems = [
  {
    id: "whoami",
    title: "whoami",
    description:
      "This section aims to explain a little more about who I am as a person.",
    href: "/about/whoami",
  },
  {
    id: "skills",
    title: "What I Build With",
    description: "Technologies, programming languages, and tools I use.",
    href: "/about/skills",
  },
  {
    id: "experience",
    title: "Experience & Education",
    description:
      "This page is dedicated to the positions of responsibility and academics over the years.",
    href: "/about/experience",
  },
  {
    id: "philosophy",
    title: "Philosophy & Interests",
    description:
      "My learning philosophy, goals, and what I'm passionate about.",
    href: "/about/philosophy",
  },
  {
    id: "resume",
    title: "Resume",
    description: "This section will have my resume.",
    href: "/about/resume",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <FadeIn direction="down" className="mx-auto max-w-4xl">
        <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
          About Me
        </h1>
        <p className="mb-10 text-muted-foreground">A little bit about me.</p>

        <div className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex w-full items-center justify-between rounded-xl border border-border bg-card p-6 text-left transition-all hover:border-primary/50 hover:shadow-sm"
            >
              <div>
                <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
