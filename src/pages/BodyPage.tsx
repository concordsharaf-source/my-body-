import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import BodyModel from '../components/BodyModel/BodyModel'
import type { FocusBox, ModelMarker } from '../components/BodyModel/BodyModel'
import { LAYER_SHAPES } from '../components/BodyModel/shapes'
import LayerPanel from '../components/LayerPanel'
import OrganLegend from '../components/OrganLegend'
import OrganCard from '../components/OrganCard'
import { DISSECTION_STEPS, INTERNAL_LAYERS, defaultLayerState } from '../data/layers'
import { SYSTEMS, getSystem } from '../data/systems'
import { getOrgan, organsOfSystem } from '../data'
import type { LayerId, SystemId } from '../data/types'
import { useAppStore } from '../store/appStore'
import { useUserStore } from '../store/userStore'
import { t } from '../i18n/ar'

const TISSUE_LAYERS: LayerId[] = ['skin', 'soft', 'muscles', 'bones']

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

  const [layers, setLayers] = useState<Record<LayerId, boolean>>(() => defaultLayerState())
  const [focusStep, setFocusStep] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [focusBox, setFocusBox] = useState<FocusBox | null>(null)
  const boxKey = useRef(0)

  // عزل الجهاز القادم من المسار (إعداد المظهر + إعادة الضبط عند المغادرة)
  const prevActive = useRef<string | null>(null)
  useEffect(() => {
    if (activeSystem) {
      markSystemExplored(activeSystem)
      const step = DISSECTION_STEPS.findIndex((s) => s.id === 'systems')
      setFocusStep(step === -1 ? 7 : step)
      prevActive.current = activeSystem
    } else if (prevActive.current) {
      setFocusStep(0)
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

  // الطبقات الفعالة حسب خطوة التقشير
  const effectiveLayers = useMemo(() => {
    const step = DISSECTION_STEPS[focusStep]
    const base = { ...layers }
    if (step.id === 'organs') {
      for (const id of TISSUE_LAYERS) base[id] = false
      base.vessels = false
      base.nervous = false
      base.sensory = false
      for (const id of INTERNAL_LAYERS) base[id] = true
    } else if (step.id === 'systems') {
      for (const id of TISSUE_LAYERS) base[id] = false
      base.vessels = true
      base.nervous = true
      base.sensory = false
      for (const id of INTERNAL_LAYERS) base[id] = true
    } else if (step.layer) {
      base[step.layer] = true
    }
    return base
  }, [layers, focusStep])

  const focusLayer = useMemo(() => {
    const step = DISSECTION_STEPS[focusStep]
    return step.layer ?? null
  }, [focusStep])

  const selectedOrgan = selected ? getOrgan(selected) : undefined

  /** الشارات الرقمية على النموذج (الأسماء في القائمة الجانبية). */
  const markers = useMemo<ModelMarker[]>(() => {
    const items: { id: string; color: string }[] = []
    const seen = new Set<string>()
    const add = (id: string, color: string) => {
      const o = getOrgan(id)
      if (!o?.model || seen.has(id)) return
      seen.add(id)
      items.push({ id, color })
    }
    if (activeSystem) {
      for (const o of organsOfSystem(activeSystem)) if (o.model) add(o.id, activeSystemDef?.color ?? 'var(--primary)')
    } else if (focusLayer) {
      for (const def of LAYER_SHAPES[focusLayer]) {
        if (def.sex && def.sex !== 'both' && def.sex !== sex) continue
        if (def.organId) add(def.organId, 'var(--primary)')
      }
    }
    if (selectedOrgan?.model) add(selectedOrgan.id, getSystem(selectedOrgan.system)?.color ?? 'var(--primary)')
    return items.map((x, i) => {
      const o = getOrgan(x.id)!
      return { id: x.id, num: i + 1, x: o.model!.label[0], y: o.model!.label[1], color: x.color }
    })
  }, [activeSystem, activeSystemDef, focusLayer, selectedOrgan, sex])

  const selectOrgan = (id: string) => {
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
            layers={effectiveLayers}
            selectedOrganId={selected}
            onSelectOrgan={selectOrgan}
            focusLayer={activeSystem ? null : focusLayer}
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
              <span className="system-banner-icon" aria-hidden>
                {activeSystemDef.icon}
              </span>
              <div>
                <strong>{activeSystemDef.ar}</strong>
                <p>{activeSystemDef.description}</p>
              </div>
              <button type="button" className="mini-btn" onClick={() => navigate('/body')}>
                {t.backToSystems}
              </button>
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
          <OrganLegend markers={markers} hoveredId={hoverId} onHover={setHoverId} onSelect={selectOrgan} />
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
          <LayerPanel
            layers={effectiveLayers}
            onToggle={(id) => setLayers((l) => ({ ...l, [id]: !l[id] }))}
            onShowAll={() => setLayers(defaultLayerState())}
            onHideAll={() =>
              setLayers(() => {
                const n = {} as Record<LayerId, boolean>
                const d = defaultLayerState()
                for (const id of Object.keys(d) as LayerId[]) n[id] = false
                n.skin = true
                return n
              })
            }
            focusStep={focusStep}
            onFocusStep={setFocusStep}
          />
        </aside>
      </div>
    </div>
  )
}
