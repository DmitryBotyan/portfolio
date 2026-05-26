import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '@/contexts/AppContext'
import { useReveal } from '@/hooks/useReveal'
import { goal } from '@/lib/metrika'

function ImageCarousel({ images, offset = 0, alt = '' }: { images: string[], offset?: number, alt?: string }) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const delay = current === 0 ? 3400 + offset : 3400
    timerRef.current = setTimeout(() => {
      setCurrent((c) => (c + 1) % images.length)
    }, delay)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, images.length, offset])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* full strip - all images side by side, slides as one piece */}
      <div
        className="flex h-full"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${(current / images.length) * 100}%)`,
          transition: 'transform 0.72s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} - скриншот ${i + 1}`}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{ width: `${100 / images.length}%` }}
            className="h-full object-cover object-top shrink-0"
          />
        ))}
      </div>
      {/* dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {images.map((_, i) => (
          <span
            key={i}
            className="block w-1.5 h-1.5 border border-border transition-colors duration-200"
            style={{ background: i === current ? 'var(--foreground)' : 'var(--background)' }}
          />
        ))}
      </div>
    </div>
  )
}

export function Projects() {
  const { t } = useApp()
  const { projects } = t
  const { ref: sectionRef } = useReveal()
  const { ref: gridRef }    = useReveal(0.15)

  return (
    <section id="projects" className="relative border-b-2 border-border overflow-hidden">
      <div ref={sectionRef} data-reveal className="px-6 sm:px-8 md:px-16 lg:px-24 py-20 md:py-28">

        <div className="mb-16">
          <h2 className="font-head text-4xl md:text-6xl font-black tracking-tight">
            {projects.heading}
          </h2>
        </div>

        <div ref={gridRef} data-stagger className="max-w-5xl grid md:grid-cols-2 gap-6">
          {projects.items.map((project, idx) => (
            <Link
              key={project.number}
              to={`/projects/${(project as any).slug}`}
              onClick={() => goal('project_card_click', { slug: (project as any).slug })}
              className="group block border-2 border-border shadow-[4px_4px_0px_0px_var(--border)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all duration-150"
            >
              {/* Browser chrome + screen */}
              <div className="relative border-b-2 border-border overflow-hidden" style={{ aspectRatio: '16/9' }}>

                {/* Chrome bar */}
                <div className="absolute top-0 left-0 right-0 h-7 bg-background border-b-2 border-border flex items-center gap-1.5 px-3 z-10">
                  <div className="w-2.5 h-2.5 border-2 border-border group-hover:border-accent group-hover:bg-accent transition-colors duration-200" />
                  <div className="w-2.5 h-2.5 border-2 border-border" />
                  <div className="w-2.5 h-2.5 border-2 border-border" />
                  <div className="ml-3 flex-1 h-3.5 border border-border bg-muted rounded-none px-2 flex items-center">
                    <span className="font-head text-[8px] text-muted-foreground tracking-wide truncate opacity-60">
                      {project.live !== '#' ? project.live : 'localhost:3000'}
                    </span>
                  </div>
                </div>

                {/* Screen */}
                <div className="absolute inset-0 top-7 bg-muted overflow-hidden">
                  {(project as any).images?.length ? (
                    <ImageCarousel images={(project as any).images} offset={idx * 1100} alt={project.title} />
                  ) : (project as any).image ? (
                    <img
                      src={(project as any).image}
                      alt={`${project.title} - скриншот проекта`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <>
                      {/* Grid pattern */}
                      <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                          backgroundImage:
                            'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
                          backgroundSize: '28px 28px',
                        }}
                      />
                      {/* Project number - huge watermark */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-head font-black leading-none select-none text-foreground opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-300"
                          style={{ fontSize: 'clamp(5rem, 14vw, 9rem)' }}>
                          {project.number}
                        </span>
                      </div>
                      {/* Accent stripe on hover */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </>
                  )}
                </div>

                {/* Number badge */}
                <div className="absolute bottom-3 right-3 z-10 font-head text-[9px] font-black tracking-widest uppercase bg-foreground text-background px-2 py-1">
                  {project.number}
                </div>

                {/* Template badge */}
                {(project as any).template && (
                  <div className="absolute top-10 left-3 z-10 inline-flex items-center gap-1 bg-accent text-background font-head text-[9px] font-black tracking-widest uppercase px-2 py-1 border-2 border-border shadow-[2px_2px_0px_0px_var(--border)]">
                    <Sparkles size={10} />
                    {(projects as any).templateBadge}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-head text-lg font-black leading-tight">{project.title}</h3>
                  <div className="flex gap-1.5 shrink-0">
                    {project.live !== '#' ? (
                      <a
                        href={project.live}
                        title="Live"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation()
                          goal('project_live_click', { slug: (project as any).slug, source: 'card' })
                        }}
                        className="p-1.5 border-2 border-border shadow-[2px_2px_0px_0px_var(--border)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-muted-foreground hover:text-foreground"
                      >
                        <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <span aria-hidden className="p-1.5 border-2 border-transparent invisible">
                        <ArrowUpRight size={13} />
                      </span>
                    )}
                  </div>
                </div>

                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {(project as any).template && (
                  <div className="flex items-start gap-2 border-2 border-accent bg-accent/10 px-3 py-2">
                    <Sparkles size={14} className="text-accent shrink-0 mt-0.5" />
                    <p className="font-sans text-xs text-foreground leading-relaxed">
                      {(projects as any).templateNote}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-head text-[9px] font-bold tracking-wider uppercase border border-border px-2 py-0.5 text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
