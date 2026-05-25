import { Quote } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { useReveal } from '@/hooks/useReveal'

type Item = {
  text: string
  name: string
  role: string
  initials: string
}

function Card({ item }: { item: Item }) {
  return (
    <div className="w-[300px] sm:w-[360px] shrink-0 border-2 border-border bg-background shadow-[4px_4px_0px_0px_var(--border)] flex flex-col gap-5 p-6">
      <Quote size={18} className="text-accent shrink-0" />

      <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
        "{item.text}"
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <div className="w-9 h-9 border-2 border-border bg-foreground text-background flex items-center justify-center shrink-0">
          <span className="font-head text-[9px] font-black tracking-wide">{item.initials}</span>
        </div>
        <div>
          <p className="font-head text-xs font-black leading-tight">{item.name}</p>
          <p className="font-sans text-[11px] text-muted-foreground">{item.role}</p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const { t } = useApp()
  const { testimonials } = t
  const items = testimonials.items as Item[]
  const { ref: sectionRef } = useReveal()

  // Duplicate the list so the -50% translate loops seamlessly
  const loop = [...items, ...items]

  return (
    <section id="testimonials" className="relative border-b-2 border-border overflow-hidden bg-muted dark:bg-background">
      <div ref={sectionRef} data-reveal>
        <div className="px-6 sm:px-8 md:px-16 lg:px-24 pt-20 md:pt-28 mb-12 md:mb-16">
          <h2 className="font-head text-4xl md:text-6xl font-black tracking-tight">
            {testimonials.heading}
          </h2>
        </div>

        {/* Full-bleed infinite marquee */}
        <div
          className="marquee-track overflow-hidden pb-20 md:pb-28"
          style={{ ['--marquee-duration' as string]: `${items.length * 7}s` }}
        >
          <div className="flex w-max gap-6 px-3 animate-marquee">
            {loop.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
