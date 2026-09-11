import type { LayerId } from '../../data/types'

/**
 * تعريفات أشكال النموذج التشريحي (SVG) — الإصدار المحسّن.
 * - كل شكل له id ثابتًا يربطه بقاعدة البيانات (model.shapeIds).
 * - الأشكال ذات `mirror: true` تُرسم مرة (يسار) ومره معكوسة (يمين) حول محور x=180.
 * - `grad`: معرّف تدرج لوني (يُعرَّف في BodyModel).
 * - `tone`: لون وعية (شرياني/وريدي).
 * - `fillVar`: متغير CSS خاص للتلوين (عيون، أسنان، ...) .
 */
export interface ShapeDef {
  id: string
  kind: 'p a t h' | 'circle' | 'ellipse' | 'line'
  d?: string
  cx?: number
  cy?: number
  r?: number
  rx?: number
  ry?: number
  x1?: number
  y1?: number
  x2?: number
  y2?: number
  /** العضو القابل للنقر المرتبط بهذا الشكل. */
  organId?: string
  /** رسم كخط فقط (stroke). */
  strokeOnly?: boolean
  /** سماكة الخط للأشكال الخطية. */
  sw?: number
  dash?: string
  /** يُرسم نسخة معكوسة على الجانب الآخر. */
  mirror?: boolean
  /** يظهر لجنس معين فقط (إلا إذا كان both). */
  sex?: 'male' | 'female' | 'both'
  /** تدرج لوني (url(#grad)). */
  grad?: string
  /** متغير CSS لحواف داكنة واضحة حول شكل مملوء (تفاصيل أوضح). */
  strokeVar?: string
  /** تلوين وعية. */
  tone?: 'art' | 'ven'
  /** متغير CSS لتلوين خاص. */
  fillVar?: string
  /** شفافية. */
  op?: number
}

const S = (s: ShapeDef) => s

/* ============ الجلد (skin) — Silhouette محسّن ============ */
const SKIN: ShapeDef[] = [
  S({
    id: 'fig-neck',
    kind: 'p a t h',
    organId: 'skin',
    grad: 'g-skin',
    d: 'M 165,92 L 165,142 C 165,147 195,147 195,142 L 195,92 Z',
  }),
  S({
    id: 'fig-head',
    kind: 'p a t h',
    organId: 'skin',
    grad: 'g-skin',
    d: 'M 180,28 C 199,28 211,40 213,58 C 214,70 212,82 207,92 C 203,100 197,109 189,115 C 185,118 182,119 180,119 C 178,119 175,118 171,115 C 163,109 157,100 153,92 C 148,82 146,70 147,58 C 149,40 161,28 180,28 Z',
  }),
  S({
    id: 'fig-torso-m',
    kind: 'p a t h',
    organId: 'skin',
    sex: 'male',
    grad: 'g-skin',
    d: 'M 180,138 C 158,138 137,144 127,150 C 121,154 118,162 117,172 C 115,198 114,226 116,252 C 117,274 120,292 125,306 C 129,316 134,324 136,334 C 138,346 136,358 133,368 C 131,377 131,385 135,391 C 149,399 164,403 180,403 C 196,403 211,399 225,391 C 229,385 229,377 227,368 C 224,358 223,346 225,334 C 226,324 231,316 235,306 C 240,292 243,274 244,252 C 246,226 245,198 243,172 C 242,162 239,154 233,150 C 223,144 202,138 180,138 Z',
  }),
  S({
    id: 'fig-torso-f',
    kind: 'p a t h',
    organId: 'skin',
    sex: 'female',
    grad: 'g-skin',
    d: 'M 180,138 C 161,138 145,143 136,148 C 130,152 127,159 126,168 C 124,194 124,220 126,244 C 127,264 130,280 135,292 C 139,301 141,310 140,319 C 138,330 133,339 131,349 C 129,361 132,372 139,381 C 148,391 163,398 180,398 C 197,398 212,391 221,381 C 228,372 231,361 229,349 C 227,339 222,330 220,319 C 219,310 221,301 225,292 C 230,280 233,264 234,244 C 236,220 236,194 234,168 C 233,159 230,152 224,148 C 215,143 199,138 180,138 Z',
  }),
  S({
    id: 'fig-arm-l',
    kind: 'p a t h',
    organId: 'skin',
    mirror: true,
    grad: 'g-skin',
    d: 'M 238,146 C 251,144 261,154 263,168 C 265,186 264,205 262,224 C 260,242 258,258 256,273 C 254,291 252,309 251,327 C 250,345 249,362 248,377 C 248,385 246,391 243,395 C 240,399 236,399 234,395 C 232,391 232,385 233,377 C 234,357 235,336 236,315 C 237,295 238,277 239,260 C 240,244 241,228 241,212 C 241,196 240,182 238,172 C 237,161 235,150 238,146 Z',
  }),
  S({
    id: 'fig-hand-l',
    kind: 'p a t h',
    organId: 'skin',
    mirror: true,
    grad: 'g-skin',
    d: 'M 234,390 C 230,402 229,416 232,426 C 234,434 241,437 247,433 C 251,430 252,421 251,412 C 250,403 248,396 247,391 C 243,395 238,395 234,390 Z',
  }),
  S({
    id: 'fig-leg-l',
    kind: 'p a t h',
    organId: 'skin',
    mirror: true,
    grad: 'g-skin',
    d: 'M 228,382 C 238,400 242,424 241,450 C 240,476 237,502 233,526 C 231,542 230,556 229,568 C 228,582 227,596 226,612 C 225,640 224,668 222,690 C 221,700 219,708 217,711 L 200,711 C 199,700 199,688 199.5,672 C 200.5,644 201.5,616 202.5,590 C 203.5,576 204.5,562 205.5,548 C 206.5,532 207.5,514 209.5,494 C 211.5,468 212,444 212,424 C 212,406 210,392 207,383 C 214,387 222,385 228,382 Z',
  }),
  S({
    id: 'fig-foot-l',
    kind: 'p a t h',
    organId: 'skin',
    mirror: true,
    grad: 'g-skin',
    d: 'M 198,709 C 192,713 189,721 190,729 C 191,737 197,742 204,742 C 211,742 215,737 216,730 C 217,723 214,715 212,710 C 207,713 203,713 198,709 Z',
  }),
  // خطوط تشريحية خفيفة (صدر، سرة)
  S({
    id: 'fig-pec-line-m',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.6,
    sex: 'male',
    fillVar: '--chest-line',
    op: 0.55,
    d: 'M 178,162 C 170,172 165,184 166,196 M 182,162 C 190,172 195,184 194,196 M 166,196 C 170,203 176,206 180,206 C 184,206 190,203 194,196',
  }),
  S({
    id: 'fig-pec-line-f',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.6,
    sex: 'female',
    fillVar: '--chest-line',
    op: 0.5,
    d: 'M 180,156 L 180,208',
  }),
  S({
    id: 'fig-navel',
    kind: 'ellipse',
    strokeOnly: true,
    sw: 1.6,
    fillVar: '--chest-line',
    op: 0.6,
    cx: 180,
    cy: 338,
    rx: 2.6,
    ry: 3.4,
  }),
]

/* ============ الأنسجة السطحية (soft) ============ */
const SOFT: ShapeDef[] = [
  S({
    id: 'soft-chest',
    kind: 'p a t h',
    grad: 'g-soft',
    op: 0.5,
    d: 'M 138,196 C 134,222 139,246 153,254 C 169,261 191,261 207,254 C 221,246 226,222 222,196 C 204,187 156,187 138,196 Z',
  }),
  S({
    id: 'soft-abdomen',
    kind: 'p a t h',
    grad: 'g-soft',
    op: 0.5,
    d: 'M 146,266 C 142,300 145,338 154,364 C 167,372 193,372 206,364 C 215,338 218,300 214,266 C 196,257 164,257 146,266 Z',
  }),
  S({
    id: 'soft-thigh-l',
    kind: 'p a t h',
    mirror: true,
    grad: 'g-soft',
    op: 0.45,
    d: 'M 207,420 C 204,452 205,488 209,520 C 214,528 226,528 230,520 C 232,488 232,452 229,422 C 222,415 213,415 207,420 Z',
  }),
]

/* ============ الهيكل العظمي (bones) — هيكل عظمي كامل ============ */
/** جسم فقري (مستطيل مدوّر الأركان). */
const vert = (x: number, y: number, w: number, h: number, r = 1.8): string =>
  `M ${x} ${y} h ${+(w - 2 * r).toFixed(1)} a ${r} ${r} 0 0 1 ${r} ${r} v ${+(h - 2 * r).toFixed(1)} a ${r} ${r} 0 0 1 ${-r} ${r} h ${-(w - 2 * r).toFixed(1)} a ${r} ${r} 0 0 1 ${-r} ${-r} v ${-(h - 2 * r).toFixed(1)} a ${r} ${r} 0 0 1 ${r} ${-r} Z`

const CERVICAL_V = Array.from({ length: 7 }, (_, i) => vert(172.5, 119 + i * 4.4, 15, 4.2, 1.6)).join(' ')
const THORACIC_V = Array.from({ length: 12 }, (_, i) => vert(171.5, 151 + i * 7.6, 17, 5.6, 1.8)).join(' ')
const LUMBAR_V = Array.from({ length: 5 }, (_, i) => vert(170.5, 243 + i * 8.8, 19, 6.8, 2)).join(' ')

