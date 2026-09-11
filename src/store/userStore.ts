import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface QuizRecord {
  date: string
  score: number
  total: number
}

interface UserState {
  favorites: string[]
  viewedOrgans: Record<string, number> // organId -> آخر مشاهدة (timestamp)
  exploredSystems: string[]
  quizHistory: QuizRecord[]
  bestScore: number // نسبة أفضل نتيجة (0-100)
  lastOrganId: string | null
  cardsSeen: string[]
  journeyStep: number
  toggleFavorite: (id: string) => void
  markViewed: (organId: string) => void
  markSystemExplored: (systemId: string) => void
  addQuizResult: (score: number, total: number) => void
  markCardSeen: (id: string) => void
  setJourneyStep: (n: number) => void
  resetAll: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      favorites: [],
      viewedOrgans: {},
      exploredSystems: [],
      quizHistory: [],
      bestScore: 0,
      lastOrganId: null,
      cardsSeen: [],
      journeyStep: 0,
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id) ? s.favorites.filter((f) => f !== id) : [id, ...s.favorites],
        })),
      markViewed: (organId) =>
        set((s) => ({
          viewedOrgans: { ...s.viewedOrgans, [organId]: Date.now() },
          lastOrganId: organId,
        })),
      markSystemExplored: (systemId) =>
        set((s) =>
          s.exploredSystems.includes(systemId) ? s : { exploredSystems: [...s.exploredSystems, systemId] },
        ),
      addQuizResult: (score, total) =>
        set((s) => {
          const pct = Math.round((score / total) * 100)
          return {
            quizHistory: [
              { date: new Date().toISOString(), score, total },
              ...s.quizHistory,
            ].slice(0, 20),
            bestScore: Math.max(s.bestScore, pct),
          }
        }),
      markCardSeen: (id) => set((s) => (s.cardsSeen.includes(id) ? s : { cardsSeen: [...s.cardsSeen, id] })),
      setJourneyStep: (n) => set({ journeyStep: n }),
      resetAll: () =>
        set({
          favorites: [],
          viewedOrgans: {},
          exploredSystems: [],
          quizHistory: [],
          bestScore: 0,
          lastOrganId: null,
          cardsSeen: [],
          journeyStep: 0,
        }),
    }),
    { name: 'jismi-user' },
  ),
)
