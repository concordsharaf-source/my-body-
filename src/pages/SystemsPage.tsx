import { Link } from 'react-router-dom'
import SystemsGrid from '../components/SystemsGrid'
import { t } from '../i18n/ar'

export default function SystemsPage() {
  return (
    <div className="page systems-page">
      <header className="page-head">
        <Link to="/" className="icon-btn" aria-label={t.back}>
          →
        </Link>
        <h1>🧠 {t.systemsTitle}</h1>
        <p className="muted">{t.systemsSub}</p>
      </header>
      <SystemsGrid />
    </div>
  )
}
