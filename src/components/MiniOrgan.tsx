import { useId, useMemo } from 'react'
import type { Organ } from '../data/types'
import { LAYER_SHAPES } from './BodyModel/shapes'
import type { ShapeDef } from './BodyModel/shapes'
import { ModelDefs, ShapeEl } from './BodyModel/BodyModel'

/**
 * رسم العضو بنفس أسلوب النموذج الكامل (تدرجات + خطوط) لكن بقصّ viewBox
 * على مربع العضو مع حد أدنى للسياق — تستخدمه البطاقات التعليمية.
 */
export default function MiniOrgan({ organ, sex, className }: { organ: Organ; sex: 'male' | 'female'; className?: string }) {
  const gradPrefix = 'mini' + useId().replace(/[^a-zA-Z0-9]/g, '')

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

  const [bx, by, bw, bh] = organ.model?.box ?? [0, 0, 360, 780]
  const [vx, vy, vw, vh] = cropWithContext(bx, by, bw, bh)

  return (
    <svg viewBox={`${vx} ${vy} ${vw} ${vh}`} className={`mini-organ ${className ?? ''}`} role="img" aria-label={organ.ar}>
      <ModelDefs prefix={gradPrefix} />
      <rect x={vx} y={vy} width={vw} height={vh} className="mini-bg" />
      {shapes.map(({ def, mirrored }) => (
        <g key={`${def.id}${mirrored ? '-m' : ''}`} transform={mirrored ? 'matrix(-1,0,0,1,360,0)' : undefined}>
          <ShapeEl def={def} cls="mini-shape" opacity={1} interactive={false} gradPrefix={gradPrefix} />
        </g>
      ))}
    </svg>
  )
}

/**
 * قصّ بعرض/ارتفاع أدنى (150 وحدة) مع الحفاظ على مركز العضو،
 * حتى تظهر الأعضاء الصغيرة داخل سياقها التشريحي بدل تكبيرها إلى كرة.
 */
function cropWithContext(x: number, y: number, w: number, h: number): [number, number, number, number] {
  const MIN = 150
  const k = Math.max(MIN / Math.min(w, h), 1)
  const vw = Math.min(360, w * k)
  const vh = Math.min(780, h * k)
  const cx = x + w / 2
  const cy = y + h / 2
  const vx = Math.min(360 - vw, Math.max(0, cx - vw / 2))
  const vy = Math.min(780 - vh, Math.max(0, cy - vh / 2))
  return [vx, vy, vw, vh]
}
