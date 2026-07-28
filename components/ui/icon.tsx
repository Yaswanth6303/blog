"use client"

import { Icon as IconifyIcon, type IconProps } from "@iconify/react/offline"

// Side-effect import: registers the generated offline icon data before any
// <Icon /> renders, so icons are present in the SSR markup.
import "@/lib/icon-bundle"

export type { IconProps }

/**
 * Renders an icon from the bundled Iconify collections, e.g.
 * `<Icon icon="lucide:arrow-right" className="size-4" />`.
 *
 * Icons are sized by CSS (Tailwind `size-*`), matching how the rest of the UI
 * sizes SVGs. After using a new `prefix:name`, run `bun run icons`.
 */
export function Icon(props: IconProps) {
  return <IconifyIcon {...props} />
}
