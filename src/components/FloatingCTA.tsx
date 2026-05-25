import { useEffect, useState } from 'react'
import { Calculator } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { cn } from '@/lib/utils'
import { goal } from '@/lib/metrika'

export function FloatingCTA() {
  const { t } = useApp()
  const { floatingCta } = t
  const [visible, setVisible] = useState(false)
  const [onCalc, setOnCalc]   = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6)
      const calc = document.getElementById('calculator')
      if (calc) {
        const r = calc.getBoundingClientRect()
        setOnCalc(r.top < window.innerHeight * 0.7 && r.bottom > window.innerHeight * 0.3)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onClick = () => {
    goal('cta_click', { source: 'floating' })
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={floatingCta.ariaLabel}
      className={cn(
        'fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 inline-flex items-center gap-2 font-head text-xs md:text-sm font-black uppercase tracking-widest',
        'bg-accent text-accent-foreground border-2 border-border px-4 py-3 md:px-5 md:py-3.5',
        'shadow-[4px_4px_0px_0px_var(--border)] hover:shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none',
        'transition-all duration-200',
        visible && !onCalc
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <Calculator size={16} strokeWidth={2.5} />
      <span className="hidden sm:inline">{floatingCta.label}</span>
      <span className="sm:hidden">{floatingCta.shortLabel}</span>
    </button>
  )
}
