import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type Post = {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  image: string
  date: string
  readingTime: string
  author: {
    name: string
    avatar: string
  }
  featured?: boolean
  order?: number
}

const blogsDirectory = path.join(process.cwd(), 'content/blogs')

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(blogsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(blogsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(blogsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      const wordCount = matterResult.content.trim().split(/\s+/g).length
      const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200))
      const calculatedReadingTime = `${readingTimeMinutes} min read`

      return {
        slug,
        content: matterResult.content,
        title: matterResult.data.title,
        excerpt: matterResult.data.excerpt,
        category: matterResult.data.category,
        tags: matterResult.data.tags || [],
        image: matterResult.data.image,
        date: matterResult.data.date,
        readingTime: calculatedReadingTime,
        author: {
          name: matterResult.data.authorName,
          avatar: matterResult.data.authorAvatar,
        },
        featured: matterResult.data.featured || false,
        order: matterResult.data.order,
      } as Post
    })
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))

  return allPostsData
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts()
  return posts.find((post) => post.slug === slug)
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.featured)
}

export type CategoryStats = {
  name: string
  count: number
  featuredImage?: string
}

export async function getAllCategories(): Promise<CategoryStats[]> {
  const posts = await getAllPosts()
  
  const categoryMap = new Map<string, CategoryStats>()
  
  posts.forEach(post => {
    if (!post.category) return
    
    const existing = categoryMap.get(post.category)
    if (existing) {
      existing.count += 1
    } else {
      categoryMap.set(post.category, {
        name: post.category,
        count: 1,
        featuredImage: post.image
      })
    }
  })
  
  return Array.from(categoryMap.values()).sort((a, b) => a.name.localeCompare(b.name))
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort()
}
