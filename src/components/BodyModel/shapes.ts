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

/* ============ الجهاز التنفسي (respiratory) — تفصيلي v2 ============ */
const RESPIRATORY: ShapeDef[] = [
  // تجاويف الأنف (الأردية) داخل فتحة الأنف
  S({
    id: 'res-nasal',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.3,
    organId: 'nasalcavity',
    fillVar: '--respiratory-c',
    d: 'M 173,62 C 171,69 171,77 173,83 M 187,62 C 189,69 189,77 187,83 M 177,64 C 176.5,71 176.5,78 177,84 M 183,64 C 183.5,71 183.5,78 183,84',
  }),
  // البلعوم: قناة خلف الفم
  S({
    id: 'res-pharynx',
    kind: 'p a t h',
    organId: 'pharynx',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    sw: 1.2,
    d: 'M 176,93 L 184,93 C 184.5,102 184,111 183.5,118 L 176.5,118 C 176,111 175.5,102 176,93 Z',
  }),
  // الحنجرة
  S({
    id: 'res-larynx',
    kind: 'p a t h',
    organId: 'larynx',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    sw: 1.2,
    d: 'M 173,110 C 176,106.5 184,106.5 187,110 C 186,116 184,120.5 180,121.5 C 176,120.5 174,116 173,110 Z',
  }),
  // القصبة الهوائية مع حلقاتها الغضروفية
  S({
    id: 'res-trachea',
    kind: 'p a t h',
    organId: 'trachea',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    sw: 1.3,
    d: 'M 177,121 L 183,121 C 183.4,134 183.4,148 183,161 L 177,161 C 176.6,148 176.6,134 177,121 Z',
  }),
  S({
    id: 'res-trachea-rings',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 0.9,
    fillVar: '--respiratory-c',
    op: 0.75,
    d: 'M 177.2,126 L 182.8,126 M 177.2,132 L 182.8,132 M 177.2,138 L 182.8,138 M 177.2,144 L 182.8,144 M 177.2,150 L 182.8,150 M 177.2,156 L 182.8,156',
  }),
  // شعبتان رئويتان (يسار يُرسم ويُمرَّر)
  S({
    id: 'res-bronchi-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3.2,
    organId: 'bronchi',
    fillVar: '--respiratory-c',
    mirror: true,
    d: 'M 180,162 C 174,167 166,173 160,180 M 171,172 C 166,177 161,182 157,187',
  }),
  // الرئة اليمنى (3 فصوص) — أعلى من الترقوة تقريبًا
  S({
    id: 'res-lung-r',
    kind: 'p a t h',
    organId: 'lungs',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    sw: 1.4,
    d: 'M 151,156 C 142,160 135,170 132,184 C 129,202 129,224 132,244 C 134,258 140,268 150,272 C 160,276 170,274 174,266 C 177,258 178,246 178,232 C 178,212 176,190 172,174 C 169,163 161,155 151,156 Z',
  }),
  // الرئة اليسرى (فصان + نتوء قلبي)
  S({
    id: 'res-lung-l',
    kind: 'p a t h',
    organId: 'lungs',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    sw: 1.4,
    d: 'M 209,156 C 218,160 225,170 228,184 C 231,202 231,224 228,244 C 226,258 220,268 210,272 C 200,276 191,274 187,266 C 184,259 183,250 184,242 C 185,234 189,228 193,224 C 196,219 197,210 196,200 C 195,186 193,170 195,164 C 197,158 203,155 209,156 Z',
  }),
  // الشقوق: مائلة + أفقية (يمى)، مائلة (يسار)
  S({
    id: 'res-fissure-r',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.3,
    organId: 'lungs',
    fillVar: '--respiratory-c',
    op: 0.85,
    d: 'M 174,190 C 164,208 152,228 140,248 M 172,222 C 163,224 152,226 142,228',
  }),
  S({
    id: 'res-fissure-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.3,
    organId: 'lungs',
    fillVar: '--respiratory-c',
    op: 0.85,
    d: 'M 186,192 C 196,210 208,230 220,248',
  }),
  // حويصلات هوائية (تفصيل)
  S({
    id: 'res-alveoli',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'alveoli',
    fillVar: '--respiratory-c',
    d: 'M 166,196 c -2,-2 -4,-1 -4,1 c 0,2 2,3 4,2 c 2,1 4,0 4,-2 c 0,-2 -2,-3 -4,-1 Z M 170,206 c -2,-2 -4,-1 -4,1 c 0,2 2,3 4,2 c 2,1 4,0 4,-2 c 0,-2 -2,-3 -4,-1 Z M 194,198 c -2,-2 -4,-1 -4,1 c 0,2 2,3 4,2 c 2,1 4,0 4,-2 c 0,-2 -2,-3 -4,-1 Z M 198,208 c -2,-2 -4,-1 -4,1 c 0,2 2,3 4,2 c 2,1 4,0 4,-2 c 0,-2 -2,-3 -4,-1 Z',
  }),
  // الحجاب الحاجز: قبة تحت القاع
  S({
    id: 'res-diaphragm',
    kind: 'p a t h',
    organId: 'diaphragm',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    op: 0.8,
    d: 'M 132,292 C 152,278 170,272 180,272 C 190,272 208,278 228,292 C 208,288 190,285 180,285 C 170,285 152,288 132,292 Z',
  }),
]

