import { useEffect, useRef, useState } from 'react'

/**
 * Triggers a reveal as soon as any part of the element enters the viewport.
 * Threshold 0 + no negative rootMargin is critical for tall lists where the
 * element is bigger than the screen (otherwise the % threshold never fires
 * and the content stays opacity:0 forever, breaking mobile rendering).
 *
 * Safety net: if for any reason the observer never fires (no IO support,
 * SSR mismatch, edge browser quirk) we force-reveal after a short timeout
 * so content never gets stuck invisible.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0) {
  const ref = useRef<T>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Already in view on mount? Reveal immediately.
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (rect.top < vh && rect.bottom > 0) {
      el.classList.add('revealed')
      setIsRevealed(true)
      return
    }

    let revealed = false
    const reveal = () => {
      if (revealed) return
      revealed = true
      el.classList.add('revealed')
      setIsRevealed(true)
    }

    if (typeof IntersectionObserver === 'undefined') {
      reveal()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal()
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)

    // Safety net: force reveal after 1.5s even if observer never fires
    const failsafe = window.setTimeout(reveal, 1500)

    return () => {
      observer.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [threshold])

  return { ref, isRevealed }
}
