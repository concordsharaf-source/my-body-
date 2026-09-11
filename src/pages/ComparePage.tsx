import { Link } from 'react-router-dom'
import { COMPARE_INTRO, COMPARE_ROWS } from '../data/compare'
import { t } from '../i18n/ar'

export default function ComparePage() {
  return (
    <div className="page compare-page">
      <header className="page-head">
        <Link to="/" className="icon-btn" aria-label={t.back}>
          →
        </Link>
        <h1>⚖️ {t.compareTitle}</h1>
        <p className="muted">{COMPARE_INTRO}</p>
      </header>

      <div className="compare-table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th scope="col">{t.feature}</th>
              <th scope="col">♂ {t.maleCol}</th>
              <th scope="col">♀ {t.femaleCol}</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row) => (
              <tr key={row.feature}>
                <th scope="row">{row.feature}</th>
                <td>
                  {row.male}
                  {row.note && <p className="row-note">{row.note}</p>}
                </td>
                <td>
                  {row.female}
                  {row.note && <p className="row-note">{row.note}</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="medical-note">⚕️ {t.medicalNote}</p>
    </div>
  )
}
