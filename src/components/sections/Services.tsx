import { Check, Star, ArrowRight } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { useReveal } from '@/hooks/useReveal'
import { Button } from '@/components/retroui/Button'
import { cn } from '@/lib/utils'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Services() {
  const { t } = useApp()
  const { services } = t
  const { ref: sectionRef } = useReveal()
  const { ref: tiersRef }   = useReveal(0.1)

  return (
    <section
      id="services"
      className="relative border-b-2 border-border overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div ref={sectionRef} data-reveal className="px-6 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24">

        <div className="mb-10 md:mb-12">
          <h2 id="services-heading" className="font-head text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-3 md:mb-4">
            {services.heading}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl text-sm md:text-base leading-relaxed">
            {services.subheading}
          </p>
        </div>

        <div ref={tiersRef} data-stagger className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 items-stretch">
          {services.tiers.map((tier) => (
            <article
              key={tier.id}
              className={cn(
                'relative flex flex-col border-2 border-border bg-card transition-all duration-150',
                tier.popular
                  ? 'shadow-[6px_6px_0px_0px_var(--accent)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_var(--accent)]'
                  : 'shadow-[4px_4px_0px_0px_var(--border)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_var(--border)]'
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-accent text-accent-foreground font-head text-[9px] font-black tracking-widest uppercase px-2.5 py-1 border-2 border-border shadow-[2px_2px_0px_0px_var(--border)]">
                  <Star size={10} strokeWidth={3} />
                  {services.popularBadge}
                </div>
              )}

              {/* Header: name + tagline + price */}
              <div className="p-5 border-b-2 border-border">
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <h3 className="font-head text-xl font-black tracking-tight">
                    {tier.name}
                  </h3>
                </div>
                <p className="font-sans text-xs text-muted-foreground mb-4 leading-relaxed">
                  {tier.tagline}
                </p>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {services.fromLabel}
                  </span>
                  <span className="font-head text-3xl font-black tracking-tight tabular-nums">
                    {tier.priceFrom}
                  </span>
                  <span className="font-head text-2xl font-black text-muted-foreground px-0.5">
                    –
                  </span>
                  <span className="font-head text-2xl font-black text-muted-foreground tabular-nums">
                    {tier.priceTo}
                  </span>
                  <span className="font-head text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {services.thousand} {services.currency}
                  </span>
                </div>
              </div>

              {/* Includes */}
              <ul className="p-5 space-y-2.5 flex-1">
                {tier.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        'shrink-0 w-4 h-4 mt-0.5 border-2 border-border flex items-center justify-center',
                        tier.popular ? 'bg-accent' : 'bg-background'
                      )}
                    >
                      <Check
                        size={10}
                        strokeWidth={3}
                        className={tier.popular ? 'text-accent-foreground' : 'text-foreground'}
                      />
                    </span>
                    <span className="font-sans text-[13px] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="p-5 pt-0">
                <Button
                  variant={tier.popular ? 'default' : 'secondary'}
                  size="md"
                  className={cn(
                    'w-full',
                    tier.popular && 'bg-accent text-accent-foreground border-accent shadow-[3px_3px_0px_0px_var(--border)] hover:shadow-[1px_1px_0px_0px_var(--border)]'
                  )}
                  onClick={() => scrollTo('contact')}
                >
                  {services.ctaPackage}
                  <ArrowRight size={14} />
                </Button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
