import { Music, Plane, BookOpen, Palette, type LucideIcon } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { useReveal } from '@/hooks/useReveal'

const hobbyIconMap: Record<string, LucideIcon> = { Music, Plane, BookOpen, Palette }

function SkillBar({ name, level, revealed }: { name: string; level: number; revealed: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-head text-[10px] font-bold tracking-wider uppercase text-muted-foreground w-24 shrink-0">{name}</span>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-3 border border-border transition-colors duration-500"
            style={{
              transitionDelay: revealed ? `${i * 120}ms` : '0ms',
              backgroundColor: revealed && i < level ? 'var(--foreground)' : 'transparent',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function About() {
  const { t } = useApp()
  const { about } = t
  const { ref, isRevealed } = useReveal()

  return (
    <section id="about" className="relative border-b-2 border-border overflow-hidden">
      <div ref={ref} data-reveal className="px-6 sm:px-8 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="mb-16">
          <h2 className="font-head text-4xl md:text-6xl font-black tracking-tight">
            {about.heading}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 max-w-5xl">
          {/* Text + Stack + Hobbies */}
          <div className="space-y-8">
            <div className="space-y-5">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="font-sans text-muted-foreground leading-relaxed text-sm md:text-base">{p}</p>
              ))}
            </div>

            {/* Stack */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-head text-xs font-bold tracking-[0.2em] uppercase">{about.stackLabel}</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="flex flex-col gap-2.5">
                {about.skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} revealed={isRevealed} />
                ))}
              </div>
            </div>

            {/* Hobbies */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-head text-xs font-bold tracking-[0.2em] uppercase">{about.hobbiesLabel}</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="flex flex-col gap-2">
                {about.hobbies.map(({ icon, label }) => {
                  const Icon = hobbyIconMap[icon]
                  return (
                    <div key={label} className="flex items-center gap-3">
                      <span className="w-8 h-8 border-2 border-border flex items-center justify-center shrink-0">
                        {Icon && <Icon size={15} />}
                      </span>
                      <span className="font-sans text-sm text-muted-foreground">{label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Photo */}
          <div className="flex items-start md:justify-end">
            <div className="border-2 border-border shadow-[4px_4px_0px_0px_var(--border)] overflow-hidden w-full max-w-sm bg-muted">
              <img
                src="/photo.jpg"
                alt={`${t.hero.name.first} ${t.hero.name.last} — ${t.footer.role}`}
                width={768}
                height={1152}
                loading="lazy"
                decoding="async"
                className="block w-full h-auto"
                onError={(e) => {
                  const el = e.currentTarget
                  const parent = el.parentElement!
                  el.style.display = 'none'
                  parent.classList.add('flex', 'items-center', 'justify-center', 'aspect-[2/3]')
                  parent.innerHTML = '<span class="font-head text-xs text-muted-foreground tracking-widest uppercase">Photo</span>'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