/** ضلع: ينحني من العمود حول الصدر ليستقر عند القص (الضلعان الأخيران معلّقان). */
const rib = (i: number): string => {
  const y0 = 157 + i * 7.8
  const xw = 133 + i * 0.45
  if (i >= 10) return `M 174 ${y0} C 161 ${y0 - 2} 149 ${y0 + 2} ${xw} ${y0 + 8}`
  return `M 174 ${y0} C 160 ${y0 - 2.5} 145 ${y0 + 2} ${xw} ${y0 + 8.5} C ${xw - 5} ${y0 + 14} ${xw + 2} ${y0 + 20} ${xw + 11} ${y0 + 22.5} C ${xw + 21} ${y0 + 25.5} 165 ${y0 + 24} 174 ${y0 + 21}`
}
const RIBS_L = Array.from({ length: 12 }, (_, i) => rib(i)).join(' ')

/** شوكات عابرة للفقرات (تفاصيل). */
const tick = (y: number, len: number, drop: number) => `M 171 ${y} l ${-len} ${drop} M 189 ${y} l ${len} ${drop}`
const SPINE_TICKS = [
  ...Array.from({ length: 7 }, (_, i) => tick(120.5 + i * 4.4, 5.5, 2.6)),
  ...Array.from({ length: 12 }, (_, i) => tick(153.5 + i * 7.6, 6.5, 3)),
  ...Array.from({ length: 5 }, (_, i) => tick(245.5 + i * 8.8, 7.5, 3.4)),
].join(' ')

const BONES: ShapeDef[] = [
  S({
    id: 'bone-skull',
    kind: 'p a t h',
    organId: 'skull',
    grad: 'g-bones',
    strokeVar: '--bone-detail',
    d: 'M 180,31 C 199,31 212,45 213,63 C 214,79 209,93 200,101 L 197,109 C 194,115 187,119 180,119 C 173,119 166,115 163,109 L 160,101 C 151,93 146,79 147,63 C 148,45 161,31 180,31 Z',
  }),
  // مآزر العيون والفتحة الأنفية وخط الخد (تفاصيل الجمجمة)
  S({
    id: 'bone-skull-face',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    fillVar: '--bone-detail',
    op: 0.7,
    d: 'M 163,60 C 166,55.5 172,55.5 175,60 C 172,66 166,66 163,60 Z M 185,60 C 188,55.5 194,55.5 197,60 C 194,66 188,66 185,60 Z M 177,68 L 176,79 C 176,83 184,83 184,79 L 183,68 M 158,50 C 168,43.5 192,43.5 202,50 M 161,100 C 170,95 190,95 199,100',
  }),
  S({
    id: 'bone-mandible',
    kind: 'p a t h',
    organId: 'skull',
    grad: 'g-bones',
    strokeVar: '--bone-detail',
    d: 'M 160,99 C 162,112 170,120 180,120 C 190,120 198,112 200,99 L 194.5,97 C 193,106.5 188,112.5 180,112.5 C 172,112.5 167,106.5 165.5,97 Z',
  }),
  S({ id: 'bone-cervical', kind: 'p a t h', organId: 'spine', grad: 'g-bones', d: CERVICAL_V }),
  S({ id: 'bone-thoracic', kind: 'p a t h', organId: 'spine', grad: 'g-bones', d: THORACIC_V }),
  S({ id: 'bone-lumbar', kind: 'p a t h', organId: 'spine', grad: 'g-bones', d: LUMBAR_V }),
  S({
    id: 'bone-sacrum',
    kind: 'p a t h',
    organId: 'pelvis',
    grad: 'g-bones',
    strokeVar: '--bone-detail',
    d: 'M 171,289 L 189,289 L 184,320 C 182.5,325 177.5,325 176,320 Z',
  }),
  S({
    id: 'bone-sacrum-holes',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.6,
    fillVar: '--bone-detail',
    op: 0.7,
    d: 'M 176,297 L 179,297 M 181,297 L 184,297 M 176.5,305 L 179,305 M 181,305 L 183.5,305 M 177,313 L 179.5,313 M 180.5,313 L 183,313',
  }),
  S({ id: 'bone-coccyx', kind: 'p a t h', organId: 'pelvis', grad: 'g-bones', d: 'M 178,327 L 182,327 L 181,336 C 180,338 180,338 179,336 Z' }),
  S({
    id: 'bone-sternum',
    kind: 'p a t h',
    organId: 'ribs',
    grad: 'g-bones',
    strokeVar: '--bone-detail',
    d: 'M 172,155 C 176,152 184,152 188,155 L 186,170 L 174,170 Z M 174,172 L 186,172 L 185,228 C 184.5,231.5 175.5,231.5 175,228 Z M 178,234 L 182,234 L 181,243 C 180,245 180,245 179,243 Z',
  }),
  S({
    id: 'bone-ribs',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4,
    organId: 'ribs',
    mirror: true,
    fillVar: '--bones-b',
    op: 0.92,
    d: RIBS_L,
  }),
  S({
    id: 'bone-spine-ticks',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.3,
    fillVar: '--bone-detail',
    op: 0.8,
    d: SPINE_TICKS,
  }),
  S({
    id: 'bone-pelvis',
    kind: 'p a t h',
    organId: 'pelvis',
    grad: 'g-bones',
    strokeVar: '--bone-detail',
    mirror: true,
    d: 'M 173,293 C 163,285 149,284 141,293 C 134,302 133,315 139,324 C 145,333 156,335 163,328 C 168,323 171,313 173,305 Z M 163,330 C 159,342 158,356 163,366 C 168,374 175,378 180,380 L 180,371 C 173,369 168,364 166,356 C 164,348 166,340 170,333 Z',
  }),
  S({
    id: 'bone-pelvis-hole',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.4,
    fillVar: '--bone-detail',
    op: 0.7,
    mirror: true,
    d: 'M 156,342 C 153,350 154,360 160,366 C 165,370 172,372 177,373',
  }),
  S({
    id: 'bone-clavicle-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4.5,
    organId: 'clavicle',
    mirror: true,
    fillVar: '--bones-b',
    d: 'M 187,150 C 200,143.5 218,144 231,152',
  }),
  S({
    id: 'bone-scapula-l',
    kind: 'p a t h',
    organId: 'ribs',
    grad: 'g-bones',
    strokeVar: '--bone-detail',
    mirror: true,
    op: 0.95,
    d: 'M 158,156 C 146,153.5 134,158 128,168 C 124,176 124,190 127,202 C 130,212 138,218 148,216 C 154,214.5 158,208 158,200 Z',
  }),
  S({
    id: 'bone-humerus-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 6.5,
    organId: 'armbones',
    mirror: true,
    fillVar: '--bones-b',
    d: 'M 245,164 C 249,192 248,220 244,244',
  }),
  S({
    id: 'bone-elbow-l',
    kind: 'p a t h',
    organId: 'armbones',
    grad: 'g-bones',
    mirror: true,
    d: 'M 240,246 C 242,242.5 248,242.5 249,246 C 250,250 247,253 244,252.5 C 241,252 239,249 240,246 Z',
  }),
  S({
    id: 'bone-forearm-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4.5,
    organId: 'armbones',
    mirror: true,
    fillVar: '--bones-b',
    d: 'M 242,256 C 240,292 238,328 236,360 M 235,256 C 233,290 231,324 230,356',
  }),
  S({
    id: 'bone-wrist-l',
    kind: 'p a t h',
    organId: 'armbones',
    grad: 'g-bones',
    mirror: true,
    d: 'M 228,378 C 230,374.5 236,374 239,377 C 241,380 239,384 236,384.5 C 232,385 227.5,382 228,378 Z',
  }),
  S({
    id: 'bone-hand-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'armbones',
    mirror: true,
    fillVar: '--bones-b',
    d: 'M 233,388 L 228,404 M 236,390 L 233,408 M 239,391 L 237,410 M 242,391 L 242,411 M 245,392 L 247,409 M 229,407 L 227,415 M 234,411 L 233,420 M 238,413 L 238,422 M 242.5,414 L 243.5,422 M 247,412 L 249,420',
  }),
  S({
    id: 'bone-femur-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 7,
    organId: 'femur',
    mirror: true,
    fillVar: '--bones-b',
    d: 'M 216,392 C 222,430 222,468 216,506',
  }),
  S({
    id: 'bone-femur-head-l',
    kind: 'p a t h',
    organId: 'femur',
    grad: 'g-bones',
    mirror: true,
    d: 'M 210,387 C 212,383 219,383 221,387.5 C 223,392 219,396 214.5,395 C 210.5,394 208,390.5 210,387 Z',
  }),
  S({
    id: 'bone-patella-l',
    kind: 'p a t h',
    organId: 'legbones',
    grad: 'g-bones',
    strokeVar: '--bone-detail',
    mirror: true,
    d: 'M 209,538 C 212,534.5 218,534.5 219,539 C 219.5,544 216,548 212.5,547.5 C 209,547 207.5,542 209,538 Z',
  }),
  S({
    id: 'bone-tibia-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 5,
    organId: 'legbones',
    mirror: true,
    fillVar: '--bones-b',
    d: 'M 206,554 C 204,592 202,632 202,668',
  }),
  S({
    id: 'bone-fibula-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3.5,
    organId: 'legbones',
    mirror: true,
    fillVar: '--bones-b',
    d: 'M 214,556 C 212,594 210,630 209,664',
  }),
  S({
    id: 'bone-foot-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'legbones',
    mirror: true,
    fillVar: '--bones-b',
    d: 'M 204,694 C 201,702 199,710 198,716 M 197,719 L 193,731 M 201,720 L 198,733 M 205,720 L 203,733 M 209,719 L 208,731 M 196,713 L 200,711',
  }),
]

