import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ALL_ORGANS, getOrgan, organsOfSystem } from '../data'
import { SYSTEMS } from '../data/systems'
import { useUserStore } from '../store/userStore'
import { t } from '../i18n/ar'

export default function LearningPage() {
  const viewedOrgans = useUserStore((s) => s.viewedOrgans)
  const exploredSystems = useUserStore((s) => s.exploredSystems)
  const quizHistory = useUserStore((s) => s.quizHistory)
  const bestScore = useUserStore((s) => s.bestScore)
  const lastOrganId = useUserStore((s) => s.lastOrganId)

  const viewedIds = Object.keys(viewedOrgans)
  const lastOrgan = lastOrganId ? getOrgan(lastOrganId) : undefined

  const systemProgress = useMemo(
    () =>
      SYSTEMS.map((s) => {
        const organs = organsOfSystem(s.id)
        const done = organs.filter((o) => viewedIds.includes(o.id)).length
        return { system: s, done, total: organs.length, pct: organs.length ? Math.round((done / organs.length) * 100) : 0 }
      }),
    [viewedIds],
  )

  const overallPct = Math.round((viewedIds.length / ALL_ORGANS.length) * 100)

  return (
    <div className="page learning-page">
      <header className="page-head">
        <Link to="/" className="icon-btn" aria-label={t.back}>
          →
        </Link>
        <h1>📈 {t.learningTitle}</h1>
        <p className="muted">{t.learningSub}</p>
      </header>

      <div className="learning-stats">
        <div className="stat-card">
          <span className="stat-icon" aria-hidden>
            🧠
          </span>
          <strong>{exploredSystems.length}/12</strong>
          <p>{t.exploredSystems}</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon" aria-hidden>
            🔬
          </span>
          <strong>
            {viewedIds.length}/{ALL_ORGANS.length}
          </strong>
          <p>{t.openedOrgans}</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon" aria-hidden>
            📝
          </span>
          <strong>{quizHistory.length}</strong>
          <p>{t.quizzesCompleted}</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon" aria-hidden>
            🏆
          </span>
          <strong>{bestScore}%</strong>
          <p>{t.bestScore}</p>
        </div>
      </div>

      <section className="learning-section">
        <h2>
          {t.progress} — {overallPct}%
        </h2>
        <div className="progress-track big">
          <div className="progress-fill" style={{ width: `${overallPct}%` }} />
        </div>
        <div className="system-progress-list">
          {systemProgress.map(({ system, done, total, pct }) => (
            <Link key={system.id} to={`/system/${system.id}`} className="sp-row">
              <span className="sp-name">
                {system.icon} {system.ar}
              </span>
              <div className="sp-track">
                <div className="sp-fill" style={{ width: `${pct}%`, background: system.color }} />
              </div>
              <span className="sp-count">
                {done}/{total}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {lastOrgan && (
        <section className="learning-section">
          <h2>{t.recentlyViewed}</h2>
          <Link to={`/organ/${lastOrgan.id}`} className="continue-card">
            <div className="continue-info">
              <span className="continue-label">{t.lastOrgan}</span>
              <strong>{lastOrgan.ar}</strong>
              <span className="continue-en" dir="ltr">
                {lastOrgan.en}
              </span>
            </div>
            <span aria-hidden>←</span>
          </Link>
        </section>
      )}
    </div>
  )
}
