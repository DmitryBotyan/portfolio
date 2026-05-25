import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Sun, Moon, Languages, Menu, X, Send, Mail, Terminal } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'

const iconMap = { telegram: Send, mail: Mail }

export function Nav() {
  const { t, lang, theme, toggleLang, toggleTheme } = useApp()
  const navigate                   = useNavigate()
  const location                   = useLocation()
  const onHome                     = location.pathname === '/'
  const [scrolled, setScrolled]    = useState(false)
  const [menuOpen, setMenuOpen]    = useState(false)
  const [activeSection, setActive] = useState('')
  const progressRef                = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) {
        progressRef.current.style.width = docHeight > 0 ? `${(y / docHeight) * 100}%` : '0%'
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    if (href.startsWith('/')) {
      navigate(href)
      window.scrollTo({ top: 0 })
      return
    }
    if (!onHome) {
      navigate('/' + href)
      return
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLogo = () => {
    setMenuOpen(false)
    if (!onHome) {
      navigate('/')
      window.scrollTo({ top: 0 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background',
        scrolled ? 'border-b-2 border-border' : 'border-b-2 border-transparent'
      )}
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 h-16 flex items-center justify-between gap-3">
        <button
          onClick={handleLogo}
          aria-label="На главную"
          className="text-foreground hover:text-muted-foreground transition-colors shrink-0"
        >
          <Terminal size={15} />
        </button>

        <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center min-w-0">
          {t.nav.links.map(({ label, href }) => {
            const isActive = href.startsWith('/')
              ? location.pathname.startsWith(href)
              : onHome && activeSection === href
            return (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className={cn(
                  'font-sans text-xs uppercase tracking-widest transition-colors px-3 py-1.5 border-2 hover:shadow-[2px_2px_0px_0px_var(--border)] whitespace-nowrap',
                  isActive
                    ? 'text-foreground border-border shadow-[2px_2px_0px_0px_var(--border)]'
                    : 'text-muted-foreground border-transparent hover:border-border hover:text-foreground'
                )}
              >
                {label}
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-1 shrink-0">
          {/* Social icons — desktop only */}
          <div className="hidden lg:flex items-center gap-1 mr-2 pr-2 border-r-2 border-border">
            {t.hero.socialLinks.map(({ label, href, icon }) => {
              const Icon = iconMap[icon]
              return (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  title={label}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 border-2 border-transparent hover:border-border hover:shadow-[2px_2px_0px_0px_var(--border)]"
                >
                  <Icon size={15} />
                </a>
              )
            })}
          </div>

          <button
            onClick={toggleLang}
            title={lang === 'ru' ? 'Switch to English' : 'Переключить на русский'}
            className="flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors p-2 border-2 border-transparent hover:border-border hover:shadow-[2px_2px_0px_0px_var(--border)]"
          >
            <Languages size={16} />
            <span>{lang === 'ru' ? 'EN' : 'RU'}</span>
          </button>

          <button
            onClick={toggleTheme}
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            className="text-muted-foreground hover:text-foreground transition-colors p-2 border-2 border-transparent hover:border-border hover:shadow-[2px_2px_0px_0px_var(--border)]"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            aria-label="Меню"
            className="xl:hidden text-muted-foreground hover:text-foreground transition-colors p-2 border-2 border-transparent hover:border-border"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="xl:hidden bg-background border-t-2 border-b-2 border-border px-6 sm:px-8 py-6 flex flex-col gap-4">
          {t.nav.links.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleNav(href)}
              className="font-sans text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors text-left py-1"
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Reading progress bar — DOM-driven, no React re-renders */}
      <div ref={progressRef} className="absolute bottom-0 left-0 h-[2px] bg-accent" style={{ width: '0%' }} />
    </header>
  )
}
