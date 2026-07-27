const icons: Record<string, string> = {
  nextjs: "devicon-nextjs-plain",
  react: "devicon-react-original",
  typescript: "devicon-typescript-plain",
  javascript: "devicon-javascript-plain",
  tailwindcss: "devicon-tailwindcss-plain",
  tailwind: "devicon-tailwindcss-plain",
  html: "devicon-html5-plain",
  html5: "devicon-html5-plain",
  css: "devicon-css3-plain",
  framermotion: "devicon-framermotion-original",
  framer: "devicon-framermotion-original",
  mdx: "devicon-markdown-original",
  shadcnui: "",
  zod: "",
  trpc: "",
  graphql: "devicon-graphql-plain",

  nodejs: "devicon-nodejs-plain",
  node: "devicon-nodejs-plain",
  bun: "devicon-bun-plain",
  express: "devicon-express-original",
  expressjs: "devicon-express-original",
  go: "devicon-go-original-wordmark",
  golang: "devicon-go-original-wordmark",
  rust: "devicon-rust-plain",
  python: "devicon-python-plain",
  java: "devicon-java-plain",
  django: "devicon-django-plain",
  flask: "devicon-flask-original",
  fastapi: "devicon-fastapi-plain",
  spring: "devicon-spring-plain",
  springboot: "devicon-spring-plain",

  postgresql: "devicon-postgresql-plain",
  postgres: "devicon-postgresql-plain",
  prisma: "devicon-prisma-original",
  mongodb: "devicon-mongodb-plain",
  mongo: "devicon-mongodb-plain",
  redis: "devicon-redis-plain",
  supabase: "devicon-supabase-plain",
  firebase: "devicon-firebase-plain",

  docker: "devicon-docker-plain",
  kubernetes: "devicon-kubernetes-plain",
  k8s: "devicon-kubernetes-plain",
  linux: "devicon-linux-plain",
  git: "devicon-git-plain",
  github: "devicon-github-original",
  githubactions: "devicon-githubactions-plain",
  cicd: "devicon-githubactions-plain",
  vercel: "devicon-vercel-original",
  googlecloud: "devicon-googlecloud-plain",
  gcp: "devicon-googlecloud-plain",
  resend: "",
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
    <i
      className={`${icon} shrink-0 ${className}`}
      aria-hidden="true"
    />
  )
}
