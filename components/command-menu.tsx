"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  ArrowUp,
  CornerDownLeft,
  FileText,
  FolderOpen,
  Home,
  Info,
  Laptop,
  Link2,
  Mail,
  Moon,
  Newspaper,
  Sun,
} from "lucide-react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export type SearchItem = {
  title: string
  href: string
  category?: string
  readingTime?: string
  excerpt?: string
  tags?: string[]
}

export type SearchCategory = {
  name: string
  href: string
  count: number
}

const pages = [
  { label: "Home", href: "/", icon: Home },
  { label: "Articles", href: "/articles", icon: Newspaper },
  { label: "Categories", href: "/categories", icon: FolderOpen },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Mail },
]

/**
 * Ranks a row against the query. Falls back to subsequence matching so a
 * partial like "dsgnsys" still finds "Building Design Systems That Last".
 */
function score(value: string, search: string, keywords?: string[]) {
  const needle = search.toLowerCase().trim()
  if (!needle) return 1

  const haystack = `${value} ${keywords?.join(" ") ?? ""}`.toLowerCase()
  if (haystack.includes(needle)) return 1

  let i = 0
  for (const char of haystack) {
    if (char === needle[i]) i += 1
    if (i === needle.length) return 0.5
  }
  return 0
}

export function CommandMenu({
  data,
  categories = [],
}: {
  data: SearchItem[]
  categories?: SearchCategory[]
}) {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()

  // next-themes only knows the resolved theme after mount.
  React.useEffect(() => setMounted(true), [])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    const handleOpenSearch = () => setOpen(true)
    window.addEventListener("open-search", handleOpenSearch)
    return () => window.removeEventListener("open-search", handleOpenSearch)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command loop className="rounded-xl" filter={score}>
        <CommandInput placeholder="Search articles, categories and pages…" />

        <CommandList>
          <CommandEmpty>
            <p className="text-sm text-foreground">No results found.</p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Try a topic, a tag, or part of an article title.
            </p>
          </CommandEmpty>

          {data.length > 0 && (
            <CommandGroup heading="Articles">
              {data.map((item) => (
                <CommandItem
                  key={item.href}
                  value={`article ${item.title} ${item.excerpt ?? ""}`}
                  keywords={[item.category ?? "", ...(item.tags ?? [])]}
                  onSelect={() => runCommand(() => router.push(item.href))}
                >
                  <FileText className="text-muted-foreground" />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-medium">{item.title}</span>
                    {item.readingTime && (
                      <span className="truncate text-xs text-muted-foreground">
                        {item.readingTime}
                      </span>
                    )}
                  </span>
                  {item.category && (
                    <span className="ml-2 shrink-0 rounded-sm bg-secondary px-2 py-0.5 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                      {item.category}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {categories.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Categories">
                {categories.map((category) => (
                  <CommandItem
                    key={category.href}
                    value={`category ${category.name}`}
                    onSelect={() => runCommand(() => router.push(category.href))}
                  >
                    <FolderOpen className="text-muted-foreground" />
                    <span className="flex-1 truncate font-medium">
                      {category.name}
                    </span>
                    <CommandShortcut>
                      {category.count} {category.count === 1 ? "post" : "posts"}
                    </CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />

          <CommandGroup heading="Go to">
            {pages.map((page) => {
              const Icon = page.icon
              return (
                <CommandItem
                  key={page.href}
                  value={`page ${page.label}`}
                  onSelect={() => runCommand(() => router.push(page.href))}
                >
                  <Icon className="text-muted-foreground" />
                  <span className="flex-1 truncate font-medium">
                    {page.label}
                  </span>
                  <CommandShortcut>Page</CommandShortcut>
                </CommandItem>
              )
            })}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Actions">
            <CommandItem
              value={`toggle theme ${isDark ? "light" : "dark"} mode`}
              onSelect={() =>
                runCommand(() => setTheme(isDark ? "light" : "dark"))
              }
            >
              {isDark ? (
                <Sun className="text-muted-foreground" />
              ) : (
                <Moon className="text-muted-foreground" />
              )}
              <span className="flex-1 truncate font-medium">
                {isDark ? "Switch to light mode" : "Switch to dark mode"}
              </span>
            </CommandItem>

            <CommandItem
              value="use system theme automatic"
              onSelect={() => runCommand(() => setTheme("system"))}
            >
              <Laptop className="text-muted-foreground" />
              <span className="flex-1 truncate font-medium">
                Use system theme
              </span>
            </CommandItem>

            <CommandItem
              value="copy link to this page url share"
              onSelect={() =>
                runCommand(() => {
                  navigator.clipboard?.writeText(window.location.href)
                })
              }
            >
              <Link2 className="text-muted-foreground" />
              <span className="flex-1 truncate font-medium">
                Copy link to this page
              </span>
            </CommandItem>

            <CommandItem
              value="scroll to top"
              onSelect={() =>
                runCommand(() => window.scrollTo({ top: 0, behavior: "smooth" }))
              }
            >
              <ArrowUp className="text-muted-foreground" />
              <span className="flex-1 truncate font-medium">Scroll to top</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>

        <CommandFooter>
          <span className="flex items-center gap-1.5">
            <CornerDownLeft className="size-3" aria-hidden="true" />
            to select
          </span>
          <span className="hidden sm:inline">↑↓ to navigate</span>
          <span>esc to close</span>
        </CommandFooter>
      </Command>
    </CommandDialog>
  )
}
