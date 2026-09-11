import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import BodyModel from '../components/BodyModel/BodyModel'
import { BODY_JOURNEY } from '../data/journeys'
import { defaultLayerState } from '../data/layers'
import { getOrgan } from '../data'
import { useAppStore } from '../store/appStore'
import { useUserStore } from '../store/userStore'
import { t } from '../i18n/ar'

export default function JourneyPage() {
  const sex = useAppStore((s) => s.sex)!
  const reduceMotion = useAppStore((s) => s.reduceMotion)
  const journeyStep = useUserStore((s) => s.journeyStep)
  const setJourneyStep = useUserStore((s) => s.setJourneyStep)
  const markViewed = useUserStore((s) => s.markViewed)

  const [started, setStarted] = useState(journeyStep > 0)
  const [step, setStep] = useState(Math.min(journeyStep, BODY_JOURNEY.length - 1))

  const layers = useMemo(() => defaultLayerState(), [])
  const current = BODY_JOURNEY[step]

  const go = (n: number) => {
    const clamped = Math.max(0, Math.min(BODY_JOURNEY.length - 1, n))
    setStep(clamped)
    setJourneyStep(clamped)
    const organ = BODY_JOURNEY[clamped].organId
    if (organ) markViewed(organ)
  }

  if (!started) {
    return (
      <div className="page empty-state">
        <span className="empty-icon" aria-hidden>
          🚀
        </span>
        <h1>{t.journeyTitle}</h1>
        <p>{t.journeySub}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setStarted(true)
            go(0)
          }}
        >
          {t.start}
        </button>
      </div>
    )
  }

  const progress = ((step + 1) / BODY_JOURNEY.length) * 100

  return (
    <div className="page journey-page">
      <header className="page-head">
        <Link to="/" className="icon-btn" aria-label={t.back}>
          →
        </Link>
        <h1>🚀 {t.journeyTitle}</h1>
      </header>

      <div className="journey-progress">
        <div className="progress-track" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-text">
          {t.step} {step + 1} {t.of} {BODY_JOURNEY.length}
        </span>
      </div>

      <div className="journey-layout">
        <div className="journey-model">
          <BodyModel
            sex={sex}
            layers={layers}
            selectedOrganId={current.organId ?? null}
            reduceMotion={reduceMotion}
            focusLayer={current.layer ?? null}
            focusBox={
              current.organId && getOrgan(current.organId)?.model
                ? {
                    x: getOrgan(current.organId)!.model!.box[0],
                    y: getOrgan(current.organId)!.model!.box[1],
                    w: getOrgan(current.organId)!.model!.box[2],
                    h: getOrgan(current.organId)!.model!.box[3],
                    key: step,
                  }
                : null
            }
            interactive={false}
          />
        </div>
        <div className="journey-card">
          <span className="journey-step-icon" aria-hidden>
            {current.icon}
          </span>
          <h2>{current.title}</h2>
          <p>{current.text}</p>
          <div className="journey-nav">
            <button type="button" className="btn" disabled={step === 0} onClick={() => go(step - 1)}>
              ← {t.prev}
            </button>
            {step < BODY_JOURNEY.length - 1 ? (
              <button type="button" className="btn btn-primary" onClick={() => go(step + 1)}>
                {t.next} ←
              </button>
            ) : (
              <Link to="/body" className="btn btn-primary">
                🎉 {t.finish}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
