import { Icon } from "@/components/ui/icon"

/**
 * Tech name -> Iconify icon. `simple-icons` is the default set because its
 * logos are monochrome and inherit `currentColor`, which is how these icons
 * were rendered before. Java has no simple-icons entry, so it falls back to
 * the (also monochrome) devicon-plain set.
 */
const icons: Record<string, string> = {
  nextjs: "simple-icons:nextdotjs",
  react: "simple-icons:react",
  typescript: "simple-icons:typescript",
  javascript: "simple-icons:javascript",
  tailwindcss: "simple-icons:tailwindcss",
  tailwind: "simple-icons:tailwindcss",
  html: "simple-icons:html5",
  html5: "simple-icons:html5",
  css: "simple-icons:css",
  framermotion: "simple-icons:framer",
  framer: "simple-icons:framer",
  mdx: "simple-icons:markdown",
  shadcnui: "simple-icons:shadcnui",
  zod: "simple-icons:zod",
  trpc: "simple-icons:trpc",
  graphql: "simple-icons:graphql",
  nodejs: "simple-icons:nodedotjs",
  node: "simple-icons:nodedotjs",
  bun: "simple-icons:bun",
  express: "simple-icons:express",
  expressjs: "simple-icons:express",
  go: "simple-icons:go",
  golang: "simple-icons:go",
  rust: "simple-icons:rust",
  python: "simple-icons:python",
  java: "devicon-plain:java",
  django: "simple-icons:django",
  flask: "simple-icons:flask",
  fastapi: "simple-icons:fastapi",
  spring: "simple-icons:springboot",
  springboot: "simple-icons:springboot",
  postgresql: "simple-icons:postgresql",
  postgres: "simple-icons:postgresql",
  prisma: "simple-icons:prisma",
  mongodb: "simple-icons:mongodb",
  mongo: "simple-icons:mongodb",
  redis: "simple-icons:redis",
  supabase: "simple-icons:supabase",
  firebase: "simple-icons:firebase",
  docker: "simple-icons:docker",
  kubernetes: "simple-icons:kubernetes",
  k8s: "simple-icons:kubernetes",
  linux: "simple-icons:linux",
  git: "simple-icons:git",
  github: "simple-icons:github",
  githubactions: "simple-icons:githubactions",
  cicd: "simple-icons:githubactions",
  vercel: "simple-icons:vercel",
  googlecloud: "simple-icons:googlecloud",
  gcp: "simple-icons:googlecloud",
  resend: "simple-icons:resend",
}

function normalize(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "")
}

export function TechIcon({
  name,
  className = "text-base",
}: {
  name: string
  className?: string
}) {
  const icon = icons[normalize(name)]
  if (!icon) return null

  return (
    <Icon
      icon={icon}
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    />
  )
}
