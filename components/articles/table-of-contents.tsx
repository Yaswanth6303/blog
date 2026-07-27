"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export type Heading = {
  id: string
  text: string
  level: number
}

/** Sticky header height we scroll headings out from under. */
const HEADER_OFFSET = 80

/** Horizontal position of the indicator line for a heading level. */
function lineOffset(level: number) {
  return Math.max(0, level - 2) * 10 + 1
}

type Segment = { x: number; top: number; bottom: number }

type Geometry = {
  path: string
  width: number
  height: number
  segments: Record<string, Segment>
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const listRef = useRef<HTMLUListElement>(null)
  const [geometry, setGeometry] = useState<Geometry | null>(null)
  const [activeIds, setActiveIds] = useState<string[]>([])

  /* ---------------------------------------------------------------- */
  /* Draw the line that traces every entry, curving on level changes   */
  /* ---------------------------------------------------------------- */

  const measure = useCallback(() => {
    const list = listRef.current
    if (!list || list.clientHeight === 0) return

    const segments: Record<string, Segment> = {}
    const commands: string[] = []
    let width = 0
    let height = 0
    let previous: Segment | null = null

    for (const heading of headings) {
      const link = list.querySelector<HTMLElement>(
        `[data-toc-id="${heading.id}"]`
      )
      if (!link) continue

      const styles = getComputedStyle(link)
      const segment: Segment = {
        x: lineOffset(heading.level),
        top: link.offsetTop + parseFloat(styles.paddingTop),
        bottom:
          link.offsetTop + link.clientHeight - parseFloat(styles.paddingBottom),
      }

      if (!previous) {
        commands.push(`M${segment.x} ${segment.top}`)
      } else if (previous.x === segment.x) {
        commands.push(`L${segment.x} ${segment.top}`)
      } else {
        // S-curve across the gap when the indentation level changes
        const bend = (segment.top - previous.bottom) / 2
        commands.push(
          `C${previous.x} ${previous.bottom + bend} ${segment.x} ${
            segment.top - bend
          } ${segment.x} ${segment.top}`
        )
      }
      commands.push(`L${segment.x} ${segment.bottom}`)

      segments[heading.id] = segment
      previous = segment
      width = Math.max(width, segment.x)
      height = Math.max(height, segment.bottom)
    }

    setGeometry({
      path: commands.join(" "),
      width: width + 4,
      height: height + 4,
      segments,
    })
  }, [headings])

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [measure])

  /* ---------------------------------------------------------------- */
  /* Track which headings are currently in the reading band            */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    // Last heading scrolled past — used when the band holds nothing.
    const closestAbove = () => {
      let candidate: string | null = null
      for (const element of elements) {
        if (element.getBoundingClientRect().top - HEADER_OFFSET > 0) break
        candidate = element.id
      }
      return candidate ?? elements[0].id
    }

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }

        setActiveIds(
          visible.size > 0
            ? headings.map((h) => h.id).filter((id) => visible.has(id))
            : [closestAbove()]
        )
      },
      { rootMargin: `-${HEADER_OFFSET}px 0px -72% 0px` }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  /* The highlighted stretch of the line: first → last active entry. */
  const activeSegments = activeIds
    .map((id) => geometry?.segments[id])
    .filter((segment): segment is Segment => Boolean(segment))

  const thumb = activeSegments.length
    ? {
        top: activeSegments[0].top,
        bottom: activeSegments[activeSegments.length - 1].bottom,
        x: activeSegments[activeSegments.length - 1].x,
      }
    : null

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-2 font-medium text-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
          aria-hidden="true"
        >
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="14" y1="12" y2="12" />
          <line x1="4" x2="18" y1="18" y2="18" />
        </svg>
        On this page
      </div>

      <div className="relative">
        {geometry && (
          <svg
            width={geometry.width}
            height={geometry.height}
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            className="pointer-events-none absolute left-0 top-0"
            aria-hidden="true"
          >
            <path
              d={geometry.path}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-border"
            />
            <path
              d={geometry.path}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-primary transition-[clip-path] duration-300 ease-out"
              style={{
                clipPath: thumb
                  ? `inset(${thumb.top}px 0 ${
                      geometry.height - thumb.bottom
                    }px 0)`
                  : "inset(50% 0 50% 0)",
              }}
            />
            <circle
              r="3"
              className="fill-primary transition-[transform,opacity] duration-300 ease-out"
              style={{
                transform: thumb
                  ? `translate(${thumb.x}px, ${thumb.bottom}px)`
                  : undefined,
                opacity: thumb ? 1 : 0,
              }}
            />
          </svg>
        )}

        <ul className="relative flex flex-col text-sm" ref={listRef}>
          {headings.map((heading) => {
            const isActive = activeIds.includes(heading.id)

            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  data-toc-id={heading.id}
                  className={cn(
                    "block py-2 transition-colors",
                    heading.level >= 3 ? "pl-7" : "pl-4",
                    isActive
                      ? "font-medium text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {heading.text}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
