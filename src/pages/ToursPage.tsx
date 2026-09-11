import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BodyModel from '../components/BodyModel/BodyModel'
import { TOURS } from '../data/journeys'
import { getOrgan } from '../data'
import { defaultLayerState } from '../data/layers'
import { useAppStore } from '../store/appStore'
import { useUserStore } from '../store/userStore'
import { t } from '../i18n/ar'

export default function ToursPage() {
  const { tourId } = useParams<{ tourId: string }>()
  const tour = TOURS.find((x) => x.id === tourId)

  if (!tour) {
    return (
      <div className="page tours-index">
        <header className="page-head">
          <Link to="/" className="icon-btn" aria-label={t.back}>
            →
          </Link>
          <h1>🩸 {t.toursTitle}</h1>
          <p className="muted">{t.toursSub}</p>
        </header>
        <div className="tours-cards">
          {TOURS.map((x) => (
            <Link key={x.id} to={`/tours/${x.id}`} className="tour-card" style={{ borderColor: `${x.color}55` }}>
              <span className="tour-icon" style={{ background: `${x.color}1a` }} aria-hidden>
                {x.icon}
              </span>
              <div>
                <h3 style={{ color: x.color }}>{x.ar}</h3>
                <p>{x.intro.slice(0, 90)}…</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return <TourView tourId={tour.id} />
}

function TourView({ tourId }: { tourId: string }) {
  const tour = TOURS.find((x) => x.id === tourId)!
  const sex = useAppStore((s) => s.sex)!
  const reduceMotion = useAppStore((s) => s.reduceMotion)
  const markViewed = useUserStore((s) => s.markViewed)

  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [dot, setDot] = useState<{ x: number; y: number } | null>(null)
  const timer = useRef<number | null>(null)

  const layers = useMemo(() => defaultLayerState(), [])
  const current = tour.steps[step]
  const organ = getOrgan(current.organId)
  const point = organ?.model ? organ.model.label : null

  // نقطة متحركة عند تغيير المرحلة
  useEffect(() => {
    if (!point) {
      setDot(null)
      return
    }
    setDot({ x: point[0], y: point[1] })
  }, [point?.[0], point?.[1]]) // eslint-disable-line react-hooks/exhaustive-deps

  // التشغيل التلقائي
  useEffect(() => {
    if (!playing) return
    timer.current = window.setInterval(() => {
      setStep((s) => {
        if (s >= tour.steps.length - 1) {
          setPlaying(false)
          return s
        }
        const next = tour.steps[s + 1]
        markViewed(next.organId)
        return s + 1
      })
    }, 5000)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [playing, tour.steps, markViewed])

  useEffect(() => {
    markViewed(current.organId)
  }, [current.organId, markViewed])

  const go = (n: number) => {
    const c = Math.max(0, Math.min(tour.steps.length - 1, n))
    setStep(c)
    markViewed(tour.steps[c].organId)
  }

  return (
    <div className="page tour-view">
      <header className="page-head">
        <Link to="/tours" className="icon-btn" aria-label={t.back}>
          →
        </Link>
        <h1 style={{ color: tour.color }}>
          {tour.icon} {tour.ar}
        </h1>
      </header>

      <div className="tour-progress">
        <div className="progress-track" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={tour.steps.length}>
          <div className="progress-fill" style={{ width: `${((step + 1) / tour.steps.length) * 100}%`, background: tour.color }} />
        </div>
        <span className="progress-text">
          {t.step} {step + 1} {t.of} {tour.steps.length}
        </span>
      </div>

      <div className="tour-layout">
        <div className="tour-model">
          <BodyModel
            sex={sex}
            layers={layers}
            selectedOrganId={current.organId}
            reduceMotion={reduceMotion}
            tourPoint={dot}
            interactive={false}
            focusBox={
              organ?.model
                ? { x: organ.model.box[0], y: organ.model.box[1], w: organ.model.box[2], h: organ.model.box[3], key: step }
                : null
            }
          />
        </div>
        <div className="tour-card">
          <h2>{current.title}</h2>
          <p>{current.text}</p>
          <div className="tour-nav">
            <button type="button" className="btn" disabled={step === 0} onClick={() => go(step - 1)}>
              ← {t.prev}
            </button>
            <button type="button" className="btn" onClick={() => setPlaying((v) => !v)} aria-pressed={playing}>
              {playing ? '⏸ ' + t.pause : '▶ ' + t.play}
            </button>
            <button type="button" className="btn btn-primary" disabled={step === tour.steps.length - 1} onClick={() => go(step + 1)}>
              {t.next} ←
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
