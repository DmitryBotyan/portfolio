// Vercel serverless function: verifies reCAPTCHA v3 and forwards an enriched lead to Telegram.
// Env vars (Vercel → Settings → Environment Variables):
//   RECAPTCHA_SECRET   — reCAPTCHA v3 secret key
//   TELEGRAM_BOT_TOKEN — bot token from @BotFather
//   TELEGRAM_CHAT_ID   — chat id to receive leads
//   RECAPTCHA_MIN_SCORE (optional, default 0.5)

const MAX_LEN = 5000

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function firstHeader(v: string | string[] | undefined): string {
  if (Array.isArray(v)) return v[0] ?? ''
  return v ?? ''
}

function parseUserAgent(ua: string) {
  if (!ua) return { device: 'неизвестно', os: '', browser: '' }

  const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(ua)

  let os = ''
  if (/Windows NT 10/i.test(ua)) os = 'Windows 10/11'
  else if (/Windows/i.test(ua)) os = 'Windows'
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS'
  else if (/Mac OS X/i.test(ua)) os = 'macOS'
  else if (/Android/i.test(ua)) os = 'Android'
  else if (/Linux/i.test(ua)) os = 'Linux'

  let browser = ''
  if (/YaBrowser/i.test(ua)) browser = 'Yandex'
  else if (/Edg/i.test(ua)) browser = 'Edge'
  else if (/OPR|Opera/i.test(ua)) browser = 'Opera'
  else if (/Firefox/i.test(ua)) browser = 'Firefox'
  else if (/Chrome/i.test(ua)) browser = 'Chrome'
  else if (/Safari/i.test(ua)) browser = 'Safari'

  return {
    device: isMobile ? 'мобильный' : 'десктоп',
    os,
    browser,
  }
}

const COUNTRY_NAMES: Record<string, string> = {
  RU: 'Россия', UA: 'Украина', BY: 'Беларусь', KZ: 'Казахстан',
  US: 'США', DE: 'Германия', GB: 'Великобритания', PL: 'Польша',
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { body = {} }
  }
  const name = String(body?.name ?? '').trim().slice(0, 200)
  const email = String(body?.email ?? '').trim().slice(0, 200)
  const message = String(body?.message ?? '').trim().slice(0, MAX_LEN)
  const token = String(body?.token ?? '')
  const meta = body?.meta ?? {}

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }

  // ── reCAPTCHA verification ──────────────────────────────
  let score: number | null = null
  const secret = process.env.RECAPTCHA_SECRET
  if (secret) {
    if (!token) {
      res.status(400).json({ error: 'Missing captcha token' })
      return
    }
    try {
      const params = new URLSearchParams({ secret, response: token })
      const vr = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      })
      const verify: any = await vr.json()
      const min = Number(process.env.RECAPTCHA_MIN_SCORE ?? '0.5')
      if (typeof verify.score === 'number') score = verify.score
      if (!verify.success || (typeof verify.score === 'number' && verify.score < min)) {
        res.status(403).json({ error: 'Captcha verification failed' })
        return
      }
    } catch {
      res.status(502).json({ error: 'Captcha service unavailable' })
      return
    }
  }

  // ── Request metadata (Vercel geo headers, IP, UA) ───────
  const h = req.headers ?? {}
  const ip =
    firstHeader(h['x-real-ip']) ||
    firstHeader(h['x-forwarded-for']).split(',')[0].trim() ||
    ''
  const ua = firstHeader(h['user-agent'])
  const { device, os, browser } = parseUserAgent(ua)
  const countryCode = firstHeader(h['x-vercel-ip-country'])
  const country = COUNTRY_NAMES[countryCode] || countryCode || ''
  const region = decodeURIComponent(firstHeader(h['x-vercel-ip-country-region']) || '')
  const cityRaw = firstHeader(h['x-vercel-ip-city'])
  const city = cityRaw ? decodeURIComponent(cityRaw) : ''

  const geoParts = [city, region, country].filter(Boolean)
  const geo = geoParts.length ? geoParts.join(', ') : '—'

  const deviceParts = [device, os, browser].filter(Boolean)
  const deviceStr = deviceParts.length ? deviceParts.join(' · ') : '—'

  // ── Client-supplied meta (page, referrer, UTM, screen) ──
  const utm = meta?.utm ?? {}
  const utmPairs = Object.entries(utm)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k.replace('utm_', '')}: ${escapeHtml(String(v))}`)
  const referrer = String(meta?.referrer ?? '').trim()
  const page = String(meta?.path ?? meta?.url ?? '').trim()
  const lang = String(meta?.lang ?? '').trim()
  const screen = String(meta?.screen ?? '').trim()
  const viewport = String(meta?.viewport ?? '').trim()
  const clientTz = String(meta?.tz ?? '').trim()

  const now = new Date()
  const msk = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow', day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(now)

  // ── Telegram delivery ───────────────────────────────────
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!botToken || !chatId) {
    res.status(500).json({ error: 'Server not configured' })
    return
  }

  const lines: string[] = [
    '<b>🆕 Новая заявка с сайта</b>',
    '',
    `<b>👤 Имя:</b> ${escapeHtml(name)}`,
    `<b>✉️ Email:</b> ${escapeHtml(email)}`,
    '',
    `<b>💬 Сообщение:</b>`,
    escapeHtml(message),
    '',
    '<b>— Аналитика —</b>',
    `🕐 <b>Время (МСК):</b> ${msk}`,
    `📄 <b>Страница:</b> ${escapeHtml(page || '/')}`,
    `🔗 <b>Источник:</b> ${referrer ? escapeHtml(referrer) : 'прямой заход'}`,
  ]

  if (utmPairs.length) lines.push(`🏷 <b>UTM:</b> ${utmPairs.join(' · ')}`)

  lines.push(`📍 <b>Гео:</b> ${escapeHtml(geo)}`)
  lines.push(`🖥 <b>Устройство:</b> ${escapeHtml(deviceStr)}`)
  if (screen) lines.push(`📐 <b>Экран:</b> ${escapeHtml(screen)}${viewport ? ` (видимая ${escapeHtml(viewport)})` : ''}`)
  if (lang) lines.push(`🌐 <b>Язык:</b> ${escapeHtml(lang)}`)
  if (clientTz) lines.push(`⏰ <b>Часовой пояс:</b> ${escapeHtml(clientTz)}`)
  if (ip) lines.push(`🌍 <b>IP:</b> <code>${escapeHtml(ip)}</code>`)
  if (score !== null) lines.push(`🛡 <b>reCAPTCHA score:</b> ${score}`)

  const text = lines.join('\n')

  try {
    const tg = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })
    if (!tg.ok) {
      res.status(502).json({ error: 'Failed to deliver' })
      return
    }
  } catch {
    res.status(502).json({ error: 'Failed to deliver' })
    return
  }

  res.status(200).json({ ok: true })
}
