import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { LayerId, Sex, SystemId } from '../../data/types'
import { getOrgan, organsOfSystem } from '../../data'
import { LAYER_SHAPES } from './shapes'
import type { ShapeDef } from './shapes'

export interface FocusBox {
  x: number
  y: number
  w: number
  h: number
  key: number // لتغيير الهدف
}

/** شارة رقمية على العضو (الأسماء في القائمة الجانبية). */
export interface ModelMarker {
  id: string
  num: number
  x: number
  y: number
  color: string
}

interface Props {
  sex: Sex
  selectedOrganId?: string | null
  onSelectOrgan?: (id: string) => void
  layers: Record<LayerId, boolean>
  focusLayer?: LayerId | null
  isolatedSystem?: SystemId | null
  markers?: ModelMarker[]
  hoveredOrganId?: string | null
  onHoverOrgan?: (id: string | null) => void
  reduceMotion?: boolean
  interactive?: boolean
  focusBox?: FocusBox | null
  onUserNavigate?: () => void
  tourPoint?: { x: number; y: number } | null
  className?: string
  ariaLabel?: string
}

const VIEW_W = 360
const VIEW_H = 780

/**
 * ترتيب الرسم (الخلفية → المقدمة):
 * الجلد في الخلفية ليكون الأعضاء مرئية وقابلة للنقر فوقه،
 * القلب أمام الرئتين، الأوعية أمام الأوردة، والأعضاء الحسية (وجه) في المقدمة.
 */
const RENDER_ORDER: LayerId[] = [
  'skin',
  'bones',
  'respiratory',
  'digestive',
  'circulatory',
  'urinary',
  'reproductive',
  'lymphatic',
  'endocrine',
  'nervous',
  'vessels',
  'muscles',
  'soft',
  'sensory',
]

/** التدرجات اللونية (المواقف تستخدم متغيرات CSS فتتكيّف مع الثيم). */
export const GRADIENTS: { id: string; a: string; c: string }[] = [
  { id: 'g-skin', a: '--skin-a', c: '--skin-c' },
  { id: 'g-soft', a: '--soft-a', c: '--soft-c' },
  { id: 'g-bones', a: '--bones-a', c: '--bones-c' },
  { id: 'g-respiratory', a: '--respiratory-a', c: '--respiratory-c' },
  { id: 'g-digestive', a: '--digestive-a', c: '--digestive-c' },
  { id: 'g-circulatory', a: '--circulatory-a', c: '--circulatory-c' },
  { id: 'g-urinary', a: '--urinary-a', c: '--urinary-c' },
  { id: 'g-reproductive', a: '--reproductive-a', c: '--reproductive-c' },
  { id: 'g-lymphatic', a: '--lymphatic-a', c: '--lymphatic-c' },
  { id: 'g-endocrine', a: '--endocrine-a', c: '--endocrine-c' },
  { id: 'g-nervous', a: '--nervous-a', c: '--nervous-c' },
  { id: 'g-muscles', a: '--muscles-a', c: '--muscles-c' },
  { id: 'g-sensory', a: '--sensory-a', c: '--sensory-c' },
  { id: 'g-breast', a: '--breast-a', c: '--breast-c' },
  { id: 'g-art', a: '--vessel-art-a', c: '--vessel-art-c' },
  { id: 'g-ven', a: '--vessel-ven-a', c: '--vessel-ven-c' },
]

/** ترتيب الطبقات "من السطح إلى الداخل" لحساب تعتيم التقشير. */
const SURFACE_ORDER: Record<LayerId, number> = {
  skin: 1,
  soft: 2,
  muscles: 3,
  bones: 4,
  vessels: 5,
  nervous: 6,
  circulatory: 7,
  respiratory: 8,
  digestive: 9,
  urinary: 10,
  reproductive: 11,
  lymphatic: 12,
  endocrine: 13,
  sensory: 14,
}

