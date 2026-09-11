import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { searchOrgans } from '../lib/search'
import { getSystem } from '../data/systems'
import { useUserStore } from '../store/userStore'
import { t } from '../i18n/ar'

const SUGGESTIONS = ['القلب', 'الكبد', 'الكليتان', 'الدماغ', 'heart', 'تنقية الدم', 'عضو يخزن الصفراء']

export default function SearchPage() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()
  const markViewed = useUserStore((s) => s.markViewed)

  const results = useMemo(() => searchOrgans(query), [query])
  const showSuggestions = focused && query.trim().length === 0

  useEffect(() => {
    if (params.get('q') && params.get('q') !== query) setQuery(params.get('q')!)
  }, [params, query])

  return (
    <div className="page search-page">
      <header className="page-head">
        <h1>🔍 {t.searchTitle}</h1>
        <p className="muted">{t.searchHint}</p>
      </header>

      <div className="search-box">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder={t.searchPlaceholder}
          aria-label={t.searchTitle}
          enterKeyHint="search"
        />
      </div>

      {showSuggestions && (
        <div className="suggestions">
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" className="chip" onClick={() => setQuery(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {query.trim().length >= 2 && (
        <div className="search-results" role="list">
          {results.length === 0 && <p className="empty">{t.noResults} «{query}»</p>}
          {results.map(({ organ, matchedOn }) => {
            const sys = getSystem(organ.system)
            return (
              <button
                key={organ.id}
                type="button"
                role="listitem"
                className="search-result"
                onClick={() => {
                  markViewed(organ.id)
                  navigate(`/body?organ=${organ.id}`)
                }}
              >
                <div className="result-main">
                  <strong>{organ.ar}</strong>
                  <span className="result-en" dir="ltr">
                    {organ.en}
                  </span>
                  {sys && (
                    <span className="result-system" style={{ color: sys.color }}>
                      {sys.icon} {sys.ar}
                    </span>
                  )}
                  <p className="result-desc">{organ.function}</p>
                </div>
                <span className="result-go" aria-hidden>
                  📍
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
