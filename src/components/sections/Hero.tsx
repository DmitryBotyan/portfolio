import { Button } from '@/components/retroui/Button'
import { ArrowDown } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'

export function Hero() {
  const { t } = useApp()
  const { hero } = t

  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-16 lg:px-24 pt-24 pb-16 border-b-2 border-border overflow-hidden">

      {/* Grid background + subtle drifting squares */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 text-foreground/[0.09] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
      >
        <svg className="absolute inset-0 h-full w-full">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <pattern id="hero-grid-sub" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <path d="M 14 0 L 0 0 0 14" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-sub)" />
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        <span className="absolute top-[22%] left-[14%] h-3 w-3 border-2 border-accent animate-hero-drift-a" />
        <span className="absolute bottom-[22%] right-[12%] h-4 w-4 border-2 border-foreground/40 animate-hero-drift-b" />
        <span className="absolute top-[55%] left-[10%] h-2 w-2 bg-accent animate-hero-drift-c" />
      </div>

      <div className="relative max-w-4xl w-full flex flex-col items-center z-10">
        {/* Name */}
        <h1 className="font-head font-black leading-[0.9] mb-10 text-foreground">
          <span className="block text-[clamp(3rem,10vw,7rem)] tracking-tight">{hero.name.first}</span>
          <span className="block text-[clamp(3rem,10vw,7rem)] tracking-tight text-outline-accent">{hero.name.last}</span>
        </h1>

        {/* Description */}
        <p className="font-sans text-base md:text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed">
          {hero.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Button
            size="lg"
            variant="default"
            className="bg-accent text-accent-foreground border-accent shadow-[3px_3px_0px_0px_#0A0A0A] hover:shadow-[1px_1px_0px_0px_#0A0A0A]"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {hero.buttons.contact}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {hero.buttons.projects}
          </Button>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground">
        <div className="animate-bounce">
          <ArrowDown size={18} />
        </div>
      </div>
    </section>
  )
}
