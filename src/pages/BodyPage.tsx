import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import BodyModel, { defaultMarkers, VIEW_W, VIEW_H } from '../components/BodyModel/BodyModel'
import type { FocusBox, ModelMarker } from '../components/BodyModel/BodyModel'
import OrganCard from '../components/OrganCard'
import { SYSTEMS, getSystem } from '../data/systems'
import { getOrgan, organsOfSystemForSex } from '../data'

import type { SystemId } from '../data/types'
import { useAppStore } from '../store/appStore'
import { useUserStore } from '../store/userStore'
import { t } from '../i18n/ar'

export default function BodyPage() {
  const { systemId } = useParams<{ systemId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const sex = useAppStore((s) => s.sex)!
  const setSex = useAppStore((s) => s.setSex)
  const reduceMotion = useAppStore((s) => s.reduceMotion)
  const markViewed = useUserStore((s) => s.markViewed)
  const markSystemExplored = useUserStore((s) => s.markSystemExplored)

  const activeSystem: SystemId | null = systemId ? (getSystem(systemId) ? (systemId as SystemId) : null) : null
  const activeSystemDef = activeSystem ? getSystem(activeSystem) : undefined

  const [selected, setSelected] = useState<string | null>(null)
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [focusBox, setFocusBox] = useState<FocusBox | null>(null)
  const boxKey = useRef(0)

  // عزل الجهاز القادم من المسار: تركيز العرض على نطاق الجهاز المحدد
  const prevActive = useRef<string | null>(null)
  useEffect(() => {
    if (activeSystem) {
      markSystemExplored(activeSystem)
      const boxes = organsOfSystemForSex(activeSystem, sex)
        .map((o) => o.model?.box)
        .filter((b): b is [number, number, number, number] => Boolean(b))
      // صناديق تغطي الجسم كله (مثل الجلد) لا تُضيّق التركيز إن وُجدت صناديق أخرى
      const isFullBody = (b: [number, number, number, number]) => b[3] >= VIEW_H * 0.7 && b[2] >= VIEW_W * 0.5
      const meaningful = boxes.filter((b) => !isFullBody(b))
      const use = meaningful.length ? meaningful : boxes
      if (use.length) {
        const x0 = Math.min(...use.map((b) => b[0]))
        const y0 = Math.min(...use.map((b) => b[1]))
        const x1 = Math.max(...use.map((b) => b[0] + b[2]))
        const y1 = Math.max(...use.map((b) => b[1] + b[3]))
        boxKey.current += 1
        setFocusBox({ x: x0, y: y0, w: x1 - x0, h: y1 - y0, key: boxKey.current })
      }
      prevActive.current = activeSystem
    } else if (prevActive.current) {
      setFocusBox(null)
      prevActive.current = null
    }
  }, [activeSystem, markSystemExplored])

  // عضو قادم من رابط عميق
  useEffect(() => {
    const organParam = searchParams.get('organ')
    if (organParam) {
      const organ = getOrgan(organParam)
      if (organ) {
        setSelected(organ.id)
        markViewed(organ.id)
        if (organ.model) {
          boxKey.current += 1
          setFocusBox({ x: organ.model.box[0], y: organ.model.box[1], w: organ.model.box[2], h: organ.model.box[3], key: boxKey.current })
        }
      }
      searchParams.delete('organ')
      setSearchParams(searchParams, { replace: true })
    }
  }, [searchParams, setSearchParams, markViewed])

  const selectedOrgan = selected ? getOrgan(selected) : undefined

  /** الشارات الرقمية على النموذج (والأسماء تظهر على جانبي الرسم). */
  const markers = useMemo<ModelMarker[]>(() => {
    const items: { id: string; color: string; x?: number; y?: number }[] = []
    const seen = new Set<string>()
    const add = (id: string, color: string, x?: number, y?: number) => {
      const o = getOrgan(id)
      if (!o?.model || seen.has(id)) return
      seen.add(id)
      items.push({ id, color, x, y })
    }
    if (activeSystem) {
      for (const o of organsOfSystemForSex(activeSystem, sex)) if (o.model) add(o.id, activeSystemDef?.color ?? 'var(--primary)')
    } else {
      for (const dm of defaultMarkers(sex)) add(dm.id, dm.color, dm.x, dm.y)
    }
    if (selectedOrgan?.model && !seen.has(selectedOrgan.id)) {
      add(selectedOrgan.id, getSystem(selectedOrgan.system)?.color ?? 'var(--primary)')
    }
    return items.map((x, i) => {
      const o = getOrgan(x.id)!
      return { id: x.id, num: i + 1, x: x.x ?? o.model!.label[0], y: x.y ?? o.model!.label[1], color: x.color, ar: o.ar }
    })
  }, [activeSystem, activeSystemDef, selectedOrgan, sex])

  const selectOrgan = (id: string) => {
    // في وضع جهاز محدد: نعرض أعضاء ذلك الجهاز فقط (النقر الخاطئ على غيره يُتجاهل)
    // — يُقبل العضو إذا كان الجهاز المعزول رئيسيًا له أو من أجهزته الثانوية
    if (activeSystem) {
      const o = getOrgan(id)
      if (!o || (o.system !== activeSystem && !o.systems?.includes(activeSystem))) return
    }
    setSelected(id)
    markViewed(id)
    const organ = getOrgan(id)
    if (organ?.model && !focusBox) {
      boxKey.current += 1
      setFocusBox({ x: organ.model.box[0], y: organ.model.box[1], w: organ.model.box[2], h: organ.model.box[3], key: boxKey.current })
    }
  }

  const showLocation = (id: string) => {
    const organ = getOrgan(id)
    if (!organ?.model) return
    setSelected(id)
    boxKey.current += 1
    setFocusBox({ x: organ.model.box[0], y: organ.model.box[1], w: organ.model.box[2], h: organ.model.box[3], key: boxKey.current })
  }

  const goSystem = (id: SystemId) => {
    if (id === activeSystem) {
      navigate('/body')
    } else {
      navigate(`/system/${id}`)
    }
  }

  return (
    <div className="page body-page">
      <header className="body-header">
        <Link to="/" className="icon-btn" aria-label={t.back}>
          →
        </Link>
        <h1>
          {activeSystemDef ? (
            <>
              {activeSystemDef.icon} {activeSystemDef.ar}
            </>
          ) : (
            t.navBody
          )}
        </h1>
        <div className="sex-toggle" role="group" aria-label="اختيار الجنس">
          <button type="button" className={sex === 'male' ? 'on' : ''} onClick={() => setSex('male')} aria-pressed={sex === 'male'}>
            ♂ {t.male}
          </button>
          <button type="button" className={sex === 'female' ? 'on' : ''} onClick={() => setSex('female')} aria-pressed={sex === 'female'}>
            ♀ {t.female}
          </button>
        </div>
      </header>

      <div className="body-layout">
        <div className="body-stage">
          <BodyModel
            sex={sex}
            interactive={!selected}
            selectedOrganId={selected}
            onSelectOrgan={selectOrgan}
            isolatedSystem={activeSystem}
            markers={markers}
            hoveredOrganId={hoverId}
            onHoverOrgan={setHoverId}
            reduceMotion={reduceMotion}
            focusBox={focusBox}
            onUserNavigate={() => setFocusBox(null)}
          />
          {activeSystemDef && (
            <div className="system-banner" style={{ borderColor: activeSystemDef.color }}>
              <div className="system-banner-top">
                <span className="system-banner-icon" aria-hidden>
                  {activeSystemDef.icon}
                </span>
                <div className="system-banner-text">
                  <strong>{activeSystemDef.ar}</strong>
                  <p>{activeSystemDef.description}</p>
                </div>
              </div>
            </div>
          )}
          {selectedOrgan && (
            <div className="organ-card-host">
              <OrganCard
                organ={selectedOrgan}
                onClose={() => setSelected(null)}
                onShowLocation={() => showLocation(selectedOrgan.id)}
                onNavigateOrgan={(id) => {
                  setSelected(id)
                  markViewed(id)
                }}
              />
            </div>
          )}
          {!selectedOrgan && (
            <p className="stage-hint">{t.noOrganSelected}</p>
          )}
        </div>

        <aside className="body-side">
          <div className="system-chips" role="listbox" aria-label={t.allSystems}>
            <button
              type="button"
              className={`chip ${!activeSystem ? 'on' : ''}`}
              onClick={() => navigate('/body')}
            >
              {t.allSystems}
            </button>
            {SYSTEMS.map((s) => (
              <button
                key={s.id}
                type="button"
                role="option"
                aria-selected={s.id === activeSystem}
                className={`chip ${s.id === activeSystem ? 'on' : ''}`}
                style={s.id === activeSystem ? { background: s.color, color: '#fff', borderColor: s.color } : undefined}
                onClick={() => goSystem(s.id)}
              >
                {s.icon} {s.ar}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
