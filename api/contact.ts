// Vercel serverless function: verifies reCAPTCHA v3 and forwards the lead to Telegram.
// Env vars (set in Vercel → Settings → Environment Variables):
//   RECAPTCHA_SECRET   — reCAPTCHA v3 secret key
//   TELEGRAM_BOT_TOKEN — bot token from @BotFather
//   TELEGRAM_CHAT_ID   — chat id to receive leads
//   RECAPTCHA_MIN_SCORE (optional, default 0.5)

const MAX_LEN = 5000

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
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

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }

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
      if (!verify.success || (typeof verify.score === 'number' && verify.score < min)) {
        res.status(403).json({ error: 'Captcha verification failed' })
        return
      }
    } catch {
      res.status(502).json({ error: 'Captcha service unavailable' })
      return
    }
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!botToken || !chatId) {
    res.status(500).json({ error: 'Server not configured' })
    return
  }

  const text =
    `<b>🆕 Новая заявка с сайта</b>\n\n` +
    `<b>Имя:</b> ${escapeHtml(name)}\n` +
    `<b>Email:</b> ${escapeHtml(email)}\n\n` +
    `${escapeHtml(message)}`

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
