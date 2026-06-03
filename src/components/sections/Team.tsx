import { ArrowUpRight } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { UnemploymentLogo } from '@/components/icons/UnemploymentLogo'
import { useReveal } from '@/hooks/useReveal'

export function Team() {
  const { t } = useApp()
  const { team } = t
  const { ref: sectionRef } = useReveal()
  const { ref: cardsRef }   = useReveal()

  return (
    <section id="team" className="relative border-b-2 border-border overflow-hidden">
      <div ref={sectionRef} data-reveal className="px-6 sm:px-8 md:px-16 lg:px-24 py-20 md:py-28">

        {/* Heading */}
        <div className="mb-16">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 min-w-0">
            <UnemploymentLogo
              size={52}
              className="text-foreground shrink-0 w-9 h-9 sm:w-11 sm:h-11 md:w-[52px] md:h-[52px]"
            />
            <span className="font-head text-lg sm:text-2xl md:text-4xl font-black text-accent break-all min-w-0">
              {team.name}
            </span>
          </div>
          <h2 className="font-head text-4xl md:text-6xl font-black tracking-tight">{team.heading}</h2>
        </div>

        <div className="max-w-5xl grid md:grid-cols-2 gap-16">

          {/* Left - description + services + CTA */}
          <div className="space-y-10">
            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
              {team.description}
            </p>

            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-head text-xs font-bold tracking-[0.2em] uppercase">Services</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="flex flex-col gap-3">
                {team.services.map((s, i) => (
                  <div key={s} className="flex items-center gap-4">
                    <span className="font-head text-xs text-muted-foreground tabular-nums">0{i + 1}</span>
                    <div className="flex-1 h-px bg-border" />
                    <span className="font-head text-sm font-bold">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={team.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-head text-sm font-bold border-2 border-border px-5 py-3 shadow-[4px_4px_0px_0px_var(--border)] hover:shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              {team.siteLabel}
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Right - member cards */}
          <div ref={cardsRef} data-stagger className="space-y-6">
            {team.members.map((member) => (
              <div
                key={member.name}
                className="border-2 border-border p-6 shadow-[4px_4px_0px_0px_var(--border)]"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-head text-lg font-black">{member.name}</p>
                    <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider">{member.role}</p>
                  </div>
                  <span className="font-head text-[9px] font-bold uppercase tracking-widest px-2 py-1 border-2 border-border text-muted-foreground shrink-0">
                    {member.tag}
                  </span>
                </div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
