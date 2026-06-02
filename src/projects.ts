export interface ProjectSection {
  heading: string
  paragraphs: string[]
  list?: string[]
}

export interface ProjectFaq {
  q: string
  a: string
}

export interface ProjectCoAuthor {
  name: string
  url?: string
  role?: string
}

export interface ProjectDetail {
  slug: string
  // SEO
  metaTitle: string
  metaDescription: string
  keywords: string
  // Hero
  h1: string
  tagline: string
  category: string
  year: string
  client: string
  industry: string
  role: string[]
  coAuthors?: ProjectCoAuthor[]
  // Body
  intro: string[]
  sections: ProjectSection[]
  results?: string[]
  faq: ProjectFaq[]
}

const en: Record<string, ProjectDetail> = {
  'botyan-tg-bot': {
    slug: 'botyan-tg-bot',
    metaTitle: 'botyan.dev bot: Telegram lead-gen bot on Python + aiogram',
    metaDescription:
      "Developer's own Telegram bot that sells services 24/7: services menu, dialog-style cost calculator, cases, FAQ, lead capture. Python, aiogram, SQLite, systemd.",
    keywords: 'telegram bot python, aiogram bot, lead generation bot, fsm bot calculator, sqlite telegram bot, systemd python bot, telegram bot for services',
    h1: 'botyan.dev bot: my own lead-generation Telegram bot',
    tagline: 'A bot that sells my services instead of me. Menu, calculator, cases, FAQ, lead capture',
    category: 'Telegram bot · Lead generation',
    year: '2026',
    client: 'Own project (Dmitry Botyan)',
    industry: 'Web development',
    role: ['Architecture', 'Backend', 'Bot logic', 'Server deployment'],
    intro: [
      'A bot for botyan.dev that works as a 24/7 lead-generation channel: greets visitors, walks them through services and prices, runs a step-by-step cost calculator and collects requests.',
    ],
    sections: [
      {
        heading: 'What it does',
        paragraphs: [
          'Five sections via a reply keyboard: services with tier breakdowns, FSM-based cost calculator, portfolio cases, 10-item FAQ and a contact form. Submitted requests are saved to SQLite and instantly forwarded to my Telegram with full context.',
        ],
        list: [
          'Inline service catalog with deep links to the website landings',
          '3-step calculator with attached estimate that travels with the lead',
          'Portfolio cases with live links',
          'Paginated FAQ with 10 typical questions',
          'Lead capture with instant Telegram notification',
          'Linter-clean code, deploys with one rsync command',
        ],
      },
      {
        heading: 'Stack',
        paragraphs: [
          'Python 3.12 + aiogram 3 for the bot framework, aiosqlite for async DB access, python-dotenv for config. Hosted on a TimeWeb VPS in Russia as a systemd service with auto-restart.',
        ],
      },
    ],
    faq: [
      { q: 'Why a bot if there is already a website?', a: 'A bot covers users who prefer Telegram over web forms, which in Russia is a large share. It also runs 24/7 and replies instantly, while web forms feel more committal.' },
      { q: 'What does a similar bot cost?', a: 'A bot like this with a database, FSM, menus and lead capture costs from 45 to 90 thousand rubles to build under contract. See the Telegram bots service page for tiers.' },
      { q: 'Where does the bot live?', a: 'On the same VPS as the website, isolated as its own systemd service. Restarts automatically on failure, logs everything via journalctl.' },
    ],
  },
  'opengrok-bot': {
    slug: 'opengrok-bot',
    metaTitle: 'OpenGrok: AI assistant in Telegram with Grok API integration',
    metaDescription:
      'Telegram bot with xAI Grok integration: live web search in answers, image analysis, voice message recognition, auto-named conversation threads. Python + aiogram.',
    keywords: 'grok api telegram bot, xai grok bot, ai assistant telegram, telegram bot with web search, voice telegram bot, image analysis bot, ai integration',
    h1: 'OpenGrok: AI assistant in Telegram on Grok API',
    tagline: 'Bot with xAI Grok integration: web search, voice messages, image analysis, auto-named threads',
    category: 'AI assistant · API integration',
    year: '2025',
    client: 'Own product',
    industry: 'AI / Productivity',
    role: ['Architecture', 'Backend', 'AI integration', 'Voice pipeline'],
    coAuthors: [
      { name: 'Artem Todor', url: 'https://art0tod.com', role: 'Co-author' },
    ],
    intro: [
      'A Telegram bot that wraps the xAI Grok API into a convenient daily assistant. Answers questions with automatic web search, accepts text, voice messages and images, and organises conversations into auto-named threads.',
    ],
    sections: [
      {
        heading: 'What it does',
        paragraphs: [
          'OpenGrok turns Telegram into a working AI workspace: ask a question and get an answer backed by live web search with source links; send a voice message and it transcribes and answers; send a photo for analysis; each new conversation becomes a separate thread that the bot renames based on the topic.',
        ],
        list: [
          'Answers with automatic web search and citations',
          'Deep research on complex topics',
          'Image generation and editing',
          'Voice message recognition (speech-to-text)',
          'Image analysis from uploaded photos',
          'Threads with auto-generated titles',
        ],
      },
      {
        heading: 'Stack',
        paragraphs: [
          'Python + aiogram for the Telegram side, xAI Grok API for the AI brain with built-in web search, speech-to-text for voice. Multi-thread architecture so each conversation has its own context and name.',
        ],
      },
    ],
    faq: [
      { q: 'Why Grok and not ChatGPT?', a: 'Grok has built-in real-time web search out of the box, fewer integrations needed. For users who want fresh answers (news, weather, prices), this matters.' },
      { q: 'How do auto-named threads work?', a: 'After the first message in a new thread, the bot asks Grok to generate a short topic name based on the user query, then renames the thread via the Telegram API. Makes navigation in chat list much cleaner.' },
      { q: 'Can a similar AI integration be built into my website or bot?', a: 'Yes, this is a common service. AI assistant on a site or in a bot costs from 30 to 120 thousand rubles depending on scenario. See the AI integrations article in the blog.' },
    ],
  },
  'travelmap': {
    slug: 'travelmap',
    metaTitle: 'TravelMap: interactive travel map with React + Supabase',
    metaDescription:
      'Interactive travel map with social mechanics: pins, reviews, collections, routes, feed. React + Vite + Tailwind v4, Supabase, MapLibre GL, real-time updates.',
    keywords: 'react map app, supabase real-time, maplibre gl, social map app, travel app react, vite supabase project',
    h1: 'TravelMap: an interactive travel map with social mechanics',
    tagline: 'Halfway between a map and a social network for people who like to travel',
    category: 'Web app · Map · Real-time',
    year: '2026',
    client: 'Own product',
    industry: 'Travel / Social',
    role: ['Architecture', 'Frontend', 'Map integration', 'Realtime'],
    intro: [
      'TravelMap is an interactive travel map where users drop pins on places, share impressions and follow trips of others. Halfway between a map and a social network for people who like to travel.',
    ],
    sections: [
      {
        heading: 'What it does',
        paragraphs: [
          'Users add pins to the map, write reviews, build place collections and turn trips into routes. There is a feed, profiles, likes, comments and a wishlist.',
        ],
      },
      {
        heading: 'Stack',
        paragraphs: [
          'React + Vite + Tailwind CSS v4 on the frontend, Supabase for database and auth, MapLibre GL for map rendering. Auth via email, Google and GitHub. Real-time updates over Supabase Realtime.',
        ],
      },
      {
        heading: 'Tricky part',
        paragraphs: [
          'The key challenge was the map architecture: real-time subscriptions cannot be duplicated in child components, otherwise you get channel conflicts and a white screen. Solved with a single hook in the root map component, passing callbacks down.',
        ],
      },
    ],
    faq: [
      { q: 'Why Supabase and not a custom backend?', a: 'Supabase ships a ready stack: Postgres, auth, real-time and storage in one service. For a side-project of this scale it removes weeks of backend boilerplate.' },
      { q: 'Why MapLibre instead of Google Maps?', a: 'MapLibre is open-source, no API fees and full control over styles. Vector tiles come from a provider, no Google branding constraints.' },
      { q: 'Can a similar app be built for my project?', a: 'Yes, this stack fits any geo-based product (delivery tracking, store locators, real estate, travel platforms). From 200 thousand rubles depending on scope.' },
    ],
  },
  'aurum-legal': {
    slug: 'aurum-legal',
    metaTitle: 'Aurum: ready Next.js 16 template for a law firm website',
    metaDescription:
      'Ready website template for a law firm on Next.js 16, shadcn/ui and Tailwind v4. Dark black-and-gold theme, 8 pages, animated counters. Adapt to your brand in 2-3 weeks.',
    keywords: 'law firm website template, next.js law firm template, lawyer website template, shadcn law template, dark theme legal website, attorney website template',
    h1: 'Aurum: ready website template for a law firm',
    tagline: 'Next.js 16 + shadcn/ui template with a dark black-and-gold theme. I adapt it to the client brand in 2-3 weeks',
    category: 'Ready template · Law firm',
    year: '2026',
    client: 'Own product (template for adaptation)',
    industry: 'Legal services',
    role: ['Design', 'Frontend', 'Architecture', 'Deploy'],
    intro: [
      'Aurum is a ready website template for a law firm, attorney office or solo lawyer. Built on Next.js 16 with App Router, Tailwind CSS v4 and shadcn/ui. Runs with Bun in a single command.',
    ],
    sections: [
      {
        heading: 'Design',
        paragraphs: [
          'A dark theme with a black-and-gold palette. The Playfair Display + Manrope font pair sets the right mood: solid, no flash. Cormorant Garamond is used for stat counters with old-style numerals.',
        ],
      },
      {
        heading: 'What is in the template',
        paragraphs: [
          '8 fully built pages: home, services catalog, single practice page, about, team, blog (list + article), contacts, custom 404. The home page has a full-height hero, animated stat counters (trigger on scroll), practice grid, advantages, process, team, testimonials, client quote and a contact form.',
        ],
        list: [
          'Static site generation for top speed and SEO',
          'Contact form ready to wire into any API or CRM',
          'Mobile tested from 320px, team lawyers swipe horizontally',
          'Gold grain on hero made via inline SVG filter, no external assets',
        ],
      },
      {
        heading: 'For whom',
        paragraphs: [
          'Suits law firms, attorney offices, tax consultants and solo lawyers. All texts and data are edited in two files: lib/site.ts and lib/content.ts.',
        ],
      },
    ],
    faq: [
      { q: 'How fast can the template be adapted to my brand?', a: 'Adaptation takes 2-3 weeks: I replace texts, colors, typography accents, logo, contacts, integrate forms with your CRM. From 70 000 ₽ depending on customization scope.' },
      { q: 'Can I see the template live?', a: 'Yes, demo at https://lawyer-site-gamma.vercel.app - full live site with all 8 pages.' },
      { q: 'Is the template sold separately?', a: 'No, I adapt it myself for a specific client and hand over a working site. This guarantees correct setup and deploy.' },
    ],
  },
  'zotova-portfolio': {
    slug: 'zotova-portfolio',
    metaTitle: 'Anastasiia Zotova portfolio: React + Vite case study',
    metaDescription:
      'Personal portfolio for a brand manager. Custom React app with scrapbook aesthetic, smooth animations and zero-template feel. Built on React, Vite, TypeScript.',
    keywords: 'react portfolio, vite portfolio, custom portfolio site, scrapbook portfolio, brand manager website, personal site react',
    h1: 'Personal portfolio for a brand manager',
    tagline: 'Custom React + Vite portfolio with scrapbook aesthetic',
    category: 'Personal portfolio',
    year: '2025',
    client: 'Anastasiia Zotova',
    industry: 'Brand management',
    role: ['UI/UX design', 'Frontend development', 'Animations', 'Deploy'],
    intro: [
      'Anastasiia is a brand manager who needed a portfolio that visually screamed her personality, not another minimalist template. The task was a site that looks bespoke, loads fast and lets her update content herself.',
    ],
    sections: [
      {
        heading: 'What was needed',
        paragraphs: [
          'A portfolio that stands out from typical Behance-clone templates. Visual style with a scrapbook feel: textures, tilted photos, hand-drawn elements. Animations on scroll that surprise but do not slow the site down.',
        ],
      },
      {
        heading: 'What was built',
        paragraphs: [
          'A custom single-page React app with smooth scroll, parallax effects and lazy-loaded media. Each section feels assembled by hand. The CSS animations are tuned not to break performance on mobile.',
        ],
        list: [
          'Custom design tailored to her brand',
          'Smooth scroll animations and parallax',
          'Lazy loading of heavy images',
          'Mobile-first responsive layout',
          'Deployed on Vercel for zero-config CI',
        ],
      },
    ],
    faq: [
      { q: 'How long did the project take?', a: 'About 3 weeks from kickoff to deploy, including iterations on the visual style.' },
      { q: 'Why React and not Tilda for a portfolio?', a: 'Tilda would have given a generic feel and limited custom animations. The brief asked for a bespoke look that justified a code-based build.' },
    ],
  },
  'dreamyvoice': {
    slug: 'dreamyvoice',
    metaTitle: 'DreamyVoice: Next.js platform for an anime dubbing team',
    metaDescription:
      'A platform for an anime dubbing team: title catalog, release pages with player, favorites, random pick, editor admin. Built on Next.js, Prisma, PostgreSQL.',
    keywords: 'next.js platform, anime catalog site, custom cms next.js, anime dubbing platform, react streaming site',
    h1: 'Platform for an anime dubbing team',
    tagline: 'Next.js catalog with admin panel, player and favorites',
    category: 'Web platform',
    year: '2025',
    client: 'DreamyVoice',
    industry: 'Entertainment',
    role: ['Architecture', 'Frontend', 'Backend', 'Admin panel', 'Deploy'],
    intro: [
      'DreamyVoice is an anime dubbing team that needed a real platform, not a blog. Editors had to add titles and episodes themselves, viewers had to find releases fast and watch right on the site.',
    ],
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'Build a catalog of titles where users browse, filter, mark favorites and play episodes inline. The team needed an admin where editors with no tech background could publish updates daily.',
        ],
      },
      {
        heading: 'What was built',
        paragraphs: [
          'Next.js app with server-side rendering for fast initial loads and good indexing. PostgreSQL for the catalog, Prisma for type-safe data access. Editor admin with role-based access so different team members only see what they need.',
        ],
        list: [
          'Title catalog with filters and search',
          'Release pages with built-in player',
          'Favorites and random title pick',
          'Custom admin panel for editors',
          'Role-based access control',
          'Image optimization and lazy loading',
        ],
      },
    ],
    faq: [
      { q: 'Why Next.js and not WordPress?', a: 'WordPress would have struggled with custom data models and the inline player UX. Next.js gave full control over the data layer and a faster, more app-like experience.' },
      { q: 'How is the admin protected?', a: 'Role-based authentication: only invited editors can sign in, with separate permission scopes for editors and admins.' },
    ],
  },
  'unemployment-team': {
    slug: 'unemployment-team',
    metaTitle: 'unemployment.team: bilingual studio website on Next.js',
    metaDescription:
      'Studio website for our team: services, portfolio, blog, multi-step request form. Bilingual on Next.js with custom CMS and analytics. RU and EN versions.',
    keywords: 'studio website nextjs, agency website, bilingual nextjs site, multi-step form nextjs, portfolio website nextjs',
    h1: 'Bilingual studio website with multi-step request form',
    tagline: 'Our own team site: services, portfolio, blog, smart contact flow',
    category: 'Studio website',
    year: '2025',
    client: 'unemployment.team (own studio)',
    industry: 'Web development',
    role: ['Architecture', 'Frontend', 'Backend', 'Content', 'SEO'],
    intro: [
      'unemployment.team is the studio I co-founded. The site is our own showcase: we wanted to demonstrate the quality we deliver to clients on our own surface.',
    ],
    sections: [
      {
        heading: 'The goal',
        paragraphs: [
          'A studio website that wins trust quickly and gathers structured leads. Bilingual content for international clients. Fast loading and clear positioning.',
        ],
      },
      {
        heading: 'What was built',
        paragraphs: [
          'A Next.js app with bilingual routing, server-rendered pages for SEO, a custom multi-step request form that gathers project details progressively without scaring people away.',
        ],
        list: [
          'Bilingual structure (RU and EN)',
          'Server-rendered pages for fast indexing',
          'Multi-step request form with progress',
          'Portfolio with case studies',
          'Blog with technical and business posts',
        ],
      },
    ],
    faq: [
      { q: 'Why bilingual?', a: 'To work with both Russian and international clients without splitting brand presence across two domains.' },
      { q: 'Why multi-step form and not a simple one?', a: 'A multi-step form has higher completion rates for B2B services because it feels less intimidating than a long single form.' },
    ],
  },
  'medequip': {
    slug: 'medequip',
    metaTitle: 'MedEquip: corporate site for a medical equipment supplier',
    metaDescription:
      'Corporate website for a medical equipment supplier: product catalog, segment-based solution pages, price request form. Available as a template for similar businesses.',
    keywords: 'corporate website nextjs, medical equipment website, b2b website, product catalog nextjs, supplier website',
    h1: 'Corporate site for a medical equipment supplier',
    tagline: 'B2B corporate site with catalog and segment-based solutions',
    category: 'Corporate website',
    year: '2025',
    client: 'MedEquip',
    industry: 'Medical equipment',
    role: ['Architecture', 'Frontend', 'Forms', 'Deploy'],
    intro: [
      'A corporate site for a medical equipment supplier. The audience is hospital procurement and clinic managers, so the site had to communicate expertise, ranges and certifications fast.',
    ],
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'A site that lets a buyer find a product or solution for their segment in under a minute. Catalog with filters, dedicated solution pages by segment (clinics, labs, hospitals), and a price request form that does not scare people off.',
        ],
      },
      {
        heading: 'What was built',
        paragraphs: [
          'Next.js corporate site with a product catalog, segment-based landing pages and conversion-focused forms. Available as a template to other B2B suppliers in adjacent niches.',
        ],
        list: [
          'Product catalog with filters',
          'Solution pages by customer segment',
          'Price request form with lead routing',
          'Fast initial load and good SEO',
          'Template ready for similar businesses',
        ],
      },
    ],
    faq: [
      { q: 'Can this template be reused?', a: 'Yes, this is one of the templates I adapt for similar B2B suppliers. The visual style, content and integrations are configured for the new client, the core architecture stays.' },
      { q: 'How is the lead form connected?', a: 'Forms route directly into the client CRM or email, with reCAPTCHA protection against spam.' },
    ],
  },
  'ramki-magazine': {
    slug: 'ramki-magazine',
    metaTitle: 'RAMKI Magazine: custom WordPress theme for business journal',
    metaDescription:
      'Business online magazine on WordPress with custom theme and Elementor: issue archive, multi-section ecosystem, newsletter signup. Editor-friendly CMS.',
    keywords: 'wordpress magazine theme, elementor custom theme, online journal wordpress, business magazine site, custom wordpress development',
    h1: 'Business online magazine on WordPress',
    tagline: 'Custom theme, Elementor builder, issue archive and newsletter',
    category: 'Online magazine',
    year: '2025',
    client: 'RAMKI Magazine',
    industry: 'Media',
    role: ['Custom WordPress theme', 'Elementor integration', 'CMS architecture'],
    intro: [
      'A business online magazine that needed editorial speed without sacrificing brand identity. The editors had to publish daily and assemble feature pages without a developer.',
    ],
    sections: [
      {
        heading: 'The goal',
        paragraphs: [
          'A magazine that looks bespoke but lives on a CMS the editors already know. Visual rhythm consistent across categories, fast loading, clean reading experience.',
        ],
      },
      {
        heading: 'What was built',
        paragraphs: [
          'Custom WordPress theme tailored to the brand, integrated with Elementor so editors can compose feature pages without code. Issue archive, multi-section ecosystem, newsletter signup with audience segmentation.',
        ],
        list: [
          'Custom theme matching the brand',
          'Elementor integration for non-tech editors',
          'Issue archive with rich filters',
          'Newsletter signup with segmentation',
          'Performance optimization for media-heavy pages',
        ],
      },
    ],
    faq: [
      { q: 'Why WordPress and not a custom CMS?', a: 'WordPress with Elementor lets editors publish daily without depending on a developer. For a media product, editorial speed beats theoretical performance gains of a custom stack.' },
      { q: 'How fast does it load with media?', a: 'Image optimization, lazy loading and selective caching keep load times competitive even with rich feature pages.' },
    ],
  },
  'ccc-holistic-medicine': {
    slug: 'ccc-holistic-medicine',
    metaTitle: 'Holistic medicine center website: WordPress + WooCommerce',
    metaDescription:
      'Website for a holistic medicine center on WordPress with ACF, WooCommerce shop, multi-step booking form and blog. Editor-friendly CMS, online appointment booking.',
    keywords: 'holistic medicine website, woocommerce wordpress site, booking form wordpress, acf custom fields, medical center website',
    h1: 'Website for a holistic medicine center',
    tagline: 'WordPress + ACF + WooCommerce: shop, booking, blog',
    category: 'Medical center website',
    year: '2025',
    client: 'Center of Human Integrity',
    industry: 'Holistic medicine',
    role: ['WordPress development', 'WooCommerce setup', 'Custom forms', 'ACF architecture'],
    intro: [
      'A website for a holistic medicine center that combined three roles: information hub, product shop and online booking surface. The team wanted full control over content without depending on a developer for routine updates.',
    ],
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'A site that explains the methods, lets visitors book consultations online and sells related products. Editors had to manage everything: service descriptions, practitioner profiles, products and blog content.',
        ],
      },
      {
        heading: 'What was built',
        paragraphs: [
          'WordPress site with custom post types and fields via ACF for clean content modeling, WooCommerce for the product shop, custom multi-step booking form for online appointments. Editor-friendly admin so the team manages everything themselves.',
        ],
        list: [
          'Custom post types for services and practitioners',
          'ACF for structured content fields',
          'WooCommerce shop with payment integration',
          'Multi-step booking form for online appointments',
          'Blog for content marketing',
          'Editor-friendly admin without code dependencies',
        ],
      },
    ],
    faq: [
      { q: 'How is online booking handled?', a: 'A custom multi-step form gathers preferences, available slot and contact details, then routes to the right specialist via email and CRM.' },
      { q: 'Why combine WooCommerce and booking on one site?', a: 'For a holistic center, services and products serve the same client. One site means one funnel and one set of brand experiences instead of fragmenting attention.' },
    ],
  },
}

