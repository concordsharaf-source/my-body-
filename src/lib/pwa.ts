/** أدوات PWA: أمر التثبيت المخصص. */

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

let deferredPrompt: BeforeInstallPromptEvent | null = null
const listeners = new Set<() => void>()

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e as BeforeInstallPromptEvent
    listeners.forEach((l) => l())
  })
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
    listeners.forEach((l) => l())
  })
}

export function canInstall(): boolean {
  return deferredPrompt !== null
}

export function onInstallabilityChange(cb: () => void): () => void {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export async function promptInstall(): Promise<boolean> {
  if (!deferredPrompt) return false
  await deferredPrompt.prompt()
  const choice = await deferredPrompt.userChoice
  deferredPrompt = null
  listeners.forEach((l) => l())
  return choice.outcome === 'accepted'
}

/** تسجيل حالة توفر التثبيت. */
export function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches || navigator.userAgent.includes('PWA')
}
