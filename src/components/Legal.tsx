import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { legal, type LegalKind } from '@/legal'
import { useApp } from '@/contexts/AppContext'

interface LegalContextValue {
  openLegal: (kind: LegalKind) => void
}

const LegalContext = createContext<LegalContextValue | null>(null)

export function useLegal() {
  const ctx = useContext(LegalContext)
  if (!ctx) throw new Error('useLegal must be used inside LegalProvider')
  return ctx
}

export function LegalProvider({ children }: { children: ReactNode }) {
  const { lang } = useApp()
  const [active, setActive] = useState<LegalKind | null>(null)

  const openLegal = useCallback((kind: LegalKind) => setActive(kind), [])
  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [active, close])

  const doc = active ? legal[lang][active] : null
  const closeLabel = lang === 'ru' ? 'Закрыть' : 'Close'

  return (
    <LegalContext.Provider value={{ openLegal }}>
      {children}
      {doc && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={doc.title}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={close}
        >
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-background border-2 border-border shadow-[6px_6px_0px_0px_var(--border)] w-full max-w-3xl max-h-[88vh] flex flex-col"
          >
            <div className="flex items-start justify-between gap-4 p-6 md:p-8 border-b-2 border-border">
              <div>
                <h2 className="font-head text-xl md:text-2xl font-black tracking-tight leading-tight">
                  {doc.title}
                </h2>
                <p className="font-head text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-2">
                  {doc.updated}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={closeLabel}
                className="shrink-0 p-2 border-2 border-border shadow-[3px_3px_0px_0px_var(--border)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <X size={16} />
              </button>
            </div>
            <div className="overflow-y-auto p-6 md:p-8">
              <pre className="font-sans text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                {doc.body}
              </pre>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </LegalContext.Provider>
  )
}
