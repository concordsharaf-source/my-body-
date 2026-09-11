import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../store/appStore'
import type { FontScale, InfoLevel, ThemeMode } from '../store/appStore'
import { useUserStore } from '../store/userStore'
import { canInstall, onInstallabilityChange, promptInstall } from '../lib/pwa'
import { t } from '../i18n/ar'

export default function SettingsPage() {
  const { level, setLevel, theme, setTheme, reduceMotion, setReduceMotion, fontScale, setFontScale } = useAppStore()
  const resetAll = useUserStore((s) => s.resetAll)
  const [installOk, setInstallOk] = useState(false)
  const [can, setCan] = useState(canInstall())
  const [resetDone, setResetDone] = useState(false)

  useEffect(() => onInstallabilityChange(() => setCan(canInstall())), [])

  return (
    <div className="page settings-page">
      <header className="page-head">
        <Link to="/" className="icon-btn" aria-label={t.back}>
          →
        </Link>
        <h1>⚙️ {t.settingsTitle}</h1>
      </header>

      <section className="settings-section">
        <h2>{t.levelLabel}</h2>
        <div className="segmented" role="radiogroup" aria-label={t.levelLabel}>
          {([1, 2, 3] as InfoLevel[]).map((l) => (
            <button
              key={l}
              type="button"
              role="radio"
              aria-checked={level === l}
              className={level === l ? 'on' : ''}
              onClick={() => setLevel(l)}
            >
              <strong>{l === 1 ? t.level1 : l === 2 ? t.level2 : t.level3}</strong>
              <span>{l === 1 ? t.level1Sub : l === 2 ? t.level2Sub : t.level3Sub}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="settings-section">
        <h2>{t.themeLabel}</h2>
        <div className="segmented" role="radiogroup" aria-label={t.themeLabel}>
          {(['light', 'dark', 'system'] as ThemeMode[]).map((m) => (
            <button key={m} type="button" role="radio" aria-checked={theme === m} className={theme === m ? 'on' : ''} onClick={() => setTheme(m)}>
              {m === 'light' ? '☀️ ' + t.themeLight : m === 'dark' ? '🌙 ' + t.themeDark : '🖥️ ' + t.themeSystem}
            </button>
          ))}
        </div>
      </section>

      <section className="settings-section">
        <h2>{t.fontScale}</h2>
        <div className="segmented" role="radiogroup" aria-label={t.fontScale}>
          {(['s', 'm', 'l'] as FontScale[]).map((f) => (
            <button key={f} type="button" role="radio" aria-checked={fontScale === f} className={fontScale === f ? 'on' : ''} onClick={() => setFontScale(f)}>
              {f === 's' ? t.fontS : f === 'm' ? t.fontM : t.fontL}
            </button>
          ))}
        </div>
      </section>

      <section className="settings-section">
        <label className="setting-row">
          <div>
            <strong>{t.reduceMotion}</strong>
            <p className="muted">{t.reduceMotionSub}</p>
          </div>
          <input type="checkbox" checked={reduceMotion} onChange={(e) => setReduceMotion(e.target.checked)} />
        </label>
      </section>

      {(can || installOk) && (
        <section className="settings-section">
          <button type="button" className="btn btn-primary install-btn" onClick={async () => setInstallOk(await promptInstall())} disabled={installOk}>
            {installOk ? '✓ ' + t.installSub : '📲 ' + t.installApp}
          </button>
        </section>
      )}

      <section className="settings-section danger">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            if (confirm(t.resetConfirm)) {
              resetAll()
              setResetDone(true)
              setTimeout(() => setResetDone(false), 2000)
            }
          }}
        >
          {resetDone ? '✓ ' + t.resetDone : '🗑 ' + t.resetData}
        </button>
      </section>
    </div>
  )
}
