import { Link } from 'react-router-dom'
import { SYSTEMS } from '../data/systems'
import { systemPartsCount } from '../lib/quiz'
import { t } from '../i18n/ar'

export default function SystemsGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`systems-grid ${compact ? 'compact' : ''}`}>
      {SYSTEMS.map((s) => (
        <Link to={`/system/${s.id}`} key={s.id} className="system-card" style={{ borderColor: `${s.color}44` }}>
          <span className="system-icon" style={{ background: `${s.color}1a` }} aria-hidden>
            {s.icon}
          </span>
          <div className="system-info">
            <h3>{s.ar}</h3>
            {!compact && <p>{s.description}</p>}
            <span className="system-count" style={{ color: s.color }}>
              {systemPartsCount(s.id)} {t.systemCount}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
