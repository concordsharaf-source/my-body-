import { useMemo } from 'react'
import type { Organ } from '../data/types'
import { LAYER_SHAPES } from './BodyModel/shapes'
import type { ShapeDef } from './BodyModel/shapes'

/**
 * رسم عضو معزول بقصّ viewBox على مربعه — تستخدمه البطاقات التعليمية.
 */
export default function MiniOrgan({ organ, sex, className }: { organ: Organ; sex: 'male' | 'female'; className?: string }) {
  const shapes = useMemo(() => {
    const wanted = new Set(organ.model?.shapeIds ?? [])
    const out: { def: ShapeDef; mirrored: boolean }[] = []
    for (const list of Object.values(LAYER_SHAPES)) {
      for (const def of list) {
        if (!wanted.has(def.id)) continue
        if (def.sex && def.sex !== 'both' && def.sex !== sex) continue
        out.push({ def, mirrored: false })
        if (def.mirror) out.push({ def, mirrored: true })
      }
    }
    return out
  }, [organ, sex])

  const [x, y, w, h] = organ.model?.box ?? [0, 0, 360, 780]

  return (
    <svg viewBox={`${x} ${y} ${w} ${h}`} className={`mini-organ ${className ?? ''}`} role="img" aria-label={organ.ar}>
      <rect x={x} y={y} width={w} height={h} className="mini-bg" />
      {shapes.map(({ def, mirrored }) => (
        <g key={`${def.id}${mirrored ? '-m' : ''}`} transform={mirrored ? 'matrix(-1,0,0,1,360,0)' : undefined}>
          <ShapeDefEl def={def} />
        </g>
      ))}
    </svg>
  )
}

function ShapeDefEl({ def }: { def: ShapeDef }) {
  const paint = {
    fill: def.strokeOnly ? 'none' : 'currentColor',
    stroke: def.strokeOnly ? 'currentColor' : 'none',
    strokeWidth: def.sw ?? 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeDasharray: def.dash,
    className: 'mini-shape',
  }
  switch (def.kind) {
    case 'circle':
      return <circle {...paint} cx={def.cx} cy={def.cy} r={def.r} />
    case 'ellipse':
      return <ellipse {...paint} cx={def.cx} cy={def.cy} rx={def.rx} ry={def.ry} />
    case 'line':
      return <line {...paint} x1={def.x1} y1={def.y1} x2={def.x2} y2={def.y2} />
    default:
      return <path {...paint} d={def.d} />
  }
}