/* ============ الجهاز التنفسي (respiratory) — تفصيلي ============ */
const RESPIRATORY: ShapeDef[] = [
  // الجيوب/الممرات الأنفية
  S({
    id: 'res-nasal',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    organId: 'nasalcavity',
    fillVar: '--respiratory-c',
    op: 0.75,
    d: 'M 172,78 C 170,86 170,94 172,100 M 188,78 C 190,86 190,94 188,100 M 176,80 C 175,88 175,94 176,100 M 184,80 C 185,88 185,94 184,100',
  }),
  S({
    id: 'res-pharynx',
    kind: 'p a t h',
    organId: 'pharynx',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    op: 0.9,
    d: 'M 176,100 L 184,100 C 184.5,110 184,120 183.5,128 L 176.5,128 C 176,120 175.5,110 176,100 Z',
  }),
  // الحنجرة: غضروف الدرع
  S({
    id: 'res-larynx',
    kind: 'p a t h',
    organId: 'larynx',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    sw: 1.3,
    d: 'M 173,128 C 176,124.5 184,124.5 187,128 C 186,134 184,139 180,140 C 176,139 174,134 173,128 Z',
  }),
  // الرغامى مع حلقات الغرقيّات
  S({
    id: 'res-trachea',
    kind: 'p a t h',
    organId: 'trachea',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    sw: 1.3,
    d: 'M 177,140 L 183,140 C 183.3,158 183.3,176 183,196 L 177,196 C 176.7,176 176.7,158 177,140 Z',
  }),
  S({
    id: 'res-trachea-rings',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    fillVar: '--respiratory-c',
    op: 0.7,
    d: 'M 177,145 L 183,145 M 177,151 L 183,151 M 177,157 L 183,157 M 177,163 L 183,163 M 177,169 L 183,169 M 177,175 L 183,175 M 177,181 L 183,181 M 177,187 L 183,187 M 177,193 L 183,193',
  }),
  // شعبات رئيسية (يسار/يمين الصورة)
  S({
    id: 'res-bronchi-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4,
    organId: 'bronchi',
    mirror: true,
    fillVar: '--respiratory-b',
    d: 'M 180,196 C 172,200 164,206 158,214',
  }),
  S({
    id: 'res-bronchi-r',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4,
    organId: 'bronchi',
    fillVar: '--respiratory-b',
    d: 'M 180,196 C 188,200 196,206 202,214',
  }),
  // رئة يسار الصورة (يمين المريض): فص علوي وسفلي
  S({
    id: 'res-lung-l',
    kind: 'p a t h',
    organId: 'lungs',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    sw: 1.4,
    mirror: true,
    d: 'M 170,204 C 158,199 146,203 139,214 C 132,226 129,244 131,260 C 133,272 141,279 152,277 C 162,275 169,266 171,254 C 173,238 173,220 170,204 Z',
  }),
  S({
    id: 'res-lung-r',
    kind: 'p a t h',
    organId: 'lungs',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    sw: 1.4,
    d: 'M 190,204 C 202,199 214,203 221,214 C 228,226 231,244 229,260 C 227,272 219,279 208,277 C 198,275 191,266 189,254 C 187,238 187,220 190,204 Z',
  }),
  // خط القطع بين الفصص + شعيبات
  S({
    id: 'res-fissure-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.4,
    organId: 'lungs',
    mirror: true,
    fillVar: '--respiratory-c',
    op: 0.7,
    d: 'M 141,222 C 150,234 158,248 163,262 M 150,214 C 146,220 143,227 142,234 M 156,210 C 150,212 145,215 141,219',
  }),
  S({
    id: 'res-fissure-r',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.4,
    organId: 'lungs',
    fillVar: '--respiratory-c',
    op: 0.7,
    d: 'M 219,220 C 210,230 202,238 196,244 M 200,252 C 208,254 216,252 222,248 M 210,210 C 216,212 221,215 225,219',
  }),
  // حويصلات هوائية (عنقود)
  S({
    id: 'res-alveoli',
    kind: 'p a t h',
    organId: 'alveoli',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    sw: 1,
    mirror: true,
    d: 'M 150,222 C 148,220 148,217 150,216 C 152,215 154,216 154,218 C 156,217 158,218 158,220 C 158,222 156,223 154,223 C 153,225 150,225 150,222 Z M 158,228 C 156,226 156,223 158,222 C 160,221 162,222 162,224 C 164,223 166,224 166,226 C 166,228 164,229 162,229 C 161,231 158,231 158,228 Z',
  }),
  // الحجاب الحاجز: قبة تحت الرئتين
  S({
    id: 'res-diaphragm',
    kind: 'p a t h',
    organId: 'diaphragm',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    op: 0.75,
    d: 'M 132,282 C 152,268 170,262 180,262 C 190,262 208,268 228,282 C 208,278 190,276 180,276 C 170,276 152,278 132,282 Z',
  }),
]

/* ============ الجهاز الهضمي (digestive) — تفصيلي ============ */
const DIGESTIVE: ShapeDef[] = [
  // الفم والأسنان واللسان
  S({
    id: 'dig-mouth',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'mouth',
    fillVar: '--mouth-line',
    d: 'M 168,96 C 174,99 186,99 192,96',
  }),
  S({
    id: 'dig-teeth',
    kind: 'p a t h',
    organId: 'teeth',
    fillVar: '--tooth',
    d: 'M 168,99 h 4 v 5 h -4 Z M 173,100 h 4 v 5 h -4 Z M 178,100 h 4 v 5 h -4 Z M 183,100 h 4 v 5 h -4 Z M 188,99 h 4 v 5 h -4 Z M 169,105 h 3.5 v 4.5 h -3.5 Z M 174,106 h 3.5 v 4.5 h -3.5 Z M 179,106 h 3.5 v 4.5 h -3.5 Z M 184,106 h 3.5 v 4.5 h -3.5 Z M 189,105 h 3.5 v 4.5 h -3.5 Z',
  }),
  S({
    id: 'dig-tongue',
    kind: 'p a t h',
    organId: 'tongue',
    fillVar: '--tongue',
    d: 'M 171,111 C 175,117 185,117 189,111 C 188,109 184,108 180,108 C 176,108 172,109 171,111 Z',
  }),
  // الغدة النكفية
  S({
    id: 'dig-salivary-l',
    kind: 'p a t h',
    organId: 'salivary',
    grad: 'g-digestive',
    strokeVar: '--digestive-c',
    mirror: true,
    op: 0.85,
    d: 'M 158,88 C 154,86 150,88 149,92 C 148,96 151,99 155,99 C 159,99 161,95 160,91 Z',
  }),
  // المريء: أنبوب مزدوج الحافة خلف القلب
  S({
    id: 'dig-esophagus',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 5,
    organId: 'esophagus',
    fillVar: '--digestive-a',
    op: 0.95,
    d: 'M 178,140 C 177,170 177,200 178,230 C 179,252 181,266 184,277',
  }),
  // الكبد: فلبان كبديان مع خط فاصل
  S({
    id: 'dig-liver',
    kind: 'p a t h',
    organId: 'liver',
    fillVar: '--liver',
    strokeVar: '--liver-b',
    sw: 1.5,
    d: 'M 148,272 C 140,276 136,284 138,294 C 140,306 148,316 160,321 C 172,326 186,326 197,321 C 207,316 213,308 214,298 C 215,290 212,283 206,280 C 196,276 186,274 176,272 C 166,270 157,270 148,272 Z',
  }),
  S({
    id: 'dig-liver-lobe',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    organId: 'liver',
    fillVar: '--liver-b',
    op: 0.75,
    d: 'M 178,272 C 176,286 175,300 176,314 M 146,286 C 152,282 158,280 164,280 M 200,284 C 206,286 210,290 212,296 M 144,300 C 148,306 154,311 160,314',
  }),
  // المرارة: كم تحت الكبد
  S({
    id: 'dig-gallbladder',
    kind: 'p a t h',
    organId: 'gallbladder',
    fillVar: '--gall',
    strokeVar: '--gall-b',
    sw: 1.3,
    d: 'M 186,306 C 190,304 194,307 195,312 C 196,319 193,326 188,328 C 184,326 181,319 182,312 C 183,308 184,307 186,306 Z',
  }),
  // المعدة: شكل جيب مع طيات (رُغامى)
  S({
    id: 'dig-stomach',
    kind: 'p a t h',
    organId: 'stomach',
    grad: 'g-digestive',
    strokeVar: '--digestive-c',
    sw: 1.5,
    d: 'M 178,270 C 188,266 198,270 202,280 C 207,292 206,306 199,316 C 191,327 177,331 166,326 C 157,322 152,312 154,301 C 156,290 166,276 178,270 Z',
  }),
  S({
    id: 'dig-stomach-rugae',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.1,
    organId: 'stomach',
    fillVar: '--digestive-c',
    op: 0.7,
    d: 'M 162,292 C 170,296 178,298 186,297 M 158,302 C 167,307 177,309 187,307 M 160,312 C 168,317 177,319 186,317',
  }),
  // البنكرياس: شريط خلف المعدة
  S({
    id: 'dig-pancreas',
    kind: 'p a t h',
    organId: 'pancreas',
    fillVar: '--pancreas',
    strokeVar: '--pancreas-b',
    sw: 1.3,
    d: 'M 172,296 C 184,292 198,292 208,296 C 214,298 216,303 212,306 C 200,304 188,304 176,308 C 170,310 166,306 166,302 C 166,299 168,297 172,296 Z',
  }),
  // القولون: إطار (صاعد، عرضي، هابط، كامن) مع تجعيدات
  S({
    id: 'dig-largeintestine',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 9,
    organId: 'largeintestine',
    fillVar: '--digestive-c',
    d: 'M 152,384 C 147,376 145,364 145,352 C 145,344 146,338 150,334 C 160,328 172,326 184,326 C 196,326 208,328 214,334 C 218,338 219,344 219,352 C 219,364 217,376 212,384 C 208,390 202,394 196,396',
  }),
  S({
    id: 'dig-largeintestine-haustra',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    fillVar: '--digestive-c',
    op: 0.65,
    d: 'M 143,344 L 151,344 M 143,354 L 151,354 M 144,364 L 152,364 M 146,374 L 153,374 M 156,324 L 156,332 M 164,323 L 164,331 M 172,323 L 172,331 M 180,323 L 180,331 M 188,323 L 188,331 M 196,324 L 196,332 M 204,326 L 204,334 M 217,342 L 209,342 M 217,352 L 209,352 M 216,362 L 208,362 M 213,372 L 206,372',
  }),
  // الأمعاء الدقيقة: لفائف متعرجة
  S({
    id: 'dig-smallintestine',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 6.5,
    organId: 'smallintestine',
    fillVar: '--digestive-b',
    d: 'M 158,340 C 152,346 153,354 160,357 C 169,361 181,359 188,354 C 195,349 194,341 187,338 M 158,361 C 152,367 153,376 161,379 C 170,383 183,381 190,376 C 196,371 195,363 188,360 M 161,382 C 156,388 158,396 165,399 C 174,403 186,401 192,396 C 197,391 196,384 189,381 M 187,338 C 190,341 192,345 191,349 M 188,360 C 191,363 192,367 191,371 M 189,381 C 191,384 192,387 191,390',
  }),
  // المستقيم ثم الزائدة الدودية
  S({
    id: 'dig-rectum',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 8,
    organId: 'rectum',
    fillVar: '--digestive-c',
    d: 'M 196,396 C 190,400 184,402 180,404 C 176,406 172,408 170,412',
  }),
  S({
    id: 'dig-appendix',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3.5,
    organId: 'appendix',
    fillVar: '--digestive-c',
    d: 'M 150,386 C 147,392 146,399 148,405',
  }),
]

