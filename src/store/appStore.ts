import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Sex } from '../data/types'

export type ThemeMode = 'light' | 'dark' | 'system'
export type FontScale = 's' | 'm' | 'l'
export type InfoLevel = 1 | 2 | 3

interface AppState {
  sex: Sex | null
  level: InfoLevel
  theme: ThemeMode
  reduceMotion: boolean
  fontScale: FontScale
  setSex: (s: Sex) => void
  setLevel: (l: InfoLevel) => void
  setTheme: (t: ThemeMode) => void
  setReduceMotion: (v: boolean) => void
  setFontScale: (f: FontScale) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sex: null,
      level: 2,
      theme: 'system',
      reduceMotion: false,
      fontScale: 'm',
      setSex: (sex) => set({ sex }),
      setLevel: (level) => set({ level }),
      setTheme: (theme) => set({ theme }),
      setReduceMotion: (reduceMotion) => set({ reduceMotion }),
      setFontScale: (fontScale) => set({ fontScale }),
    }),
    { name: 'jismi-app' },
  ),
)

/** تطبيق المظهر على <html> (فاتح/داكن/النظام). */
export function applyTheme(theme: ThemeMode) {
  const root = document.documentElement
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  const dark = theme === 'dark' || (theme === 'system' && mq.matches)
  root.classList.toggle('dark', dark)
  root.style.colorScheme = dark ? 'dark' : 'light'
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', dark ? '#0b1220' : '#0f766e')
}

export function applyFontScale(scale: FontScale) {
  const root = document.documentElement
  root.style.fontSize = scale === 's' ? '14px' : scale === 'l' ? '18px' : '16px'
}
