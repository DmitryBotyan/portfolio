import { useApp } from '@/contexts/AppContext'
import { useReveal } from '@/hooks/useReveal'

export function Experience() {
  const { t } = useApp()
  const { experience } = t
  const { ref: sectionRef } = useReveal()
  const { ref: listRef }    = useReveal(0.15)

  return (
    <section id="experience" className="relative border-b-2 border-border overflow-hidden bg-muted dark:bg-background">
      <div ref={sectionRef} data-reveal className="px-6 sm:px-8 md:px-16 lg:px-24 py-20 md:py-28">

        <div className="mb-16">
          <h2 className="font-head text-4xl md:text-6xl font-black tracking-tight">
            {experience.heading}
          </h2>
        </div>

        <div
          ref={listRef}
          data-stagger-left
          className="max-w-5xl space-y-0 border-2 border-border shadow-[4px_4px_0px_0px_var(--border)]"
        >
          {experience.items.map((item, i) => (
            <div
              key={i}
              className={`grid md:grid-cols-[180px_1fr] ${i < experience.items.length - 1 ? 'border-b-2 border-border' : ''}`}
            >
              <div className="p-5 md:p-6 md:border-r-2 border-border border-b-2 md:border-b-0 bg-background/50 flex flex-col justify-between gap-3">
                <span className="font-head text-xs font-bold tracking-widest text-muted-foreground uppercase">{item.period}</span>
                <span className="font-sans text-xs font-semibold text-muted-foreground">{item.company}</span>
              </div>
              <div className="p-5 md:p-6 space-y-3">
                <h3 className="font-head text-lg md:text-xl font-black">{item.role}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="font-head text-[10px] font-bold tracking-wider uppercase border border-border px-2 py-0.5 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