/* ============ الجهاز الدوري (circulatory) — القلب والأوعية الكبرى ============ */
const CIRCULATORY: ShapeDef[] = [
  S({
    id: 'cir-heart',
    kind: 'p a t h',
    organId: 'heart',
    grad: 'g-circulatory',
    strokeVar: '--circulatory-c',
    sw: 1.4,
    // جسم القلب مائل: القبة نحو الأعلى والقطب نحو اليسار (يمين الصورة)
    d: 'M 164,242 C 154,236 144,241 141,253 C 138,266 143,282 152,293 C 160,302 172,308 182,306 C 192,304 201,296 205,286 C 209,274 208,260 201,249 C 194,238 181,233 171,238 C 168,239 166,241 164,242 Z',
  }),
  // الأذينان (تضخمان علويان)
  S({
    id: 'cir-atria',
    kind: 'p a t h',
    organId: 'heart',
    grad: 'g-circulatory',
    strokeVar: '--circulatory-c',
    op: 0.9,
    d: 'M 156,241 C 151,235 153,227 160,225 C 166,224 171,229 170,236 C 168,240 162,242 156,241 Z M 187,238 C 187,231 193,226 199,228 C 205,230 206,238 201,243 C 197,246 190,243 187,238 Z',
  }),
  // تقاسيم القلب: الحاجز والخط الحاد وخط قاعدي
  S({
    id: 'cir-septum',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    fillVar: '--circulatory-c',
    op: 0.8,
    organId: 'heart',
    d: 'M 176,244 C 180,262 187,280 196,294 M 148,260 C 158,265 170,267 181,266 C 191,265 199,261 204,255 M 158,246 C 156,254 156,262 158,270 M 194,248 C 197,256 197,264 195,272',
  }),
  // قوس الأبهر: يصعد من القلب ويثني نحو الأعلى
  S({
    id: 'cir-aortic-arch',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 5.5,
    tone: 'art',
    organId: 'aorta',
    d: 'M 173,241 C 172,227 176,215 184,210 C 191,205 198,209 198,218 C 198,225 196,232 195,239',
  }),
  // الوريد الأجوف العلوي: من الرقبة والأذرع إلى الأذين الأيمن
  S({
    id: 'cir-svc',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4.5,
    tone: 'ven',
    organId: 'venacava',
    d: 'M 171,240 C 170,225 170,209 171,193 C 171.5,184 173,175 176,167',
  }),
  S({
    id: 'cir-pulm-trunk',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4.5,
    tone: 'art',
    organId: 'pulmonaryartery',
    d: 'M 185,241 C 185,235 186,230 189,226',
  }),
]

