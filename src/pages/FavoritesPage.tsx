import { useNavigate } from 'react-router-dom'
import { getOrgan, getSystem } from '../data'
import { useUserStore } from '../store/userStore'
import { t } from '../i18n/ar'

export default function FavoritesPage() {
  const favorites = useUserStore((s) => s.favorites)
  const toggleFavorite = useUserStore((s) => s.toggleFavorite)
  const markViewed = useUserStore((s) => s.markViewed)
  const navigate = useNavigate()

  return (
    <div className="page">
      <header className="page-head">
        <h1>⭐ {t.favoritesTitle}</h1>
      </header>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden>
            🫙
          </span>
          <h2>{t.favoritesEmpty}</h2>
          <p>{t.favoritesEmptySub}</p>
        </div>
      ) : (
        <ul className="fav-list">
          {favorites.map((id) => {
            const organ = getOrgan(id)
            if (!organ) return null
            const sys = getSystem(organ.system)
            return (
              <li key={id} className="fav-item">
                <button
                  type="button"
                  className="fav-main"
                  onClick={() => {
                    markViewed(id)
                    navigate(`/organ/${id}`)
                  }}
                >
                  {sys && <span className="fav-icon" style={{ background: `${sys.color}1a` }} aria-hidden>{sys.icon}</span>}
                  <span className="fav-info">
                    <strong>{organ.ar}</strong>
                    <span className="fav-en" dir="ltr">{organ.en}</span>
                  </span>
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => toggleFavorite(id)}
                  aria-label={t.removeFromFavorites}
                >
                  ✕
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