/* ============ الجهاز الهضمي (digestive) — تفصيلي v2 ============ */
const DIGESTIVE: ShapeDef[] = [
  // الفم والأسنان واللسان
  S({
    id: 'dig-mouth',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.6,
    organId: 'mouth',
    fillVar: '--digestive-c',
    d: 'M 167,95 C 174,99 186,99 193,95',
  }),
  S({
    id: 'dig-teeth',
    kind: 'p a t h',
    organId: 'teeth',
    fillVar: '--teeth',
    d: 'M 168,99 h 4 v 5 h -4 Z M 173,100 h 4 v 5 h -4 Z M 178,100 h 4 v 5 h -4 Z M 183,100 h 4 v 5 h -4 Z M 188,99 h 4 v 5 h -4 Z M 169,105 h 3.5 v 4.5 h -3.5 Z M 174,106 h 3.5 v 4.5 h -3.5 Z M 179,106 h 3.5 v 4.5 h -3.5 Z M 184,106 h 3.5 v 4.5 h -3.5 Z M 189,105 h 3.5 v 4.5 h -3.5 Z',
  }),
  S({
    id: 'dig-tongue',
    kind: 'p a t h',
    organId: 'tongue',
    fillVar: '--tongue',
    strokeVar: '--tongue-b',
    sw: 0.8,
    d: 'M 172,100 C 176,106 184,106 188,100 C 186,98 182,97 180,97 C 178,97 174,98 172,100 Z',
  }),
  // الغدة اللعابية (النكفية)
  S({
    id: 'dig-salivary-l',
    kind: 'p a t h',
    organId: 'salivary',
    grad: 'g-digestive',
    strokeVar: '--digestive-c',
    sw: 1,
    mirror: true,
    d: 'M 157,88 C 153,86 149,88 148,92 C 147,96 150,99 154,99 C 158,99 160,95 159,91 Z',
  }),
  // المريء: من البلعوم إلى المعدة (خلف القلب)
  S({
    id: 'dig-esophagus',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 5,
    organId: 'esophagus',
    fillVar: '--digestive-a',
    op: 0.95,
    d: 'M 178,119 C 177,142 177,165 178,188 C 179,210 180,232 182,252 C 183,258 183,262 183,266',
  }),
  // الكبد: مثلث مائل، الفص الأيمن هو الأكبر (يمين الشخص = يسار الشاشة)
  S({
    id: 'dig-liver',
    kind: 'p a t h',
    organId: 'liver',
    fillVar: '--liver',
    strokeVar: '--liver-b',
    sw: 1.5,
    d: 'M 140,272 C 150,265 165,263 178,265 C 188,267 197,272 202,279 C 206,285 207,293 204,301 C 201,309 193,314 184,315 C 172,316 160,313 151,307 C 143,301 138,291 138,282 C 138,277 139,274 140,272 Z',
  }),
  // الرباط السيفي + تفاصيل الفصوص
  S({
    id: 'dig-liver-lobe',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    organId: 'liver',
    fillVar: '--liver-b',
    op: 0.8,
    d: 'M 184,266 C 183,282 183,299 184,314 M 147,288 C 153,284 160,282 167,282 M 201,286 C 197,289 194,293 192,298',
  }),
  // المرارة: كم أسفل الكبد
  S({
    id: 'dig-gallbladder',
    kind: 'p a t h',
    organId: 'gallbladder',
    fillVar: '--gall',
    strokeVar: '--gall-b',
    sw: 1,
    d: 'M 175,311 C 171,310 168,313 168,318 C 168,324 171,329 176,330 C 180,328 183,322 182,316 C 181,312 179,311 175,311 Z',
  }),
  // المعدة: شكل حرف J — القاع يسارًا والمبايض (البواب) يمينًا أسفل
  S({
    id: 'dig-stomach',
    kind: 'p a t h',
    organId: 'stomach',
    grad: 'g-digestive',
    strokeVar: '--digestive-c',
    sw: 1.5,
    d: 'M 183,265 C 192,263 200,268 203,277 C 206,289 204,303 197,313 C 191,321 181,325 171,323 C 165,321 161,315 163,308 C 166,301 170,294 173,287 C 176,279 179,270 183,265 Z',
  }),
  // طيات المعدة الداخلية
  S({
    id: 'dig-stomach-rugae',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.1,
    organId: 'stomach',
    fillVar: '--digestive-c',
    op: 0.7,
    d: 'M 196,279 C 199,289 197,301 191,309 M 189,281 C 193,291 191,303 185,311 M 182,284 C 186,293 185,303 180,309',
  }),
  // البنكرياس: رأسه يمينًا وذيله نحو الطحال
  S({
    id: 'dig-pancreas',
    kind: 'p a t h',
    organId: 'pancreas',
    fillVar: '--pancreas',
    strokeVar: '--pancreas-b',
    sw: 1.3,
    d: 'M 170,291 C 176,288 183,288 190,290 C 198,292 206,295 212,298 C 216,300 216,304 212,305 C 204,303 196,302 188,303 C 181,304 174,305 169,304 C 165,303 165,295 170,291 Z',
  }),
  // القولون: إطار (صاعد → كعب كبدي → عرضي → كعب طحالي → هابط → S → مستقيم)
  S({
    id: 'dig-largeintestine',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 9,
    organId: 'largeintestine',
    fillVar: '--digestive-c',
    op: 0.95,
    d: 'M 147,388 C 144,366 143,344 145,326 C 146,317 150,311 158,311 C 172,315 188,317 200,313 C 208,310 212,304 213,296 C 214,318 214,340 212,356 C 210,376 204,387 195,392 C 189,395 185,397 182,399',
  }),
  // الحواصر (تقسيقات القولون)
  S({
    id: 'dig-largeintestine-haustra',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    organId: 'largeintestine',
    fillVar: '--digestive-c',
    op: 0.7,
    d: 'M 143,336 L 151,336 M 143,348 L 151,348 M 144,360 L 152,360 M 145,372 L 153,372 M 164,311 L 164,319 M 174,313 L 174,321 M 184,314 L 184,322 M 194,314 L 194,322 M 209,316 L 217,316 M 209,330 L 217,330 M 208,344 L 216,344 M 207,358 L 215,358 M 206,372 L 213,372',
  }),
  // الأمعاء الدقيقة: ملفات ملء الوسط
  S({
    id: 'dig-smallintestine',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 6,
    organId: 'smallintestine',
    fillVar: '--digestive-b',
    op: 0.9,
    d: 'M 156,326 C 150,332 151,340 158,343 C 168,347 182,345 190,340 C 197,335 196,327 189,324 M 155,349 C 149,355 150,363 157,366 C 167,370 181,368 189,363 C 196,358 195,350 188,347 M 157,372 C 151,378 152,386 159,389 C 169,393 183,391 191,386 C 197,381 196,374 190,371 M 158,393 C 154,397 154,401 159,403 C 167,406 178,405 185,401 C 190,398 189,393 185,391 M 189,324 C 192,330 192,338 189,344 M 188,347 C 191,353 191,360 189,366 M 190,371 C 192,377 192,384 189,390 M 185,391 C 187,395 187,399 185,401',
  }),
  // المستقيم
  S({
    id: 'dig-rectum',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 5,
    organId: 'rectum',
    fillVar: '--digestive-c',
    d: 'M 181,399 C 180,405 179,411 178,415',
  }),
  // الزائدة الدودية
  S({
    id: 'dig-appendix',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.5,
    organId: 'appendix',
    fillVar: '--digestive-b',
    d: 'M 146,391 C 144,397 143,403 144,409',
  }),
]

