import { useEffect } from 'react'

interface SeoOptions {
  title: string
  description: string
  canonical?: string
  keywords?: string
  ogType?: 'website' | 'article'
  robots?: string
  jsonLd?: object | object[]
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return el
}

function upsertLinkCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

const JSONLD_ID = 'page-jsonld'

const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

export function useSeo({ title, description, canonical, keywords, ogType = 'website', robots, jsonLd }: SeoOptions) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    upsertMeta('meta[name="description"]', 'name', 'description', description)
    upsertMeta('meta[name="robots"]', 'name', 'robots', robots ?? DEFAULT_ROBOTS)
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', ogType)
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)

    if (keywords) upsertMeta('meta[name="keywords"]', 'name', 'keywords', keywords)
    if (canonical) {
      upsertLinkCanonical(canonical)
      upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical)
    }

    let script: HTMLScriptElement | null = null
    if (jsonLd) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = JSONLD_ID
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      document.title = prevTitle
      if (script) script.remove()
    }
  }, [title, description, canonical, keywords, ogType, jsonLd])
}
