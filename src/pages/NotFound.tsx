import { useNavigate } from 'react-router-dom'
import { Terminal } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'
import { useApp } from '@/contexts/AppContext'

export function NotFound() {
  const navigate = useNavigate()
  const { lang } = useApp()
  const ru = lang === 'ru'

  useSeo({
    title: ru ? 'Страница не найдена - Дмитрий Ботян' : 'Page not found - Dmitry Botyan',
    description: ru ? 'Запрашиваемая страница не найдена.' : 'The requested page was not found.',
    robots: 'noindex, follow',
  })

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8 text-center">

      {/* Big 404 */}
      <div className="relative mb-8 select-none">
        <span
          className="font-head font-black leading-none text-foreground"
          style={{ fontSize: 'clamp(6rem, 22vw, 14rem)', opacity: 0.06 }}
        >
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <Terminal size={40} className="text-accent" />
        </div>
      </div>

      <h1 className="font-head text-2xl md:text-4xl font-black tracking-tight mb-4">
        {ru ? 'Страница не найдена' : 'Page not found'}
      </h1>
      <p className="font-sans text-sm text-muted-foreground mb-10 max-w-sm leading-relaxed">
        {ru
          ? 'Такой страницы не существует. Возможно, ссылка устарела или адрес введён неверно.'
          : 'This page does not exist. The link may be outdated or the address entered incorrectly.'}
      </p>

      <button
        onClick={() => navigate('/')}
        className="font-head text-xs font-bold tracking-widest uppercase border-2 border-border px-6 py-3 shadow-[4px_4px_0px_0px_var(--border)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
      >
        ← {ru ? 'На главную' : 'Back to home'}
      </button>
    </div>
  )
}
