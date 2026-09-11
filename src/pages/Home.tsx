import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import BodyModel, { defaultMarkers } from '../components/BodyModel/BodyModel'
import SystemsGrid from '../components/SystemsGrid'
import { defaultLayerState } from '../data/layers'
import { getOrgan } from '../data'
import { useAppStore } from '../store/appStore'
import { useUserStore } from '../store/userStore'
import { t } from '../i18n/ar'

export default function Home() {
  const sex = useAppStore((s) => s.sex)!
  const reduceMotion = useAppStore((s) => s.reduceMotion)
  const lastOrganId = useUserStore((s) => s.lastOrganId)
  const exploredSystems = useUserStore((s) => s.exploredSystems)
  const bestScore = useUserStore((s) => s.bestScore)
  const [selected, setSelected] = useState<string | null>(null)

  const layers = useMemo(() => defaultLayerState(), [])
  const lastOrgan = lastOrganId ? getOrgan(lastOrganId) : undefined

  return (
    <div className="page home-page">
      <header className="home-hero">
        <div className="hero-text">
          <h1>
            {t.appName} <span className="hero-en">Jismi</span>
          </h1>
          <p className="hero-tagline">{t.tagline}</p>
          <Link to="/body" className="btn btn-primary hero-cta">
            {t.exploreBody} ←
          </Link>
        </div>
        <div className="hero-model" aria-hidden={false}>
          <BodyModel
            sex={sex}
            layers={layers}
            markers={defaultMarkers(sex)}
            selectedOrganId={selected}
            onSelectOrgan={setSelected}
            reduceMotion={reduceMotion}
            className="compact"
            ariaLabel="نموذج الجسم التفاعلي"
          />
        </div>
      </header>

      <section className="home-section">
        <h2>{t.exploreBySystem}</h2>
        <SystemsGrid compact />
      </section>

      {lastOrgan && (
        <section className="home-section">
          <h2>{t.continueLearning}</h2>
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

      <section className="home-section">
        <h2>{t.quizCta}</h2>
        <Link to="/quiz" className="quiz-cta" style={{ background: 'linear-gradient(135deg, #0f766e, #0e7490)' }}>
          <div>
            <h3>📝 {t.quizCta}</h3>
            <p>{t.quizCtaSub}</p>
            {bestScore > 0 && <p className="quiz-best">
              {t.bestScore}: {bestScore}%
            </p>}
          </div>
          <span className="quiz-cta-btn">{t.startQuiz} ←</span>
        </Link>
        {exploredSystems.length > 0 && (
          <Link to="/learning" className="learning-link">
            {t.moreLearning} — {exploredSystems.length}/12 {t.exploredSystems} ←
          </Link>
        )}
      </section>

      <footer className="home-footer">
        <p>⚕️ {t.disclaimerShort} — {t.medicalNote}</p>
      </footer>
    </div>
  )
}
