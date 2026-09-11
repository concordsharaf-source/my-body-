import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import SexSelect from './components/SexSelect'
import { applyFontScale, applyTheme, useAppStore } from './store/appStore'
import { t } from './i18n/ar'

// تقسيم الكود: كل صفحة تُحمَّل عند الحاجة (أداء + PWA)
const Home = lazy(() => import('./pages/Home'))
const BodyPage = lazy(() => import('./pages/BodyPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))
const OrganPage = lazy(() => import('./pages/OrganPage'))
const JourneyPage = lazy(() => import('./pages/JourneyPage'))
const ToursPage = lazy(() => import('./pages/ToursPage'))
const QuizPage = lazy(() => import('./pages/QuizPage'))
const CardsPage = lazy(() => import('./pages/CardsPage'))
const LearningPage = lazy(() => import('./pages/LearningPage'))
const ComparePage = lazy(() => import('./pages/ComparePage'))
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function Loading() {
  return (
    <div className="page loading-page" role="status" aria-label={t.loading}>
      <div className="spinner" aria-hidden />
      <p className="muted">{t.loading}</p>
    </div>
  )
}

/** كل الصفحات تتطلب اختيار الجنس أولًا. */
function NeedsSex({ children }: { children: React.ReactNode }) {
  const sex = useAppStore((s) => s.sex)
  if (!sex) return <SexSelect />
  return <>{children}</>
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const theme = useAppStore((s) => s.theme)
  const fontScale = useAppStore((s) => s.fontScale)

  useEffect(() => {
    applyTheme(theme)
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const cb = () => applyTheme(useAppStore.getState().theme)
    mq.addEventListener('change', cb)
    return () => mq.removeEventListener('change', cb)
  }, [theme])

  useEffect(() => {
    applyFontScale(fontScale)
  }, [fontScale])

  return (
    <div className="app-shell">
      <ScrollToTop />
      <main className="app-main">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={
                <NeedsSex>
                  <Home />
                </NeedsSex>
              }
            />
            <Route
              path="/body"
              element={
                <NeedsSex>
                  <BodyPage />
                </NeedsSex>
              }
            />
            <Route
              path="/system/:systemId"
              element={
                <NeedsSex>
                  <BodyPage />
                </NeedsSex>
              }
            />
            <Route
              path="/search"
              element={
                <NeedsSex>
                  <SearchPage />
                </NeedsSex>
              }
            />
            <Route
              path="/favorites"
              element={
                <NeedsSex>
                  <FavoritesPage />
                </NeedsSex>
              }
            />
            <Route
              path="/organ/:id"
              element={
                <NeedsSex>
                  <OrganPage />
                </NeedsSex>
              }
            />
            <Route
              path="/journey"
              element={
                <NeedsSex>
                  <JourneyPage />
                </NeedsSex>
              }
            />
            <Route
              path="/tours"
              element={
                <NeedsSex>
                  <ToursPage />
                </NeedsSex>
              }
            />
            <Route
              path="/tours/:tourId"
              element={
                <NeedsSex>
                  <ToursPage />
                </NeedsSex>
              }
            />
            <Route path="/quiz" element={<QuizPage />} />
            <Route
              path="/cards"
              element={
                <NeedsSex>
                  <CardsPage />
                </NeedsSex>
              }
            />
            <Route
              path="/learning"
              element={
                <NeedsSex>
                  <LearningPage />
                </NeedsSex>
              }
            />
            <Route
              path="/compare"
              element={
                <NeedsSex>
                  <ComparePage />
                </NeedsSex>
              }
            />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <BottomNav />
    </div>
  )
}
