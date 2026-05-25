import { UnemploymentLogo } from '@/components/icons/UnemploymentLogo'
import { useApp } from '@/contexts/AppContext'
import { useLegal } from '@/components/Legal'
import type { LegalKind } from '@/legal'

export function Footer() {
  const { t } = useApp()
  const { footer } = t
  const { openLegal } = useLegal()
  const year = new Date().getFullYear()
  const legalKinds: LegalKind[] = ['privacy', 'terms', 'consent']

  return (
    <footer className="border-t-2 border-border">

      {/* Brand block */}
      <div className="px-6 sm:px-8 md:px-16 lg:px-24 py-14 md:py-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="space-y-5 max-w-xl">
          <div>
            <div className="font-head text-2xl font-black tracking-tight mb-1">
              {t.hero.name.first} {t.hero.name.last}
            </div>
            <p className="font-head text-sm font-bold text-muted-foreground">{footer.role}</p>
          </div>

          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
            {t.hero.description}
          </p>
        </div>

        <a
          href={t.team.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-2 border-border px-3 py-2 shadow-[3px_3px_0px_0px_var(--border)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all group self-start md:self-end"
        >
          <UnemploymentLogo size={16} className="text-foreground shrink-0" />
          <span className="font-head text-[10px] font-black uppercase tracking-widest">
            unemployment.team
          </span>
        </a>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-border" />

      {/* Bottom bar */}
      <div className="px-6 sm:px-8 md:px-16 lg:px-24 py-5 flex flex-col md:flex-row items-center md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 md:flex-wrap">
          <span className="font-sans text-xs text-muted-foreground">
            © {year} {footer.author}
          </span>
          <span className="hidden md:inline text-xs text-muted-foreground/40">·</span>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {legalKinds.map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => openLegal(kind)}
                className="font-sans text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-from-font transition-colors"
              >
                {footer.legalLinks[kind]}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
