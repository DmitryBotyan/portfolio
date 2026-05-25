import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { loadMetrika, metrikaHit } from '@/lib/metrika'

const CONSENT_KEY = 'cookie-consent'
const CONSENT_EVENT = 'cookie-consent-changed'

function consented(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted'
  } catch {
    return false
  }
}

export function MetrikaTracker() {
  const location = useLocation()

  // Load Metrika once on mount if consent is already given.
  // Re-check when the consent event fires (banner click).
  useEffect(() => {
    if (consented()) loadMetrika()
    const onConsent = () => {
      if (consented()) {
        loadMetrika()
        metrikaHit(window.location.pathname + window.location.search, {
          title: document.title,
          referer: document.referrer,
        })
      }
    }
    window.addEventListener(CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(CONSENT_EVENT, onConsent)
  }, [])

  // Track SPA route changes (skip the very first render - handled by init).
  useEffect(() => {
    if (!consented()) return
    metrikaHit(location.pathname + location.search, { title: document.title })
  }, [location.pathname, location.search])

  return null
}
