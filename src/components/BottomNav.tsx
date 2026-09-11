import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { t } from '../i18n/ar'

const ITEMS = [
  { to: '/', icon: '🏠', label: t.navHome, end: true },
  { to: '/body', icon: '🧍', label: t.navBody },
  { to: '/search', icon: '🔍', label: t.navSearch },
  { to: '/favorites', icon: '⭐', label: t.navFavorites },
]

const MORE_ITEMS = [
  { to: '/quiz', icon: '📝', label: t.moreQuiz },
  { to: '/cards', icon: '🎴', label: t.moreCards },
  { to: '/learning', icon: '📈', label: t.moreLearning },
  { to: '/tours', icon: '🩸', label: t.moreTours },
  { to: '/compare', icon: '⚖️', label: t.moreCompare },
  { to: '/glossary', icon: '📖', label: t.moreGlossary },
  { to: '/settings', icon: '⚙️', label: t.moreSettings },
  { to: '/about', icon: 'ℹ️', label: t.moreAbout },
]

export default function BottomNav() {
  const [moreOpen, setMoreOpen] = useState(false)
  const navigate = useNavigate()

  // قفل تمرير الصفحة خلف النافذة
  useEffect(() => {
    document.body.style.overflow = moreOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [moreOpen])

  return (
    <>
      {moreOpen && (
        <div className="more-sheet-backdrop" onClick={() => setMoreOpen(false)}>
          <div className="more-sheet" role="menu" aria-label={t.navMore} onClick={(e) => e.stopPropagation()}>
            {MORE_ITEMS.map((m) => (
              <button
                key={m.to}
                type="button"
                role="menuitem"
                onClick={() => {
                  setMoreOpen(false)
                  navigate(m.to)
                }}
              >
                <span className="more-icon">{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <nav className="bottom-nav" aria-label="التنقل الرئيسي">
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon" aria-hidden>
              {item.icon}
            </span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          className={`nav-item nav-more ${moreOpen ? 'active' : ''}`}
          onClick={() => setMoreOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={moreOpen}
        >
          <span className="nav-icon" aria-hidden>
            ⋯
          </span>
          <span className="nav-label">{t.navMore}</span>
        </button>
      </nav>
    </>
  )
}
