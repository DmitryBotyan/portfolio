import { Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Mail, Send, Clock, Globe } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/sections/Footer'
import { useApp } from '@/contexts/AppContext'
import { useSeo } from '@/hooks/useSeo'
import { SITE_URL } from '@/blog'

export function ContactsPage() {
  const { t, lang } = useApp()
  const ru = lang === 'ru'
  const canonical = `${SITE_URL}/contacts`
  const authorName = ru ? 'Дмитрий Ботян' : 'Dmitry Botyan'
  const city = ru ? 'Санкт-Петербург' : 'Saint Petersburg'

  const L = ru
    ? {
        home: 'Главная',
        back: 'На главную',
        title: 'Контакты',
        h1: 'Контакты разработчика',
        intro:
          'Я веб-разработчик из Санкт-Петербурга. Работаю с клиентами по всей России и за рубежом удалённо. Свяжитесь любым удобным способом - отвечу в течение часа в рабочее время.',
        cityLabel: 'Город',
        cityValue: 'Санкт-Петербург, Россия',
        cityNote: 'Работа удалённая, выезд не требуется',
        emailLabel: 'Email',
        tgLabel: 'Telegram',
        hoursLabel: 'Время работы',
        hoursValue: 'Пн-Пт с 10:00 до 20:00 МСК',
        hoursNote: 'Заявки принимаю круглосуточно, ответ в рабочие часы',
        formatLabel: 'Формат работы',
        formatValue: 'Удалённо, договор, 50% предоплата, 50% по итогу',
        regionsLabel: 'Регионы работы',
        regionsValue:
          'Москва, Санкт-Петербург, Екатеринбург, Новосибирск, Краснодар, Казань и все остальные города России. Также работаю с международными клиентами (русско- и англоязычные).',
        ctaTitle: 'Хотите обсудить проект?',
        ctaText: 'Напишите в Telegram или на почту - отвечу быстро.',
        metaTitle: 'Контакты: разработчик сайтов и Telegram-ботов в Санкт-Петербурге',
        metaDescription:
          'Дмитрий Ботян, веб-разработчик из Санкт-Петербурга. Разработка сайтов, интернет-магазинов и Telegram-ботов по всей России. Email, Telegram, договор, гарантия.',
        keywords:
          'разработчик сайтов санкт-петербург, веб-разработчик спб, разработка сайтов спб, заказать сайт санкт-петербург, программист санкт-петербург, telegram бот разработка спб, контакты разработчика',
      }
    : {
        home: 'Home',
        back: 'Back to home',
        title: 'Contacts',
        h1: 'Developer contacts',
        intro:
          'I am a web developer based in Saint Petersburg, Russia. I work with clients across Russia and abroad remotely. Reach out any convenient way, I reply within an hour during work hours.',
        cityLabel: 'City',
        cityValue: 'Saint Petersburg, Russia',
        cityNote: 'Remote work, no on-site visits',
        emailLabel: 'Email',
        tgLabel: 'Telegram',
        hoursLabel: 'Work hours',
        hoursValue: 'Mon-Fri 10:00-20:00 MSK',
        hoursNote: 'Requests accepted 24/7, replies during work hours',
        formatLabel: 'Format',
        formatValue: 'Remote, contract, 50% upfront, 50% on delivery',
        regionsLabel: 'Regions',
        regionsValue:
          'Working with clients across Russia (Moscow, Saint Petersburg, Yekaterinburg, Novosibirsk, Krasnodar, Kazan and all other cities). Also serving international clients (English and Russian speaking).',
        ctaTitle: 'Want to discuss a project?',
        ctaText: 'Write on Telegram or email, fast reply.',
        metaTitle: 'Contacts: web and Telegram bot developer in Saint Petersburg',
        metaDescription:
          'Dmitry Botyan, web developer based in Saint Petersburg, Russia. Websites, online stores and Telegram bots across Russia. Email, Telegram, contract, warranty.',
        keywords:
          'web developer saint petersburg, web developer st petersburg, website development spb, order website saint petersburg, telegram bot developer russia',
      }

  useSeo({
    title: `${L.metaTitle} | ${authorName}`,
    description: L.metaDescription,
    canonical,
    keywords: L.keywords,
    ogType: 'website',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': canonical,
        url: canonical,
        name: L.h1,
        inLanguage: ru ? 'ru-RU' : 'en-US',
        about: {
          '@type': 'Person',
          name: authorName,
          jobTitle: ru ? 'Веб-разработчик' : 'Web Developer',
          url: SITE_URL,
          email: t.hero.socials.email,
          telephone: undefined,
          address: {
            '@type': 'PostalAddress',
            addressLocality: city,
            addressRegion: ru ? 'Санкт-Петербург' : 'Saint Petersburg',
            addressCountry: 'RU',
          },
          areaServed: [
            { '@type': 'Country', name: ru ? 'Россия' : 'Russia' },
            { '@type': 'City', name: ru ? 'Санкт-Петербург' : 'Saint Petersburg' },
            { '@type': 'City', name: ru ? 'Москва' : 'Moscow' },
          ],
          sameAs: [t.hero.socials.telegram],
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: ru ? 'клиентская поддержка' : 'customer support',
              email: t.hero.socials.email,
              areaServed: 'RU',
              availableLanguage: ['Russian', 'English'],
            },
          ],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: L.home, item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: L.title, item: canonical },
        ],
      },
    ],
  })

  const rows: Array<{ icon: typeof MapPin; label: string; value: React.ReactNode; note?: string }> = [
    {
      icon: MapPin,
      label: L.cityLabel,
      value: L.cityValue,
      note: L.cityNote,
    },
    {
      icon: Mail,
      label: L.emailLabel,
      value: (
        <a
          href={`mailto:${t.hero.socials.email}`}
          className="underline underline-offset-2 hover:text-accent transition-colors"
        >
          {t.hero.socials.email}
        </a>
      ),
    },
    {
      icon: Send,
      label: L.tgLabel,
      value: (
        <a
          href={t.hero.socials.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-accent transition-colors"
        >
          @unemployment_78
        </a>
      ),
    },
    {
      icon: Clock,
      label: L.hoursLabel,
      value: L.hoursValue,
      note: L.hoursNote,
    },
    {
      icon: Globe,
      label: L.formatLabel,
      value: L.formatValue,
    },
  ]

  return (
    <div className="relative min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-24 md:pt-28">
        <div className="px-6 sm:px-8 md:px-16 lg:px-24 pb-16 md:pb-24">

          <nav aria-label="breadcrumb" className="mb-8 flex items-center gap-2 font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">{L.home}</Link>
            <span>/</span>
            <span className="text-foreground">{L.title}</span>
          </nav>

          <header className="mb-12 max-w-3xl">
            <h1 className="font-head text-4xl md:text-5xl font-black tracking-tight mb-5">
              {L.h1}
            </h1>
            <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
              {L.intro}
            </p>
          </header>

          <section className="max-w-3xl mb-12">
            <div className="grid sm:grid-cols-2 gap-4">
              {rows.map(({ icon: Icon, label, value, note }) => (
                <div
                  key={label}
                  className="border-2 border-border bg-card shadow-[4px_4px_0px_0px_var(--border)] p-5"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-7 h-7 border-2 border-border bg-background flex items-center justify-center">
                      <Icon size={13} strokeWidth={2.4} />
                    </span>
                    <span className="font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {label}
                    </span>
                  </div>
                  <div className="font-sans text-[15px] leading-relaxed text-foreground">{value}</div>
                  {note && (
                    <p className="font-sans text-xs text-muted-foreground mt-2 leading-relaxed">
                      {note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-3xl mb-12 border-2 border-border bg-muted dark:bg-card p-6">
            <h2 className="font-head text-lg font-black tracking-tight mb-3">
              {L.regionsLabel}
            </h2>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              {L.regionsValue}
            </p>
          </section>

          <section className="max-w-3xl border-2 border-border bg-foreground text-background shadow-[6px_6px_0px_0px_var(--accent)] p-6 md:p-8">
            <h2 className="font-head text-xl md:text-2xl font-black tracking-tight mb-2">
              {L.ctaTitle}
            </h2>
            <p className="font-sans text-sm leading-relaxed mb-6 opacity-80">
              {L.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={t.hero.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-head font-bold bg-accent text-accent-foreground border-2 border-border px-5 py-3 shadow-[3px_3px_0px_0px_#FFFFFF] hover:shadow-[1px_1px_0px_0px_#FFFFFF] hover:translate-x-px hover:translate-y-px transition-all"
              >
                <Send size={15} />
                Telegram
              </a>
              <a
                href={`mailto:${t.hero.socials.email}`}
                className="inline-flex items-center justify-center gap-2 font-head font-medium bg-background text-foreground border-2 border-border px-4 py-2 shadow-[3px_3px_0px_0px_#FFFFFF] hover:shadow-[1px_1px_0px_0px_#FFFFFF] hover:translate-x-px hover:translate-y-px transition-all"
              >
                <Mail size={15} />
                {t.hero.socials.email}
              </a>
            </div>
          </section>

          <div className="mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={12} />
              {L.back}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