/* ============ الجهاز الدوري (circulatory) — القلب والأوعية الكبرى v2 ============ */
const CIRCULATORY: ShapeDef[] = [
  // القلب: مائل، قمته نحو أسفل يسار الشخص
  S({
    id: 'cir-heart',
    kind: 'p a t h',
    organId: 'heart',
    grad: 'g-circulatory',
    strokeVar: '--circulatory-c',
    sw: 1.4,
    d: 'M 187,185 C 176,182 165,187 159,197 C 154,208 155,222 162,234 C 168,243 179,250 188,249 C 196,248 202,240 204,230 C 207,218 206,202 200,192 C 196,186 191,184 187,185 Z',
  }),
  // الأذينان (الجزء العلوي)
  S({
    id: 'cir-atria',
    kind: 'p a t h',
    organId: 'heart',
    grad: 'g-circulatory',
    op: 0.85,
    d: 'M 163,206 C 160,197 165,189 173,187 C 180,185 188,185 194,188 C 200,191 203,197 201,204 C 195,209 186,211 178,210 C 172,209 167,208 163,206 Z',
  }),
  // الشغاف التاجي + البطينان + الشريان التاجي
  S({
    id: 'cir-septum',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    organId: 'heart',
    fillVar: '--circulatory-c',
    op: 0.8,
    d: 'M 157,212 C 168,219 188,219 203,210 M 182,214 C 184,226 187,238 190,247 M 170,220 C 175,229 183,237 192,242 M 162,216 C 165,225 170,233 177,239',
  }),
  // قوس الأبهر
  S({
    id: 'cir-aortic-arch',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 5,
    organId: 'aorta',
    tone: 'art',
    d: 'M 175,188 C 173,177 176,167 183,163 C 190,159 197,163 197,171 C 197,179 195,186 193,191',
  }),
  // جذع الشريان الرئوي
  S({
    id: 'cir-pulm-trunk',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4.5,
    organId: 'pulmonaryartery',
    tone: 'ven',
    d: 'M 181,188 C 181,182 183,176 187,172',
  }),
]

