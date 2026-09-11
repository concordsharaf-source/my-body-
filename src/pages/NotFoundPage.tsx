import { Link } from 'react-router-dom'
import { t } from '../i18n/ar'

export default function NotFoundPage() {
  return (
    <div className="page empty-state">
      <span className="empty-icon" aria-hidden>
        🧩
      </span>
      <h1>404</h1>
      <p>{t.notFound}</p>
      <Link to="/" className="btn btn-primary">
        {t.goHome}
      </Link>
    </div>
  )
}
