// إعادة حساب model.box + label لكل عضو من هندسة الأشكال الفعلية
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { createServer } from 'vite'

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { allShapes } = await vite.ssrLoadModule('/src/components/BodyModel/shapes.ts')
const { ALL_ORGANS } = await vite.ssrLoadModule('/src/data/index.ts')
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

const files = readdirSync(join(root, 'src/data/organs')).filter((f) => f.endsWith('.ts')).map((f) => join(root, 'src/data/organs', f))
let updated = 0, failed = []
for (const organ of ALL_ORGANS) {
  if (!organ.model) continue
  const bb = bboxOf(organ.model.shapeIds)
  if (!bb) { failed.push(organ.id + '(بدون نقاط)'); continue }
  const fileOf = files.find((f) => readFileSync(f, 'utf8').includes(`id: '${organ.id}',`))
  if (!fileOf) { failed.push(organ.id + '(ملف)'); continue }
  let s = readFileSync(fileOf, 'utf8')
  const start = s.indexOf(`id: '${organ.id}',`)
  if (start === -1) { failed.push(organ.id + '(id)'); continue }
  const end = s.indexOf('  },', start + 4)
  const slice = s.slice(start, end === -1 ? start + 6000 : end + 5)
  const re = /model:\s*\{[^}]*shapeIds:\s*\[([^\]]*)\][^}]*\}/
  const m = slice.match(re)
  if (!m) { failed.push(organ.id + '(model)'); continue }
  const newModel = `model: { shapeIds: [${organ.model.shapeIds.map((x) => `'${x}'`).join(', ')}], box: [${bb.box.join(', ')}], label: [${bb.label.join(', ')}] }`
  const next = s.slice(0, start) + slice.replace(m[0], newModel) + s.slice(end === -1 ? start + 6000 : end + 5)
  if (next !== s) { writeFileSync(fileOf, next); updated++ }
}
console.log(`تحديث: ${updated} عضو | فشل: ${failed.join(', ') || 'لا شيء'}`)
