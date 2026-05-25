// Yandex.Metrika - loaded lazily, only after user consent.
// Counter ID and init options match the snippet from yandex.ru/metrika.

export const METRIKA_ID = 109412489

type YmFn = ((id: number, action: string, ...args: unknown[]) => void) & {
  a?: IArguments[]
  l?: number
}

declare global {
  interface Window {
    ym?: YmFn
  }
}

let loaded = false

export function loadMetrika() {
  if (typeof window === 'undefined' || loaded || window.ym) return
  loaded = true

  // Stub queue - same shape as the official snippet
  const stub = function (this: unknown) {
    ;(stub.a = stub.a || []).push(arguments)
  } as YmFn
  stub.l = Date.now()
  window.ym = stub

  // Async-load the real tag
  const script = document.createElement('script')
  script.async = true
  script.src = `https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}`
  const first = document.getElementsByTagName('script')[0]
  first?.parentNode?.insertBefore(script, first)

  // Buffered init - calls before tag.js loads sit in the queue
  window.ym(METRIKA_ID, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  })
}

export function metrikaHit(url: string, options?: { title?: string; referer?: string }) {
  if (typeof window === 'undefined' || !window.ym) return
  window.ym(METRIKA_ID, 'hit', url, options ?? {})
}

export function metrikaReachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.ym) return
  window.ym(METRIKA_ID, 'reachGoal', goal, params)
}

/** Short alias for reachGoal - used across the app for funnel events. */
export const goal = metrikaReachGoal
