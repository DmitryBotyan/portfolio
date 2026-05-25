import { useState } from 'react'
import { Button } from '@/components/retroui/Button'
import { Input } from '@/components/retroui/Input'
import { Textarea } from '@/components/retroui/Textarea'
import { Send, Mail, Check } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { useLegal } from '@/components/Legal'
import { getRecaptchaToken } from '@/hooks/useRecaptcha'
import { goal } from '@/lib/metrika'

const iconMap = {
  telegram: Send,
  mail: Mail,
}

export function Contact() {
  const { t } = useApp()
  const { contact } = t
  const { openLegal } = useLegal()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [consent, setConsent] = useState(false)

  const collectMeta = () => {
    try {
      const p = new URLSearchParams(window.location.search)
      return {
        url: window.location.href,
        path: window.location.pathname + window.location.search,
        referrer: document.referrer || '',
        utm: {
          utm_source: p.get('utm_source') || '',
          utm_medium: p.get('utm_medium') || '',
          utm_campaign: p.get('utm_campaign') || '',
          utm_term: p.get('utm_term') || '',
          utm_content: p.get('utm_content') || '',
        },
        lang: navigator.language || '',
        screen: `${window.screen.width}×${window.screen.height}`,
        viewport: `${window.innerWidth}×${window.innerHeight}`,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      }
    } catch {
      return {}
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent || status === 'sending') return
    setStatus('sending')
    goal('form_submit_attempt')
    try {
      const token = await getRecaptchaToken('contact')
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, token, meta: collectMeta() }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      goal('form_submit_success')
      setForm({ name: '', email: '', message: '' })
      setConsent(false)
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      goal('form_submit_error')
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  const submitLabel =
    status === 'sending' ? contact.form.submitSending :
    status === 'sent'    ? contact.form.submitSent :
                           contact.form.submitIdle

  return (
    <section id="contact" className="relative border-b-2 border-border overflow-hidden bg-muted dark:bg-background">
<div className="px-6 sm:px-8 md:px-16 lg:px-24 py-20 md:py-28">
        {/* Heading */}
        <div className="mb-16">
          <h2 className="font-head text-4xl md:text-6xl font-black tracking-tight mb-3">
            {contact.heading}
          </h2>
          <p className="font-sans text-muted-foreground max-w-md text-sm md:text-base">{contact.subheading}</p>
        </div>

        <div className="max-w-5xl grid md:grid-cols-2 gap-16">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="font-head text-[10px] font-bold uppercase tracking-[0.15em] block">
                {contact.form.nameLabel}
              </label>
              <Input id="name" value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder={contact.form.namePlaceholder} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="font-head text-[10px] font-bold uppercase tracking-[0.15em] block">
                {contact.form.emailLabel}
              </label>
              <Input id="email" type="email" value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder={contact.form.emailPlaceholder} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="font-head text-[10px] font-bold uppercase tracking-[0.15em] block">
                {contact.form.messageLabel}
              </label>
              <Textarea id="message" value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder={contact.form.messagePlaceholder} required rows={5} />
            </div>
            <label className="flex items-start gap-3 cursor-pointer select-none group">
              <span className="relative shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  aria-required="true"
                  className="peer sr-only"
                />
                <span className="block w-5 h-5 border-2 border-border bg-background shadow-[2px_2px_0px_0px_var(--border)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent transition-all group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[3px_3px_0px_0px_var(--border)] peer-checked:bg-accent peer-checked:border-accent" />
                <Check
                  size={14}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent-foreground opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                  strokeWidth={3}
                />
              </span>
              <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                {contact.form.consentBefore}
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); openLegal('privacy') }}
                  className="underline underline-offset-2 decoration-from-font hover:text-foreground transition-colors"
                >
                  {contact.form.consentPrivacy}
                </button>
                {contact.form.consentMiddle}
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); openLegal('consent') }}
                  className="underline underline-offset-2 decoration-from-font hover:text-foreground transition-colors"
                >
                  {contact.form.consentConsent}
                </button>
                {contact.form.consentAfter}
              </span>
            </label>

            <Button type="submit" disabled={!consent || status === 'sending' || status === 'sent'}
              className="w-full disabled:opacity-50 disabled:cursor-not-allowed" variant="default" size="lg">
              {(status === 'idle' || status === 'error') && <Send size={16} />}
              {submitLabel}
            </Button>

            {!consent && (
              <p className="font-sans text-[11px] text-muted-foreground leading-relaxed">
                {contact.form.consentRequired}
              </p>
            )}

            {status === 'error' && (
              <p className="font-sans text-[11px] text-accent leading-relaxed">
                {contact.form.submitError}
              </p>
            )}

            <p className="font-sans text-[10px] text-muted-foreground/70 leading-relaxed">
              {contact.form.recaptchaBefore}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground transition-colors">
                {contact.form.recaptchaPrivacy}
              </a>
              {contact.form.recaptchaMiddle}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground transition-colors">
                {contact.form.recaptchaTerms}
              </a>
              {contact.form.recaptchaAfter}
            </p>
          </form>

          {/* Contacts sidebar */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-head text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">{contact.directLabel}</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <a href={`mailto:${contact.email}`}
                onClick={() => goal('email_click', { source: 'contact' })}
                className="font-head text-lg md:text-xl font-black hover:text-muted-foreground transition-colors group flex items-center gap-2">
                {contact.email}
              </a>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-head text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">{contact.socialsLabel}</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="space-y-3">
                {contact.socials.map(({ label, href, icon }) => {
                  const Icon = iconMap[icon as keyof typeof iconMap]
                  const onSocialClick = () => {
                    if (icon === 'telegram') goal('telegram_click', { source: 'contact' })
                    else if (icon === 'mail') goal('email_click', { source: 'contact' })
                  }
                  return (
                    <a key={label} href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                      onClick={onSocialClick}
                      className="flex items-center gap-3 group">
                      <span className="p-2 border-2 border-border shadow-[3px_3px_0px_0px_var(--border)] group-hover:shadow-none group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all">
                        <Icon size={16} />
                      </span>
                      <span className="font-head text-sm font-bold group-hover:text-muted-foreground transition-colors">{label}</span>
                    </a>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