/* ============ الأوعية الدموية (vessels) — شبكة كاملة عبر الجسم v2 ============ */
const VESSELS: ShapeDef[] = [
  // الأبهر النازل + التفرع الحرقفي والفخذي
  S({
    id: 'vas-aorta',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4,
    organId: 'aorta',
    tone: 'art',
    d: 'M 193,191 C 190,208 188,230 187,255 C 186,282 185,310 184,335 C 183.5,342 183,347 183,351 M 183,351 C 179,365 174,377 170,391 C 166,405 164,425 163,445 C 162.5,452 162,458 162,462 M 183,351 C 187,365 192,377 196,391 C 200,405 202,425 203,445 C 203,452 202,458 201,462',
  }),
  // الوريد الأجوف العلوي
  S({
    id: 'vas-svc',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4,
    organId: 'venacava',
    tone: 'ven',
    d: 'M 160,150 C 159,166 159,180 161,191',
  }),
  // الوريد الأجوف السفلي
  S({
    id: 'vas-ivc',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4,
    organId: 'venacava',
    tone: 'ven',
    d: 'M 168,350 C 168,322 167,294 166,266 C 165,240 164,220 163,200 C 162.5,196 162,193 161,191',
  }),
  // الأوردة الحرقفية
  S({
    id: 'vas-iliac-v',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3.2,
    organId: 'veins',
    tone: 'ven',
    d: 'M 171,351 C 167,365 162,377 158,391 C 154,405 152,425 151,445 C 151,452 151,458 151,463 M 171,351 C 175,365 180,377 184,391 C 188,405 190,425 191,445 C 191,452 191,458 191,463',
  }),
  // فروع الشريان الرئوي نحو الرئتين
  S({
    id: 'vas-pulm-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3.4,
    organId: 'pulmonaryartery',
    mirror: true,
    tone: 'ven',
    d: 'M 186,173 C 180,167 172,163 164,164 C 157,165 151,169 147,175',
  }),
  // الشريان التاجي (تغذية القلب)
  S({
    id: 'vas-coronary',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.4,
    organId: 'arteries',
    tone: 'art',
    d: 'M 171,218 C 176,227 184,235 193,241 M 163,214 C 166,223 171,231 178,237',
  }),
  // الشرايين الدوية (حول الدماغ)
  S({
    id: 'vas-cerebral',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    organId: 'arteries',
    tone: 'art',
    d: 'M 172,50 C 174,43 186,43 188,50 M 174,49 C 170,57 168,65 169,73 M 186,49 C 190,57 192,65 191,73 M 176,45 L 176,40 M 184,45 L 184,40',
  }),
  // الشريان السباتي
  S({
    id: 'vas-carotid-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.6,
    organId: 'arteries',
    mirror: true,
    tone: 'art',
    d: 'M 176,166 C 173,152 171,138 171,124 C 171,110 173,98 176,90',
  }),
  // الوريد الأجوف (عنقي)
  S({
    id: 'vas-jug-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.6,
    organId: 'veins',
    mirror: true,
    tone: 'ven',
    d: 'M 184,90 C 182,104 181,118 181,132 C 181,146 181,158 180,167',
  }),
  // الشريان تحت الترقوة
  S({
    id: 'vas-subclav-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.8,
    organId: 'arteries',
    mirror: true,
    tone: 'art',
    d: 'M 183,166 C 193,161 205,158 217,158 C 226,158 233,160 238,164',
  }),
  // شرايين الذراع
  S({
    id: 'vas-arm-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3,
    organId: 'arteries',
    mirror: true,
    tone: 'art',
    d: 'M 236,164 C 244,196 245,236 242,276 C 240,312 238,348 237,380 C 236.5,386 236,392 235,398',
  }),
  // أوردة الذراع
  S({
    id: 'vas-arm-v-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3,
    organId: 'veins',
    mirror: true,
    tone: 'ven',
    d: 'M 240,168 C 246,200 247,240 244,280 C 242,316 240,352 239,382 C 238.5,388 238,394 237,400',
  }),
  // الشريان الكلوي
  S({
    id: 'vas-renal-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.2,
    organId: 'arteries',
    mirror: true,
    tone: 'art',
    d: 'M 186,289 C 178,288 170,288 162,289',
  }),
  // الشريان المعوي (تغذية الأمعاء)
  S({
    id: 'vas-mes-artery',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    organId: 'arteries',
    tone: 'art',
    d: 'M 185,308 C 183,318 181,328 180,338 M 184,310 C 186,320 187,330 186,340 M 185,312 C 182,320 178,328 175,334',
  }),
  // الشريان الكبدي
  S({
    id: 'vas-hepatic',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    organId: 'arteries',
    tone: 'art',
    d: 'M 185,300 C 181,302 177,304 173,306',
  }),
  // الوريد البابي (من الأمعاء إلى الكبد)
  S({
    id: 'vas-portal',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'veins',
    tone: 'ven',
    d: 'M 172,342 C 170,334 170,324 172,314',
  }),
  // الأوردة الدماغية
  S({
    id: 'vas-cerebral-v',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    organId: 'veins',
    tone: 'ven',
    d: 'M 176,53 C 174,47 186,47 184,53 M 175,56 C 172,64 171,72 172,80 M 185,56 C 188,64 189,72 188,80',
  }),
  // شرايين/أوردة الساق (شرياني وريدي)
  S({
    id: 'vas-leg-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3,
    organId: 'arteries',
    mirror: true,
    tone: 'art',
    d: 'M 201,462 C 201,502 199,544 197,582 C 195,616 194,650 195,678 C 195.5,692 197,702 199,710',
  }),
  S({
    id: 'vas-leg-v-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3,
    organId: 'veins',
    mirror: true,
    tone: 'ven',
    d: 'M 191,463 C 191,505 189,548 188,585 C 187,619 187,653 188,681 C 188.5,695 190,705 192,712',
  }),
  // الشعيرات: يد وقدم
  S({
    id: 'vas-cap-hand-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.6,
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
    organId: 'capillaries',
    mirror: true,
    tone: 'art',
    d: 'M 196,716 C 195,723 195,730 197,736 M 202,714 C 202,721 202,728 201,734 M 208,714 C 208,720 208,726 207,732',
  }),
]

