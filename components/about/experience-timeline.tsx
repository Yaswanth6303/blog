import { Briefcase, GraduationCap } from "lucide-react";
import { type ExperienceEntry } from "@/lib/experience";
import { StaggerContainer, StaggerItem } from "@/components/shared/motion";

const icons: Record<ExperienceEntry["kind"], typeof Briefcase> = {
  work: Briefcase,
  education: GraduationCap,
};

export function ExperienceTimeline({ items }: { items: ExperienceEntry[] }) {
  if (items.length === 0) return null;

  return (
    // StaggerItem renders a motion.div, so real <ol>/<li> tags would nest a div
    // directly inside a list. List roles keep the semantics without the
    // invalid markup.
    <StaggerContainer role="list" className="relative mt-8">
      {items.map((entry, index) => {
        const Icon = icons[entry.kind];
        const isLast = index === items.length - 1;

        return (
          <StaggerItem
            key={`${entry.organization}-${entry.period}`}
            role="listitem"
            className="relative flex gap-6 pb-10 last:pb-0"
          >
            {/* Rail is drawn per-entry so it stops at the last marker rather
                than trailing past it. */}
            {!isLast && (
              <span
                className="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-px bg-border"
                aria-hidden="true"
              />
            )}

            <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-foreground">
              <Icon className="size-4.5" aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1 pt-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-serif text-xl font-semibold tracking-tight">
                    {entry.role}
                  </h3>
                  {"cgpa" in entry && entry.cgpa && (
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      CGPA: {entry.cgpa}
                    </span>
                  )}
                </div>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {entry.period}
                </span>
              </div>

              <p className="mt-1 text-sm font-medium text-foreground">
                {entry.organization}
                {entry.location && (
                  <span className="font-normal text-muted-foreground">
                    {" · "}
                    {entry.location}
                  </span>
                )}
              </p>

              <p className="mt-3 text-pretty leading-relaxed text-foreground">
                {entry.description}
              </p>

              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="mt-3 ml-5 list-disc space-y-1.5 text-pretty leading-relaxed text-foreground marker:text-foreground/50">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}

              {entry.stack && entry.stack.length > 0 && (
                <ul
                  className="mt-4 flex flex-wrap gap-2"
                  aria-label="Technologies used"
                >
                  {entry.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-secondary/50 px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
