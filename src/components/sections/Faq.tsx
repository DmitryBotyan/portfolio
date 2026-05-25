import { Terminal } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { useReveal } from '@/hooks/useReveal'

export function Faq() {
  const { t } = useApp()
  const { faq } = t
  const { ref: sectionRef } = useReveal()
  const { ref: listRef }    = useReveal(0.15)

  return (
    <section id="faq" className="relative border-b-2 border-border overflow-hidden bg-muted dark:bg-background">
      <div ref={sectionRef} data-reveal className="px-6 sm:px-8 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="mb-16">
          <h2 className="font-head text-4xl md:text-6xl font-black tracking-tight">
            {faq.heading}
          </h2>
        </div>

        <div ref={listRef} data-stagger className="max-w-2xl space-y-2">
          {faq.items.map((item, i) => (
            <div key={i} className="space-y-2">
              {/* Question — outgoing, right (client writes) */}
              <div className="flex items-end gap-3 justify-end">
                <div className="max-w-[85%]">
                  <p className="font-head text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1 mr-1 text-right">
                    Client
                  </p>
                  <div className="bg-accent text-accent-foreground border-2 border-border shadow-[3px_3px_0px_0px_var(--border)] px-4 py-3">
                    <p className="font-sans text-sm leading-relaxed">{item.q}</p>
                  </div>
                </div>
                <div className="w-7 h-7 border-2 border-accent bg-accent shrink-0 flex items-center justify-center">
                  <span className="font-head text-[9px] font-black text-accent-foreground">?</span>
                </div>
              </div>

              {/* Answer — incoming, left (I respond) */}
              <div className="flex items-end gap-3">
                <div className="w-7 h-7 border-2 border-border bg-background shrink-0 flex items-center justify-center">
                  <Terminal size={13} />
                </div>
                <div className="max-w-[85%]">
                  <p className="font-head text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1 ml-1">
                    DB
                  </p>
                  <div className="bg-background border-2 border-border shadow-[3px_3px_0px_0px_var(--border)] px-4 py-3">
                    <p className="font-sans text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
