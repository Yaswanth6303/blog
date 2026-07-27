import Link from "next/link"
import { Rss, Mail } from "lucide-react"
import { ShareButton } from "@/components/share-button"

const iconButtonClass =
  "flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"

const footerLinks = [
  {
    heading: "Explore",
    links: ["Home", "Articles", "Categories", "Archive"],
  },
  {
    heading: "Topics",
    links: ["Software Engineering", "System Design", "Cloud", "AI"],
  },
  {
    heading: "Company",
    links: ["About", "Contact", "Privacy", "Terms"],
  },
]

export function BlogFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2" aria-label="Yaswanth's blog home">
              <span className="font-serif text-lg font-semibold tracking-tight">Yaswanth Gudivada</span>
            </Link>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Software engineering, system design, and continuous learning — published every other week.
            </p>
            <div className="mt-4 flex gap-2">
              <ShareButton className={iconButtonClass} />
              <Link
                href="/#newsletter"
                aria-label="Subscribe to the newsletter"
                className={iconButtonClass}
              >
                <Mail className="size-4" aria-hidden="true" />
              </Link>
              <a
                href="/rss.xml"
                aria-label="RSS feed"
                className={iconButtonClass}
              >
                <Rss className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {footerLinks.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h3 className="text-sm font-semibold">{group.heading}</h3>
              <ul className="mt-4 flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border py-8 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Yaswanth Gudivada. All rights reserved.</p>
          <div className="flex gap-4"></div>
        </div>
      </div>
    </footer>
  )
}
