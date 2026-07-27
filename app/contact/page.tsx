import type { Metadata } from "next"
import { Mail, MapPin, Clock } from "lucide-react"
import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { ContactForm } from "@/components/contact-form"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me. Questions, feedback, or partnerships welcome.",
}

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@yaswanth.dev",
    href: "mailto:hello@yaswanth.dev",
    hint: "We reply within 2 business days.",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Portland, Oregon",
    hint: "Remote-first, working worldwide.",
  },
  {
    icon: Clock,
    label: "Office hours",
    value: "Mon–Fri, 9am–5pm PT",
    hint: "Weekend replies may be slower.",
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <BlogHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          {/* Intro */}
          <FadeIn direction="down" className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">Contact us</p>
            <h1 className="mt-3 text-balance font-serif text-4xl font-bold tracking-tight md:text-5xl">
              Let&apos;s start a conversation
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Have a question, a story pitch, or just want to say hello? Fill out the form below or reach us through any
              of the channels listed — we read every message.
            </p>
          </FadeIn>

          {/* Content */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <FadeIn delay={0.1}>
              <ContactForm />
            </FadeIn>

            <StaggerContainer delayChildren={0.2} className="flex flex-col gap-4" aria-label="Contact details">
              {contactDetails.map((detail) => {
                const Icon = detail.icon
                return (
                  <StaggerItem key={detail.label} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="text-sm font-medium text-muted-foreground">{detail.label}</h2>
                      <p className="mt-1 font-medium">{detail.value}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{detail.hint}</p>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </div>
        </div>
      </main>
      <BlogFooter />
    </div>
  )
}
