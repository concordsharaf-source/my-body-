import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Organ } from '../data/types'
import { getOrgan, systemOfOrgan } from '../data'
import { useAppStore } from '../store/appStore'
import { useUserStore } from '../store/userStore'
import { t } from '../i18n/ar'

interface Props {
  organ: Organ
  onClose?: () => void
  onShowLocation?: () => void
  onNavigateOrgan?: (id: string) => void
}

export default function OrganCard({ organ, onClose, onShowLocation, onNavigateOrgan }: Props) {
  const level = useAppStore((s) => s.level)
  const favorites = useUserStore((s) => s.favorites)
  const toggleFavorite = useUserStore((s) => s.toggleFavorite)
  const [expanded, setExpanded] = useState(false)
  const [shared, setShared] = useState(false)

  const system = systemOfOrgan(organ.id)
  const isFav = favorites.includes(organ.id)

  const share = async () => {
    const url = `${window.location.origin}/organ/${organ.id}`
    const text = `${organ.ar} — ${organ.en} | ${organ.function}`
    try {
      if (navigator.share) {
        await navigator.share({ title: `جسمي: ${organ.ar}`, text, url })
      } else {
        await navigator.clipboard.writeText(`${text} — ${url}`)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch {
      /* تم الإلغاء */
    }
  }

  const nav = (id: string) => {
    onNavigateOrgan?.(id)
  }

  return (
    <div className="organ-card" role="dialog" aria-label={organ.ar}>
      <div className="organ-card-head">
        <div className="organ-card-title">
          <h2>{organ.ar}</h2>
          <p className="organ-en">
            {organ.en}
            {organ.medical ? ` · ${organ.medical}` : ''}
          </p>
        </div>
        {system && (
          <Link
            to={`/system/${system.id}`}
            className="system-chip system-chip-link"
            style={{ background: `${system.color}1a`, color: system.color }}
            aria-label={`عرض ${system.ar} على النموذج`}
          >
            {system.icon} {system.ar}
          </Link>
        )}
        {onClose && (
          <button type="button" className="icon-btn" onClick={onClose} aria-label={t.close}>
            ✕
          </button>
        )}
      </div>

      <p className="organ-summary">{organ.levels[level - 1]}</p>

      <div className="organ-card-actions">
        {onShowLocation && (
          <button type="button" className="btn btn-primary" onClick={onShowLocation}>
            📍 {t.showLocation}
          </button>
        )}
        <button
          type="button"
          className="btn"
          onClick={() => toggleFavorite(organ.id)}
          aria-pressed={isFav}
        >
          {isFav ? '⭐ ' + t.removeFromFavorites : '☆ ' + t.addToFavorites}
        </button>
        <button type="button" className="btn" onClick={share}>
          {shared ? '✓ ' + t.share : '🔗 ' + t.share}
        </button>
        <Link className="btn" to={`/organ/${organ.id}`}>
          {t.fullPage} ←
        </Link>
      </div>

      <button type="button" className="btn btn-ghost expand-btn" onClick={() => setExpanded((v) => !v)}>
        {expanded ? t.hideDetails : t.showDetails} {expanded ? '▲' : '▼'}
      </button>

      {expanded && (
        <div className="organ-details">
          <Section title={t.function}>{organ.function}</Section>
          <Section title={t.location}>{organ.location}</Section>
          <Section title={t.howWorks}>{organ.how}</Section>
          {organ.parts && (
            <Section title={t.parts}>
              <ul className="chip-list">
                {organ.parts.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Section>
          )}
          {organ.relations && organ.relations.length > 0 && (
            <Section title={t.relations}>
              <div className="relations-list">
                {organ.relations.map((r) => {
                  const rel = getOrgan(r.id)
                  if (!rel) return null
                  return (
                    <button key={r.id} type="button" className="relation-chip" onClick={() => nav(r.id)}>
                      <strong>{rel.ar}</strong>
                      {r.note && <span>{r.note}</span>}
                    </button>
                  )
                })}
              </div>
            </Section>
          )}
          {organ.facts && (
            <Section title={t.facts}>
              <ul className="facts-list">
                {organ.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </Section>
          )}
          {organ.care && organ.care.length > 0 && (
            <div className="care-box">
              <h3>🛡️ {t.careTitle}</h3>
              <ul className="care-list">
                {organ.care.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}
          {organ.didYouKnow && (
            <div className="did-you-know">
              <strong>💡 {t.didYouKnow}:</strong> {organ.didYouKnow}
            </div>
          )}
          {organ.terms && (
            <Section title={t.terms}>
              <ul className="terms-list">
                {organ.terms.map((tm) => (
                  <li key={tm.en}>
                    <strong>{tm.ar}</strong> <span dir="ltr">{tm.en}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {organ.faqs && (
            <Section title={t.faqs}>
              <div className="faq-list">
                {organ.faqs.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </Section>
          )}
          {organ.ifStopped && <Section title={t.ifStopped}>{organ.ifStopped}</Section>}
          <p className="medical-note">⚕️ {t.medicalNote}</p>
          {organ.source && <p className="source-note">📚 {organ.source}</p>}
        </div>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="organ-section">
      <h3>{title}</h3>
      {typeof children === 'string' ? <p>{children}</p> : children}
    </section>
  )
}