/* ============ الأوعية الدموية (vessels) — شبكة كاملة عبر الجسم ============ */
const VESSELS: ShapeDef[] = [
  // الأبهر: قوس ثم نزول خلف القلب إلى انشقاق الحرقفتين
  S({
    id: 'vas-aorta',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 5.5,
    organId: 'aorta',
    tone: 'art',
    d: 'M 184,243 C 183,270 182,296 182,322 C 182,344 181,362 180,378 M 180,378 C 176,392 171,402 167,414 C 163,428 161,444 161,462 M 180,378 C 184,392 189,402 193,414 C 197,428 199,444 199,462',
  }),
  // الشرايين الفخذية: نزول الأبهر حتى القدم
  S({
    id: 'vas-leg-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3.5,
    organId: 'arteries',
    mirror: true,
    tone: 'art',
    op: 0.9,
    d: 'M 199,462 C 199,502 197,544 195,582 C 193,616 192,650 193,678 C 193.5,692 195,702 197,710',
  }),
  // التاجية: تفرعات على سطح القلب
  S({
    id: 'vas-coronary',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.6,
    organId: 'arteries',
    tone: 'art',
    op: 0.8,
    d: 'M 168,248 C 166,258 166,268 168,278 M 180,250 C 183,260 186,270 190,279 M 172,246 C 176,254 182,260 189,263',
  }),
  // الشريان الأبهري الدماغي (حلقة فيس)
  S({
    id: 'vas-cerebral',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    organId: 'arteries',
    tone: 'art',
    op: 0.9,
    d: 'M 172,50 C 174,43 186,43 188,50 M 174,49 C 170,57 168,65 169,73 M 186,49 C 190,57 192,65 191,73 M 176,45 L 176,40 M 184,45 L 184,40',
  }),
  // الشريان السباتي: من قاعدة العنق إلى الرأس
  S({
    id: 'vas-carotid-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.8,
    organId: 'arteries',
    mirror: true,
    tone: 'art',
    op: 0.9,
    d: 'M 172,166 C 170,154 169,142 170,130 C 171,118 173,106 176,96',
  }),
  // تحت الترقوة/الإبطية: من الجذع إلى الذراع
  S({
    id: 'vas-subclav-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.8,
    organId: 'arteries',
    mirror: true,
    tone: 'art',
    op: 0.9,
    d: 'M 176,166 C 186,161 198,158 210,157 C 220,156 228,157 234,161',
  }),
  // شريان الذراع حتى اليد
  S({
    id: 'vas-arm-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3,
    organId: 'arteries',
    mirror: true,
    tone: 'art',
    op: 0.9,
    d: 'M 236,164 C 244,196 245,236 242,276 C 240,312 238,348 237,380 C 236.5,386 236,392 235,398',
  }),
  // الكلوية: من الأبهر إلى الكلى
  S({
    id: 'vas-renal-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    organId: 'arteries',
    mirror: true,
    tone: 'art',
    op: 0.85,
    d: 'M 180,302 C 172,302 164,303 157,306',
  }),
  // الميزينية: تفرعات إلى الأمعاء
  S({
    id: 'vas-mes-artery',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    organId: 'arteries',
    tone: 'art',
    op: 0.8,
    d: 'M 180,334 C 176,342 172,348 170,354 M 181,336 C 184,344 186,352 187,358 M 180,338 C 180,344 180,350 180,356',
  }),
  // الكبدية: إلى الكبد
  S({
    id: 'vas-hepatic',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    organId: 'arteries',
    tone: 'art',
    op: 0.8,
    d: 'M 178,318 C 172,316 166,314 160,312',
  }),
  // === الأوردة (زرقاء) ===
  // الوريد الأجوف: علوي + سفلي
  S({
    id: 'vas-svc',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4.5,
    organId: 'venacava',
    tone: 'ven',
    d: 'M 170,170 C 170,190 169,212 170,234',
  }),
  S({
    id: 'vas-ivc',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4.5,
    organId: 'venacava',
    tone: 'ven',
    d: 'M 174,244 C 175,270 176,296 176,322 C 176,346 177,366 178,386',
  }),
  // الحرقفية الفخذية الوريدية حتى القدم
  S({
    id: 'vas-leg-v-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3,
    organId: 'veins',
    mirror: true,
    tone: 'ven',
    op: 0.9,
    d: 'M 196,466 C 196,506 194,548 192,584 C 190,618 189,652 190,680 C 190.5,694 192,704 194,712 M 178,386 C 182,398 186,408 190,418 C 194,430 196,448 196,466',
  }),
  // الوداجية: من الرأس إلى جذع الأوردة
  S({
    id: 'vas-jug-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'veins',
    mirror: true,
    tone: 'ven',
    op: 0.9,
    d: 'M 174,164 C 172,152 171,140 172,128 C 173,116 175,104 178,94',
  }),
  // وريد الذراع حتى اليد
  S({
    id: 'vas-arm-v-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3,
    organId: 'veins',
    mirror: true,
    tone: 'ven',
    op: 0.9,
    d: 'M 240,168 C 246,200 247,240 244,280 C 242,316 240,352 239,382 C 238.5,388 238,394 237,400',
  }),
  // البوابية: من الأمعاء إلى الكبد
  S({
    id: 'vas-portal',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'veins',
    tone: 'ven',
    op: 0.85,
    d: 'M 186,346 C 184,338 180,332 174,328 C 168,324 162,322 156,320',
  }),
  // أوردة الدماغ
  S({
    id: 'vas-cerebral-v',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    organId: 'veins',
    tone: 'ven',
    op: 0.85,
    d: 'M 176,53 C 174,47 186,47 184,53 M 175,56 C 172,64 171,72 172,80 M 185,56 C 188,64 189,72 188,80',
  }),
  // الشريان الرئوي الأيسر (فرع نحو الرئة)
  S({
    id: 'vas-pulm-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4,
    organId: 'pulmonaryartery',
    mirror: true,
    tone: 'art',
    d: 'M 186,238 C 180,231 172,226 164,227 C 157,228 151,232 147,238 M 186,238 C 192,231 200,227 208,228 C 215,229 221,233 224,239',
  }),
  // الشعيرات: يد وقدم
  S({
    id: 'vas-cap-hand-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.6,
    dash: '2 3',
    organId: 'capillaries',
    mirror: true,
    tone: 'art',
    d: 'M 233,404 C 232,412 233,420 235,426 M 240,402 C 240,410 240,418 239,424 M 246,404 C 247,411 247,418 246,424',
  }),
  S({
    id: 'vas-cap-foot-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.6,
    dash: '2 3',
    organId: 'capillaries',
    mirror: true,
    tone: 'art',
    d: 'M 196,716 C 195,723 195,730 197,736 M 202,714 C 202,721 202,728 201,734 M 208,714 C 208,720 208,726 207,732',
  }),
]

/* ============ الجهاز البولي (urinary) — تفصيلي ============ */
const URINARY: ShapeDef[] = [
  // الكلى: شكل كليوي مع الحيز الكلوي
  S({
    id: 'uri-kidney-l',
    kind: 'p a t h',
    organId: 'kidneys',
    grad: 'g-urinary',
    strokeVar: '--urinary-c',
    sw: 1.4,
    mirror: true,
    d: 'M 148,298 C 141,294 134,297 131,306 C 127,317 128,331 134,339 C 139,345 146,345 150,339 C 146,333 146,327 148,321 C 150,315 150,305 148,298 Z',
  }),
  S({
    id: 'uri-kidney-d-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    organId: 'kidneys',
    mirror: true,
    fillVar: '--urinary-c',
    op: 0.75,
    d: 'M 147,318 C 144,315 142,311 142,307 M 147,323 C 143,323 140,326 139,330 M 140,304 C 138,309 138,315 140,320',
  }),
  // الحالبان: من الحيز إلى المثانة
  S({
    id: 'uri-ureter-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.2,
    organId: 'ureters',
    mirror: true,
    fillVar: '--urinary-b',
    d: 'M 146,338 C 150,356 158,372 166,386 C 170,392 173,397 176,401',
  }),
  // المثانة: كورة أسفل الحوض مع المثلث
  S({
    id: 'uri-bladder',
    kind: 'p a t h',
    organId: 'bladder',
    fillVar: '--bladder',
    strokeVar: '--bladder-b',
    sw: 1.5,
    d: 'M 180,380 C 168,380 158,386 155,396 C 152,408 158,420 168,424 C 172,426 176,426 180,426 C 184,426 188,426 192,424 C 202,420 208,408 205,396 C 202,386 192,380 180,380 Z',
  }),
  S({
    id: 'uri-trigone',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.1,
    organId: 'bladder',
    fillVar: '--bladder-b',
    op: 0.7,
    d: 'M 172,416 L 180,408 L 188,416 M 180,408 L 180,420',
  }),
  // الإحليل
  S({
    id: 'uri-urethra',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'urethra',
    fillVar: '--bladder-b',
    d: 'M 180,424 C 180,432 180,440 180,448',
  }),
]

/* ============ الجهاز التناسلي (reproductive) — تفصيلي ============ */
const REPRO_MALE: ShapeDef[] = [
  // الخصيتان: كمّان مع خط وسطي
  S({
    id: 'rep-m-testis-l',
    kind: 'p a t h',
    organId: 'testes',
    sex: 'male',
    grad: 'g-reproductive',
    strokeVar: '--reproductive-c',
    sw: 1.4,
    mirror: true,
    d: 'M 170,408 C 165,405 159,407 157,413 C 155,420 157,428 162,431 C 167,434 172,431 174,425 C 175,419 174,412 170,408 Z',
  }),
  S({
    id: 'rep-m-testis-line',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'testes',
    sex: 'male',
    mirror: true,
    fillVar: '--reproductive-c',
    op: 0.7,
    d: 'M 165,410 C 164,417 164,424 166,429 M 169,411 C 169,417 169,423 170,428',
  }),
  // الخصيتين (المحيص)
  S({
    id: 'rep-m-epididymis-l',
    kind: 'p a t h',
    organId: 'epididymis',
    sex: 'male',
    strokeOnly: true,
    sw: 2.2,
    mirror: true,
    fillVar: '--reproductive-b',
    d: 'M 173,410 C 176,414 176,422 173,427',
  }),
  // قناة القذف تصعد إلى الحوض
  S({
    id: 'rep-m-vas-l',
    kind: 'p a t h',
    organId: 'vasdeferens',
    sex: 'male',
    strokeOnly: true,
    sw: 2,
    mirror: true,
    fillVar: '--reproductive-b',
    d: 'M 173,409 C 176,400 177,392 177,384 C 177,377 177,371 177,365',
  }),
  // الحويصلة المنوية: كمّ مفصص خلف المثانة
  S({
    id: 'rep-m-vesicle-l',
    kind: 'p a t h',
    organId: 'seminalvesicles',
    sex: 'male',
    grad: 'g-reproductive',
    strokeVar: '--reproductive-c',
    mirror: true,
    d: 'M 168,398 C 164,396 160,398 159,402 C 158,406 160,410 164,411 C 168,412 171,409 171,405 C 171,402 170,399 168,398 Z',
  }),
  // البروستاتا: حلقة حول الإحليل تحت المثانة
  S({
    id: 'rep-m-prostate',
    kind: 'p a t h',
    organId: 'prostate',
    sex: 'male',
    grad: 'g-reproductive',
    strokeVar: '--reproductive-c',
    sw: 1.3,
    d: 'M 180,426 C 174,426 170,430 170,435 C 170,440 174,444 180,444 C 186,444 190,440 190,435 C 190,430 186,426 180,426 Z M 180,431 C 177,431 175,433 175,435 C 175,437 177,439 180,439 C 183,439 185,437 185,435 C 185,433 183,431 180,431 Z',
  }),
  // القضيب: لحمية + جسم
  S({
    id: 'rep-m-penis',
    kind: 'p a t h',
    organId: 'penis',
    sex: 'male',
    grad: 'g-reproductive',
    strokeVar: '--reproductive-c',
    sw: 1.4,
    d: 'M 180,444 C 177,448 176,453 177,459 C 178,464 179,468 180,470 C 181,468 182,464 183,459 C 184,453 183,448 180,444 Z M 175,447 C 173,446 171,447 171,449 C 171,452 174,453 176,452 Z',
  }),
]

