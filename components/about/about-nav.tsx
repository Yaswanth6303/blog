"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";

const aboutPages = [
  {
    id: "whoami",
    title: "Who Am I",
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

export function AboutNav() {
  const pathname = usePathname();

  // Don't show on the main /about page
  if (pathname === "/about") {
    return null;
  }

  const currentIndex = aboutPages.findIndex((page) => page.href === pathname);

  if (currentIndex === -1) {
    return null;
  }

  const prevPage =
    currentIndex > 0
      ? aboutPages[currentIndex - 1]
      : aboutPages[aboutPages.length - 1];
  const nextPage =
    currentIndex < aboutPages.length - 1
      ? aboutPages[currentIndex + 1]
      : aboutPages[0];

  return (
    <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6 md:pb-16">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {prevPage ? (
            <Link
              href={prevPage.href}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md"
            >
              <div className="flex items-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <Icon icon="lucide:arrow-left" className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
                Previous
              </div>
              <h4 className="font-serif text-xl font-medium leading-snug tracking-tight text-foreground line-clamp-2">
                {prevPage.title}
              </h4>
              <p className="mt-auto text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {prevPage.description}
              </p>
            </Link>
          ) : (
            <div /> /* Empty placeholder for alignment */
          )}

          {nextPage && (
            <Link
              href={nextPage.href}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 text-right transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md"
            >
              <div className="flex items-center justify-end text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Next
                <Icon icon="lucide:arrow-right" className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </div>
              <h4 className="font-serif text-xl font-medium leading-snug tracking-tight text-foreground line-clamp-2">
                {nextPage.title}
              </h4>
              <p className="mt-auto text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {nextPage.description}
              </p>
            </Link>
          )}
        </div>
    </div>
  );
}
