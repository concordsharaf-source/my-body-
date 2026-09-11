import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BodyModel from '../components/BodyModel/BodyModel'
import OrganCard from '../components/OrganCard'
import { defaultLayerState } from '../data/layers'
import { getOrgan, getSystem } from '../data'
import { useAppStore } from '../store/appStore'
import { useUserStore } from '../store/userStore'
import { t } from '../i18n/ar'

export default function OrganPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const sex = useAppStore((s) => s.sex)!
  const level = useAppStore((s) => s.level)
  const reduceMotion = useAppStore((s) => s.reduceMotion)
  const markViewed = useUserStore((s) => s.markViewed)
  const [selected, setSelected] = useState<string | null>(null)

  const organ = id ? getOrgan(id) : undefined

  useEffect(() => {
    if (organ) {
      markViewed(organ.id)
      setSelected(organ.id)
    }
  }, [organ, markViewed])

  const layers = useMemo(() => defaultLayerState(), [])

  if (!organ) {
    return (
      <div className="page empty-state">
        <h1>{t.organNotFound}</h1>
        <Link className="btn" to="/">
          {t.goHome}
        </Link>
      </div>
    )
  }

  const sys = getSystem(organ.system)

  return (
    <div className="page organ-page">
      <header className="page-head">
        <Link to="/body" className="icon-btn" aria-label={t.back}>
          →
        </Link>
        <div>
          <h1>{organ.ar}</h1>
          <p className="muted" dir="ltr">
            {organ.en}
            {organ.medical ? ` · ${organ.medical}` : ''}
          </p>
        </div>
      </header>

      <div className="organ-page-layout">
        <div className="organ-page-model">
          <div className="organ-page-model-inner">
            <BodyModel
              sex={sex}
              layers={layers}
              selectedOrganId={selected}
              onSelectOrgan={(oid) => setSelected(oid)}
              interactive={false}
              reduceMotion={reduceMotion}
              focusBox={organ.model ? { x: organ.model.box[0], y: organ.model.box[1], w: organ.model.box[2], h: organ.model.box[3], key: 1 } : null}
            />
            {sys && (
              <Link to={`/system/${sys.id}`} className="mini-btn" style={{ borderColor: sys.color, color: sys.color }}>
                {sys.icon} {sys.ar} ←
              </Link>
            )}
          </div>
        </div>

        <div className="organ-page-card">
          <OrganCard organ={organ} onNavigateOrgan={(oid) => navigate(`/organ/${oid}`)} />
        </div>
      </div>

      <div className="level-note">
        {t.levelLabel}: <strong>{level === 1 ? t.level1 : level === 2 ? t.level2 : t.level3}</strong> —{' '}
        <Link to="/settings">تغيير</Link>
      </div>
    </div>
  )
}
