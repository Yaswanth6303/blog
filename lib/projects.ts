import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortWithOrderAndDate } from './utils'

export type ProjectStatus = 'shipped' | 'in-progress' | 'archived'

export type Project = {
  slug: string
  title: string
  summary: string
  content: string
  /** Technologies, rendered as pills on the card and the detail page. */
  stack: string[]
  /** Public source URL. Omit for closed-source work. */
  repo?: string
  /** Live deployment URL. Omit if there is nothing to show. */
  demo?: string
  image: string
  date: string
  /** Human-readable range, e.g. "2025 — Present". Free text, not parsed. */
  period?: string
  role?: string
  status: ProjectStatus
  featured?: boolean
  order?: number
}

const projectsDirectory = path.join(process.cwd(), 'content/projects')

const VALID_STATUSES: ProjectStatus[] = ['shipped', 'in-progress', 'archived']

export async function getAllProjects(): Promise<Project[]> {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(projectsDirectory)

  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    // A leading underscore marks a draft or template, so `_template.mdx` can
    // live alongside real entries without ever being published.
    .filter((fileName) => !fileName.startsWith('_'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(projectsDirectory, fileName)
      const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))

      const status: ProjectStatus = VALID_STATUSES.includes(data.status)
        ? data.status
        : 'shipped'

      return {
        slug,
        content,
        title: data.title,
        summary: data.summary,
        stack: data.stack || [],
        repo: data.repo || undefined,
        demo: data.demo || undefined,
        image: data.image,
        date: data.date,
        period: data.period || undefined,
        role: data.role || undefined,
        status,
        featured: data.featured || false,
        order: data.order,
      } as Project
    })
    .sort(sortWithOrderAndDate)
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const projects = await getAllProjects()
  return projects.find((project) => project.slug === slug)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects()
  return projects.filter((project) => project.featured)
}

export async function getAllStack(): Promise<string[]> {
  const projects = await getAllProjects()
  return Array.from(new Set(projects.flatMap((project) => project.stack))).sort()
}
