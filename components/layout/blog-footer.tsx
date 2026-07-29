import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { ShareButton } from "@/components/shared/share-button";
import { getAllCategories } from "@/lib/posts";
import { socialLinks } from "@/lib/social";

const iconButtonClass =
  "flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";

export async function BlogFooter() {
  // Topics come from the posts that actually exist, so this column can never
  // drift into linking at empty category pages.
  const categories = (await getAllCategories()).slice(0, 4);

  const footerLinks: {
    heading: string;
    links: { label: string; href: string }[];
  }[] = [
    {
      heading: "Explore",
      links: [
        { label: "Home", href: "/" },
        { label: "Articles", href: "/articles" },
        { label: "Projects", href: "/projects" },
        { label: "Categories", href: "/categories" },
      ],
    },
    {
      heading: "Topics",
      links: categories.map((category) => ({
        label: category.name,
        href: `/categories/${encodeURIComponent(category.name.toLowerCase())}`,
      })),
    },
    {
      heading: "Elsewhere",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Newsletter", href: "/newsletter" },
        { label: "RSS feed", href: "/rss.xml" },
      ],
    },
  ].filter((group) => group.links.length > 0);

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="flex flex-col items-center md:items-start">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="Yaswanth's blog home"
            >
              <span className="font-serif text-lg font-semibold tracking-tight">
                Yaswanth Gudivada
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Software engineering, system design, and continuous learning.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              {socialLinks.map((profile) => (
                <a
                  key={profile.label}
                  href={profile.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  aria-label={`${profile.label} profile`}
                  className={iconButtonClass}
                >
                  <Icon
                    icon={profile.icon}
                    className="size-4"
                    aria-hidden="true"
                  />
                </a>
              ))}
              <ShareButton className={iconButtonClass} />
              <Link
                href="/newsletter"
                aria-label="Subscribe to the newsletter"
                className={iconButtonClass}
              >
                <Icon icon="lucide:mail" className="size-4" aria-hidden="true" />
              </Link>
              <a
                href="/rss.xml"
                aria-label="RSS feed"
                className={iconButtonClass}
              >
                <Icon icon="lucide:rss" className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {footerLinks.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h3 className="text-sm font-semibold">{group.heading}</h3>
              <ul className="mt-4 flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border py-8 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} Yaswanth Gudivada. All rights reserved.
          </p>
          <div className="flex gap-4"></div>
        </div>
      </div>
    </footer>
  );
}
