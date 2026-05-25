import { useEffect, useState } from 'react'
import { X, Cookie } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { useLegal } from '@/components/Legal'
import { Button } from '@/components/retroui/Button'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'cookie-consent'

export function CookieBanner() {
  const { t } = useApp()
  const { cookies } = t
  const { openLegal } = useLegal()
  const [open, setOpen] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (localStorage.getItem(STORAGE_KEY)) return
    } catch { /* ignore */ }
    const id = window.setTimeout(() => setOpen(true), 700)
    return () => window.clearTimeout(id)
  }, [])

  const close = (value: 'accepted' | 'declined') => {
    try { localStorage.setItem(STORAGE_KEY, value) } catch { /* ignore */ }
    setLeaving(true)
    setTimeout(() => setOpen(false), 220)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-label={cookies.heading}
      className={cn(
        'fixed bottom-4 left-4 right-4 sm:left-6 sm:bottom-6 sm:right-auto z-[80] sm:max-w-md',
        'transition-all duration-200',
        leaving
          ? 'opacity-0 translate-y-4'
          : 'opacity-100 translate-y-0'
      )}
    >
      <div className="relative bg-background border-2 border-border shadow-[6px_6px_0px_0px_var(--border)] p-5 sm:p-6">
        <button
          type="button"
          onClick={() => close('declined')}
          aria-label={cookies.decline}
          className="absolute top-3 right-3 p-1.5 border-2 border-border bg-background shadow-[2px_2px_0px_0px_var(--border)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
        >
          <X size={12} strokeWidth={2.5} />
        </button>

        <div className="flex items-start gap-3 mb-3 pr-8">
          <span className="shrink-0 w-9 h-9 border-2 border-border bg-accent text-accent-foreground flex items-center justify-center shadow-[2px_2px_0px_0px_var(--border)]">
            <Cookie size={16} strokeWidth={2.4} />
          </span>
          <h2 className="font-head text-base sm:text-lg font-black tracking-tight leading-tight pt-1">
            {cookies.heading}
          </h2>
        </div>

        <p className="font-sans text-[13px] text-muted-foreground leading-relaxed mb-4">
          {cookies.text}{' '}
          <button
            type="button"
            onClick={() => openLegal('privacy')}
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            {cookies.privacyLink}
          </button>
          .
        </p>

        <div className="flex gap-2.5">
          <Button
            size="sm"
            className="flex-1 bg-accent text-accent-foreground border-accent shadow-[3px_3px_0px_0px_var(--border)] hover:shadow-[1px_1px_0px_0px_var(--border)]"
            onClick={() => close('accepted')}
          >
            {cookies.accept}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => close('declined')}
          >
            {cookies.decline}
          </Button>
        </div>
      </div>
    </div>
  )
}
