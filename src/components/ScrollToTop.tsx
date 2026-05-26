import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets scroll to the top of the page on every route change.
 * Hash navigation (#section) is left alone — browsers handle it natively.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash])

  return null
}
