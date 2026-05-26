// Auto-generate public/sitemap.xml from blog.ts + projects.ts.
// Runs before build (vite copies public/* into dist/).

import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { blogPosts, SITE_URL } from '../src/blog'
import { projectsDetails } from '../src/projects'
import { content } from '../src/content'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

interface Entry {
  loc: string
  lastmod?: string
  changefreq: 'monthly' | 'weekly' | 'daily'
  priority: number
}

const today = new Date().toISOString().slice(0, 10)

const entries: Entry[] = [
  { loc: `${SITE_URL}/`, lastmod: today, changefreq: 'weekly', priority: 1.0 },
  { loc: `${SITE_URL}/blog`, lastmod: today, changefreq: 'weekly', priority: 0.8 },
]

// Blog posts (sorted by date desc)
const posts = [...blogPosts.ru].sort((a, b) => b.date.localeCompare(a.date))
for (const post of posts) {
  entries.push({
    loc: `${SITE_URL}/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: 'monthly',
    priority: 0.7,
  })
}

// Project case studies
const projectItems = content.ru.projects.items as Array<{ slug: string }>
for (const item of projectItems) {
  if (!projectsDetails.ru[item.slug]) continue
  entries.push({
    loc: `${SITE_URL}/projects/${item.slug}`,
    lastmod: today,
    changefreq: 'monthly',
    priority: 0.8,
  })
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  entries
    .map(
      (e) =>
        `  <url>\n` +
        `    <loc>${e.loc}</loc>\n` +
        (e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : '') +
        `    <changefreq>${e.changefreq}</changefreq>\n` +
        `    <priority>${e.priority.toFixed(1)}</priority>\n` +
        `  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`

writeFileSync(join(ROOT, 'public', 'sitemap.xml'), xml, 'utf8')
console.log(`✓ sitemap.xml: ${entries.length} URLs`)
