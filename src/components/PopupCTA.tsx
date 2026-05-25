import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Calculator, Send, Sparkles } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { Button } from '@/components/retroui/Button'

const STORAGE_KEY = 'popup-cta-dismissed'
const SHOW_DELAY_MS = 15000
const SCROLL_TRIGGER = 0.4

export function PopupCTA() {
  const { t } = useApp()
  const { popup, hero } = t
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return

    let opened = false
    const trigger = () => {
      if (opened) return
      opened = true
      setOpen(true)
      cleanup()
    }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max > 0 && window.scrollY / max > SCROLL_TRIGGER) trigger()
    }

    const timer = window.setTimeout(trigger, SHOW_DELAY_MS)
    window.addEventListener('scroll', onScroll, { passive: true })

    function cleanup() {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }

    return cleanup
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss() }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  const dismiss = () => {
    setOpen(false)
    try { sessionStorage.setItem(STORAGE_KEY, '1') } catch { /* ignore */ }
  }

  const goCalculator = () => {
    dismiss()
    setTimeout(() => {
      document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
    }, 60)
  }

  if (!open) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-cta-title"
      className="fixed inset-0 z-[90] flex items-end md:items-center justify-center p-4 md:p-8"
      onClick={dismiss}
    >
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-background border-2 border-border shadow-[6px_6px_0px_0px_var(--accent)]"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label={popup.closeLabel}
          className="absolute top-3 right-3 p-1.5 border-2 border-border bg-background shadow-[2px_2px_0px_0px_var(--border)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
        >
          <X size={14} strokeWidth={2.5} />
        </button>

        <div className="p-6 md:p-8 pt-8">
          <div className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground font-head text-[9px] font-black uppercase tracking-widest px-2 py-1 mb-4 border-2 border-border shadow-[2px_2px_0px_0px_var(--border)]">
            <Sparkles size={10} strokeWidth={3} />
            {popup.subheading}
          </div>

          <h2 id="popup-cta-title" className="font-head text-2xl md:text-3xl font-black tracking-tight leading-tight mb-3">
            {popup.heading}
          </h2>

          <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
            {popup.description}
          </p>

          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full bg-accent text-accent-foreground border-accent shadow-[3px_3px_0px_0px_#0A0A0A] hover:shadow-[1px_1px_0px_0px_#0A0A0A]"
              onClick={goCalculator}
            >
              <Calculator size={16} strokeWidth={2.4} />
              {popup.ctaCalculate}
            </Button>

            <a
              href={hero.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="w-full inline-flex items-center justify-center gap-2 font-head font-medium text-lg bg-background text-foreground border-2 border-border px-6 py-3 shadow-[3px_3px_0px_0px_var(--border)] hover:shadow-[1px_1px_0px_0px_var(--border)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <Send size={16} strokeWidth={2.4} />
              {popup.ctaTelegram}
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