const REPRO_FEMALE: ShapeDef[] = [
  // الثديان
  S({
    id: 'rep-f-breast-l',
    kind: 'p a t h',
    organId: 'breasts',
    sex: 'female',
    grad: 'g-breast',
    strokeVar: '--breast-c',
    sw: 1.3,
    mirror: true,
    d: 'M 176,206 C 166,204 157,210 154,220 C 151,231 156,242 166,246 C 174,249 181,244 183,236 C 185,227 184,214 176,206 Z',
  }),
  S({
    id: 'rep-f-breast-line',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.1,
    organId: 'breasts',
    sex: 'female',
    mirror: true,
    fillVar: '--breast-c',
    op: 0.7,
    d: 'M 164,222 C 161,228 161,235 164,240 M 171,216 C 167,222 166,230 168,237 M 163,224 C 161,225 159,226 158,228 M 168,220 C 166,221 164,223 163,225',
  }),
  // الرحم: شكل كمّي مع خط جوف الرحم
  S({
    id: 'rep-f-uterus',
    kind: 'p a t h',
    organId: 'uterus',
    sex: 'female',
    fillVar: '--uterus',
    strokeVar: '--uterus-b',
    sw: 1.5,
    d: 'M 180,382 C 170,382 162,388 160,398 C 158,408 162,418 170,422 C 174,424 177,425 180,425 C 183,425 186,424 190,422 C 198,418 202,408 200,398 C 198,388 190,382 180,382 Z',
  }),
  S({
    id: 'rep-f-uterus-line',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    organId: 'uterus',
    sex: 'female',
    fillVar: '--uterus-b',
    op: 0.75,
    d: 'M 180,388 C 179,398 179,408 180,418 M 171,392 C 169,398 169,406 172,412 M 189,392 C 191,398 191,406 188,412',
  }),
  // عنق الرحم
  S({
    id: 'rep-f-cervix',
    kind: 'p a t h',
    organId: 'cervix',
    sex: 'female',
    fillVar: '--uterus',
    strokeVar: '--uterus-b',
    d: 'M 176,425 C 175,430 175,435 176,439 L 184,439 C 185,435 185,430 184,425 C 181,427 179,427 176,425 Z',
  }),
  // المهبل
  S({
    id: 'rep-f-vagina',
    kind: 'p a t h',
    organId: 'vagina',
    sex: 'female',
    strokeOnly: true,
    sw: 4.5,
    fillVar: '--uterus-b',
    op: 0.85,
    d: 'M 180,440 C 180,448 180,456 180,464',
  }),
  // المبيضان: بيضاويان مع بويضات
  S({
    id: 'rep-f-ovary-l',
    kind: 'p a t h',
    organId: 'ovaries',
    sex: 'female',
    grad: 'g-reproductive',
    strokeVar: '--reproductive-c',
    sw: 1.3,
    mirror: true,
    d: 'M 156,394 C 152,392 148,394 147,399 C 146,404 149,408 153,408 C 157,408 160,404 160,400 C 160,397 158,395 156,394 Z',
  }),
  S({
    id: 'rep-f-ovary-dot',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.4,
    organId: 'ovaries',
    sex: 'female',
    mirror: true,
    fillVar: '--reproductive-c',
    d: 'M 151,398 a 1.6,1.6 0 1 0 3.2,0 a 1.6,1.6 0 1 0 -3.2,0 M 154,403 a 1.4,1.4 0 1 0 2.8,0 a 1.4,1.4 0 1 0 -2.8,0',
  }),
  // قناة فالوب: من قرن الرحم إلى المبيض مع الريش
  S({
    id: 'rep-f-tube-l',
    kind: 'p a t h',
    organId: 'fallopiantubes',
    sex: 'female',
    strokeOnly: true,
    sw: 2.6,
    mirror: true,
    fillVar: '--reproductive-b',
    d: 'M 168,388 C 163,384 158,383 154,385 C 150,387 147,391 146,395',
  }),
  S({
    id: 'rep-f-fimbriae',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    organId: 'fallopiantubes',
    sex: 'female',
    mirror: true,
    fillVar: '--reproductive-b',
    d: 'M 146,395 L 143,399 M 147,393 L 144,397 M 149,391 L 146,395',
  }),
]

/* ============ الجهاز اللمفاوي (lymphatic) — تفصيلي ============ */
const LYMPHATIC: ShapeDef[] = [
  // الزعاف (الحميم): فلبان خلف القص العلوي
  S({
    id: 'lym-thymus',
    kind: 'p a t h',
    organId: 'thymus',
    grad: 'g-lymphatic',
    strokeVar: '--lymphatic-c',
    sw: 1.3,
    d: 'M 179,158 C 172,156 165,158 162,164 C 159,170 161,178 167,181 C 172,183 177,180 179,175 C 181,180 186,183 191,181 C 197,178 199,170 196,164 C 193,158 186,156 179,158 Z',
  }),
  // اللوزتان
  S({
    id: 'lym-tonsil-l',
    kind: 'p a t h',
    organId: 'tonsils',
    grad: 'g-lymphatic',
    strokeVar: '--lymphatic-c',
    mirror: true,
    d: 'M 165,104 C 161,102 157,104 156,108 C 155,112 158,115 162,115 C 165,115 167,112 167,109 C 167,107 166,105 165,104 Z',
  }),
  // عقد اللمف: عنقية، إبطية، فخزية (كبسولة مع بواب)
  S({
    id: 'lym-node-neck-l',
    kind: 'p a t h',
    organId: 'lymphnodes',
    grad: 'g-lymphatic',
    strokeVar: '--lymphatic-c',
    sw: 1.2,
    mirror: true,
    d: 'M 168,128 C 165,126 161,128 160,132 C 159,136 162,139 165,139 C 169,139 171,136 171,133 C 171,131 169,129 168,128 Z',
  }),
  S({
    id: 'lym-node-armpit-l',
    kind: 'p a t h',
    organId: 'lymphnodes',
    grad: 'g-lymphatic',
    strokeVar: '--lymphatic-c',
    sw: 1.2,
    mirror: true,
    d: 'M 226,196 C 223,194 219,196 218,200 C 217,204 220,207 223,207 C 227,207 229,204 229,201 C 229,199 227,197 226,196 Z M 231,210 C 228,208 224,210 223,214 C 222,218 225,221 228,221 C 232,221 234,218 234,215 C 234,213 232,211 231,210 Z',
  }),
  S({
    id: 'lym-node-groin-l',
    kind: 'p a t h',
    organId: 'lymphnodes',
    grad: 'g-lymphatic',
    strokeVar: '--lymphatic-c',
    sw: 1.2,
    mirror: true,
    d: 'M 208,392 C 205,390 201,392 200,396 C 199,400 202,403 205,403 C 209,403 211,400 211,397 C 211,395 209,393 208,392 Z M 214,404 C 211,402 207,404 206,408 C 205,412 208,415 211,415 C 215,415 217,412 217,409 C 217,407 215,405 214,404 Z',
  }),
  // أوعية لمفاوية: تصريف حتى التجزؤ تحت الترقوة
  S({
    id: 'lym-vessel-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    organId: 'lymphvessels',
    mirror: true,
    fillVar: '--lymphatic-b',
    op: 0.9,
    d: 'M 166,136 C 168,146 172,156 177,164 M 224,206 C 216,198 206,190 196,184 C 188,179 180,174 174,170 M 206,400 C 200,392 194,384 190,376 C 186,368 183,358 182,348',
  }),
  // الزور (الطحال): قِوس أعلى يسار البطن
  S({
    id: 'lym-spleen',
    kind: 'p a t h',
    organId: 'spleen',
    grad: 'g-lymphatic',
    strokeVar: '--lymphatic-c',
    sw: 1.4,
    d: 'M 148,300 C 141,298 135,302 133,309 C 131,317 135,325 142,328 C 148,330 154,327 156,321 C 158,314 155,305 148,300 Z',
  }),
  S({
    id: 'lym-spleen-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'spleen',
    fillVar: '--lymphatic-c',
    op: 0.7,
    d: 'M 138,305 C 136,310 136,317 139,322 M 145,303 C 142,309 142,317 145,323',
  }),
]

/* ============ الغدد الصماء (endocrine) — تفصيلية ============ */
const ENDOCRINE: ShapeDef[] = [
  // الغدة النخامية: قاعدة الدماغ
  S({
    id: 'end-pituitary',
    kind: 'p a t h',
    organId: 'pituitary',
    grad: 'g-endocrine',
    strokeVar: '--endocrine-c',
    sw: 1.2,
    d: 'M 180,96 C 176,96 173,99 174,102 C 175,105 178,106 180,105 C 182,106 185,105 186,102 C 187,99 184,96 180,96 Z',
  }),
  // الغدة الدرقية: فراشة على الحنجرة
  S({
    id: 'end-thyroid',
    kind: 'p a t h',
    organId: 'thyroid',
    grad: 'g-endocrine',
    strokeVar: '--endocrine-c',
    sw: 1.4,
    d: 'M 180,132 C 176,130 170,130 166,134 C 162,138 162,145 166,148 C 170,151 176,150 179,146 L 181,146 C 184,150 190,151 194,148 C 198,145 198,138 194,134 C 190,130 184,130 180,132 Z',
  }),
  S({
    id: 'end-thyroid-line',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'thyroid',
    fillVar: '--endocrine-c',
    op: 0.7,
    d: 'M 171,134 C 168,138 168,143 171,146 M 189,134 C 192,138 192,143 189,146',
  }),
  // جارات الدرقية: أربع نقاط خلف الفصوص
  S({
    id: 'end-parathyroid',
    kind: 'p a t h',
    organId: 'parathyroid',
    grad: 'g-endocrine',
    strokeVar: '--endocrine-c',
    sw: 1,
    mirror: true,
    d: 'M 167,136 a 2.2,2.2 0 1 0 4.4,0 a 2.2,2.2 0 1 0 -4.4,0 M 167,144 a 2.2,2.2 0 1 0 4.4,0 a 2.2,2.2 0 1 0 -4.4,0',
  }),
  // الغدة الكظرية: قبعة على الكلية
  S({
    id: 'end-adrenal-l',
    kind: 'p a t h',
    organId: 'adrenals',
    grad: 'g-endocrine',
    strokeVar: '--endocrine-c',
    sw: 1.2,
    mirror: true,
    d: 'M 138,296 C 136,292 140,289 144,290 C 148,291 150,294 148,297 C 146,299 140,300 138,296 Z',
  }),
]

