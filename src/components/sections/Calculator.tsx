import { useMemo, useState } from 'react'
import { Calculator as CalcIcon, RotateCcw, ArrowRight, Check, Sparkles } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { useReveal } from '@/hooks/useReveal'
import { Button } from '@/components/retroui/Button'
import { calculatorBasePrices } from '@/content'
import { cn } from '@/lib/utils'

function formatRub(n: number, lang: 'ru' | 'en') {
  return new Intl.NumberFormat(lang === 'ru' ? 'ru-RU' : 'en-US', {
    maximumFractionDigits: 0,
  }).format(Math.round(n))
}

export function Calculator() {
  const { t, lang } = useApp()
  const { calculator } = t
  const { ref: sectionRef } = useReveal()
  const { ref: gridRef }    = useReveal(0.1)

  const [typeId, setTypeId]     = useState(calculator.types[0].id)
  const [pages, setPages]       = useState(5)
  const [designId, setDesignId] = useState(calculator.designs[1].id)
  const [extras, setExtras]     = useState<string[]>(['analytics'])

  const result = useMemo(() => {
    const base = calculatorBasePrices[typeId] ?? [40000, 80000]
    const design = calculator.designs.find((d) => d.id === designId)?.mult ?? 1
    const extraPages = Math.max(0, pages - 5)
    const pageAdd = extraPages * 5000
    const extrasTotal = extras.reduce((sum, id) => {
      const ex = calculator.extras.find((e) => e.id === id)
      return sum + (ex?.price ?? 0)
    }, 0)
    const min = base[0] * design + pageAdd + extrasTotal
    const max = base[1] * design + pageAdd + extrasTotal
    return [min, max] as const
  }, [typeId, designId, pages, extras, calculator.designs, calculator.extras])

  const reset = () => {
    setTypeId(calculator.types[0].id)
    setPages(5)
    setDesignId(calculator.designs[1].id)
    setExtras(['analytics'])
  }

  const toggleExtra = (id: string) => {
    setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const goContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="calculator"
      className="relative border-b-2 border-border overflow-hidden bg-muted dark:bg-background"
      aria-labelledby="calculator-heading"
    >
      <div ref={sectionRef} data-reveal className="px-6 sm:px-8 md:px-16 lg:px-24 py-14 md:py-20">

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="shrink-0 w-9 h-9 border-2 border-border bg-accent text-accent-foreground flex items-center justify-center shadow-[3px_3px_0px_0px_var(--border)]">
              <CalcIcon size={18} strokeWidth={2.4} />
            </span>
            <h2 id="calculator-heading" className="font-head text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              {calculator.heading}
            </h2>
          </div>
          <p className="font-sans text-muted-foreground max-w-2xl text-sm leading-relaxed">
            {calculator.subheading}
          </p>
        </div>

        <div
          ref={gridRef}
          data-stagger
          className="grid xl:grid-cols-[minmax(0,1fr)_320px] gap-5 xl:gap-6 items-start"
        >

          {/* Inputs */}
          <div className="min-w-0 space-y-5 border-2 border-border bg-background shadow-[4px_4px_0px_0px_var(--border)] p-5 md:p-6">

            {/* Type */}
            <div>
              <label className="font-head text-[10px] font-bold uppercase tracking-[0.15em] block mb-2.5">
                {calculator.typeLabel}
              </label>
              <div className="grid auto-rows-fr grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
                {calculator.types.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setTypeId(type.id)}
                    className={cn(
                      'h-full font-head text-[11px] font-black uppercase tracking-wider px-2.5 py-2 border-2 border-border transition-all text-left leading-tight min-w-0 break-words hyphens-auto',
                      typeId === type.id
                        ? 'bg-foreground text-background shadow-[2px_2px_0px_0px_var(--border)]'
                        : 'bg-background hover:bg-muted hover:shadow-[2px_2px_0px_0px_var(--border)]'
                    )}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pages */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label htmlFor="calc-pages" className="font-head text-[10px] font-bold uppercase tracking-[0.15em]">
                  {calculator.pagesLabel}
                </label>
                <span className="font-head text-xl font-black tabular-nums">{pages}</span>
              </div>
              <input
                id="calc-pages"
                type="range"
                min={1}
                max={30}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full h-2 border-2 border-border bg-background appearance-none cursor-pointer accent-accent
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:bg-accent
                  [&::-webkit-slider-thumb]:border-2
                  [&::-webkit-slider-thumb]:border-border
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:h-4
                  [&::-moz-range-thumb]:bg-accent
                  [&::-moz-range-thumb]:border-2
                  [&::-moz-range-thumb]:border-border
                  [&::-moz-range-thumb]:cursor-pointer"
              />
              <p className="font-sans text-[11px] text-muted-foreground mt-1.5">
                {calculator.pagesHint}
              </p>
            </div>

            {/* Design */}
            <div>
              <label className="font-head text-[10px] font-bold uppercase tracking-[0.15em] block mb-2.5">
                {calculator.designLabel}
              </label>
              <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-3 gap-1.5">
                {calculator.designs.map((design) => (
                  <button
                    key={design.id}
                    type="button"
                    onClick={() => setDesignId(design.id)}
                    className={cn(
                      'h-full font-head text-[11px] font-black uppercase tracking-wider px-2.5 py-2.5 border-2 border-border transition-all text-left leading-tight',
                      designId === design.id
                        ? 'bg-foreground text-background shadow-[2px_2px_0px_0px_var(--border)]'
                        : 'bg-background hover:bg-muted hover:shadow-[2px_2px_0px_0px_var(--border)]'
                    )}
                  >
                    {design.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div>
              <label className="font-head text-[10px] font-bold uppercase tracking-[0.15em] block mb-2.5">
                {calculator.extrasLabel}
              </label>
              <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 gap-1.5">
                {calculator.extras.map((extra) => {
                  const active = extras.includes(extra.id)
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra.id)}
                      className={cn(
                        'h-full flex items-start gap-2.5 px-2.5 py-2 border-2 border-border transition-all text-left',
                        active
                          ? 'bg-accent/15 shadow-[2px_2px_0px_0px_var(--border)]'
                          : 'bg-background hover:bg-muted'
                      )}
                    >
                      <span
                        className={cn(
                          'shrink-0 w-4 h-4 mt-0.5 border-2 border-border flex items-center justify-center transition-colors',
                          active ? 'bg-accent' : 'bg-background'
                        )}
                      >
                        {active && <Check size={10} strokeWidth={3} className="text-accent-foreground" />}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-sans text-[13px] font-semibold leading-tight">{extra.label}</span>
                        <span className="block font-head text-[9px] font-bold uppercase tracking-wider text-muted-foreground mt-0.5">
                          +{formatRub(extra.price, lang)} {calculator.currency}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Result */}
          <aside className="min-w-0 xl:sticky xl:top-20 self-start space-y-3">
            <div className="border-2 border-border bg-foreground text-background shadow-[6px_6px_0px_0px_var(--accent)] p-5">
              <p className="font-head text-[10px] font-bold uppercase tracking-[0.2em] mb-3 opacity-70">
                {calculator.resultLabel}
              </p>
              <div className="font-head font-black tracking-tight leading-none">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-[11px] uppercase tracking-widest opacity-70">{calculator.resultPrefix}</span>
                  <span className="text-2xl md:text-3xl tabular-nums">{formatRub(result[0], lang)}</span>
                </div>
                <div className="flex items-baseline gap-2 flex-wrap mt-1.5">
                  <span className="text-[11px] uppercase tracking-widest opacity-70">{calculator.resultDivider}</span>
                  <span className="text-2xl md:text-3xl text-accent tabular-nums">{formatRub(result[1], lang)}</span>
                  <span className="text-[11px] uppercase tracking-widest opacity-70">{calculator.currency}</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-border bg-background shadow-[4px_4px_0px_0px_var(--border)] p-4">
              <div className="flex items-start gap-2 mb-2">
                <Sparkles size={12} className="text-accent shrink-0 mt-0.5" />
                <p className="font-head text-[9px] font-black uppercase tracking-widest">
                  {calculator.noteTitle}
                </p>
              </div>
              <p className="font-sans text-[11px] text-muted-foreground leading-relaxed">
                {calculator.noteText}
              </p>
            </div>

            <Button
              size="md"
              className="w-full bg-accent text-accent-foreground border-accent shadow-[3px_3px_0px_0px_#0A0A0A] hover:shadow-[1px_1px_0px_0px_#0A0A0A]"
              onClick={goContact}
            >
              {calculator.ctaLabel}
              <ArrowRight size={15} />
            </Button>

            <button
              type="button"
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 font-head text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-1.5"
            >
              <RotateCcw size={11} />
              {calculator.resetLabel}
            </button>
          </aside>
        </div>
      </div>
    </section>
  )
}
