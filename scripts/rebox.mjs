// إعادة حساب model.box + label لكل عضو من هندسة الأشكال الفعلية
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { createServer } from 'vite'

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { allShapes } = await vite.ssrLoadModule('/src/components/BodyModel/shapes.ts')
await vite.close()
const root = process.cwd()

function pathPoints(d) {
  const pts = []
  const tokens = d.match(/[MLHVCSQTAZmlhvcsqtaz]|-?\d*\.?\d+/g) ?? []
  let i = 0, x = 0, y = 0, cmd = ''
  const num = () => parseFloat(tokens[i++])
  while (i < tokens.length) {
    const t = tokens[i]
    if (/[A-Za-z]/.test(t)) {
      cmd = t
      i++
      if (cmd.toUpperCase() === 'Z') continue
    }
    const rel = cmd === cmd.toLowerCase()
    const C = cmd.toUpperCase()
    const add = (px, py) => pts.push([px, py])
    if (C === 'M' || C === 'L') {
      let px = num(), py = num()
      if (rel) { px += x; py += y }
      x = px; y = py; add(x, y)
    } else if (C === 'H') {
      let px = num(); if (rel) px += x
      x = px; add(x, y)
    } else if (C === 'V') {
      let py = num(); if (rel) py += y
      y = py; add(x, y)
    } else if (C === 'C') {
      const c1x = num(), c1y = num(), c2x = num(), c2y = num(), ex = num(), ey = num()
      if (rel) { pts.push([c1x + x, c1y + y], [c2x + x, c2y + y]); x = ex + x; y = ey + y }
      else { pts.push([c1x, c1y], [c2x, c2y]); x = ex; y = ey }
      add(x, y)
    } else if (C === 'S' || C === 'Q' || C === 'T') {
      const ax = num(), ay = num(), ex = num(), ey = num()
      if (rel) { pts.push([ax + x, ay + y]); x = ex + x; y = ey + y }
      else { pts.push([ax, ay]); x = ex; y = ey }
      add(x, y)
    } else if (C === 'A') {
      num(); num(); num()
      i++; i++
      let px = num(), py = num()
      if (rel) { px += x; py += y }
      x = px; y = py; add(x, y)
    }
  }
  return pts
}

function shapePts(def) {
  if (def.kind === 'circle') return [[def.cx, def.cy - def.r], [def.cx, def.cy + def.r], [def.cx - def.r, def.cy], [def.cx + def.r, def.cy]]
  if (def.kind === 'ellipse') return [[def.cx, def.cy - def.ry], [def.cx, def.cy + def.ry], [def.cx - def.rx, def.cy], [def.cx + def.rx, def.cy]]
  if (def.kind === 'line') return [[def.x1, def.y1], [def.x2, def.y2]]
  return pathPoints(def.d ?? '')
}

const idPts = new Map()
for (const { def, mirrored } of allShapes()) {
  if (!idPts.has(def.id)) idPts.set(def.id, [])
  const f = mirrored ? (p) => [360 - p[0], p[1]] : (p) => p
  for (const p of shapePts(def)) idPts.get(def.id).push(f(p))
}

function bboxOf(shapeIds) {
  let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9
  for (const sid of shapeIds) {
    const pts = idPts.get(sid)
    if (!pts) continue
    for (const [x, y] of pts) {
      minX = Math.min(minX, x); minY = Math.min(minY, y)
      maxX = Math.max(maxX, x); maxY = Math.max(maxY, y)
    }
  }
  if (minX > maxX) return null
  const w = maxX - minX, h = maxY - minY
  const padX = Math.max(w * 0.12, 8), padY = Math.max(h * 0.12, 8)
  minX = Math.max(0, Math.round(minX - padX)); minY = Math.max(0, Math.round(minY - padY))
  maxX = Math.min(360, Math.round(maxX + padX)); maxY = Math.min(780, Math.round(maxY + padY))
  const cx = Math.round((minX + maxX) / 2)
  const cy = Math.round(minY + (maxY - minY) * 0.42)
  return { box: [minX, minY, maxX - minX, maxY - minY], label: [cx, cy] }
}

// نعالج كل ملف: نبحث عن معرفات الأعضاء الفعلية (4 مسافات بداية سطر)
// حتى لا نُطابق مراجع العلاقات داخل مدخلات أخرى.
const files = readdirSync(join(root, 'src/data/organs')).filter((f) => f.endsWith('.ts')).map((f) => join(root, 'src/data/organs', f))
let updated = 0, failed = []
for (const fileOf of files) {
  let s = readFileSync(fileOf, 'utf8')
  const re = /^    id: '(\w+)',$/gm
  let m
  const starts = []
  while ((m = re.exec(s))) starts.push({ id: m[1], at: m.index })
  for (let i = starts.length - 1; i >= 0; i--) {
    const st = starts[i]
    const end = s.indexOf('\n  },', st.at)
    const sliceEnd = end === -1 ? s.length : end
    const slice = s.slice(st.at, sliceEnd)
    const mm = slice.match(/model:\s*\{[^}]*shapeIds:\s*\[([^\]]*)\][^}]*\}/)
    if (!mm) continue // عضو بلا موديل
    const ids = [...mm[1].matchAll(/'([^']+)'/g)].map((x) => x[1])
    const bb = bboxOf(ids)
    if (!bb) { failed.push(st.id + '(بدون نقاط)'); continue }
    const newModel = `model: { shapeIds: [${ids.map((x) => `'${x}'`).join(', ')}], box: [${bb.box.join(', ')}], label: [${bb.label.join(', ')}] }`
    const next = s.slice(0, st.at) + slice.replace(mm[0], newModel) + s.slice(sliceEnd)
    if (next !== s) { s = next; updated++ }
  }
  writeFileSync(fileOf, s)
}
console.log(`تحديث: ${updated} عضو | فشل: ${failed.join(', ') || 'لا شيء'}`)
