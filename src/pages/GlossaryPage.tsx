import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { GLOSSARY } from '../data/glossary'
import { getOrgan } from '../data'
import { getSystem } from '../data/systems'
import { normalizeAr } from '../lib/search'
import { t } from '../i18n/ar'

export default function GlossaryPage() {
  const [q, setQ] = useState('')

  const results = useMemo(() => {
    const nq = normalizeAr(q)
    if (!nq) return GLOSSARY
    return GLOSSARY.filter(
      (g) =>
        normalizeAr(g.ar).includes(nq) ||
        g.en.toLowerCase().includes(nq.toLowerCase()) ||
        normalizeAr(g.definition).includes(nq) ||
        (g.keywords ?? []).some((k) => normalizeAr(k).includes(nq)),
    )
  }, [q])

  return (
    <div className="page glossary-page">
      <header className="page-head">
        <Link to="/" className="icon-btn" aria-label={t.back}>
          →
        </Link>
        <h1>📖 {t.glossaryTitle}</h1>
        <p className="muted">{t.glossarySub}</p>
      </header>

      <input
        type="search"
        className="glossary-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.glossarySearch}
        aria-label={t.glossarySearch}
      />

      <ul className="glossary-list">
        {results.map((g) => {
          const organ = g.organId ? getOrgan(g.organId) : undefined
          const sys = g.systemId ? getSystem(g.systemId) : undefined
          return (
            <li key={g.en} className="glossary-item">
              <div className="glossary-term">
                <strong>{g.ar}</strong>
                <span dir="ltr">{g.en}</span>
              </div>
              <p className="glossary-def">{g.definition}</p>
              <div className="glossary-links">
                {sys && (
                  <Link to={`/system/${sys.id}`} className="mini-btn">
                    {sys.icon} {sys.ar}
                  </Link>
                )}
                {organ && (
                  <Link to={`/organ/${organ.id}`} className="mini-btn">
                    🔬 {organ.ar}
                  </Link>
                )}
              </div>
            </li>
          )
        })}
        {results.length === 0 && <p className="empty">لا توجد نتائج لـ «{q}»</p>}
      </ul>
    </div>
  )
}
