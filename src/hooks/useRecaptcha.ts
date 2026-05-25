const SITE_KEY =
  (import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined) ||
  '6LeolvwsAAAAAAI9uTKq_ylE47BGnbW5VQQtI_Qn'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, opts: { action: string }) => Promise<string>
    }
  }
}

let scriptPromise: Promise<void> | null = null

function loadScript(): Promise<void> {
  if (!SITE_KEY) return Promise.reject(new Error('No reCAPTCHA site key'))
  if (window.grecaptcha) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Failed to load reCAPTCHA'))
    document.head.appendChild(s)
  })
  return scriptPromise
}

/** Returns a fresh reCAPTCHA v3 token for the given action, or '' if not configured. */
export async function getRecaptchaToken(action = 'contact'): Promise<string> {
  if (!SITE_KEY) return ''
  await loadScript()
  return new Promise<string>((resolve, reject) => {
    window.grecaptcha!.ready(() => {
      window.grecaptcha!.execute(SITE_KEY, { action })
        .then(resolve)
        .catch(reject)
    })
  })
}

export const recaptchaEnabled = Boolean(SITE_KEY)
