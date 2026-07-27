"use client"

import { useEffect, useState } from "react"
import { Check, Share2 } from "lucide-react"

export function ShareButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const handleShare = async () => {
    const url = window.location.href
    const title = document.title

    // Native share sheet on mobile / supported desktops, clipboard everywhere else.
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch (error) {
        // User dismissed the sheet — nothing to do.
        if (error instanceof DOMException && error.name === "AbortError") return
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      // Clipboard blocked (insecure origin or denied permission).
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={copied ? "Link copied" : "Share this page"}
      className={className}
    >
      {copied ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Share2 className="size-4" aria-hidden="true" />
      )}
    </button>
  )
}