/* ============ الجهاز البولي (urinary) — تفصيلي v2 ============ */
const URINARY: ShapeDef[] = [
  // الكلية اليمنى (يمين الشخص = يسار الشاشة) — كلى بحزيم محزومي
  S({
    id: 'uri-kidney-l',
    kind: 'p a t h',
    organId: 'kidneys',
    grad: 'g-urinary',
    strokeVar: '--urinary-c',
    sw: 1.4,
    mirror: true,
    d: 'M 148,261 C 153,263 156,269 156,276 C 156,281 154,284 151,286 C 154,288 156,291 156,296 C 156,301 152,305 147,304 C 140,303 135,297 134,288 C 133,277 136,266 142,262 C 144,260 146,260 148,261 Z',
  }),
  // الحزيم والحوض الكلوي
  S({
    id: 'uri-kidney-d-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    organId: 'kidneys',
    fillVar: '--urinary-c',
    op: 0.8,
    mirror: true,
    d: 'M 154,276 C 151,280 151,283 153,286 M 154,293 C 151,296 150,299 150,301 M 140,268 C 137,273 136,279 137,285',
  }),
  // الحالبان
  S({
    id: 'uri-ureter-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.2,
    organId: 'ureters',
    fillVar: '--urinary-b',
    mirror: true,
    d: 'M 152,290 C 157,310 154,332 157,352 C 159,366 164,377 170,386',
  }),
  // المثانة: كمгруш كبير في حوض العظم
  S({
    id: 'uri-bladder',
    kind: 'p a t h',
    organId: 'bladder',
    fillVar: '--bladder',
    strokeVar: '--bladder-b',
    sw: 1.5,
    d: 'M 180,378 C 171,378 164,384 163,392 C 162,401 167,409 175,413 C 178,415 182,415 185,413 C 193,409 198,401 197,392 C 196,384 189,378 180,378 Z',
  }),
  // المثلث البولي
  S({
    id: 'uri-trigone',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.1,
    organId: 'bladder',
    fillVar: '--bladder-b',
    op: 0.8,
    d: 'M 174,405 L 180,397 L 186,405 Z M 180,397 L 180,409',
  }),
  // الإحليل
  S({
    id: 'uri-urethra',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'urethra',
    fillVar: '--urinary-b',
    d: 'M 180,415 C 180,422 180,429 180,435',
  }),
]

/* ============ الجهاز التناسلي (reproductive) — تفصيلي v2 ============ */
const REPRO_MALE: ShapeDef[] = [
  // الخصية مع الحزيم
  S({
    id: 'rep-m-testis-l',
    kind: 'p a t h',
    organId: 'testes',
    grad: 'g-reproductive',
    strokeVar: '--reproductive-c',
    sw: 1.4,
    mirror: true,
    d: 'M 167,412 C 161,409 155,411 153,417 C 151,424 153,432 159,435 C 165,438 171,435 173,428 C 174,421 172,414 167,412 Z',
  }),
  S({
    id: 'rep-m-testis-line',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'testes',
    fillVar: '--reproductive-c',
    op: 0.7,
    mirror: true,
    d: 'M 160,414 C 158,421 158,428 161,433 M 166,413 C 165,420 165,427 167,432',
  }),
  // الحبل المنوي (الخافز)
  S({
    id: 'rep-m-epididymis-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    organId: 'epididymis',
    fillVar: '--reproductive-c',
    mirror: true,
    d: 'M 173,413 C 176,418 176,427 173,433',
  }),
  // القنات المصلية تصعد نحو المثانة
  S({
    id: 'rep-m-vas-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    organId: 'vasdeferens',
    fillVar: '--reproductive-b',
    mirror: true,
    d: 'M 174,412 C 177,404 178,396 178,388 C 178,382 178,378 179,375',
  }),
  // الغدة النخامية (المنوية) خلف المثانة
  S({
    id: 'rep-m-vesicle-l',
    kind: 'p a t h',
    organId: 'seminalvesicles',
    grad: 'g-reproductive',
    strokeVar: '--reproductive-c',
    sw: 1,
    mirror: true,
    d: 'M 168,392 C 164,390 160,392 159,396 C 158,401 160,405 164,406 C 168,407 171,404 171,400 C 171,396 170,393 168,392 Z',
  }),
  // البروستاتا: حلقة أسفل المثانة
  S({
    id: 'rep-m-prostate',
    kind: 'p a t h',
    organId: 'prostate',
    grad: 'g-reproductive',
    strokeVar: '--reproductive-c',
    sw: 1.2,
    d: 'M 180,418 C 174,418 170,422 170,427 C 170,432 174,436 180,436 C 186,436 190,432 190,427 C 190,422 186,418 180,418 Z M 180,423 C 177,423 175,425 175,427 C 175,429 177,431 180,431 C 183,431 185,429 185,427 C 185,425 183,423 180,423 Z',
  }),
  // القضيب: غلاف + ساق
  S({
    id: 'rep-m-penis',
    kind: 'p a t h',
    organId: 'penis',
    grad: 'g-reproductive',
    strokeVar: '--reproductive-c',
    sw: 1.2,
    d: 'M 180,436 C 175,437 172,441 172,446 C 172,450 175,453 180,453 C 185,453 188,450 188,446 C 188,441 185,437 180,436 Z M 176,450 C 175.5,456 176,461 178,464 L 182,464 C 184,461 184.5,456 184,450 Z',
  }),
]

