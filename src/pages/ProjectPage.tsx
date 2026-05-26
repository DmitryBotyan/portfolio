import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Calculator, Send, ChevronLeft, ChevronRight } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/sections/Footer'
import { Button } from '@/components/retroui/Button'
import { useApp } from '@/contexts/AppContext'
import { useSeo } from '@/hooks/useSeo'
import { goal } from '@/lib/metrika'
import { SITE_URL } from '@/blog'
import { getProjectDetail } from '@/projects'
import { NotFound } from './NotFound'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const { lang, t } = useApp()
  const detail = slug ? getProjectDetail(lang, slug) : undefined
  const project = slug ? t.projects.items.find((p: any) => p.slug === slug) : undefined

  useEffect(() => { window.scrollTo({ top: 0 }) }, [slug])

  if (!detail || !project) return <NotFound />

  return (
    <ProjectView
      key={slug}
      detail={detail}
      project={project as any}
      allProjects={t.projects.items as any}
    />
  )
}

interface ProjectMin {
  slug: string
  title: string
  stack: string[]
  live: string
  images: string[]
  description?: string
}

function ProjectView({
  detail,
  project,
  allProjects,
}: {
  detail: NonNullable<ReturnType<typeof getProjectDetail>>
  project: ProjectMin
  allProjects: ProjectMin[]
}) {
  const { t, lang } = useApp()
  const [imgIndex, setImgIndex] = useState(0)
  const hasLive = project.live && project.live !== '#'
  const canonical = `${SITE_URL}/projects/${detail.slug}`
  const authorName = lang === 'ru' ? 'Дмитрий Ботян' : 'Dmitry Botyan'
  const related = allProjects.filter((p) => p.slug !== detail.slug).slice(0, 3)

  const labels =
    lang === 'ru'
      ? {
          home: 'Главная',
          projects: 'Проекты',
          back: 'Все проекты',
          year: 'Год',
          client: 'Клиент',
          industry: 'Отрасль',
          role: 'Моя роль',
          stack: 'Стек',
          live: 'Открыть сайт',
          intro: 'О проекте',
          faq: 'Частые вопросы',
          related: 'Другие кейсы',
          ctaTitle: 'Хотите подобный проект?',
          ctaText: 'Расскажу о сроках, ценах и помогу выбрать оптимальный стек под вашу задачу.',
          ctaCalc: 'Рассчитать стоимость',
          ctaContact: 'Связаться',
          prev: 'Предыдущее',
          next: 'Следующее',
          screen: 'Скриншот',
        }
      : {
          home: 'Home',
          projects: 'Projects',
          back: 'All projects',
          year: 'Year',
          client: 'Client',
          industry: 'Industry',
          role: 'My role',
          stack: 'Stack',
          live: 'Open website',
          intro: 'About the project',
          faq: 'FAQ',
          related: 'Other cases',
          ctaTitle: 'Want a similar project?',
          ctaText: "I'll walk you through timelines, pricing and help pick the right stack for your task.",
          ctaCalc: 'Estimate cost',
          ctaContact: 'Get in touch',
          prev: 'Previous',
          next: 'Next',
          screen: 'Screenshot',
        }

  useSeo({
    title: `${detail.metaTitle} | ${authorName}`,
    description: detail.metaDescription,
    canonical,
    keywords: detail.keywords,
    ogType: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: detail.h1,
        headline: detail.h1,
        description: detail.metaDescription,
        url: canonical,
        image: project.images[0],
        inLanguage: lang === 'ru' ? 'ru-RU' : 'en-US',
        author: { '@type': 'Person', name: authorName, url: SITE_URL },
        creator: { '@type': 'Person', name: authorName, url: SITE_URL },
        keywords: detail.keywords,
        about: detail.industry,
        dateCreated: detail.year,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: labels.home, item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: labels.projects, item: `${SITE_URL}/projects` },
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
    ],
  })

  const onLiveClick = () => goal('project_live_click', { slug: detail.slug })

  const showImage = (i: number) => {
    const n = project.images.length
    setImgIndex(((i % n) + n) % n)
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-24 md:pt-28">
        <div className="px-6 sm:px-8 md:px-16 lg:px-24 pb-16 md:pb-24">

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-8 flex items-center gap-2 font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">{labels.home}</Link>
            <span>/</span>
            <Link to="/#projects" className="hover:text-foreground transition-colors">{labels.projects}</Link>
            <span>/</span>
            <span className="text-foreground">{project.title}</span>
          </nav>

          <div className="max-w-5xl">

            {/* Hero */}
            <header className="mb-10 pb-8 border-b-2 border-border">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-head text-[10px] font-bold uppercase tracking-widest px-2 py-1 border-2 border-border bg-foreground text-background">
                  {detail.category}
                </span>
                <span className="font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {detail.year}
                </span>
              </div>

              <h1 className="font-head text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.05] mb-4">
                {detail.h1}
              </h1>
              <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {detail.tagline}
              </p>
            </header>

            {/* Image gallery */}
            <section aria-label={labels.screen} className="mb-12">
              <div className="border-2 border-border shadow-[4px_4px_0px_0px_var(--border)] overflow-hidden bg-muted">
                <div className="relative aspect-[16/10]">
                  <img
                    src={project.images[imgIndex]}
                    alt={`${detail.h1} - ${labels.screen} ${imgIndex + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={() => showImage(imgIndex - 1)}
                        aria-label={labels.prev}
                        className="absolute top-1/2 left-3 -translate-y-1/2 w-10 h-10 border-2 border-border bg-background flex items-center justify-center shadow-[2px_2px_0px_0px_var(--border)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => showImage(imgIndex + 1)}
                        aria-label={labels.next}
                        className="absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 border-2 border-border bg-background flex items-center justify-center shadow-[2px_2px_0px_0px_var(--border)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {project.images.length > 1 && (
                <div className="mt-3 flex gap-2 flex-wrap">
                  {project.images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => showImage(i)}
                      aria-label={`${labels.screen} ${i + 1}`}
                      className={`w-20 h-14 border-2 border-border overflow-hidden transition-all ${
                        i === imgIndex ? 'shadow-[3px_3px_0px_0px_var(--accent)]' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={src} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Meta + Live link */}
            <section className="grid md:grid-cols-[1fr_auto] gap-6 mb-12 items-start">
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <dt className="font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{labels.client}</dt>
                  <dd className="font-sans text-sm">{detail.client}</dd>
                </div>
                <div>
                  <dt className="font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{labels.industry}</dt>
                  <dd className="font-sans text-sm">{detail.industry}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{labels.role}</dt>
                  <dd className="font-sans text-sm">{detail.role.join(', ')}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">{labels.stack}</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-head text-[10px] font-bold tracking-wider uppercase border-2 border-border px-2 py-0.5 text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              {hasLive && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onLiveClick}
                  className="inline-flex items-center justify-center gap-2 font-head font-bold whitespace-nowrap bg-accent text-accent-foreground border-2 border-border px-5 py-3 shadow-[4px_4px_0px_0px_var(--border)] hover:shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  {labels.live}
                  <ArrowUpRight size={16} />
                </a>
              )}
            </section>

            {/* Intro paragraphs */}
            <section className="mb-12">
              <h2 className="font-head text-xl md:text-2xl font-black tracking-tight mb-5">{labels.intro}</h2>
              <div className="space-y-4 max-w-3xl">
                {detail.intro.map((p, i) => (
                  <p key={i} className="font-sans text-[15px] md:text-base leading-relaxed text-foreground/90">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Sections */}
            <div className="space-y-12 mb-14">
              {detail.sections.map((section, i) => (
                <section key={i}>
                  <h2 className="font-head text-xl md:text-2xl font-black tracking-tight mb-5">
                    {section.heading}
                  </h2>
                  <div className="space-y-4 max-w-3xl">
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="font-sans text-[15px] md:text-base leading-relaxed text-foreground/90">
                        {p}
                      </p>
                    ))}
                    {section.list && (
                      <ul className="space-y-2.5 pl-1 pt-2">
                        {section.list.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 font-sans text-[15px] md:text-base leading-relaxed">
                            <span className="shrink-0 w-1.5 h-1.5 mt-2.5 bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>

            {/* FAQ */}
            {detail.faq.length > 0 && (
              <section className="mt-12 pt-10 border-t-2 border-border" aria-labelledby="project-faq">
                <h2 id="project-faq" className="font-head text-xl md:text-2xl font-black tracking-tight mb-6">
                  {labels.faq}
                </h2>
                <div className="space-y-3 max-w-3xl">
                  {detail.faq.map((f, i) => (
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
                {labels.ctaTitle}
              </h2>
              <p className="font-sans text-sm leading-relaxed mb-6 opacity-80 max-w-md">
                {labels.ctaText}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="md"
                  className="whitespace-nowrap bg-accent text-accent-foreground border-accent shadow-[3px_3px_0px_0px_#FFFFFF] hover:shadow-[1px_1px_0px_0px_#FFFFFF]"
                  onClick={() => {
                    goal('cta_click', { source: 'project-cta-calc', slug: detail.slug })
                    window.location.href = '/#calculator'
                  }}
                >
                  <Calculator size={15} />
                  {labels.ctaCalc}
                </Button>
                <a
                  href={t.hero.socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => goal('telegram_click', { source: 'project-cta', slug: detail.slug })}
                  className="inline-flex items-center justify-center gap-2 font-head font-medium whitespace-nowrap bg-background text-foreground border-2 border-border px-4 py-2 shadow-[3px_3px_0px_0px_#FFFFFF] hover:shadow-[1px_1px_0px_0px_#FFFFFF] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <Send size={15} />
                  {labels.ctaContact}
                </a>
              </div>
            </section>

            {/* Back */}
            <div className="mt-12">
              <Link
                to="/#projects"
                className="inline-flex items-center gap-2 font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={12} />
                {labels.back}
              </Link>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-16 pt-12 border-t-2 border-border max-w-5xl" aria-labelledby="related-projects">
              <h2 id="related-projects" className="font-head text-xl md:text-2xl font-black tracking-tight mb-6">
                {labels.related}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/projects/${p.slug}`}
                    className="group flex flex-col border-2 border-border bg-card shadow-[4px_4px_0px_0px_var(--border)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all duration-150"
                  >
                    <div className="aspect-[16/10] border-b-2 border-border overflow-hidden bg-muted">
                      <img src={p.images[0]} alt={p.title} loading="lazy" className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-head text-base font-black leading-tight mb-1 group-hover:text-accent transition-colors">
                        {p.title}
                      </h3>
                      <p className="font-sans text-xs text-muted-foreground">{p.stack.slice(0, 3).join(' · ')}</p>
                    </div>
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
