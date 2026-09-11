import { Link } from 'react-router-dom'
import { t } from '../i18n/ar'

const VERSION = '1.0.0'

export default function AboutPage() {
  return (
    <div className="page about-page">
      <header className="page-head">
        <Link to="/" className="icon-btn" aria-label={t.back}>
          →
        </Link>
        <h1>ℹ️ {t.aboutTitle}</h1>
      </header>

      <div className="about-logo" aria-hidden>
        🧍
      </div>
      <h2>
        {t.appName} <span dir="ltr">Jismi</span>
      </h2>
      <p>{t.aboutText}</p>
      <p className="muted">
        {t.version}: <span dir="ltr">{VERSION}</span>
      </p>

      <section>
        <h3>⚕️ {t.disclaimer}</h3>
        <p>{t.disclaimerText}</p>
      </section>
      <section>
        <h3>📚 {t.sources}</h3>
        <p>{t.sourcesText}</p>
      </section>
      <section>
        <h3>🔒 {t.privacy}</h3>
        <p>{t.privacyText}</p>
      </section>
      <section>
        <h3>©️ {t.rights}</h3>
        <p>{t.rightsText}</p>
      </section>

      <footer className="about-footer">
        <Link to="/settings" className="mini-btn">
          ⚙️ {t.moreSettings}
        </Link>
        <Link to="/body" className="mini-btn">
          🧍 {t.exploreBody}
        </Link>
      </footer>
    </div>
  )
}