const REPRO_FEMALE: ShapeDef[] = [
  // الثدي مع القنيات الحليمية
  S({
    id: 'rep-f-breast-l',
    kind: 'p a t h',
    organId: 'breasts',
    grad: 'g-breast',
    strokeVar: '--breast-c',
    sw: 1.3,
    mirror: true,
    d: 'M 176,202 C 166,200 157,206 154,216 C 151,227 156,238 166,242 C 174,245 181,240 183,232 C 185,223 184,210 176,202 Z',
  }),
  S({
    id: 'rep-f-breast-line',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'breasts',
    fillVar: '--breast-c',
    op: 0.7,
    mirror: true,
    d: 'M 168,222 C 164,217 160,212 158,207 M 168,222 C 165,226 161,229 158,231 M 168,222 C 168,216 168,210 168,205 M 168,222 C 171,227 174,230 177,232',
  }),
  // الرحم: كمгруш معكوس ضيق
  S({
    id: 'rep-f-uterus',
    kind: 'p a t h',
    organId: 'uterus',
    fillVar: '--uterus',
    strokeVar: '--uterus-b',
    sw: 1.5,
    d: 'M 180,384 C 172,384 166,390 165,398 C 164,406 168,413 174,416 L 177,418 L 183,418 L 186,416 C 192,413 196,406 195,398 C 194,390 188,384 180,384 Z',
  }),
  // تجويف الرحم
  S({
    id: 'rep-f-uterus-line',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    organId: 'uterus',
    fillVar: '--uterus-b',
    op: 0.8,
    d: 'M 180,390 C 179.5,398 179.5,406 180,414 M 172,392 C 171,398 171,404 174,409 M 188,392 C 189,398 189,404 186,409',
  }),
  // عنق الرحم
  S({
    id: 'rep-f-cervix',
    kind: 'p a t h',
    organId: 'cervix',
    fillVar: '--uterus',
    strokeVar: '--uterus-b',
    sw: 1,
    d: 'M 176,418 C 175.5,423 175.5,428 176,432 L 184,432 C 184.5,428 184.5,423 184,418 C 181.5,420 178.5,420 176,418 Z',
  }),
  // المهبل
  S({
    id: 'rep-f-vagina',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3,
    organId: 'vagina',
    fillVar: '--uterus-b',
    op: 0.8,
    d: 'M 180,433 C 180,440 180,447 180,453',
  }),
  // المبيض مع بويضات
  S({
    id: 'rep-f-ovary-l',
    kind: 'p a t h',
    organId: 'ovaries',
    grad: 'g-reproductive',
    strokeVar: '--reproductive-c',
    sw: 1.2,
    mirror: true,
    d: 'M 156,394 C 152,392 148,394 147,399 C 146,404 149,408 153,408 C 157,408 160,404 160,400 C 160,397 158,395 156,394 Z',
  }),
  S({
    id: 'rep-f-ovary-dot',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.4,
    organId: 'ovaries',
    fillVar: '--reproductive-c',
    op: 0.8,
    mirror: true,
    d: 'M 151,398 a 1.6,1.6 0 1 0 3.2,0 a 1.6,1.6 0 1 0 -3.2,0 M 154,403 a 1.4,1.4 0 1 0 2.8,0 a 1.4,1.4 0 1 0 -2.8,0',
  }),
  // البوق البويضي مع الزوائد
  S({
    id: 'rep-f-tube-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'fallopiantubes',
    fillVar: '--reproductive-b',
    mirror: true,
    d: 'M 168,388 C 163,384 157,383 152,385 C 148,387 146,391 145,395',
  }),
  S({
    id: 'rep-f-fimbriae',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    organId: 'fallopiantubes',
    fillVar: '--reproductive-b',
    mirror: true,
    d: 'M 145,395 L 142,399 M 146,392 L 143,396 M 148,389 L 145,393',
  }),
]

