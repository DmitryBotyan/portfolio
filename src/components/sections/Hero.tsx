import { Button } from '@/components/retroui/Button'
import { ArrowDown } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'

export function Hero() {
  const { t } = useApp()
  const { hero } = t

  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-16 lg:px-24 pt-24 pb-16 border-b-2 border-border overflow-hidden">

      {/* Animated dot grid + drifting squares */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 text-foreground/15 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      >
        <svg className="absolute inset-0 h-full w-full">
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>

        <span className="absolute top-[18%] left-[12%] h-3 w-3 border-2 border-accent animate-hero-drift-a" />
        <span className="absolute top-[28%] right-[16%] h-4 w-4 border-2 border-foreground animate-hero-drift-b" />
        <span className="absolute bottom-[24%] left-[20%] h-2.5 w-2.5 bg-accent animate-hero-drift-c" />
        <span className="absolute top-[60%] right-[24%] h-2 w-2 bg-foreground animate-hero-drift-a" />
        <span className="absolute bottom-[18%] right-[10%] h-5 w-5 border-2 border-accent animate-hero-drift-b" />
        <span className="absolute top-[40%] left-[8%] h-2 w-2 bg-accent animate-hero-drift-c" />
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
