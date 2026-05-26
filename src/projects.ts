export interface ProjectSection {
  heading: string
  paragraphs: string[]
  list?: string[]
}

export interface ProjectFaq {
  q: string
  a: string
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
  // Body
  intro: string[]
  sections: ProjectSection[]
  results?: string[]
  faq: ProjectFaq[]
}

const en: Record<string, ProjectDetail> = {
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
  'zotova-portfolio': {
    slug: 'zotova-portfolio',
    metaTitle: 'Портфолио бренд-менеджера: кейс на React + Vite | Дмитрий Ботян',
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
    metaTitle: 'МедЭквип: корпоративный сайт поставщика медоборудования | Кейс',
    metaDescription:
      'Корпоративный сайт поставщика медицинского оборудования: каталог продукции, страницы решений по сегментам, форма запроса цены. Шаблон для похожих B2B-бизнесов.',
    keywords: 'корпоративный сайт next.js, сайт поставщика оборудования, сайт медицинской компании, b2b сайт разработка, каталог продукции next.js',
    h1: 'Корпоративный сайт поставщика медицинского оборудования',
    tagline: 'B2B корпоративный сайт с каталогом и сегментированными решениями',
    category: 'Корпоративный сайт',
    year: '2025',
    client: 'МедЭквип',
    industry: 'Медицинское оборудование',
    role: ['Архитектура', 'Frontend', 'Формы', 'Деплой'],
    intro: [
      'Корпоративный сайт для поставщика медицинского оборудования. Аудитория это закупщики клиник и менеджеры медицинских учреждений, поэтому сайт должен был быстро доносить экспертизу, ассортимент и сертификации.',
      'У B2B-сайта в медицинской нише особая задача: убедить осторожную аудиторию, что с этой компанией безопасно работать. Контент про надёжность важнее визуальных эффектов.',
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
          'Next.js корпоративный сайт с каталогом продукции, сегментированными лендингами и конверсионными формами. Этот сайт также используется как шаблон для других B2B-поставщиков в смежных нишах: меняем контент, бренд и интеграции, ядро остаётся.',
        ],
        list: [
          'Каталог продукции с фильтрами',
          'Страницы решений по сегментам клиентов',
          'Форма запроса цены с маршрутизацией заявок',
          'Быстрая загрузка и SEO-готовность',
          'Шаблон, адаптируемый под похожие бизнесы',
        ],
      },
    ],
    faq: [
      { q: 'Можно ли использовать как шаблон?', a: 'Да, это один из шаблонов, которые я адаптирую под похожих B2B-поставщиков. Меняется визуал, контент и интеграции, базовая архитектура остаётся. Это снижает стоимость и сроки в полтора-два раза.' },
      { q: 'Как форма заявки подключена?', a: 'Формы напрямую попадают в CRM клиента или на почту, защищены reCAPTCHA от спама.' },
      { q: 'Сколько стоит такой корпоративный сайт?', a: 'С нуля корпоративный сайт на Next.js обойдётся в 120-220 тысяч рублей. Адаптация шаблона дешевле, от 70 тысяч.' },
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