/* ============ الجهاز اللمفاوي (lymphatic) — تفصيلي v2 ============ */
const LYMPHATIC: ShapeDef[] = [
  // الغدة الزعترية فوق القلب
  S({
    id: 'lym-thymus',
    kind: 'p a t h',
    organId: 'thymus',
    grad: 'g-lymphatic',
    strokeVar: '--lymphatic-c',
    sw: 1.2,
    d: 'M 179,158 C 172,156 165,158 162,164 C 159,170 161,178 167,181 C 172,183 177,180 179,175 C 181,180 186,183 191,181 C 197,178 199,170 196,164 C 193,158 186,156 179,158 Z',
  }),
  // اللوزتان
  S({
    id: 'lym-tonsil-l',
    kind: 'p a t h',
    organId: 'tonsils',
    grad: 'g-lymphatic',
    strokeVar: '--lymphatic-c',
    sw: 1,
    mirror: true,
    d: 'M 165,104 C 161,102 157,104 156,108 C 155,112 158,115 162,115 C 165,115 167,112 167,109 C 167,107 166,105 165,104 Z',
  }),
  // العقد اللمفاوية: عنق، إبط، فخذ
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
  // الأوعية اللمفاوية (العائدة نحو الدورة)
  S({
    id: 'lym-vessel-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    organId: 'lymphvessels',
    fillVar: '--lymphatic-b',
    mirror: true,
    d: 'M 166,136 C 168,146 172,156 177,164 M 224,206 C 216,198 206,190 196,184 C 188,179 180,174 174,170 M 206,400 C 200,392 194,384 190,376 C 186,368 183,358 182,348',
  }),
  // الطحال: على يسار الشخص (يمين الشاشة) تحت الأضلاع
  S({
    id: 'lym-spleen',
    kind: 'p a t h',
    organId: 'spleen',
    grad: 'g-lymphatic',
    strokeVar: '--lymphatic-c',
    sw: 1.4,
    d: 'M 206,288 C 214,284 223,288 227,296 C 230,304 228,314 221,319 C 214,323 206,320 203,312 C 200,304 201,293 206,288 Z',
  }),
  S({
    id: 'lym-spleen-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'spleen',
    fillVar: '--lymphatic-c',
    op: 0.8,
    d: 'M 212,292 C 217,296 220,304 220,311 M 208,296 C 212,300 214,306 214,312',
  }),
]

/* ============ الغدد الصماء (endocrine) — تفصيلية v2 ============ */
const ENDOCRINE: ShapeDef[] = [
  // الغدة النخامية (تحت الدماغ)
  S({
    id: 'end-pituitary',
    kind: 'p a t h',
    organId: 'pituitary',
    grad: 'g-endocrine',
    strokeVar: '--endocrine-c',
    sw: 1,
    d: 'M 180,92 C 176,92 173,95 174,98 C 175,101 178,102 180,101 C 182,102 185,101 186,98 C 187,95 184,92 180,92 Z',
  }),
  // الغدة الدرقية: فراشة حول القصبة
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
    op: 0.8,
    d: 'M 171,134 C 168,138 168,143 171,146 M 189,134 C 192,138 192,143 189,146',
  }),
  // الغدود الجار درقية (أربع نقاط)
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
  // الغدد الكظرية: قبعات فوق الكليتين
  S({
    id: 'end-adrenal-l',
    kind: 'p a t h',
    organId: 'adrenals',
    grad: 'g-endocrine',
    strokeVar: '--endocrine-c',
    sw: 1.2,
    mirror: true,
    d: 'M 141,257 C 144,253 149,252 152,254 C 155,256 156,259 154,262 C 150,261 145,261 141,262 C 139,260 139,258 141,257 Z',
  }),
]

