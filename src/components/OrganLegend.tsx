import type { ModelMarker } from './BodyModel/BodyModel'
import { getOrgan } from '../data'
import { t } from '../i18n/ar'

/**
 * القائمة الجانبية للأسماء: كل رقم على النموذج يقابله اسم هنا.
 * مرور المؤشر يُبرز العضو على النموذج، والنقر يفتح بطاقته.
 */
export default function OrganLegend({
  markers,
  hoveredId,
  onHover,
  onSelect,
}: {
  markers: ModelMarker[]
  hoveredId: string | null
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
}) {
  if (markers.length === 0) return null
  return (
    <section className="organ-legend" aria-label={t.legendTitle}>
      <h3>{t.legendTitle}</h3>
      <ol className="legend-list">
        {markers.map((m) => {
          const o = getOrgan(m.id)
          if (!o) return null
          return (
            <li key={m.id}>
              <button
                type="button"
                className={`legend-row ${hoveredId === m.id ? 'on' : ''}`}
                onMouseEnter={() => onHover(m.id)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(m.id)}
                onBlur={() => onHover(null)}
                onClick={() => onSelect(m.id)}
              >
                <span className="legend-num" style={{ borderColor: m.color, color: m.color }} aria-hidden>
                  {m.num}
                </span>
                <span className="legend-name">{o.ar}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
