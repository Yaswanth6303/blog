import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/shared/motion";

export const metadata = {
  title: "Who Am I | About",
  description: "A little more about who I am as a person.",
};

export default function WhoAmIPage() {
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
          <FadeIn direction="down" className="max-w-2xl">
            <h1 className="mt-3 text-balance font-serif text-4xl font-bold tracking-tight md:text-5xl">
              Software engineer, lifelong learner.
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground">
              Hi, I&apos;m Yaswanth Gudivada — currently pursuing my Master of
              Computer Applications (MCA) at RV College of Engineering (RVCE),
              Bengaluru. I enjoy building software that solves real-world
              problems and exploring technologies that shape the future.
            </p>
          </FadeIn>

          <FadeIn
            delay={0.1}
            className="grid items-center gap-8 md:grid-cols-[240px_1fr]"
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
              <div className="mt-4 flex flex-col gap-4 text-pretty leading-relaxed text-foreground">
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
        </div>
      </FadeIn>
    </div>
  );
}
