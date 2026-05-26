import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Calculator, Send, Check, Star } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/sections/Footer'
import { Button } from '@/components/retroui/Button'
import { useApp } from '@/contexts/AppContext'
import { useSeo } from '@/hooks/useSeo'
import { goal } from '@/lib/metrika'
import { cn } from '@/lib/utils'
import { SITE_URL } from '@/blog'
import { getService, getAllServices, type ServiceDetail } from '@/services-data'
import { NotFound } from './NotFound'

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? getService(slug) : undefined

  useEffect(() => { window.scrollTo({ top: 0 }) }, [slug])

  if (!service) return <NotFound />
  return <ServiceView key={service.slug} service={service} />
}

function ServiceView({ service }: { service: ServiceDetail }) {
  const { t, lang } = useApp()
  const canonical = `${SITE_URL}/services/${service.slug}`
  const authorName = lang === 'ru' ? 'Дмитрий Ботян' : 'Dmitry Botyan'
  const allServices = getAllServices().filter((s) => s.slug !== service.slug)

  useSeo({
    title: `${service.metaTitle} | ${authorName}`,
    description: service.metaDescription,
    canonical,
    keywords: service.keywords,
    ogType: 'website',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': canonical,
        name: service.h1,
        description: service.metaDescription,
        url: canonical,
        provider: { '@type': 'Person', name: authorName, url: SITE_URL },
        areaServed: { '@type': 'Country', name: 'Россия' },
        serviceType: service.h1,
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'RUB',
          lowPrice: service.tiers[0].priceFrom * 1000,
          highPrice: service.tiers[service.tiers.length - 1].priceTo * 1000,
          offerCount: service.tiers.length,
          offers: service.tiers.map((tier) => ({
            '@type': 'Offer',
            name: tier.name,
            description: tier.description,
            priceCurrency: 'RUB',
            price: tier.priceFrom * 1000,
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: tier.priceFrom * 1000,
              maxPrice: tier.priceTo * 1000,
              priceCurrency: 'RUB',
            },
          })),
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Услуги', item: SITE_URL + '/#services' },
          { '@type': 'ListItem', position: 3, name: service.h1, item: canonical },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: service.faq.map((f) => ({
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
            <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
            <span>/</span>
            <Link to="/#services" className="hover:text-foreground transition-colors">Услуги</Link>
            <span>/</span>
            <span className="text-foreground">{service.h1}</span>
          </nav>

          <div className="max-w-5xl">

            {/* Hero */}
            <header className="mb-12 pb-10 border-b-2 border-border">
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="font-head text-[10px] font-bold uppercase tracking-widest px-2 py-1 border-2 border-border bg-foreground text-background">
                  Услуга
                </span>
                <span className="inline-flex items-center gap-1.5 font-head text-[10px] font-bold uppercase tracking-widest px-2 py-1 border-2 border-accent bg-accent text-accent-foreground">
                  от {service.priceFrom} 000 ₽
                </span>
              </div>

              <h1 className="font-head text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.05] mb-5">
                {service.h1}
              </h1>
              <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-8">
                {service.tagline}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="whitespace-nowrap bg-accent text-accent-foreground border-accent shadow-[3px_3px_0px_0px_var(--border)] hover:shadow-[1px_1px_0px_0px_var(--border)] hover:translate-x-px hover:translate-y-px"
                  onClick={() => {
                    goal('cta_click', { source: 'service-hero', slug: service.slug })
                    window.location.href = '/#calculator'
                  }}
                >
                  <Calculator size={16} />
                  Рассчитать стоимость
                </Button>
                <a
                  href={t.hero.socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => goal('telegram_click', { source: 'service-hero', slug: service.slug })}
                  className="inline-flex items-center justify-center gap-2 font-head font-medium whitespace-nowrap text-base bg-background text-foreground border-2 border-border px-6 py-3 shadow-[3px_3px_0px_0px_var(--border)] hover:shadow-[1px_1px_0px_0px_var(--border)] hover:translate-x-px hover:translate-y-px transition-all"
                >
                  <Send size={16} />
                  Написать в Telegram
                </a>
              </div>
            </header>

            {/* Intro */}
            <section className="mb-14">
              <div className="space-y-4 max-w-3xl">
                {service.intro.map((p, i) => (
                  <p key={i} className="font-sans text-[15px] md:text-base leading-relaxed text-foreground/90">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Includes */}
            <section className="mb-14">
              <h2 className="font-head text-xl md:text-2xl font-black tracking-tight mb-6">
                {service.includes.heading}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl">
                {service.includes.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-[15px] leading-relaxed">
                    <span className="shrink-0 w-5 h-5 mt-0.5 border-2 border-border bg-accent flex items-center justify-center">
                      <Check size={11} strokeWidth={3} className="text-accent-foreground" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tiers / Pricing */}
            <section className="mb-14">
              <h2 className="font-head text-xl md:text-2xl font-black tracking-tight mb-3">
                Цены и тарифы
              </h2>
              <p className="font-sans text-sm text-muted-foreground mb-8 max-w-2xl">
                Цены на 2026 год. Точную стоимость скажу после короткого обсуждения вашей задачи.
              </p>
              <div className="grid md:grid-cols-3 gap-5 items-stretch">
                {service.tiers.map((tier) => (
                  <article
                    key={tier.name}
                    className={cn(
                      'relative flex flex-col border-2 border-border bg-card transition-all duration-150',
                      tier.popular
                        ? 'shadow-[6px_6px_0px_0px_var(--accent)]'
                        : 'shadow-[4px_4px_0px_0px_var(--border)]'
                    )}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-accent text-accent-foreground font-head text-[9px] font-black tracking-widest uppercase px-2.5 py-1 border-2 border-border shadow-[2px_2px_0px_0px_var(--border)]">
                        <Star size={10} strokeWidth={3} />
                        Популярный
                      </div>
                    )}
                    <div className="p-5 border-b-2 border-border">
                      <h3 className="font-head text-xl font-black tracking-tight mb-2">{tier.name}</h3>
                      <p className="font-sans text-xs text-muted-foreground mb-4 leading-relaxed">
                        {tier.description}
                      </p>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          от
                        </span>
                        <span className="font-head text-3xl font-black tracking-tight tabular-nums">{tier.priceFrom}</span>
                        <span className="font-head text-xl font-black text-muted-foreground">–</span>
                        <span className="font-head text-xl font-black text-muted-foreground tabular-nums">{tier.priceTo}</span>
                        <span className="font-head text-[10px] font-bold uppercase tracking-wider text-muted-foreground">тыс. ₽</span>
                      </div>
                    </div>
                    <ul className="p-5 space-y-2.5 flex-1">
                      {tier.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span
                            className={cn(
                              'shrink-0 w-4 h-4 mt-0.5 border-2 border-border flex items-center justify-center',
                              tier.popular ? 'bg-accent' : 'bg-background'
                            )}
                          >
                            <Check size={10} strokeWidth={3} className={tier.popular ? 'text-accent-foreground' : 'text-foreground'} />
                          </span>
                          <span className="font-sans text-[13px] leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-5 pt-0">
                      <Button
                        variant={tier.popular ? 'default' : 'secondary'}
                        size="md"
                        className={cn(
                          'w-full',
                          tier.popular && 'bg-accent text-accent-foreground border-accent shadow-[3px_3px_0px_0px_var(--border)] hover:shadow-[1px_1px_0px_0px_var(--border)]'
                        )}
                        onClick={() => {
                          goal('cta_click', { source: 'service-tier', slug: service.slug, tier: tier.name })
                          window.location.href = '/#contact'
                        }}
                      >
                        Обсудить
                        <ArrowRight size={14} />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Stack */}
            <section className="mb-14">
              <h2 className="font-head text-xl md:text-2xl font-black tracking-tight mb-6">
                {service.stack.heading}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 max-w-3xl">
                {service.stack.items.map((item) => (
                  <div key={item.name} className="border-2 border-border bg-card p-4 shadow-[3px_3px_0px_0px_var(--border)]">
                    <p className="font-head text-sm font-black tracking-tight mb-1">{item.name}</p>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section className="mb-14">
              <h2 className="font-head text-xl md:text-2xl font-black tracking-tight mb-6">
                {service.process.heading}
              </h2>
              <ol className="space-y-5 max-w-3xl">
                {service.process.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="shrink-0 w-9 h-9 border-2 border-border bg-foreground text-background flex items-center justify-center font-head text-sm font-black">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-head text-base md:text-lg font-black tracking-tight mb-1.5">{step.title}</h3>
                      <p className="font-sans text-sm md:text-[15px] text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* FAQ */}
            <section className="mb-14 pt-10 border-t-2 border-border" aria-labelledby="service-faq">
              <h2 id="service-faq" className="font-head text-xl md:text-2xl font-black tracking-tight mb-6">
                Частые вопросы
              </h2>
              <div className="space-y-3 max-w-3xl">
                {service.faq.map((f, i) => (
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

            {/* Final CTA */}
            <section className="mt-14 border-2 border-border bg-foreground text-background shadow-[6px_6px_0px_0px_var(--accent)] p-6 md:p-8">
              <h2 className="font-head text-xl md:text-2xl font-black tracking-tight mb-2">
                Готовы обсудить проект?
              </h2>
              <p className="font-sans text-sm leading-relaxed mb-6 opacity-80 max-w-md">
                Расскажу о сроках, ценах и помогу выбрать оптимальный стек под вашу задачу. Отвечу в течение часа.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="md"
                  className="whitespace-nowrap bg-accent text-accent-foreground border-accent shadow-[3px_3px_0px_0px_#FFFFFF] hover:shadow-[1px_1px_0px_0px_#FFFFFF]"
                  onClick={() => {
                    goal('cta_click', { source: 'service-final-cta', slug: service.slug })
                    window.location.href = '/#calculator'
                  }}
                >
                  <Calculator size={15} />
                  Рассчитать стоимость
                </Button>
                <a
                  href={t.hero.socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => goal('telegram_click', { source: 'service-final-cta', slug: service.slug })}
                  className="inline-flex items-center justify-center gap-2 font-head font-medium whitespace-nowrap bg-background text-foreground border-2 border-border px-4 py-2 shadow-[3px_3px_0px_0px_#FFFFFF] hover:shadow-[1px_1px_0px_0px_#FFFFFF] hover:translate-x-px hover:translate-y-px transition-all"
                >
                  <Send size={15} />
                  Связаться
                </a>
              </div>
            </section>

            {/* Back */}
            <div className="mt-12">
              <Link
                to="/"
                className="inline-flex items-center gap-2 font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={12} />
                На главную
              </Link>
            </div>
          </div>

          {/* Other services */}
          {allServices.length > 0 && (
            <section className="mt-16 pt-12 border-t-2 border-border max-w-5xl" aria-labelledby="other-services">
              <h2 id="other-services" className="font-head text-xl md:text-2xl font-black tracking-tight mb-6">
                Другие услуги
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {allServices.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="group flex flex-col border-2 border-border bg-card shadow-[4px_4px_0px_0px_var(--border)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all duration-150 p-5"
                  >
                    <span className="font-head text-[10px] font-bold uppercase tracking-widest text-accent mb-2">
                      от {s.priceFrom} 000 ₽
                    </span>
                    <h3 className="font-head text-lg font-black leading-tight mb-2 group-hover:text-accent transition-colors">
                      {s.h1}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
                      {s.tagline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 font-head text-[10px] font-black uppercase tracking-widest group-hover:text-accent transition-colors">
                      Подробнее
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