/* ============ الجهاز العصبي (nervous) — منطقي كامل عبر الجسم ============ */
const NERVOUS: ShapeDef[] = [
  // الدماغ: قبة مخية بفصين وتلافيف واضحة
  S({
    id: 'ner-brain',
    kind: 'p a t h',
    organId: 'brain',
    grad: 'g-nervous',
    strokeVar: '--nervous-c',
    sw: 1.4,
    d: 'M 180,36 C 196,36 208,46 210,60 C 212,72 208,84 199,90 C 193,94 186,95 180,95 C 174,95 167,94 161,90 C 152,84 148,72 150,60 C 152,46 164,36 180,36 Z',
  }),
  // تلافيف الدماغ (خطوط التفصيص)
  S({
    id: 'ner-brain-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.1,
    fillVar: '--nervous-c',
    op: 0.85,
    d: 'M 180,38 L 180,93 M 158,72 C 166,77 174,77 180,73 C 186,77 194,77 202,72 M 165,48 C 162,56 163,64 167,70 M 195,48 C 198,56 197,64 193,70 M 156,60 C 160,56 164,56 167,60 M 204,60 C 200,56 196,56 193,60 M 162,80 C 166,84 172,86 177,85 M 198,80 C 194,84 188,86 183,85',
  }),
  S({
    id: 'ner-cerebellum',
    kind: 'p a t h',
    organId: 'cerebellum',
    grad: 'g-nervous',
    strokeVar: '--nervous-c',
    d: 'M 165,90 C 169,85 191,85 195,90 C 193,99 186,102 180,102 C 174,102 167,99 165,90 Z',
  }),
  S({
    id: 'ner-cerebellum-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    fillVar: '--nervous-c',
    op: 0.8,
    d: 'M 168,92 C 172,90 176,90 180,90 C 184,90 188,90 192,92 M 169,96 C 173,94 177,94 180,94 C 183,94 187,94 191,96',
  }),
  // جذع الدماغ: المخ الأوسط ثم الجسر ثم النخاع المستطيل
  S({
    id: 'ner-brainstem',
    kind: 'p a t h',
    organId: 'brainstem',
    grad: 'g-nervous',
    strokeVar: '--nervous-c',
    d: 'M 175,96 C 174,101 175,106 177,111 C 178,114 179,116 180,116 C 181,116 182,114 183,111 C 185,106 186,101 185,96 C 182,99 178,99 175,96 Z',
  }),
  // النخاع الشوكي: أنبوب يتدرج نحافة، مع جذور عصبية
  S({
    id: 'ner-spinal',
    kind: 'p a t h',
    organId: 'spinalcord',
    grad: 'g-nervous',
    strokeVar: '--nervous-c',
    d: 'M 177.5,116 C 177,150 176.8,190 177.3,225 C 177.8,252 178.5,274 179,288 L 181,288 C 181.5,274 182.2,252 182.7,225 C 183.2,190 183,150 182.5,116 Z',
  }),
  S({
    id: 'ner-roots',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    fillVar: '--nervous-c',
    op: 0.85,
    d: 'M 177,130 L 170,134 M 183,130 L 190,134 M 177,144 L 169.5,148 M 183,144 L 190.5,148 M 177,158 L 169.5,162 M 183,158 L 190.5,162 M 177,172 L 169.5,176 M 183,172 L 190.5,176 M 177,186 L 169.5,190 M 183,186 L 190.5,190 M 177,200 L 169.5,204 M 183,200 L 190.5,204 M 177,214 L 169.5,218 M 183,214 L 190.5,218 M 177,228 L 170,232 M 183,228 L 190,232 M 177,242 L 170,246 M 183,242 L 190,246 M 178,256 L 171,260 M 182,256 L 189,260 M 178,268 L 172,272 M 182,268 L 188,272 M 178.5,280 L 173,284 M 181.5,280 L 187,284',
  }),
  S({
    id: 'ner-optic-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'opticnerve',
    mirror: true,
    fillVar: '--nervous-b',
    d: 'M 165,66 C 170,72 174,78 177,86',
  }),
  S({
    id: 'ner-acoustic-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'acousticnerve',
    mirror: true,
    fillVar: '--nervous-b',
    d: 'M 152,80 C 160,83 168,87 174,91',
  }),
  // الضفيعات: عنقية ثم جذع الذراع
  S({
    id: 'ner-brachial-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.2,
    organId: 'peripheralnerves',
    mirror: true,
    fillVar: '--nervous-b',
    d: 'M 181,140 C 188,144 196,146 204,148 M 181,145 C 186,151 192,157 198,162 M 181,150 C 188,154 196,157 204,160',
  }),
  // عصب الذراع حتى اليد (متوسط، كعبي، أشعي)
  S({
    id: 'ner-arm-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    organId: 'peripheralnerves',
    mirror: true,
    fillVar: '--nervous-b',
    d: 'M 204,148 C 216,172 226,204 232,238 C 236,268 238,300 238,332 C 238,356 237,374 236,390 M 198,162 C 208,188 218,222 224,256 C 229,290 233,324 235,358 C 235.5,372 235.5,382 235,392 M 204,160 C 212,176 218,196 222,216',
  }),
  // الضفيع القطني → عصب الفخذ
  S({
    id: 'ner-lumbar-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    organId: 'peripheralnerves',
    mirror: true,
    fillVar: '--nervous-b',
    d: 'M 181,248 C 186,252 192,256 198,260 M 181,256 C 185,262 190,268 195,274 M 181,264 C 184,270 188,276 192,282 M 195,274 C 199,298 202,322 204,346',
  }),
  // الضفيع العجزي → العصب الوركي (سميك) ثم تفرعه تحت الركبة
  S({
    id: 'ner-sciatic-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.6,
    organId: 'peripheralnerves',
    mirror: true,
    fillVar: '--nervous-b',
    d: 'M 181,278 C 188,300 194,324 198,348 C 201,368 203,390 203,410',
  }),
  S({
    id: 'ner-tibial-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    organId: 'peripheralnerves',
    mirror: true,
    fillVar: '--nervous-b',
    d: 'M 203,410 C 205,446 205,486 203,526 C 202,560 201,596 201,632 C 201,660 202,686 204,704',
  }),
  S({
    id: 'ner-peroneal-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    organId: 'peripheralnerves',
    mirror: true,
    fillVar: '--nervous-b',
    d: 'M 203,410 C 208,444 210,484 209,524 C 208,558 207,592 206,626 C 205,652 205,676 206,698',
  }),
]

