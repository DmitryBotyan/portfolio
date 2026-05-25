import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowLeft, Clock } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/sections/Footer'
import { useApp } from '@/contexts/AppContext'
import { useSeo } from '@/hooks/useSeo'
import { getPosts, SITE_URL } from '@/blog'

export function BlogIndex() {
  const { t, lang } = useApp()
  const { blog } = t
  const posts = getPosts(lang)

  useEffect(() => { window.scrollTo({ top: 0 }) }, [])

  const canonical = `${SITE_URL}/blog`
  const title = `${blog.indexTitle} | ${lang === 'ru' ? 'Дмитрий Ботян' : 'Dmitry Botyan'}`

  useSeo({
    title,
    description: blog.indexSubheading,
    canonical,
    keywords: lang === 'ru'
      ? 'блог о разработке, статьи про сайты, цены на сайты, веб-разработка статьи'
      : 'web development blog, website articles, web dev guides',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: blog.indexTitle,
      url: canonical,
      inLanguage: lang === 'ru' ? 'ru-RU' : 'en-US',
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        url: `${SITE_URL}/blog/${p.slug}`,
        author: { '@type': 'Person', name: 'Дмитрий Ботян' },
      })),
    },
  })

  return (
    <div className="relative min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-24 md:pt-28">
        <div className="px-6 sm:px-8 md:px-16 lg:px-24 pb-20 md:pb-28">

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={12} />
              {blog.homeLabel}
            </Link>
          </nav>

          {/* Heading */}
          <header className="mb-12 md:mb-16 max-w-3xl">
            <h1 className="font-head text-4xl md:text-6xl font-black tracking-tight mb-4">
              {blog.heading}
            </h1>
            <p className="font-sans text-muted-foreground text-sm md:text-base leading-relaxed">
              {blog.indexSubheading}
            </p>
          </header>

          {/* Posts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 max-w-5xl">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col border-2 border-border bg-card shadow-[4px_4px_0px_0px_var(--border)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all duration-150"
              >
                <article className="p-5 md:p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3 font-head text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                    <span>{post.dateLabel}</span>
                    <span className="w-1 h-1 bg-muted-foreground" />
                    <span className="inline-flex items-center gap-1">
                      <Clock size={10} />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-head text-lg md:text-xl font-black leading-tight mb-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>

                  <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t-2 border-border">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="font-head text-[9px] font-bold tracking-wider uppercase border border-border px-2 py-0.5 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1 font-head text-[10px] font-black uppercase tracking-widest group-hover:text-accent transition-colors">
                      {blog.readLabel}
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
