import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, Clock } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { useReveal } from '@/hooks/useReveal'
import { getPosts } from '@/blog'

export function Blog() {
  const { t, lang } = useApp()
  const { blog } = t
  const posts = getPosts(lang).slice(0, 4)
  const { ref: sectionRef } = useReveal()
  const { ref: gridRef }    = useReveal()

  return (
    <section
      id="blog"
      className="relative border-b-2 border-border overflow-hidden"
      aria-labelledby="blog-heading"
    >
      <div ref={sectionRef} data-reveal className="px-6 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24">

        <div className="mb-10 md:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <h2 id="blog-heading" className="font-head text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-3 md:mb-4">
              {blog.heading}
            </h2>
            <p className="font-sans text-muted-foreground max-w-2xl text-sm md:text-base leading-relaxed">
              {blog.subheading}
            </p>
          </div>
          <Link
            to="/blog"
            className="shrink-0 inline-flex items-center gap-2 font-head text-[10px] font-black uppercase tracking-widest border-2 border-border px-4 py-2.5 shadow-[3px_3px_0px_0px_var(--border)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all self-start"
          >
            {blog.allLabel}
            <ArrowRight size={14} />
          </Link>
        </div>

        <div ref={gridRef} data-stagger className="grid sm:grid-cols-2 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col border-2 border-border bg-card shadow-[4px_4px_0px_0px_var(--border)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all duration-150"
            >
              <div className="p-5 md:p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3 font-head text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span>{post.dateLabel}</span>
                  <span className="w-1 h-1 bg-muted-foreground" />
                  <span className="inline-flex items-center gap-1">
                    <Clock size={10} />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-head text-lg md:text-xl font-black leading-tight mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>

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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