/* ============ الجهاز العصبي (nervous) — منطقي كامل عبر الجسم v2 ============ */
const NERVOUS: ShapeDef[] = [
  // الدماغ: يملأ تجويف الجمجمة (غير دائري، بتقوس الفصوص)
  S({
    id: 'ner-brain',
    kind: 'p a t h',
    organId: 'brain',
    grad: 'g-nervous',
    strokeVar: '--nervous-c',
    sw: 1.4,
    d: 'M 180,38 C 193,38 203,44 207,54 C 211,64 211,76 207,84 C 204,90 198,93 191,92 C 188,91 185,90 183,90 L 177,90 C 175,90 172,91 169,92 C 162,93 156,90 153,84 C 149,76 149,64 153,54 C 157,44 167,38 180,38 Z',
  }),
  // الشقوق والتلافيف: الطولي، المركزي، الجانبي، وتلافيف
  S({
    id: 'ner-brain-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.1,
    organId: 'brain',
    fillVar: '--nervous-c',
    op: 0.85,
    d: 'M 180,40 L 180,88 M 167,46 C 171,56 173,66 172,76 M 193,46 C 189,56 187,66 188,76 M 157,72 C 165,70 173,72 179,77 M 203,72 C 195,70 187,72 181,77 M 160,52 C 163,50 166,50 169,52 M 174,60 C 177,58 180,58 182,60 M 191,52 C 194,50 197,50 200,52 M 156,64 C 159,62 162,62 165,64 M 195,64 C 198,62 201,62 204,64 M 163,80 C 166,78 170,79 173,82 M 187,82 C 190,79 194,78 197,80',
  }),
  // الخُصاء (المخيخ) أسفل خلف الدماغ
  S({
    id: 'ner-cerebellum',
    kind: 'p a t h',
    organId: 'cerebellum',
    grad: 'g-nervous',
    op: 0.9,
    d: 'M 170,87 C 173,83 187,83 190,87 C 188,95 184,98 180,98 C 176,98 172,95 170,87 Z',
  }),
  S({
    id: 'ner-cerebellum-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'cerebellum',
    fillVar: '--nervous-c',
    op: 0.8,
    d: 'M 174,89 C 177,88 183,88 186,89 M 175,93 C 178,92 182,92 185,93',
  }),
  // جذع الدماغ (الجسر + النخاع المستطيل)
  S({
    id: 'ner-brainstem',
    kind: 'p a t h',
    organId: 'brainstem',
    grad: 'g-nervous',
    strokeVar: '--nervous-c',
    sw: 1,
    d: 'M 176,90 C 174,97 175,104 178,110 C 179,113 181,113 182,110 C 185,104 186,97 184,90 C 182,93 178,93 176,90 Z',
  }),
  // النخاع الشوكي: ينتهي عند L1 (صمائل)
  S({
    id: 'ner-spinal',
    kind: 'p a t h',
    organId: 'spinalcord',
    grad: 'g-nervous',
    strokeVar: '--nervous-c',
    sw: 1,
    d: 'M 178,110 C 177.5,140 177.5,172 178,204 C 178.5,226 179,242 179.5,250 L 181.5,250 C 182,242 182.5,226 183,204 C 183.5,172 183.5,140 183,110 C 182,108 179,108 178,110 Z',
  }),
  // ذيل الفرس (ألياف أعصاب أسفل النخاع)
  S({
    id: 'ner-cuda',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 0.9,
    organId: 'spinalcord',
    fillVar: '--nervous-c',
    op: 0.7,
    d: 'M 179,252 C 178,262 178,272 179,282 M 181,252 C 182,262 182,272 181,282 M 180,252 L 180,284 M 177.5,254 C 176,264 176,274 177,284 M 182.5,254 C 184,264 184,274 183,284',
  }),
  // جذور الأعصاب (عنقية وصدرية)
  S({
    id: 'ner-roots',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.4,
    organId: 'spinalcord',
    fillVar: '--nervous-b',
    op: 0.8,
    d: 'M 177,124 L 170,128 M 183,124 L 190,128 M 177,138 L 169.5,142 M 183,138 L 190.5,142 M 177,152 L 169.5,156 M 183,152 L 190.5,156 M 177,166 L 169.5,170 M 183,166 L 190.5,170 M 177,180 L 169.5,184 M 183,180 L 190.5,184 M 177,194 L 169.5,198 M 183,194 L 190.5,198 M 177,208 L 170,212 M 183,208 L 190,212 M 177,222 L 170,226 M 183,222 L 190,226 M 177,236 L 170,240 M 183,236 L 190,240',
  }),
  // العصب البصري
  S({
    id: 'ner-optic-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.2,
    organId: 'opticnerve',
    fillVar: '--nervous-c',
    mirror: true,
    d: 'M 166,68 C 170,74 173,80 175,86',
  }),
  // العصب الوجهي/السمع
  S({
    id: 'ner-acoustic-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    organId: 'acousticnerve',
    fillVar: '--nervous-c',
    mirror: true,
    d: 'M 154,82 C 162,85 170,89 176,93',
  }),
  // التشعب الكتفي (أعصاب الذراع)
  S({
    id: 'ner-brachial-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    organId: 'peripheralnerves',
    fillVar: '--nervous-c',
    mirror: true,
    d: 'M 181,140 C 188,144 196,146 204,148 M 181,145 C 186,151 192,157 198,162 M 181,150 C 188,154 196,157 204,160',
  }),
  S({
    id: 'ner-arm-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    organId: 'peripheralnerves',
    fillVar: '--nervous-c',
    mirror: true,
    d: 'M 204,148 C 216,172 226,204 232,238 C 236,268 238,300 238,332 C 238,356 237,374 236,390 M 198,162 C 208,188 218,222 224,256 C 229,290 233,324 235,358 C 235.5,372 235.5,382 235,392 M 204,160 C 212,176 218,196 222,216',
  }),
  // التشعب القطني (أعصاب الفخذ)
  S({
    id: 'ner-lumbar-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    organId: 'peripheralnerves',
    fillVar: '--nervous-c',
    mirror: true,
    d: 'M 181,246 C 186,250 192,254 198,258 M 181,254 C 185,260 190,266 195,272 M 181,262 C 184,268 188,274 192,280 M 195,272 C 199,296 202,320 204,344',
  }),
  // العصب الوركي
  S({
    id: 'ner-sciatic-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'peripheralnerves',
    fillVar: '--nervous-c',
    mirror: true,
    d: 'M 181,298 C 188,316 194,338 198,358 C 201,374 203,392 203,410',
  }),
  // العصبان اللفيفان: الحواشي والسماحية
  S({
    id: 'ner-tibial-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    organId: 'peripheralnerves',
    fillVar: '--nervous-c',
    mirror: true,
    d: 'M 203,410 C 205,446 205,486 203,526 C 202,560 201,596 201,632 C 201,660 202,686 204,704',
  }),
  S({
    id: 'ner-peroneal-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    organId: 'peripheralnerves',
    fillVar: '--nervous-c',
    mirror: true,
    d: 'M 203,410 C 208,444 210,484 209,524 C 208,558 207,592 206,626 C 205,652 205,676 206,698',
  }),
]

/* ============ العضلات (muscles) — عرض عضلي كامل ============ */
const MUSCLES: ShapeDef[] = [
  // المنكبي (الترابيسي): نطاق واسع من الرقبة إلى الكتف
  S({
    id: 'mus-trap-l',
    kind: 'p a t h',
    organId: 'trapezius',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.2,
    mirror: true,
    d: 'M 181,146 C 194,141 210,143 224,149 C 230,152 233,157 231,162 C 224,167 214,170 203,170 C 195,170 187,166 183,159 C 182,155 181,150 181,146 Z',
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
