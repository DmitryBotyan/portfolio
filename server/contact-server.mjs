// Standalone contact API for the VPS (TimeWeb). Mirrors api/contact.ts.
// Listens on 127.0.0.1:PORT, nginx proxies /api/contact here.
// Env (from /etc/botyan/contact.env): RECAPTCHA_SECRET, TELEGRAM_BOT_TOKEN,
// TELEGRAM_CHAT_ID, RECAPTCHA_MIN_SCORE (opt), PORT (opt, default 3001).

import { createServer } from 'node:http'

const PORT = Number(process.env.PORT || 3001)
const MAX_LEN = 5000

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const firstHeader = (v) => (Array.isArray(v) ? v[0] ?? '' : v ?? '')

function parseUserAgent(ua) {
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
  return { device: isMobile ? 'мобильный' : 'десктоп', os, browser }
}

const COUNTRY_NAMES = {
  RU: 'Россия', UA: 'Украина', BY: 'Беларусь', KZ: 'Казахстан',
  US: 'США', DE: 'Германия', GB: 'Великобритания', PL: 'Польша',
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = ''
    req.on('data', (c) => {
      data += c
      if (data.length > 1e6) req.destroy()
    })
    req.on('end', () => resolve(data))
  })
}

const server = createServer(async (req, res) => {
  const send = (code, obj) => {
    res.writeHead(code, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(obj))
  }

  if (!req.url || !req.url.startsWith('/api/contact')) {
    send(404, { error: 'Not found' })
    return
  }
  if (req.method === 'GET') { send(200, { ok: true, service: 'contact' }); return }
  if (req.method !== 'POST') { send(405, { error: 'Method not allowed' }); return }

  let body = {}
  try { body = JSON.parse(await readBody(req)) } catch { body = {} }

  const name = String(body?.name ?? '').trim().slice(0, 200)
  const email = String(body?.email ?? '').trim().slice(0, 200)
  const message = String(body?.message ?? '').trim().slice(0, MAX_LEN)
  const token = String(body?.token ?? '')
  const meta = body?.meta ?? {}

  if (!name || !email || !message) { send(400, { error: 'Missing required fields' }); return }

  // reCAPTCHA
  let score = null
  const secret = process.env.RECAPTCHA_SECRET
  if (secret) {
    if (!token) { send(400, { error: 'Missing captcha token' }); return }
    try {
      const params = new URLSearchParams({ secret, response: token })
      const vr = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      })
      const verify = await vr.json()
      const min = Number(process.env.RECAPTCHA_MIN_SCORE ?? '0.5')
      if (typeof verify.score === 'number') score = verify.score
      if (!verify.success || (typeof verify.score === 'number' && verify.score < min)) {
        send(403, { error: 'Captcha verification failed' }); return
      }
    } catch { send(502, { error: 'Captcha service unavailable' }); return }
  }

  // Request metadata
  const h = req.headers ?? {}
  const ip =
    firstHeader(h['x-real-ip']) ||
    firstHeader(h['x-forwarded-for']).split(',')[0].trim() ||
    (req.socket?.remoteAddress ?? '')
  const ua = firstHeader(h['user-agent'])
  const { device, os, browser } = parseUserAgent(ua)

  const utm = meta?.utm ?? {}
  const utmPairs = Object.entries(utm)
    .filter(([, v]) => v)
    .map(([k, v]) => `${String(k).replace('utm_', '')}: ${escapeHtml(String(v))}`)
  const referrer = String(meta?.referrer ?? '').trim()
  const page = String(meta?.path ?? meta?.url ?? '').trim()
  const lang = String(meta?.lang ?? '').trim()
  const screen = String(meta?.screen ?? '').trim()
  const viewport = String(meta?.viewport ?? '').trim()
  const clientTz = String(meta?.tz ?? '').trim()

  const msk = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow', day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date())

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!botToken || !chatId) { send(500, { error: 'Server not configured' }); return }

  const lines = [
    '<b>🆕 Новая заявка с сайта</b>',
    '',
    `<b>👤 Имя:</b> ${escapeHtml(name)}`,
    `<b>✉️ Email:</b> ${escapeHtml(email)}`,
    '',
    '<b>💬 Сообщение:</b>',
    escapeHtml(message),
    '',
    '<b>- Аналитика -</b>',
    `🕐 <b>Время (МСК):</b> ${msk}`,
    `📄 <b>Страница:</b> ${escapeHtml(page || '/')}`,
    `🔗 <b>Источник:</b> ${referrer ? escapeHtml(referrer) : 'прямой заход'}`,
  ]
  if (utmPairs.length) lines.push(`🏷 <b>UTM:</b> ${utmPairs.join(' · ')}`)
  const deviceStr = [device, os, browser].filter(Boolean).join(' · ') || '-'
  lines.push(`🖥 <b>Устройство:</b> ${escapeHtml(deviceStr)}`)
  if (screen) lines.push(`📐 <b>Экран:</b> ${escapeHtml(screen)}${viewport ? ` (видимая ${escapeHtml(viewport)})` : ''}`)
  if (lang) lines.push(`🌐 <b>Язык:</b> ${escapeHtml(lang)}`)
  if (clientTz) lines.push(`⏰ <b>Часовой пояс:</b> ${escapeHtml(clientTz)}`)
  if (ip) lines.push(`🌍 <b>IP:</b> <code>${escapeHtml(ip)}</code>`)
  if (score !== null) lines.push(`🛡 <b>reCAPTCHA score:</b> ${score}`)

  try {
    const tg = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join('\n'),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })
    if (!tg.ok) { send(502, { error: 'Failed to deliver' }); return }
  } catch { send(502, { error: 'Failed to deliver' }); return }

  send(200, { ok: true })
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`contact-server listening on 127.0.0.1:${PORT}`)
})
