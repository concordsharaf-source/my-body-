import { t } from '../i18n/ar'
import { useAppStore } from '../store/appStore'

/** شاشة اختيار الجنس عند أول تشغيل. */
export default function SexSelect() {
  const setSex = useAppStore((s) => s.setSex)
  return (
    <div className="sex-select" role="dialog" aria-modal="true" aria-label={t.chooseSexTitle}>
      <div className="sex-select-inner">
        <div className="sex-logo" aria-hidden>
          🧍
        </div>
        <h1>{t.chooseSexTitle}</h1>
        <p className="muted">{t.chooseSexSub}</p>
        <div className="sex-buttons">
          <button type="button" className="sex-btn" onClick={() => setSex('male')}>
            <span className="sex-icon" aria-hidden>
              ♂
            </span>
            {t.male}
          </button>
          <button type="button" className="sex-btn" onClick={() => setSex('female')}>
            <span className="sex-icon" aria-hidden>
              ♀
            </span>
            {t.female}
          </button>
        </div>
        <p className="sex-note">يمكنك تغيير النموذج لاحقًا من شاشة «الجسم»</p>
      </div>
    </div>
  )
}
