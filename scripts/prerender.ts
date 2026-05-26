// Post-build SEO prerender for SPA routes.
// For every blog post and /blog index, creates a per-route index.html
// with route-specific <title>, meta description, canonical, OG, and JSON-LD,
// so crawlers see the right metadata without executing JS.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { blogPosts, SITE_URL } from '../src/blog'
import { projectsDetails } from '../src/projects'
import { content } from '../src/content'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const TEMPLATE = readFileSync(join(DIST, 'index.html'), 'utf8')

function escAttr(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}
function escText(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

interface Replacements {
  title: string
  description: string
  canonical: string
  ogType: 'website' | 'article'
  keywords?: string
  jsonLd?: object | object[]
  robots?: string
}

function buildHtml(r: Replacements): string {
  let html = TEMPLATE

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escText(r.title)}</title>`)

  // <meta name="description">
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${escAttr(r.description)}" />`
  )

  // robots (override default if provided)
  if (r.robots) {
    html = html.replace(
      /<meta name="robots"[^>]*>/,
      `<meta name="robots" content="${escAttr(r.robots)}" />`
    )
  }

  // keywords
  if (r.keywords) {
    html = html.replace(
      /<meta name="keywords"[^>]*>/,
      `<meta name="keywords" content="${escAttr(r.keywords)}" />`
    )
  }

  // canonical
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${escAttr(r.canonical)}" />`
  )

  // og:url
  html = html.replace(
    /<meta property="og:url"[^>]*>/,
    `<meta property="og:url" content="${escAttr(r.canonical)}" />`
  )
  // og:type
  html = html.replace(
    /<meta property="og:type"[^>]*>/,
    `<meta property="og:type" content="${r.ogType}" />`
  )
  // og:title / og:description
  html = html.replace(
    /<meta property="og:title"[^>]*>/,
    `<meta property="og:title" content="${escAttr(r.title)}" />`
  )
  html = html.replace(
    /<meta property="og:description"[^>]*>/,
    `<meta property="og:description" content="${escAttr(r.description)}" />`
  )
  // twitter
  html = html.replace(
    /<meta name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${escAttr(r.title)}" />`
  )
  html = html.replace(
    /<meta name="twitter:description"[^>]*>/,
    `<meta name="twitter:description" content="${escAttr(r.description)}" />`
  )

  // Append JSON-LD as additional <script> in <head>, just before </head>
  if (r.jsonLd) {
    const json = JSON.stringify(r.jsonLd)
    html = html.replace(
      '</head>',
      `<script type="application/ld+json">${json}</script>\n  </head>`
    )
  }

  return html
}

function writeRoute(routePath: string, html: string) {
  // routePath like "blog" or "blog/slug" (no leading slash)
  const dir = join(DIST, routePath)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html, 'utf8')
}

let count = 0

// ── /blog index ──────────────────────────────
{
  const posts = blogPosts.ru
  const title = 'Блог о разработке сайтов и ботов | Дмитрий Ботян'
  const description =
    'Статьи о ценах, технологиях и продвижении сайтов в 2026 году. Опыт из реальных проектов: лендинги, магазины, Telegram-боты, интеграции, SEO и Core Web Vitals.'
  const canonical = `${SITE_URL}/blog`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Блог о разработке сайтов и ботов',
    url: canonical,
    inLanguage: 'ru-RU',
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${SITE_URL}/blog/${p.slug}`,
      author: { '@type': 'Person', name: 'Дмитрий Ботян' },
    })),
  }
  writeRoute(
    'blog',
    buildHtml({
      title,
      description,
      canonical,
      ogType: 'website',
      keywords:
        'блог о разработке, статьи про сайты, цены на сайты, веб-разработка статьи',
      jsonLd,
    })
  )
  count++
}

// ── /blog/<slug> ─────────────────────────────
for (const post of blogPosts.ru) {
  const canonical = `${SITE_URL}/blog/${post.slug}`
  const title = `${post.metaTitle} | Дмитрий Ботян`
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: 'ru-RU',
      author: { '@type': 'Person', name: 'Дмитрий Ботян', url: SITE_URL },
      publisher: { '@type': 'Person', name: 'Дмитрий Ботян', url: SITE_URL },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      keywords: post.keywords,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Блог', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
  writeRoute(
    `blog/${post.slug}`,
    buildHtml({
      title,
      description: post.description,
      canonical,
      ogType: 'article',
      keywords: post.keywords,
      jsonLd,
    })
  )
  count++
}

// ── /projects/<slug> ─────────────────────────────
const projectItems = content.ru.projects.items as Array<{
  slug: string
  title: string
}>

for (const item of projectItems) {
  const detail = projectsDetails.ru[item.slug]
  if (!detail) continue
  const canonical = `${SITE_URL}/projects/${detail.slug}`
  const title = `${detail.metaTitle} | Дмитрий Ботян`
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: detail.h1,
      headline: detail.h1,
      description: detail.metaDescription,
      url: canonical,
      inLanguage: 'ru-RU',
      author: { '@type': 'Person', name: 'Дмитрий Ботян', url: SITE_URL },
      creator: { '@type': 'Person', name: 'Дмитрий Ботян', url: SITE_URL },
      keywords: detail.keywords,
      about: detail.industry,
      dateCreated: detail.year,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Проекты', item: `${SITE_URL}/#projects` },
        { '@type': 'ListItem', position: 3, name: detail.h1, item: canonical },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: detail.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
  writeRoute(
    `projects/${detail.slug}`,
    buildHtml({
      title,
      description: detail.metaDescription,
      canonical,
      ogType: 'article',
      keywords: detail.keywords,
      jsonLd,
    })
  )
  count++
}

// ── 404 page (real status returned by nginx via try_files chain) ──
if (!existsSync(join(DIST, '404.html'))) {
  writeFileSync(
    join(DIST, '404.html'),
    buildHtml({
      title: 'Страница не найдена - Дмитрий Ботян',
      description: 'Запрашиваемая страница не существует.',
      canonical: `${SITE_URL}/404`,
      ogType: 'website',
      robots: 'noindex, follow',
    }),
    'utf8'
  )
  count++
}

console.log(`✓ prerendered ${count} routes`)
