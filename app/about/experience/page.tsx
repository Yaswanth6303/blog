import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/shared/motion";
import { ExperienceTimeline } from "@/components/about/experience-timeline";
import { workExperience } from "@/lib/experience";
import { educationExperience } from "@/lib/education";

export const metadata = {
  title: "Experience & Education | About",
  description:
    "My academic background and professional journey over the years.",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <FadeIn>
        <Link
          href="/about"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Menu
        </Link>

        <div className="flex flex-col gap-16">
          <FadeIn direction="down" aria-labelledby="experience-heading">
            <h1
              id="experience-heading"
              className="mb-8 text-balance font-serif text-3xl font-bold tracking-tight md:text-4xl"
            >
              Experience
            </h1>
            <ExperienceTimeline items={workExperience} />
          </FadeIn>

          <FadeIn delay={0.1} aria-labelledby="education-heading">
            <h2
              id="education-heading"
              className="mb-8 text-balance font-serif text-3xl font-bold tracking-tight md:text-4xl"
            >
              Education
            </h2>
            <ExperienceTimeline items={educationExperience} />
          </FadeIn>
        </div>
      </FadeIn>
    </div>
  );
}
