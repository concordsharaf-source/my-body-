// متحقق البيانات: كل الأعضاء/الأجهزة/الشكل يجب أن تكون سليمة ومتسقة
import { createServer } from 'vite'

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { ALL_ORGANS, SYSTEMS, getSystem } = await vite.ssrLoadModule('/src/data/index.ts')
const { allShapes } = await vite.ssrLoadModule('/src/components/BodyModel/shapes.ts')
await vite.close()

const shapeIds = new Set(allShapes().map((s) => s.def.id))
const organIds = new Set(ALL_ORGANS.map((o) => o.id))
const issues = []
const check = (cond, msg) => { if (!cond) issues.push(msg) }

for (const organ of ALL_ORGANS) {
  check(organ.id && organ.ar && organ.en, `${organ.id}: أسماء ناقصة`)
  check(organ.system && getSystem(organ.system), `${organ.id}: جهاز غير معروف ${organ.system}`)
  check(organ.function && organ.function.trim().length >= 20, `${organ.id}: الوصف قصير جدًا`)
  check(Array.isArray(organ.levels) && organ.levels.length === 3, `${organ.id}: المستويات`)
  check(Array.isArray(organ.relations) && organ.relations.length > 0, `${organ.id}: بلا علاقات`)
  for (const r of organ.relations) check(organIds.has(r.id), `${organ.id}: علاقة مفقودة ${r.id}`)
  check(Array.isArray(organ.facts), `${organ.id}: حقائق`)
  check(Array.isArray(organ.faqs) && organ.faqs.length >= 2, `${organ.id}: أسئلة أقل من 2`)
  check(Array.isArray(organ.care) && organ.care.length >= 3, `${organ.id}: عناية أقل من 3`)
  if (organ.model) {
    for (const sid of organ.model.shapeIds) check(shapeIds.has(sid), `${organ.id}: شكل مفقود ${sid}`)
    const [x, y, w, h] = organ.model.box
    check(x >= 0 && y >= 0 && x + w <= 360 && y + h <= 780, `${organ.id}: صندوق خارج النموذج [${x},${y},${w},${h}]`)
  }
}

const systemCounts = {}
for (const organ of ALL_ORGANS) systemCounts[organ.system] = (systemCounts[organ.system] ?? 0) + 1
for (const sys of SYSTEMS) check((systemCounts[sys.id] ?? 0) >= 1, `${sys.id}: جهاز بلا أعضاء`)
for (const sys of SYSTEMS) if ((systemCounts[sys.id] ?? 0) < 2) console.log(`تنبيه: ${sys.id} عضو واحد (مقبول: جهاز immune مرجعي)`)

console.log(`الأعضاء: ${ALL_ORGANS.length} | الأجهزة: ${SYSTEMS.length} | الأشكال: ${shapeIds.size}`)
console.log(issues.length ? `مشاكل: ${issues.length}\n- ${issues.join('\n- ')}` : 'لا مشاكل ✔')
process.exit(issues.length ? 1 : 0)
