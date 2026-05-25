import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Clock, Calculator, Send } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/sections/Footer'
import { Button } from '@/components/retroui/Button'
import { cn } from '@/lib/utils'
import { useApp } from '@/contexts/AppContext'
import { useSeo } from '@/hooks/useSeo'
import { getPost, getPosts, SITE_URL, type BlogPost as BlogPostType } from '@/blog'
import { NotFound } from './NotFound'

function headingId(i: number) {
  return `section-${i}`
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { lang } = useApp()
  const post = slug ? getPost(lang, slug) : undefined

  useEffect(() => { window.scrollTo({ top: 0 }) }, [slug])

  if (!post) return <NotFound />

  return <PostView key={post.slug} post={post} />
}

function PostView({ post }: { post: BlogPostType }) {
  const { t, lang } = useApp()
  const { blog } = t
  const [activeId, setActiveId] = useState('')

  const canonical = `${SITE_URL}/blog/${post.slug}`
  const authorName = lang === 'ru' ? 'Дмитрий Ботян' : 'Dmitry Botyan'
  const headings = post.body
    .map((b, i) => (b.type === 'h2' ? { text: b.text, id: headingId(i) } : null))
    .filter((x): x is { text: string; id: string } => x !== null)
  const related = getPosts(lang).filter((p) => p.slug !== post.slug).slice(0, 2)

  useEffect(() => {
    const ids = post.body
      .map((b, i) => (b.type === 'h2' ? headingId(i) : null))
      .filter((x): x is string => x !== null)
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -65% 0px', threshold: 0 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [post])

  useSeo({
    title: `${post.metaTitle} | ${authorName}`,
    description: post.description,
    canonical,
    keywords: post.keywords,
    ogType: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: lang === 'ru' ? 'ru-RU' : 'en-US',
        author: { '@type': 'Person', name: authorName, url: SITE_URL },
        publisher: { '@type': 'Person', name: authorName, url: SITE_URL },
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        keywords: post.keywords,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: blog.homeLabel, item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: blog.heading, item: `${SITE_URL}/blog` },
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
    ],
  })

  return (
    <div className="relative min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-24 md:pt-28">
        <div className="px-6 sm:px-8 md:px-16 lg:px-24 pb-16 md:pb-24">

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-8 flex items-center gap-2 font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">{blog.homeLabel}</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-foreground transition-colors">{blog.heading}</Link>
          </nav>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_240px] gap-10 xl:gap-16 max-w-5xl">

            <article className="min-w-0">
              {/* Header */}
              <header className="mb-10 pb-8 border-b-2 border-border">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-head text-[9px] font-bold tracking-wider uppercase border-2 border-border px-2 py-0.5 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="font-head text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.05] mb-5">
                  {post.title}
                </h1>

                <div className="flex items-center gap-3 font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <time dateTime={post.date}>{post.dateLabel}</time>
                  <span className="w-1 h-1 bg-muted-foreground" />
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>
              </header>

              {/* Body */}
              <div className="space-y-5">
                {post.body.map((block, i) => {
                  if (block.type === 'h2') {
                    return (
                      <h2
                        key={i}
                        id={headingId(i)}
                        className="font-head text-xl md:text-2xl font-black tracking-tight pt-6 scroll-mt-24"
                      >
                        {block.text}
                      </h2>
                    )
                  }
                  if (block.type === 'list') {
                    return (
                      <ul key={i} className="space-y-2.5 pl-1">
                        {block.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 font-sans text-[15px] md:text-base leading-relaxed text-foreground/90">
                            <span className="shrink-0 w-1.5 h-1.5 mt-2.5 bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  return (
                    <p key={i} className="font-sans text-[15px] md:text-base leading-relaxed text-foreground/90">
                      {block.text}
                    </p>
                  )
                })}
              </div>

              {/* FAQ */}
              {post.faq.length > 0 && (
                <section className="mt-14 pt-10 border-t-2 border-border" aria-labelledby="post-faq">
                  <h2 id="post-faq" className="font-head text-xl md:text-2xl font-black tracking-tight mb-6">
                    {blog.faqLabel}
                  </h2>
                  <div className="space-y-3">
                    {post.faq.map((f, i) => (
                      <details
                        key={i}
                        className="group border-2 border-border bg-card shadow-[3px_3px_0px_0px_var(--border)] open:shadow-[1px_1px_0px_0px_var(--border)] transition-shadow"
                      >
                        <summary className="cursor-pointer list-none p-4 flex items-start justify-between gap-3 font-head text-sm font-bold">
                          <span>{f.q}</span>
                          <span className="shrink-0 font-head text-lg leading-none text-accent group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p className="px-4 pb-4 font-sans text-sm text-muted-foreground leading-relaxed">
                          {f.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* CTA */}
              <section className="mt-14 border-2 border-border bg-foreground text-background shadow-[6px_6px_0px_0px_var(--accent)] p-6 md:p-8">
                <h2 className="font-head text-xl md:text-2xl font-black tracking-tight mb-2">
                  {blog.ctaTitle}
                </h2>
                <p className="font-sans text-sm leading-relaxed mb-6 opacity-80 max-w-md">
                  {blog.ctaText}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="md"
                    className="bg-accent text-accent-foreground border-accent shadow-[3px_3px_0px_0px_#FFFFFF] hover:shadow-[1px_1px_0px_0px_#FFFFFF]"
                    onClick={() => { window.location.href = '/#calculator' }}
                  >
                    <Calculator size={15} />
                    {blog.ctaCalc}
                  </Button>
                  <a
                    href="https://t.me/unemployment_78"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 font-head font-medium bg-background text-foreground border-2 border-border px-4 py-2 shadow-[3px_3px_0px_0px_#FFFFFF] hover:shadow-[1px_1px_0px_0px_#FFFFFF] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    <Send size={15} />
                    {blog.ctaContact}
                  </a>
                </div>
              </section>

              {/* Back */}
              <div className="mt-12">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={12} />
                  {blog.backLabel}
                </Link>
              </div>
            </article>

            {/* Sidebar: TOC + related */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {headings.length > 0 && (
                  <nav aria-label={blog.tocLabel}>
                    <p className="font-head text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">
                      {blog.tocLabel}
                    </p>
                    <ul className="space-y-1 border-l-2 border-border">
                      {headings.map((h) => {
                        const active = activeId === h.id
                        return (
                          <li key={h.id} className="-ml-0.5">
                            <a
                              href={`#${h.id}`}
                              aria-current={active ? 'true' : undefined}
                              className={cn(
                                'block border-l-2 pl-4 py-1 font-sans text-[13px] leading-snug transition-colors',
                                active
                                  ? 'border-accent text-accent'
                                  : 'border-transparent text-muted-foreground hover:text-accent'
                              )}
                            >
                              {h.text}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </nav>
                )}
              </div>
            </aside>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-16 pt-12 border-t-2 border-border max-w-5xl" aria-labelledby="related">
              <h2 id="related" className="font-head text-xl md:text-2xl font-black tracking-tight mb-6">
                {blog.relatedLabel}
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group flex flex-col border-2 border-border bg-card shadow-[4px_4px_0px_0px_var(--border)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all duration-150 p-5"
                  >
                    <div className="flex items-center gap-2 mb-2 font-head text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                      <span>{p.dateLabel}</span>
                    </div>
                    <h3 className="font-head text-base font-black leading-tight mb-2 group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="font-sans text-[13px] text-muted-foreground leading-relaxed flex-1">
                      {p.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 font-head text-[10px] font-black uppercase tracking-widest group-hover:text-accent transition-colors">
                      {blog.readLabel}
                      <ArrowUpRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
