import { useNavigate } from 'react-router-dom'
import { Terminal } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'

export function NotFound() {
  const navigate = useNavigate()

  useSeo({
    title: 'Страница не найдена - Дмитрий Ботян',
    description: 'Запрашиваемая страница не найдена.',
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
        Страница не найдена
      </h1>
      <p className="font-sans text-sm text-muted-foreground mb-10 max-w-sm leading-relaxed">
        Такой страницы не существует. Возможно, ссылка устарела или адрес введён неверно.
      </p>

      <button
        onClick={() => navigate('/')}
        className="font-head text-xs font-bold tracking-widest uppercase border-2 border-border px-6 py-3 shadow-[4px_4px_0px_0px_var(--border)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
      >
        ← На главную
      </button>
    </div>
  )
}