export default function BodyModel({
  sex,
  selectedOrganId,
  onSelectOrgan,
  layers,
  focusLayer,
  isolatedSystem,
  markers,
  hoveredOrganId,
  onHoverOrgan,
  reduceMotion = false,
  interactive = true,
  focusBox,
  onUserNavigate,
  tourPoint,
  className,
  ariaLabel = 'النموذج التشريحي لجسم الإنسان',
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const gradPrefix = 'gm' + useId().replace(/[^a-zA-Z0-9]/g, '')
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 })
  const [smooth, setSmooth] = useState(true)
  const [hovered, setHovered] = useState<string | null>(null)
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map())
  const dragState = useRef<{ startX: number; startY: number; tx: number; ty: number; pinch?: { d: number; k: number } } | null>(null)

  const selected = selectedOrganId ? getOrgan(selectedOrganId) : undefined
  const isolatedOrgans = useMemo(
    () => (isolatedSystem ? new Set(organsOfSystem(isolatedSystem).map((o) => o.id)) : null),
    [isolatedSystem],
  )

  /** تحويل focusBox إلى transform. */
  useEffect(() => {
    if (!focusBox) return
    const pad = 1.7
    const k = Math.min(VIEW_W / (focusBox.w * pad), VIEW_H / (focusBox.h * pad), 3)
    const cx = focusBox.x + focusBox.w / 2
    const cy = focusBox.y + focusBox.h / 2
    setSmooth(true)
    setTransform({ x: VIEW_W / 2 - k * cx, y: VIEW_H / 2 - k * cy, k })
  }, [focusBox?.key]) // eslint-disable-line react-hooks/exhaustive-deps

  /** حساب شفافية طبقة ما حسب الوضع الحالي. */
  const layerOpacity = useCallback(
    (id: LayerId): number => {
      if (!layers[id]) return 0
      // وضع الجهاز المعزول: فقط أعضاء الجهاز
      if (isolatedSystem) {
        const isSystemLayer = Object.values(LAYER_SHAPES[id]).some((s) =>
          organsOfSystem(isolatedSystem).some((o) => o.id === s.organId),
        )
        return isSystemLayer ? 1 : 0.1
      }
      // وضع التقشير الطبقي
      if (focusLayer) {
        if (focusLayer === 'skin') return id === 'skin' ? 1 : 0.12
        if (id === focusLayer) return 1
        const focusOrder = SURFACE_ORDER[focusLayer]
        const idOrder = SURFACE_ORDER[id]
        if (idOrder < focusOrder) return 0.12 // طبقات السطح تختفي
        if (id === 'skin') return 0.12
        return 0.35
      }
      // عضو محدد: إبرازه
      if (selected) {
        const selLayer = selected.layer
        if (id === selLayer) return 1
        if (id === 'skin') return 0.15
        if (id === 'muscles' || id === 'bones' || id === 'soft') return 0.15
        return 0.25
      }
      // العرض العادي: الجلد نصف شفاف
      if (id === 'skin') {
        return layers.bones || layers.muscles ? 0.2 : 0.5
      }
      return 1
    },
    [layers, isolatedSystem, focusLayer, selected],
  )

  /** شفافية شكل فردي (عضو محدد → غيره يبهت). */
  const shapeOpacity = useCallback(
    (def: ShapeDef): number => {
      const base = layerOpacity(shapeLayerOf(def))
      if (base === 0) return 0
      if (selected && def.organId && def.organId !== selected.id) return 0.2
      if (selected && def.organId === selected.id) return 1
      return 1
    },
    [layerOpacity, selected],
  )

  /** الأشكال المرئية لكل طبقة (مع مرآة + فلترة الجنس). */
  const rendered = useMemo(() => {
    const out = {} as Record<LayerId, { def: ShapeDef; mirrored: boolean }[]>
    for (const [layerId, shapes] of Object.entries(LAYER_SHAPES)) {
      const list: { def: ShapeDef; mirrored: boolean }[] = []
      for (const def of shapes) {
        if (def.sex && def.sex !== 'both' && def.sex !== sex) continue
        list.push({ def, mirrored: false })
        if (def.mirror) list.push({ def, mirrored: true })
      }
      out[layerId as LayerId] = list
    }
    return out
  }, [sex])


  /* ---------- تفاعلات التحريك ---------- */
  const toView = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const rect = svg.getBoundingClientRect()
    return {
      x: ((clientX - rect.left) / rect.width) * VIEW_W,
      y: ((clientY - rect.top) / rect.height) * VIEW_H,
    }
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive) return
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 1) {
      const p = toView(e.clientX, e.clientY)
      dragState.current = { startX: p.x, startY: p.y, tx: transform.x, ty: transform.y }
      setSmooth(false)
    } else if (pointers.current.size === 2) {
      const pts = [...pointers.current.values()]
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
      dragState.current = { ...dragState.current!, pinch: { d, k: transform.k } }
      setSmooth(false)
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactive || !pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const ds = dragState.current
    if (!ds) return
    if (pointers.current.size === 1) {
      const p = toView(e.clientX, e.clientY)
      setTransform((t) => ({ ...t, x: ds.tx + (p.x - ds.startX), y: ds.ty + (p.y - ds.startY) }))
      onUserNavigate?.()
    } else if (pointers.current.size === 2 && ds.pinch) {
      const pts = [...pointers.current.values()]
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
      const k = Math.min(4, Math.max(0.6, (ds.pinch.k * d) / ds.pinch.d))
      setTransform((t) => ({ ...t, k }))
      onUserNavigate?.()
    }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size === 0) dragState.current = null
  }

  /** عجلة الفأرة: React 18 يسجل wheel كـ passive — نستخدم مستمعًا أصليًا non-passive. */
  const wheelRef = useRef<(e: WheelEvent) => void>(() => {})
  wheelRef.current = (e: WheelEvent) => {
    if (!interactive) return
    const p = toView(e.clientX, e.clientY)
    setSmooth(false)
    setTransform((t) => {
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12
      const k = Math.min(4, Math.max(0.6, t.k * factor))
      const scale = k / t.k
      return { k, x: p.x - scale * (p.x - t.x), y: p.y - scale * (p.y - t.y) }
    })
    onUserNavigate?.()
  }

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || !interactive) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      wheelRef.current(e)
    }
    svg.addEventListener('wheel', handler, { passive: false })
    return () => svg.removeEventListener('wheel', handler)
  }, [interactive])

  const reset = () => {
    setSmooth(true)
    setTransform({ x: 0, y: 0, k: 1 })
  }

  const effectiveHovered = hoveredOrganId ?? hovered
  const hoveredOrgan = effectiveHovered ? getOrgan(effectiveHovered) : undefined

  /* ---------- الرسم ---------- */
  return (
    <div className={`body-model-wrap ${className ?? ''}`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="body-svg"
        role="img"
        aria-label={ariaLabel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={reset}
        style={{ touchAction: 'none' }}
      >
        <ModelDefs prefix={gradPrefix} />
        <g
          className="body-root"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`,
            transformOrigin: '0 0',
            transition: smooth && !reduceMotion ? 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
          }}
        >
          {RENDER_ORDER.map((layerId) => {
            const op = layerOpacity(layerId)
            if (op === 0) return null
            return (
              <g key={layerId} className={`layer layer-${layerId}`} opacity={op} style={{ transition: reduceMotion ? 'none' : 'opacity 0.35s' }}>
                {rendered[layerId].map(({ def, mirrored }) => {
                  const op2 = shapeOpacity(def) * (def.op ?? 1)
                  const isSel = selected && def.organId === selected.id
                  const cls = [
                    'shape',
                    def.organId ? 'organ-shape' : 'static-shape',
                    isSel ? 'is-selected' : '',
                    effectiveHovered === def.organId && def.organId ? 'is-hovered' : '',
                    layerId === 'skin' ? 'skin-shape' : '',
                    def.organId === 'heart' && !reduceMotion ? 'heart-pulse' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                  return (
                    <g key={`${def.id}${mirrored ? '-m' : ''}`} transform={mirrored ? 'matrix(-1,0,0,1,360,0)' : undefined}>
                      <ShapeEl def={def} cls={cls} opacity={op2} interactive={interactive} onSelect={onSelectOrgan} onHover={setHovered} gradPrefix={gradPrefix} />
                    </g>
                  )
                })}
              </g>
            )
          })}
          {/* نقطة الجولات (قطرة الدم...) */}
          {tourPoint && (
            <circle
              cx={tourPoint.x}
              cy={tourPoint.y}
              r={7}
              className="tour-dot"
              style={{ transition: reduceMotion ? 'none' : 'cx 1.1s ease-in-out, cy 1.1s ease-in-out' }}
            />
          )}
          {/* الشارات الرقمية (الأسماء في القائمة الجانبية) */}
          {markers && markers.length > 0 && (
            <g className="num-badges">
              {markers.map((m) => (
                <g
                  key={m.id}
                  className="num-badge"
                  onClick={interactive ? (e) => { e.stopPropagation(); onSelectOrgan?.(m.id) } : undefined}
                  onPointerEnter={interactive ? () => { setHovered(m.id); onHoverOrgan?.(m.id) } : undefined}
                  onPointerLeave={interactive ? () => { setHovered(null); onHoverOrgan?.(null) } : undefined}
                  style={{ cursor: interactive ? 'pointer' : undefined }}
                >
                  <circle cx={m.x} cy={m.y} r={8} className="num-badge-c" style={{ stroke: m.color }} />
                  <text x={m.x} y={m.y + 3.2} textAnchor="middle" className="num-badge-t">
                    {m.num}
                  </text>
                </g>
              ))}
            </g>
          )}
        </g>
      </svg>

      {/* تلميح العضو عند المرور */}
      {hoveredOrgan && (
        <div className="hover-tip" aria-hidden>
          {hoveredOrgan.ar}
        </div>
      )}
      {interactive && (
        <div className="model-zoom-controls">
          <button
            type="button"
            aria-label="تكبير"
            onClick={() => {
              setSmooth(true)
              setTransform((t) => {
                const k = Math.min(4, t.k * 1.3)
                const s = k / t.k
                return { k, x: VIEW_W / 2 - s * (VIEW_W / 2 - t.x), y: VIEW_H / 2 - s * (VIEW_H / 2 - t.y) }
              })
            }}
          >
            +
          </button>
          <button
            type="button"
            aria-label="تصغير"
            onClick={() => {
              setSmooth(true)
              setTransform((t) => {
                const k = Math.max(0.6, t.k / 1.3)
                const s = k / t.k
                return { k, x: VIEW_W / 2 - s * (VIEW_W / 2 - t.x), y: VIEW_H / 2 - s * (VIEW_H / 2 - t.y) }
              })
            }}
          >
            −
          </button>
          <button type="button" aria-label="إعادة الضبط" onClick={reset}>
            ⟲
          </button>
        </div>
      )}
    </div>
  )
}

function shapeLayerOf(def: ShapeDef): LayerId {
  for (const [layerId, shapes] of Object.entries(LAYER_SHAPES)) {
    if (shapes.some((s) => s.id === def.id)) return layerId as LayerId
  }
  return 'skin'
}

export function ModelDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      {GRADIENTS.map((g) => (
        <linearGradient key={g.id} id={`${prefix}${g.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: `var(${g.a})` }} />
          <stop offset="1" style={{ stopColor: `var(${g.c})` }} />
        </linearGradient>
      ))}
    </defs>
  )
}