const ru: Record<string, ProjectDetail> = {
  'botyan-tg-bot': {
    slug: 'botyan-tg-bot',
    metaTitle: 'botyan.dev bot: Telegram-бот для лидогенерации на Python + aiogram',
    metaDescription:
      'Собственный Telegram-бот разработчика, который продаёт услуги 24/7: меню услуг, калькулятор в формате диалога, кейсы, FAQ, приём заявок. Python, aiogram, SQLite, systemd.',
    keywords:
      'telegram бот python, aiogram бот, бот для лидогенерации, fsm калькулятор бот, sqlite телеграм бот, systemd python бот, телеграм бот для услуг, бот для заявок',
    h1: 'botyan.dev bot: мой собственный бот для лидогенерации',
    tagline:
      'Бот, который продаёт мои услуги вместо меня. Меню, калькулятор стоимости, кейсы, FAQ, приём заявок прямо в Telegram',
    category: 'Telegram-бот · Лидогенерация',
    year: '2026',
    client: 'Свой проект (Дмитрий Ботян)',
    industry: 'Веб-разработка',
    role: ['Архитектура', 'Backend', 'Логика бота', 'Развёртывание на сервере'],
    intro: [
      'Бот, который работает каналом приёма заявок 24/7 для botyan.dev. Встречает посетителей, проводит по услугам и ценам, помогает рассчитать стоимость в формате пошагового диалога и принимает заявки с уведомлением мне в личку.',
      'Когда задумывал бот, основная цель была закрыть слабое место: «продаёт ботов, а сделанных ботов в портфолио нет». Заодно это полезный инструмент: люди, которым неудобно заполнять веб-формы, пишут в Telegram и сразу получают живую механику с калькулятором.',
    ],
    sections: [
      {
        heading: 'Что закрывает',
        paragraphs: [
          'Пять разделов через reply-клавиатуру: каталог услуг с разбивкой по тарифам, калькулятор стоимости на FSM, кейсы из портфолио, 10 ответов на частые вопросы и форма заявки. Полученные заявки сохраняются в SQLite и мгновенно прилетают мне в личный Telegram с полным контекстом: имя, username, ID пользователя, сообщение, а если до этого был расчёт в калькуляторе - то и параметры с вилкой цены.',
        ],
        list: [
          'Каталог услуг с дип-линками на лендинги услуг на сайте',
          'Калькулятор из 3 шагов с прицеплением расчёта к заявке',
          'Кейсы портфолио с прямыми ссылками на демо',
          'FAQ из 10 типовых вопросов с пагинацией',
          'Приём заявок с мгновенным уведомлением в Telegram',
          'Чистый код, деплой одной командой rsync',
        ],
      },
      {
        heading: 'Стек и архитектура',
        paragraphs: [
          'Python 3.12 + aiogram 3 как фреймворк для бота, aiosqlite для асинхронной работы с базой, python-dotenv для конфига. Хранение заявок и расчётов в SQLite - достаточно лёгко для одиночного бота, мигрировать на Postgres можно позже за полчаса.',
          'Развёрнут на российском VPS как systemd-сервис с автоматическим перезапуском при падении. Логи через journalctl. Обновление кода - одной командой rsync с локального ноутбука, после которой systemd сам перезапускает сервис.',
        ],
      },
      {
        heading: 'Чему полезно научиться на этом проекте',
        paragraphs: [
          'Если хотите похожий бот для своего бизнеса, я разрабатываю их под ключ. Простой бот с приёмом заявок - от 15 тысяч рублей, бот с базой и админкой - от 45 тысяч. Подробности на странице услуги «Разработка Telegram-ботов».',
        ],
      },
    ],
    faq: [
      {
        q: 'Зачем бот, если уже есть сайт?',
        a: 'Бот закрывает аудиторию, которой удобнее общаться в Telegram, а не заполнять веб-форму. В России это значительная доля посетителей. Плюс бот доступен 24/7 и отвечает мгновенно, а веб-форма ощущается более обязывающей.',
      },
      {
        q: 'Сколько стоит подобный бот?',
        a: 'Бот такого уровня с базой данных, FSM-калькулятором, каталогом и приёмом заявок обходится в 45-90 тысяч рублей под ключ с договором. Подробнее на странице услуги.',
      },
      {
        q: 'Где живёт бот?',
        a: 'На том же VPS, что и сайт, изолированным systemd-сервисом. Автоматически перезапускается при падении, все логи через journalctl. Дешёво в обслуживании, надёжно.',
      },
      {
        q: 'Можно ли посмотреть код?',
        a: 'Бот написан под мои задачи, поэтому полностью открыть код пока не планирую. Но логику и архитектуру обсуждаю на бесплатном созвоне, если думаете заказать похожий.',
      },
    ],
  },
  'opengrok-bot': {
    slug: 'opengrok-bot',
    metaTitle: 'OpenGrok: AI-ассистент в Telegram с интеграцией Grok API',
    metaDescription:
      'Telegram-бот с интеграцией xAI Grok: ответы с автоматическим поиском в интернете, анализ изображений, распознавание голосовых, автогенерация названий тем. Python + aiogram.',
    keywords:
      'grok api telegram бот, xai grok бот, ai ассистент telegram, телеграм бот с поиском в интернете, голосовой бот telegram, бот с распознаванием голоса, ии бот для бизнеса, интеграция grok',
    h1: 'OpenGrok: AI-ассистент в Telegram на Grok API',
    tagline:
      'Бот с интеграцией xAI Grok: автопоиск в интернете, голосовые сообщения, анализ фото, автоматические названия тем разговоров',
    category: 'AI-ассистент · Интеграция API',
    year: '2025',
    client: 'Свой продукт',
    industry: 'AI / Продуктивность',
    role: ['Архитектура', 'Backend', 'AI-интеграция', 'Голосовой пайплайн'],
    coAuthors: [
      { name: 'Артём Тодор', url: 'https://art0tod.com', role: 'Со-автор' },
    ],
    intro: [
      'Telegram-бот, который оборачивает xAI Grok API в удобного ежедневного ассистента. Отвечает на вопросы с автоматическим поиском в интернете, принимает текст, голосовые сообщения и фотографии, организует разговоры в темы с автоматическими названиями.',
      'Идея в том, чтобы превратить Telegram в полноценное рабочее пространство для AI: вместо открытия отдельного приложения вы пишете боту, как привычному собеседнику, и получаете развёрнутые ответы с источниками или результатами обработки фото и голоса.',
    ],
    sections: [
      {
        heading: 'Что умеет',
        paragraphs: [
          'OpenGrok закрывает несколько сценариев работы с AI в одном боте. Спросили текстом - получили ответ с автоматическим поиском в интернете и ссылками на источники. Отправили голосовое - бот распознал речь и ответил по делу. Скинули фото - он его проанализировал. Каждый новый разговор оформляется в отдельную тему, название которой бот придумывает сам на основе первого вопроса.',
        ],
        list: [
          'Ответы на вопросы с автоматическим поиском в интернете',
          'Глубокие исследования по сложным темам',
          'Генерация и редактирование изображений',
          'Анализ загруженных фотографий',
          'Распознавание голосовых сообщений (speech-to-text)',
          'Темы разговоров с автоматическими названиями',
        ],
      },
      {
        heading: 'Стек и архитектура',
        paragraphs: [
          'Python + aiogram для Telegram-стороны, xAI Grok API как AI-мозг со встроенным веб-поиском, speech-to-text для голосовых. Многопоточная архитектура с темами Telegram, чтобы каждый разговор имел свой контекст и название.',
          'Автоматическое именование тем работает так: после первого сообщения в новой теме бот просит Grok сгенерировать короткий заголовок по запросу пользователя, потом переименовывает тему через Telegram Bot API. Из-за этого список чатов остаётся читаемым и навигация удобной.',
        ],
      },
      {
        heading: 'Где применимо',
        paragraphs: [
          'Похожую логику с AI-ассистентом я делаю на заказ: для сайтов, ботов поддержки, корпоративных порталов. Подключение Grok, ChatGPT или Claude к вашему продукту - от 30 до 120 тысяч рублей в зависимости от сценария. Подробнее в статье про AI-интеграции в блоге.',
        ],
      },
    ],
    faq: [
      {
        q: 'Почему Grok, а не ChatGPT или Claude?',
        a: 'У Grok из коробки встроен поиск в интернете в реальном времени. Для пользователей, которым важны свежие ответы (новости, погода, цены, актуальные события), это критично. ChatGPT и Claude тоже умеют поиск, но через дополнительные интеграции.',
      },
      {
        q: 'Как работают автоматические названия тем?',
        a: 'После первого сообщения в новой теме бот просит Grok сгенерировать короткое название по запросу пользователя, затем переименовывает тему через Telegram Bot API. В итоге список чатов в Telegram выглядит структурно, навигация удобная.',
      },
      {
        q: 'Можно ли подключить похожую AI-логику к моему сайту или боту?',
        a: 'Да, это одна из услуг. AI-ассистент на сайте или в боте стоит от 30 до 120 тысяч рублей в зависимости от сценария: чат-консультант, умный поиск, генерация контента, обработка заявок. Подробнее в статье про AI-интеграции в блоге.',
      },
      {
        q: 'Безопасно ли отправлять боту фото и голос?',
        a: 'Данные обрабатываются через защищённые API, не хранятся дольше необходимого. Чувствительную информацию (документы, паспорта, медкарты) отправлять не стоит - это общее правило для любых AI-сервисов.',
      },
    ],
  },
  'travelmap': {
    slug: 'travelmap',
    metaTitle: 'TravelMap: интерактивная карта путешествий на React + Supabase',
    metaDescription:
      'Интерактивная карта путешествий с социальной механикой: булавки, отзывы, коллекции, маршруты, лента. React + Vite + Tailwind v4, Supabase, MapLibre GL, real-time обновления.',
    keywords:
      'карта путешествий react, supabase real-time приложение, maplibre gl кейс, социальная карта react, travel app, react карта проект, vite supabase, real-time подписки supabase',
    h1: 'TravelMap: интерактивная карта путешествий с социальной механикой',
    tagline:
      'Что-то среднее между картой и социальной сетью для тех, кто любит путешествовать',
    category: 'Веб-приложение · Карта · Real-time',
    year: '2026',
    client: 'Свой продукт',
    industry: 'Путешествия / Социальные сети',
    role: ['Архитектура', 'Frontend', 'Интеграция карты', 'Realtime'],
    intro: [
      'TravelMap это интерактивная карта путешествий, где можно отмечать места, делиться впечатлениями и следить за поездками других пользователей. Что-то среднее между картой и социальной сетью для тех, кто любит путешествовать.',
      'Пользователи добавляют булавки на карту, пишут отзывы, собирают коллекции мест и создают маршруты из своих поездок. Есть лента, профили, лайки, комментарии и список желаний.',
    ],
    sections: [
      {
        heading: 'Что внутри',
        paragraphs: [
          'Карта мира с булавками от других путешественников и фильтрами по странам, категориям и пользователям. У каждого места своя страница с отзывами, фото и метаданными. Профиль пользователя со статистикой поездок и списком стран. Лента с активностью тех, на кого подписан. Вишлист, куда складываешь места для будущих поездок.',
        ],
        list: [
          'Карта с булавками и кластеризацией для быстрого рендера',
          'Добавление места: координаты, название, страна, фото, категория, дата',
          'Лента с активностью подписок и лайками',
          'Поиск по местам и пользователям с фильтрами',
          'Вишлист и личные коллекции мест',
          'Авторизация через email, Google и GitHub',
        ],
      },
      {
        heading: 'Стек',
        paragraphs: [
          'React + Vite + Tailwind CSS v4 на фронте, Supabase для базы данных и аутентификации, MapLibre GL для рендеринга карты. Авторизация через email, Google и GitHub. Real-time обновления через Supabase Realtime: новые места и активность подписок появляются в ленте без перезагрузки.',
        ],
        list: [
          'React 19 + TypeScript + Vite 7',
          'Tailwind CSS v4 для стилей',
          'Supabase: Postgres, Auth, Storage, Realtime',
          'MapLibre GL для интерактивной карты',
          'react-router-dom для роутинга',
          'OAuth через Google и GitHub из коробки Supabase Auth',
        ],
      },
      {
        heading: 'Самая интересная задача',
        paragraphs: [
          'Ключевая сложность была в архитектуре работы с картой: real-time подписки нельзя дублировать в дочерних компонентах, иначе получаешь конфликт каналов и белый экран. Решил через единственный хук в корневом компоненте карты с передачей коллбэков вниз.',
          'Это типичная история для real-time систем: легко не заметить, что подписка на канал создаётся в каждом ререндере дочернего компонента, и в итоге Supabase Realtime получает десятки конфликтующих подключений. После выноса хука наверх и проброса колбэков карта работает стабильно даже при 200+ булавках на экране.',
        ],
      },
    ],
    faq: [
      {
        q: 'Почему Supabase, а не свой бэкенд?',
        a: 'Supabase даёт готовый стек: PostgreSQL, авторизация, real-time и хранилище файлов в одном сервисе. Для пет-проекта или MVP это снимает недели работы над бекендом, можно сразу фокусироваться на фронте и продуктовых фичах.',
      },
      {
        q: 'Почему MapLibre, а не Google Maps?',
        a: 'MapLibre это open-source форк Mapbox GL без платы за API и с полным контролем над стилями. Тайлы беру у векторного провайдера, нет ограничений Google по брендингу. Для активной карты с тысячами просмотров это в разы дешевле.',
      },
      {
        q: 'Можно ли построить похожее приложение для моего проекта?',
        a: 'Да, такой стек подойдёт для любого гео-продукта: трекинг доставки, локаторы магазинов, недвижимость, тревел-платформы. Разработка от 200 тысяч рублей в зависимости от объёма функционала.',
      },
      {
        q: 'Как масштабируется Supabase Realtime?',
        a: 'Базовый план держит десятки тысяч одновременных подключений. Для большего трафика есть платные тарифы и self-hosted развёртывание. Для приложения уровня TravelMap бесплатного плана хватает с запасом.',
      },
    ],
  },
  'aurum-legal': {
    slug: 'aurum-legal',
    metaTitle: 'Аурум: готовый шаблон сайта для юридической компании на Next.js 16',
    metaDescription:
      'Готовый шаблон сайта для юридической фирмы на Next.js 16, shadcn/ui и Tailwind v4. Тёмная чёрно-золотая тема, 8 страниц, анимированные счётчики. Адаптация под клиента от 70 000 ₽.',
    keywords:
      'шаблон сайта юридической компании, шаблон сайта юриста, шаблон сайта адвокатского бюро, готовый сайт для юристов, next.js шаблон юрист, сайт адвоката шаблон, шаблон сайта legal',
    h1: 'Аурум: готовый шаблон сайта для юридической компании',
    tagline:
      'Шаблон на Next.js 16 и shadcn/ui с тёмной чёрно-золотой темой. Адаптирую под бренд клиента за 2-3 недели',
    category: 'Готовый шаблон · Юридическая компания',
    year: '2026',
    client: 'Свой продукт (шаблон для адаптации)',
    industry: 'Юридические услуги',
    role: ['Дизайн', 'Frontend', 'Архитектура', 'Деплой'],
    intro: [
      'Аурум это профессиональный шаблон сайта для юридической компании, адвокатского бюро или частного юриста. Собран на Next.js 16 с App Router, Tailwind CSS v4 и shadcn/ui. Запускается через Bun за одну команду.',
      'Если у вас юридический бизнес и нужен сайт быстро, имеет смысл адаптировать готовый шаблон вместо разработки с нуля. Меняю бренд, контент, контакты, подключаю формы к вашей CRM. Архитектура и логика уже отлажены.',
    ],
    sections: [
      {
        heading: 'Дизайн',
        paragraphs: [
          'Дизайн построен на тёмной теме с чёрно-золотой палитрой. Шрифтовая пара Playfair Display и Manrope задаёт нужный тон: солидно, без лишнего. Для числовых показателей подключён Cormorant Garamond с старинным начертанием цифр.',
          'Тёмная тема с золотыми акцентами хорошо считывается аудиторией юридических услуг: солидность, премиальность, без визуального шума. Подойдёт для корпоративного сегмента и частной практики высокого уровня.',
        ],
      },
      {
        heading: 'Что входит в шаблон',
        paragraphs: [
          '8 полностью свёрстанных страниц закрывают весь основной функционал сайта юридической фирмы. Менять контент можно в двух конфигурационных файлах без правок самого кода.',
        ],
        list: [
          'Главная: hero на всю высоту экрана с анимированными счётчиками (запускаются при скролле)',
          'Каталог услуг и отдельная страница для каждой практики',
          'О компании с блоком ключевых вех и команды',
          'Команда: профили партнёров и юристов',
          'Блог со списком статей и страницей отдельной статьи',
          'Контакты с формой заявки',
          'Кастомная страница 404',
        ],
      },
      {
        heading: 'Технические детали',
        paragraphs: [
          'Все страницы генерируются статически (SSG), что даёт высокую скорость загрузки и хорошие позиции в поисковой выдаче. Форма обратной связи готова к подключению к любому API или CRM. Мобильная версия протестирована от 320px, команда юристов на мобильных устройствах листается горизонтально. Золотое зерно на hero-секциях сделано через SVG-фильтр без внешних зависимостей.',
        ],
        list: [
          'Next.js 16 с App Router, статическая генерация',
          'TypeScript для надёжности и масштабирования',
          'Tailwind CSS v4 с кастомной тёмной палитрой',
          'shadcn/ui для базовых компонентов интерфейса',
          'Bun как пакетный менеджер и раннер',
          'Адаптив от 320px, оптимизация под мобильные',
        ],
      },
      {
        heading: 'Для кого подойдёт',
        paragraphs: [
          'Юридические компании и адвокатские бюро, налоговые консультанты, частные юристы высокого уровня. Все тексты и данные меняются в двух конфигурационных файлах: lib/site.ts и lib/content.ts.',
          'Адаптация шаблона выходит в 1,5-2 раза дешевле и быстрее, чем разработка с нуля: 2-3 недели вместо 6-8 и от 70 тысяч рублей вместо 150-250. Получаете уровень решения как у крупных юридических компаний, но за бюджет малой и средней практики.',
        ],
      },
    ],
    faq: [
      {
        q: 'Как быстро можно адаптировать шаблон под мой бренд?',
        a: 'Адаптация занимает 2-3 недели. За это время меняю тексты, цветовую палитру, типографические акценты, логотип и контакты, подключаю формы к вашей CRM или почте, размещаю на вашем домене с SSL. Стоимость от 70 тысяч рублей в зависимости от объёма правок.',
      },
      {
        q: 'Можно ли посмотреть шаблон вживую?',
        a: 'Да, демо доступно по адресу https://lawyer-site-gamma.vercel.app. Это полноценный рабочий сайт со всеми 8 страницами и анимациями. Можно потыкать и понять, подходит ли стиль вашей практике.',
      },
      {
        q: 'Шаблон продаётся отдельно?',
        a: 'Нет, шаблон не продаётся как файл. Я адаптирую его под конкретного клиента и потом передаю готовый сайт с доступами. Так гарантирую, что всё корректно настроено, развёрнуто на сервере и работает.',
      },
      {
        q: 'Подойдёт ли шаблон не юридической компании?',
        a: 'Структура и компоненты универсальные, но дизайн заточен под юридическую эстетику: солидность, тёмная тема, золотые акценты. Для финансовых консультантов, корпоративных аудиторов или нотариусов тоже подходит. Для светлых ниш вроде образования или красоты лучше делать другой шаблон.',
      },
      {
        q: 'Что с SEO?',
        a: 'Шаблон использует статическую генерацию страниц (SSG), что даёт хорошие позиции в поисковой выдаче. Базовая SEO-оптимизация (метатеги, структура заголовков, sitemap) уже внутри. Продвижение и работа с контентом обсуждаются отдельно.',
      },
    ],
  },
  'zotova-portfolio': {
    slug: 'zotova-portfolio',
    metaTitle: 'Портфолио бренд-менеджера: кейс на React + Vite',
    metaDescription:
      'Персональное портфолио для бренд-менеджера. Уникальный React-сайт с эстетикой скрапбукинга, плавными анимациями и без шаблонного вида. React, Vite, TypeScript.',
    keywords: 'персональный сайт на react, портфолио react, портфолио vite, разработка портфолио, сайт визитка react, портфолио без шаблона',
    h1: 'Персональное портфолио для бренд-менеджера',
    tagline: 'Заказное React-приложение со скрапбукинг-эстетикой',
    category: 'Личный сайт',
    year: '2025',
    client: 'Анастасия Зотова',
    industry: 'Бренд-менеджмент',
    role: ['UI/UX дизайн', 'Frontend-разработка', 'Анимации', 'Деплой'],
    intro: [
      'Анастасия бренд-менеджер, ей нужно было портфолио, которое визуально передаёт характер, а не очередной минималистичный шаблон. Задача: уникальный сайт, быстро грузится, удобно обновлять контент.',
      'У бренд-менеджера портфолио это рабочий инструмент: его смотрят потенциальные работодатели и клиенты. Шаблон с биржи фриланса проигрывает по доверию. Поэтому сразу решили делать на коде, с продуманной визуальной идентикой.',
    ],
    sections: [
      {
        heading: 'Что нужно было сделать',
        paragraphs: [
          'Сайт, который выделяется среди типичных Behance-клонов. Визуальный стиль со скрапбукинг-эффектом: текстуры, наклонённые фото, рукописные элементы. Анимации при скролле, которые удивляют, но не тормозят сайт.',
          'Дополнительно: вёрстка под мобильные без потери ощущения «крафта» и быстрый деплой, чтобы можно было показывать новые проекты сразу после их завершения.',
        ],
      },
      {
        heading: 'Что было реализовано',
        paragraphs: [
          'Кастомное одностраничное React-приложение со smooth-скроллом, параллакс-эффектами и ленивой загрузкой медиа. Каждая секция собрана вручную и выглядит как разворот журнала. CSS-анимации выверены так, чтобы не убивать производительность на мобильных.',
        ],
        list: [
          'Уникальный дизайн под её бренд',
          'Плавные анимации при скролле и параллакс',
          'Ленивая загрузка тяжёлых изображений',
          'Mobile-first адаптивная вёрстка',
          'Деплой на Vercel с автоматическим CI',
        ],
      },
      {
        heading: 'Стек и почему такой',
        paragraphs: [
          'React + Vite + TypeScript. Vite для быстрой сборки и горячей перезагрузки в разработке. TypeScript защищает от опечаток и облегчает рефакторинг. Vercel для деплоя: коммит в GitHub автоматически разворачивает обновление за минуту.',
        ],
      },
    ],
    faq: [
      { q: 'Сколько времени заняла разработка?', a: 'Около 3 недель от старта до деплоя, включая итерации по визуальному стилю.' },
      { q: 'Почему React, а не Tilda для портфолио?', a: 'Tilda дала бы шаблонный вид и ограничила в анимациях. Бриф требовал кастомного ощущения, оправдывающего разработку на коде.' },
      { q: 'Сколько стоит такой сайт?', a: 'Аналогичное портфолио на React в 2026 году обходится в 60-120 тысяч рублей в зависимости от сложности анимаций и контента.' },
    ],
  },
  'dreamyvoice': {
    slug: 'dreamyvoice',
    metaTitle: 'DreamyVoice: платформа для команды озвучки на Next.js | Кейс',
    metaDescription:
      'Платформа для команды аниме-озвучки: каталог тайтлов, страницы релизов с плеером, избранное, рандом, админка для редакторов. Next.js, Prisma, PostgreSQL.',
    keywords: 'разработка платформы next.js, каталог сайт next.js, аниме сайт разработка, плеер на сайте, кастомная админка next.js, prisma postgresql разработка',
    h1: 'Платформа для команды аниме-озвучки',
    tagline: 'Next.js-каталог с админкой, плеером и избранным',
    category: 'Веб-платформа',
    year: '2025',
    client: 'DreamyVoice',
    industry: 'Развлечения',
    role: ['Архитектура', 'Frontend', 'Backend', 'Админ-панель', 'Деплой'],
    intro: [
      'DreamyVoice это команда аниме-озвучки, которой нужна была настоящая платформа, а не блог. Редакторы должны были сами добавлять тайтлы и эпизоды, зрители быстро находить релизы и смотреть прямо на сайте.',
      'Главное отличие от блога: контента много, он структурирован, и у каждого тайтла есть свой набор эпизодов и метаданных. Простой WordPress тут не справился бы без боли с кастомными типами и плеером.',
    ],
    sections: [
      {
        heading: 'Что нужно было сделать',
        paragraphs: [
          'Каталог тайтлов с фильтрами, поиском и сортировкой. Страницы релизов со встроенным плеером. Возможность отметить тайтл в избранное и кнопка случайного тайтла для тех, кто не знает что посмотреть.',
          'Для редакторов нужна была удобная админка, в которой человек без программистских знаний может публиковать обновления каждый день. С ролями и правами доступа, чтобы разные участники команды видели только своё.',
        ],
      },
      {
        heading: 'Что было реализовано',
        paragraphs: [
          'Next.js приложение с серверным рендерингом для быстрой первой загрузки и хорошей индексации. PostgreSQL для каталога, Prisma как типобезопасный слой работы с базой. Кастомная админ-панель с ролевым доступом.',
        ],
        list: [
          'Каталог тайтлов с фильтрами и поиском',
          'Страницы релизов со встроенным плеером',
          'Избранное и случайный тайтл одним кликом',
          'Кастомная админ-панель для редакторов',
          'Ролевая модель доступа',
          'Оптимизация изображений и ленивая загрузка',
        ],
      },
      {
        heading: 'Стек и почему такой',
        paragraphs: [
          'Next.js + TypeScript + Prisma + PostgreSQL. Next.js даёт серверный рендеринг для SEO и быстрый клиентский опыт. Prisma облегчает работу с базой и защищает от ошибок в запросах. PostgreSQL для надёжного хранения сложной связанной структуры тайтлов и эпизодов.',
        ],
      },
    ],
    faq: [
      { q: 'Почему Next.js, а не WordPress?', a: 'WordPress не справился бы с кастомными типами данных и встроенным плеером без боли и тяжёлых плагинов. Next.js дал полный контроль над данными и более быстрый, app-подобный опыт.' },
      { q: 'Как защищена админка?', a: 'Ролевая аутентификация: войти могут только приглашённые редакторы, с разделением прав на редакторов и админов.' },
      { q: 'Сколько стоит подобная платформа?', a: 'Похожая платформа на Next.js со своей админкой в 2026 году обходится от 200 до 400 тысяч рублей в зависимости от объёма функций.' },
    ],
  },
  'unemployment-team': {
    slug: 'unemployment-team',
    metaTitle: 'unemployment.team: двуязычный сайт студии на Next.js | Кейс',
    metaDescription:
      'Сайт нашей команды: услуги, портфолио, блог, многошаговая форма заявки. Двуязычный сайт на Next.js со своей CMS и аналитикой. Версии RU и EN.',
    keywords: 'сайт студии next.js, сайт агентства разработка, двуязычный сайт next.js, многошаговая форма next.js, портфолио сайт next.js',
    h1: 'Двуязычный сайт студии с многошаговой формой',
    tagline: 'Наш собственный сайт команды: услуги, портфолио, блог, умная заявка',
    category: 'Сайт студии',
    year: '2025',
    client: 'unemployment.team',
    industry: 'Веб-разработка',
    role: ['Архитектура', 'Frontend', 'Backend', 'Контент', 'SEO'],
    intro: [
      'unemployment.team это студия, которую я сооснователь. Сайт это наша собственная витрина: мы хотели на своём примере показать клиентам качество, которое доставляем им.',
      'Логика простая: если ты делаешь сайты бизнесу, твой собственный сайт должен быть эталоном. По нему нас оценивают раньше, чем мы успеем что-то сказать.',
    ],
    sections: [
      {
        heading: 'Что нужно было сделать',
        paragraphs: [
          'Сайт студии, который быстро завоёвывает доверие и собирает структурированные заявки. Двуязычный контент для работы с международными клиентами. Быстрая загрузка и чёткое позиционирование без воды.',
          'Дополнительно: форма заявки, которая не отпугивает многословностью, и блог с реальными техническими и бизнес-постами от команды.',
        ],
      },
      {
        heading: 'Что было реализовано',
        paragraphs: [
          'Next.js приложение с двуязычным роутингом, серверно-рендеримыми страницами для SEO и кастомной многошаговой формой заявки. Форма собирает детали проекта постепенно, без перегрузки человека длинной анкетой.',
        ],
        list: [
          'Двуязычная структура (RU и EN)',
          'Серверный рендеринг для быстрой индексации',
          'Многошаговая форма заявки с прогресс-баром',
          'Портфолио с кейсами проектов',
          'Блог с техническими и бизнес-постами',
        ],
      },
    ],
    faq: [
      { q: 'Зачем делать двуязычный сайт?', a: 'Чтобы работать и с русскими, и с международными клиентами без разделения бренда между двумя доменами.' },
      { q: 'Почему многошаговая форма, а не одна большая?', a: 'У многошаговой формы выше конверсия в B2B, потому что она ощущается менее пугающей, чем длинная одношаговая анкета.' },
      { q: 'Сколько стоит сайт студии такого уровня?', a: 'Аналогичный сайт студии в 2026 году обходится от 150 до 300 тысяч рублей в зависимости от объёма контента и интеграций.' },
    ],
  },
  'medequip': {
    slug: 'medequip',
    metaTitle: 'Шаблон корпоративного B2B-сайта на Next.js: кейс МедЭквип',
    metaDescription:
      'Готовый шаблон корпоративного сайта поставщика на Next.js: каталог, сегментированные решения, форма запроса цены. Адаптирую под ваш бизнес от 70 тысяч рублей.',
    keywords: 'шаблон корпоративного сайта, корпоративный сайт next.js, сайт поставщика оборудования, b2b сайт под ключ, шаблон сайта компании, адаптация шаблона сайта',
    h1: 'Корпоративный сайт поставщика медоборудования: готовый шаблон',
    tagline: 'B2B-шаблон на Next.js, который адаптирую под вашу компанию',
    category: 'Корпоративный сайт + готовый шаблон',
    year: '2025',
    client: 'МедЭквип',
    industry: 'Медицинское оборудование',
    role: ['Архитектура', 'Frontend', 'Формы', 'Деплой', 'Шаблонизация'],
    intro: [
      'Корпоративный сайт для поставщика медицинского оборудования. Аудитория это закупщики клиник и менеджеры медицинских учреждений, поэтому сайт должен был быстро доносить экспертизу, ассортимент и сертификации.',
      'Важный момент: этот сайт также служит готовым шаблоном, который я адаптирую под другие B2B-компании в смежных нишах. Если у вас бизнес со схожей структурой (поставки оборудования, сложные продукты, аудитория закупщиков), вы получаете готовый каркас и платите только за кастомизацию.',
    ],
    sections: [
      {
        heading: 'Что нужно было сделать',
        paragraphs: [
          'Сайт, на котором закупщик за минуту находит товар или решение для своего сегмента. Каталог с фильтрами, отдельные страницы решений по сегментам (клиники, лаборатории, больницы), форма запроса цены, которая не отпугивает.',
          'Дополнительно: понятная навигация для людей разной технической подкованности и форма обратной связи, которая попадает прямо в CRM клиента, а не теряется в почте.',
        ],
      },
      {
        heading: 'Что было реализовано',
        paragraphs: [
          'Next.js корпоративный сайт с каталогом продукции, сегментированными лендингами и конверсионными формами. Архитектура изначально проектировалась так, чтобы её можно было переиспользовать для других B2B-поставщиков.',
        ],
        list: [
          'Каталог продукции с фильтрами',
          'Страницы решений по сегментам клиентов',
          'Форма запроса цены с маршрутизацией заявок',
          'Быстрая загрузка и SEO-готовность',
          'Адаптивная вёрстка под все устройства',
          'Интеграция с CRM и почтой клиента',
        ],
      },
      {
        heading: 'Этот сайт можно использовать как шаблон',
        paragraphs: [
          'Если у вас похожий B2B-бизнес и нужен сайт быстро, имеет смысл адаптировать готовый шаблон, а не делать всё с нуля. Меняем визуал под ваш бренд, переписываем контент, подключаем ваши интеграции и платёжные системы. Архитектура и логика уже отлажены на боевом проекте.',
          'Адаптация шаблона выходит в полтора-два раза дешевле и быстрее, чем разработка с нуля. Получаете уровень решения как у крупных компаний, но за бюджет малого бизнеса.',
        ],
        list: [
          'Адаптация шаблона: от 70 тысяч рублей',
          'Срок запуска: 2-3 недели вместо 6-8',
          'Готовая архитектура с продуманной структурой URL и SEO',
          'Кастомизация под ваш бренд, продуктовую линейку и сегменты клиентов',
          'Подключение вашей CRM, аналитики и платежей',
        ],
      },
      {
        heading: 'Стек и почему такой',
        paragraphs: [
          'Next.js + TypeScript + Tailwind + Node.js. Серверный рендеринг даёт хорошую индексацию в Яндексе и Google. Tailwind ускоряет работу с дизайном на этапе кастомизации шаблона. Node.js на бэке для форм и интеграций с CRM.',
        ],
      },
    ],
    faq: [
      { q: 'Подойдёт ли этот шаблон моему бизнесу?', a: 'Шаблон рассчитан на B2B-поставщиков и компании со сложными продуктами: оборудование, услуги по сегментам, корпоративные решения. Если у вас похожая структура (каталог + сегменты клиентов + форма запроса цены), шаблон подойдёт. Если бизнес сильно отличается, сделаем с нуля.' },
      { q: 'Сколько стоит адаптация шаблона?', a: 'От 70 тысяч рублей в зависимости от объёма правок. В стоимость входит: визуальная адаптация под ваш бренд, контент, подключение CRM и аналитики, размещение на вашем домене. Точную цену скажу после короткого обсуждения задачи.' },
      { q: 'Можно ли использовать как шаблон без меня?', a: 'Нет, шаблон не продаётся отдельно. Я адаптирую его под конкретный бизнес сам и потом передаю клиенту работающий сайт. Так гарантирую, что всё корректно настроено и работает.' },
      { q: 'Как форма заявки подключена?', a: 'Формы напрямую попадают в CRM клиента или на почту, защищены reCAPTCHA от спама. При адаптации подключим к вашей системе.' },
      { q: 'Сколько стоит такой сайт с нуля для сравнения?', a: 'С нуля корпоративный сайт на Next.js обойдётся в 120-220 тысяч рублей и займёт 6-8 недель. Адаптация шаблона дешевле и быстрее в 1.5-2 раза.' },
    ],
  },
  'ramki-magazine': {
    slug: 'ramki-magazine',
    metaTitle: 'Журнал РАМКИ: кастомная тема WordPress для бизнес-журнала | Кейс',
    metaDescription:
      'Деловой онлайн-журнал на WordPress с кастомной темой и Elementor: архив выпусков, мультисекционная экосистема, подписка на рассылку. Удобная CMS для редакторов.',
    keywords: 'кастомная тема wordpress, разработка темы wordpress, онлайн журнал wordpress, бизнес журнал сайт, elementor разработка темы',
    h1: 'Деловой онлайн-журнал на WordPress',
    tagline: 'Кастомная тема, Elementor, архив выпусков и рассылка',
    category: 'Онлайн-журнал',
    year: '2025',
    client: 'Журнал РАМКИ',
    industry: 'Медиа',
    role: ['Кастомная тема WordPress', 'Интеграция Elementor', 'Архитектура CMS'],
    intro: [
      'Деловой онлайн-журнал, которому нужна была редакционная скорость без потери фирменного стиля. Редакторы должны были публиковать ежедневно и собирать featured-страницы без участия разработчика.',
      'Главный конфликт медиа-продуктов: гибкость дизайна против скорости публикации. Кастомная тема плюс Elementor решает это компромиссом: каркас контролирует разработчик, верстку лонгридов и спецпроектов делают редакторы.',
    ],
    sections: [
      {
        heading: 'Что нужно было сделать',
        paragraphs: [
          'Журнал, который выглядит на заказ, но живёт на CMS, которую редакторы уже знают. Визуальный ритм единый по всем рубрикам, быстрая загрузка, чистый опыт чтения без отвлекающих элементов.',
          'Дополнительно: архив выпусков с фильтрами по году и тематике, форма подписки на рассылку с сегментацией аудитории.',
        ],
      },
      {
        heading: 'Что было реализовано',
        paragraphs: [
          'Кастомная тема WordPress, написанная под бренд журнала, интегрированная с Elementor для возможности сборки featured-страниц без кода. Архив выпусков с богатой фильтрацией, мультисекционная экосистема, подписка с сегментацией.',
        ],
        list: [
          'Кастомная тема под бренд журнала',
          'Интеграция Elementor для нетехнических редакторов',
          'Архив выпусков с фильтрами',
          'Подписка на рассылку с сегментацией',
          'Оптимизация скорости для медиа-страниц',
        ],
      },
    ],
    faq: [
      { q: 'Почему WordPress, а не своя CMS?', a: 'WordPress с Elementor позволяет редакторам публиковать ежедневно без зависимости от разработчика. Для медиа-продукта редакционная скорость важнее теоретического выигрыша в производительности от своей CMS.' },
      { q: 'Насколько быстро грузится с медиа?', a: 'Оптимизация изображений, ленивая загрузка и точечное кэширование держат время загрузки на конкурентном уровне даже для лонгридов.' },
      { q: 'Сколько стоит сайт-журнал?', a: 'Журнал на WordPress с кастомной темой и Elementor обходится в 100-200 тысяч рублей в зависимости от объёма функционала и сложности дизайна.' },
    ],
  },
  'ccc-holistic-medicine': {
    slug: 'ccc-holistic-medicine',
    metaTitle: 'Сайт центра холистической медицины: WordPress + WooCommerce | Кейс',
    metaDescription:
      'Сайт центра холистической медицины на WordPress с ACF, магазином WooCommerce, многошаговой формой записи на приём и блогом. Удобная CMS, онлайн-запись.',
    keywords: 'сайт медицинского центра, woocommerce сайт wordpress, форма записи на сайт, acf поля wordpress, разработка сайта клиника',
    h1: 'Сайт центра холистической медицины',
    tagline: 'WordPress + ACF + WooCommerce: магазин, запись, блог',
    category: 'Сайт медицинского центра',
    year: '2025',
    client: 'Центр Целостности Человека',
    industry: 'Холистическая медицина',
    role: ['Разработка на WordPress', 'Настройка WooCommerce', 'Кастомные формы', 'Архитектура ACF'],
    intro: [
      'Сайт центра холистической медицины, который совмещал три роли: информационный портал, интернет-магазин и платформа онлайн-записи. Команде нужен был полный контроль над контентом без зависимости от разработчика для рутинных обновлений.',
      'Сложность была в том, чтобы три разные функции не превратили сайт в кашу. Каждая часть должна работать на свою аудиторию: посетители ищут информацию о методах, покупатели смотрят товары, клиенты записываются на приём.',
    ],
    sections: [
      {
        heading: 'Что нужно было сделать',
        paragraphs: [
          'Сайт, который объясняет методы, позволяет записаться на консультацию онлайн и продаёт сопутствующие товары. Редакторы должны управлять всем сами: описания услуг, профили специалистов, товары и контент блога.',
          'Дополнительно: единый бренд-опыт во всех разделах, без ощущения, что магазин и информационная часть это два разных сайта.',
        ],
      },
      {
        heading: 'Что было реализовано',
        paragraphs: [
          'Сайт на WordPress с кастомными типами записей и полями через ACF для чистого моделирования контента, WooCommerce для магазина товаров, кастомная многошаговая форма записи на онлайн-приёмы. Удобная админка, чтобы команда управляла всем сама.',
        ],
        list: [
          'Кастомные типы записей для услуг и специалистов',
          'ACF для структурированных полей контента',
          'Магазин WooCommerce с интеграцией оплаты',
          'Многошаговая форма онлайн-записи',
          'Блог для контент-маркетинга',
          'Удобная админка без зависимости от разработчика',
        ],
      },
    ],
    faq: [
      { q: 'Как реализована онлайн-запись?', a: 'Кастомная многошаговая форма собирает предпочтения клиента, выбор свободного слота и контактные данные, затем маршрутизирует к нужному специалисту через email и CRM.' },
      { q: 'Зачем совмещать WooCommerce и запись на одном сайте?', a: 'Для холистического центра услуги и товары работают на одного клиента. Один сайт это одна воронка и единый бренд-опыт вместо распыления внимания.' },
      { q: 'Сколько стоит сайт медицинского центра?', a: 'Сайт медицинского центра с магазином и записью на WordPress в 2026 году обходится в 120-250 тысяч рублей в зависимости от количества услуг и сложности форм.' },
    ],
  },
}

export const projectsDetails = { ru, en }

export function getProjectDetail(lang: 'ru' | 'en', slug: string): ProjectDetail | undefined {
  return projectsDetails[lang][slug]
}

export function getProjectSlugs(): string[] {
  return Object.keys(projectsDetails.ru)
}