/* ============ العضلات (muscles) — عرض عضلي كامل ============ */
const MUSCLES: ShapeDef[] = [
  // المنكبي (الترابيسي)
  S({
    id: 'mus-trap-l',
    kind: 'p a t h',
    organId: 'trapezius',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.2,
    mirror: true,
    d: 'M 182,150 C 196,146 214,146 228,152 C 224,158 216,160 208,160 C 198,160 188,158 182,155 Z',
  }),
  // الصدرية الكبرى: مروحة مع ألياف
  S({
    id: 'mus-pec-l',
    kind: 'p a t h',
    organId: 'pectoralis',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.3,
    mirror: true,
    d: 'M 178,158 C 164,156 150,162 143,172 C 137,181 136,193 141,203 C 146,212 156,218 167,219 C 173,219 178,216 179,210 C 180,196 180,176 178,158 Z',
  }),
  S({
    id: 'mus-pec-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'pectoralis',
    mirror: true,
    fillVar: '--muscles-c',
    op: 0.65,
    d: 'M 176,164 C 164,164 152,170 145,180 M 177,172 C 166,172 155,178 148,187 M 177,181 C 167,181 158,186 152,194 M 177,190 C 168,191 160,195 155,202 M 177,199 C 170,201 163,205 159,211',
  }),
  // الدلتا: غطاء الكتف
  S({
    id: 'mus-delt-l',
    kind: 'p a t h',
    organId: 'deltoid',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.3,
    mirror: true,
    d: 'M 236,150 C 246,146 256,152 259,163 C 261,172 259,183 254,191 C 250,197 244,198 240,193 C 235,185 233,171 234,159 C 234,155 235,152 236,150 Z',
  }),
  // العضلة العضدية (اثنى رأسي) مع خط الفصل
  S({
    id: 'mus-bicep-l',
    kind: 'p a t h',
    organId: 'biceps',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.3,
    mirror: true,
    d: 'M 243,200 C 250,202 254,210 253,222 C 252,234 248,244 243,248 C 238,246 235,238 235,226 C 235,214 238,204 243,200 Z',
  }),
  S({
    id: 'mus-bicep-line',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'biceps',
    mirror: true,
    fillVar: '--muscles-c',
    op: 0.65,
    d: 'M 244,204 C 245,216 244,230 241,244',
  }),
  // عضلات الساعد
  S({
    id: 'mus-forearm-l',
    kind: 'p a t h',
    organId: 'forearm',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.2,
    mirror: true,
    d: 'M 238,254 C 244,256 247,264 246,274 C 245,290 243,308 240,326 C 238,340 236,352 235,362 C 232,356 230,348 230,338 C 230,318 232,296 234,278 C 235,266 236,258 238,254 Z',
  }),
  // العضلة المستقيمة للبطن: عمود مع أربع تقسيمات وخط أبيض
  S({
    id: 'mus-abs',
    kind: 'p a t h',
    organId: 'rectusabdominis',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.3,
    mirror: true,
    d: 'M 178,244 C 171,242 164,244 160,250 C 156,258 155,272 156,286 C 157,300 160,314 164,324 C 168,332 174,336 179,336 Z',
  }),
  S({
    id: 'mus-abs-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.1,
    organId: 'rectusabdominis',
    mirror: true,
    fillVar: '--muscles-c',
    op: 0.7,
    d: 'M 160,262 C 166,264 172,264 178,263 M 158,280 C 165,282 172,282 178,281 M 159,298 C 166,300 172,300 178,299 M 162,316 C 168,318 173,318 178,317 M 178,246 L 178,334',
  }),
  // المائلة: خطوط مائلة على الجنب
  S({
    id: 'mus-oblique-l',
    kind: 'p a t h',
    organId: 'obliques',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.2,
    mirror: true,
    d: 'M 156,258 C 148,262 142,270 140,280 C 139,290 141,300 146,308 C 151,314 157,316 161,314 C 158,304 156,290 157,276 C 158,268 159,262 156,258 Z',
  }),
  S({
    id: 'mus-oblique-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'obliques',
    mirror: true,
    fillVar: '--muscles-c',
    op: 0.65,
    d: 'M 148,270 C 152,274 156,280 158,286 M 145,284 C 149,288 153,294 155,300 M 147,298 C 150,302 154,306 157,310',
  }),
  // العجزي الكبرى
  S({
    id: 'mus-glute-l',
    kind: 'p a t h',
    organId: 'gluteus',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.3,
    mirror: true,
    d: 'M 172,372 C 162,368 150,370 143,378 C 137,386 137,398 143,406 C 150,414 162,415 170,409 C 174,405 176,396 176,388 C 176,381 174,375 172,372 Z',
  }),
  S({
    id: 'mus-glute-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'gluteus',
    mirror: true,
    fillVar: '--muscles-c',
    op: 0.65,
    d: 'M 168,376 C 160,376 152,380 147,387 M 170,386 C 162,386 155,390 150,396 M 170,396 C 164,396 158,400 154,405',
  }),
  // رباعية الفخذ: أربعة رؤوس نحو وتر الرضفة
  S({
    id: 'mus-quad-l',
    kind: 'p a t h',
    organId: 'quadriceps',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.3,
    mirror: true,
    d: 'M 207,414 C 216,412 225,418 229,430 C 233,446 232,470 228,492 C 225,510 220,526 214,536 C 209,542 204,540 202,532 C 199,516 198,494 199,472 C 200,450 202,430 207,414 Z',
  }),
  S({
    id: 'mus-quad-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'quadriceps',
    mirror: true,
    fillVar: '--muscles-c',
    op: 0.65,
    d: 'M 214,420 C 218,440 219,466 216,492 C 214,510 211,524 208,532 M 222,424 C 226,442 226,466 223,490 M 206,422 C 208,444 208,470 207,496 M 228,436 C 230,456 229,478 226,498',
  }),
  // ساق: باطنية وظهرية مع خط الفصل
  S({
    id: 'mus-calf-l',
    kind: 'p a t h',
    organId: 'calves',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.3,
    mirror: true,
    d: 'M 203,556 C 210,554 217,560 219,572 C 221,588 219,608 214,626 C 210,640 205,650 201,654 C 197,648 195,636 195,620 C 195,600 197,578 199,566 C 200,560 201,557 203,556 Z',
  }),
  S({
    id: 'mus-calf-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'calves',
    mirror: true,
    fillVar: '--muscles-c',
    op: 0.65,
    d: 'M 206,560 C 208,578 207,600 203,620 M 213,562 C 215,580 214,600 210,620 M 218,574 C 218,590 216,606 212,622',
  }),
  // الأوتار: وتر أخيل ووتر الرضفة
  S({
    id: 'mus-tendon-ref',
    kind: 'p a t h',
    organId: 'tendons',
    strokeOnly: true,
    sw: 3,
    mirror: true,
    fillVar: '--muscles-b',
    d: 'M 202,654 C 202,668 202,682 203,694 M 211,540 C 210,544 209,548 209,552',
  }),
]

/* ============ أعضاء الحس (sensory) — تفصيلية ============ */
const SENSORY: ShapeDef[] = [
  // العين: بياض وقزحية وبؤبؤ وخط جفن
  S({
    id: 'sen-eye-l',
    kind: 'p a t h',
    organId: 'eye',
    mirror: true,
    strokeOnly: true,
    sw: 1.3,
    fillVar: '--eye',
    d: 'M 160,66.5 C 163,64 168,64 171,66.5 C 168,69 163,69 160,66.5 Z',
  }),
  S({
    id: 'sen-eye-iris-l',
    kind: 'p a t h',
    organId: 'eye',
    mirror: true,
    d: 'M 164.5,66 a 1.8,1.8 0 1 0 3.6,0 a 1.8,1.8 0 1 0 -3.6,0 M 165.6,66 a 0.7,0.7 0 1 0 1.4,0 a 0.7,0.7 0 1 0 -1.4,0',
  }),
  S({
    id: 'sen-brow-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.4,
    organId: 'eye',
    mirror: true,
    fillVar: '--ear-line',
    d: 'M 159,61 C 162,59 167,59 170,61',
  }),
  // الأذن: قوقعة مع طيات داخلية
  S({
    id: 'sen-ear-l',
    kind: 'p a t h',
    organId: 'ear',
    mirror: true,
    strokeOnly: true,
    sw: 1.5,
    fillVar: '--ear-line',
    d: 'M 148,63 C 143.5,61 140.5,66.5 143,72.5 C 145,76.5 148.5,76.5 149.5,73.5',
  }),
  S({
    id: 'sen-ear-inner-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.1,
    organId: 'ear',
    mirror: true,
    fillVar: '--ear-line',
    op: 0.8,
    d: 'M 146,66 C 144,67 144,70 146,71 M 147,65 C 145.5,66 145.5,69 147,70',
  }),
  // الأنف: جسر وفتحتان
  S({
    id: 'sen-nose',
    kind: 'p a t h',
    organId: 'nose',
    strokeOnly: true,
    sw: 1.3,
    op: 0.6,
    fillVar: '--nose-line',
    d: 'M 179,61 C 178.6,69 178.6,76 179,81 C 179.4,84 181.5,85.5 183.5,84.5',
  }),
  S({
    id: 'sen-nostril-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    organId: 'nose',
    mirror: true,
    fillVar: '--nose-line',
    op: 0.7,
    d: 'M 172,84 C 174,86 176,86 177,84 M 183,84 C 185,86 187,86 188,84',
  }),
]

/* ============ التجميع ============ */
export const LAYER_SHAPES: Record<LayerId, ShapeDef[]> = {
  skin: SKIN,
  soft: SOFT,
  bones: BONES,
  muscles: MUSCLES,
  nervous: NERVOUS,
  respiratory: RESPIRATORY,
  digestive: DIGESTIVE,
  urinary: URINARY,
  circulatory: CIRCULATORY,
  reproductive: [...REPRO_MALE, ...REPRO_FEMALE],
  lymphatic: LYMPHATIC,
  endocrine: ENDOCRINE,
  sensory: SENSORY,
  vessels: VESSELS,
}

/** كل الأشكال (بما فيها المرآة) معرّفًا → شكل. */
export function allShapes(): { def: ShapeDef; mirrored: boolean }[] {
  const out: { def: ShapeDef; mirrored: boolean }[] = []
  for (const shapes of Object.values(LAYER_SHAPES)) {
    for (const def of shapes) {
      out.push({ def, mirrored: false })
      if (def.mirror) out.push({ def, mirrored: true })
    }
  }
  return out
}

/** مجموعة معرّفات الأشكال المرئية لعضو معين (بما فيها المرآة). */
export function shapeIdsForOrgan(organ: { model?: { shapeIds: string[] } }): Set<string> {
  const set = new Set<string>()
  for (const sid of organ.model?.shapeIds ?? []) {
    set.add(sid)
  }
  return set
}