export function ShapeEl({
  def,
  cls,
  opacity,
  interactive,
  onSelect,
  onHover,
  gradPrefix,
}: {
  def: ShapeDef
  cls: string
  opacity: number
  interactive: boolean
  onSelect?: (id: string) => void
  onHover?: (id: string | null) => void
  gradPrefix: string
}) {
  const common = {
    className: cls,
    opacity,
    style: { transition: 'opacity 0.25s' } as React.CSSProperties,
    onClick: def.organId && interactive ? (e: React.MouseEvent) => { e.stopPropagation(); onSelect?.(def.organId!) } : undefined,
    onPointerEnter: def.organId && interactive ? () => onHover?.(def.organId!) : undefined,
    onPointerLeave: def.organId && interactive ? () => onHover?.(null) : undefined,
  }
  const grad = (g: string) => `url(#${gradPrefix}${g})`
  const fill = def.strokeOnly
    ? 'none'
    : def.grad
      ? grad(def.grad)
      : def.fillVar
        ? `var(${def.fillVar})`
        : 'currentColor'
  const stroke = def.strokeOnly
    ? def.tone === 'art'
      ? 'var(--vessel-art-b)'
      : def.tone === 'ven'
        ? 'var(--vessel-ven-b)'
        : def.fillVar
          ? `var(${def.fillVar})`
          : 'currentColor'
    : def.grad
      ? 'rgba(30, 20, 10, 0.16)'
      : 'var(--shape-stroke)'
  const paint = {
    fill,
    stroke,
    strokeWidth: def.sw ?? (def.strokeOnly ? 3 : 1.1),
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeDasharray: def.dash,
  }
  switch (def.kind) {
    case 'circle':
      return <circle {...common} {...paint} cx={def.cx} cy={def.cy} r={def.r} />
    case 'ellipse':
      return <ellipse {...common} {...paint} cx={def.cx} cy={def.cy} rx={def.rx} ry={def.ry} />
    case 'line':
      return <line {...common} {...paint} x1={def.x1} y1={def.y1} x2={def.x2} y2={def.y2} />
    default:
      return <path {...common} {...paint} d={def.d} />
  }
}
