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
  /** لا يُرسم خط حافٍ (لأشكال التظليل 2.5D). */
  noStroke?: boolean
  /** يُرسم نسخة معكوسة على الجانب الآخر. */
  mirror?: boolean
  /** يظهر لجنس معين فقط (إلا إذا كان both). */
  sex?: 'male' | 'female' | 'both'
  /** تدرج لوني (url(#grad)). */
  grad?: string
  /** متغير CSS لحواف داكنة واضحة حول شكل مملوء (تفاصيل أوضح). */
  strokeVar?: string
  /** تحويل إضافي محلي (مثلاً تحجيم نسبي لمتغيرات الجنس). */
  transform?: string
  /** تلوين وعية. */
  tone?: 'art' | 'ven'
  /** متغير CSS لتلوين خاص. */
  fillVar?: string
  /** شفافية. */
  op?: number
}

const S = (s: ShapeDef) => s

/* ============ الجلد (skin) — Silhouette تشريحية 2.5D احترافية v4 ============ */
/*
 * النسب: 7.5 رأس (رأس ≈ 95px)، الكتفان بعرض واقعي، خصر منحني،
 * حوض متناسب، أطراف بحجم عضلي طبيعي. أنثى: كتف أضيق وحوض أوسع.
 */
const SKIN: ShapeDef[] = [
  // العنق
  S({
    id: 'fig-neck',
    kind: 'p a t h',
    organId: 'skin',
    grad: 'g-skin',
    d: 'M 166,114 C 167,127 166,140 164,150 C 164,155 169,158 176,159 L 184,159 C 191,158 196,155 196,150 C 194,140 193,127 194,114 C 189,119 171,119 166,114 Z',
  }),
  // الرأس (بلا ملامح كرتونية — نموذج طبي)
  S({
    id: 'fig-head',
    kind: 'p a t h',
    organId: 'skin',
    grad: 'g-skin',
    d: 'M 180,28 C 197,28 209,37 212,52 C 214,64 213,79 209,91 C 206,101 200,111 193,117 C 189,120.5 184,122.5 180,123 C 176,122.5 171,120.5 167,117 C 160,111 154,101 151,91 C 147,79 146,64 148,52 C 151,37 163,28 180,28 Z',
  }),
  // الأذن (تلميح تشريحي خفيف)
  S({
    id: 'fig-ear-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.6,
    organId: 'skin',
    fillVar: '--ear-line',
    op: 0.8,
    mirror: true,
    d: 'M 211,72 C 216,70 219,74 218,80 C 217,87 214,92 210,93',
  }),
  // الجذع — ذكر (V-taper: كتف عريض، خصر منحني، حوض عريض)
  S({
    id: 'fig-torso-m',
    kind: 'p a t h',
    organId: 'skin',
    sex: 'male',
    grad: 'g-skin',
    d: 'M 180,150 C 190,150 201,152 211,156 C 226,160 242,164 254,170 C 259,175 262,182 262,190 C 263,204 262,220 260,236 C 258,254 255,270 252,284 C 249,298 245,314 241,330 C 238,344 236,356 237,368 C 239,380 243,392 247,404 C 250,414 252,424 251,433 C 250,441 246,447 239,451 C 228,457 214,459 204,457 C 196,455 187,450 180,447 Z',
  }),
  // الجذع — أنثى (كتف أضيق، خصر أضيق، حوض أوسع)
  S({
    id: 'fig-torso-f',
    kind: 'p a t h',
    organId: 'skin',
    sex: 'female',
    grad: 'g-skin',
    d: 'M 180,150 C 189,150 198,152 207,155 C 220,159 233,163 245,168 C 251,173 254,180 254,188 C 255,202 254,218 252,234 C 250,252 247,268 244,282 C 241,296 237,312 234,328 C 231,342 229,354 230,366 C 232,378 237,390 242,402 C 246,412 250,422 252,431 C 252,440 248,447 240,452 C 229,458 216,460 207,458 C 198,456 188,451 180,448 Z',
  }),
  // الثدي — أنثى (تضاريس طبيعية، أسلوب طبي محايد)
  S({
    id: 'fig-breast-l',
    kind: 'p a t h',
    organId: 'breasts',
    sex: 'female',
    grad: 'g-breast',
    strokeVar: '--breast-c',
    sw: 1,
    mirror: true,
    d: 'M 181,198 C 190,192 200,192 208,197 C 216,203 221,214 221,226 C 221,240 214,250 204,253 C 195,255 186,251 182,244 C 179,236 178,222 179,210 C 179,205 180,201 181,198 Z',
  }),
  S({
    id: 'fig-breast-line-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    organId: 'breasts',
    sex: 'female',
    fillVar: '--breast-c',
    op: 0.55,
    mirror: true,
    d: 'M 186,246 C 194,252 206,252 215,245',
  }),
  // الذراع — ذكر (دلتا + بايسبس + ساعد بحجم عضلي)
  S({
    id: 'fig-arm-l',
    kind: 'p a t h',
    organId: 'skin',
    sex: 'male',
    grad: 'g-skin',
    mirror: true,
    d: 'M 252,168 C 264,170 274,177 277,188 C 280,202 279,220 277,238 C 274,262 271,290 270,318 C 269,336 270,348 269,358 C 267,382 264,410 260,436 C 257,456 252,472 248,486 C 245,490 241,492 238,492 C 235,492 232,490 231,486 C 232,470 234,452 236,432 C 238,410 239,388 240,368 C 240,360 240,354 241,348 C 241,332 241,316 242,298 C 243,276 243,254 243,234 C 243,220 242,208 240,200 C 237,192 232,185 226,180 C 234,172 243,167 252,168 Z',
  }),
  // الذراع — أنثى (أرفق وأقرب للجذع)
  S({
    id: 'fig-arm-f',
    kind: 'p a t h',
    organId: 'skin',
    sex: 'female',
    grad: 'g-skin',
    mirror: true,
    transform: 'translate(9.9,0) scale(0.945,1)',
    d: 'M 252,168 C 264,170 274,177 277,188 C 280,202 279,220 277,238 C 274,262 271,290 270,318 C 269,336 270,348 269,358 C 267,382 264,410 260,436 C 257,456 252,472 248,486 C 245,490 241,492 238,492 C 235,492 232,490 231,486 C 232,470 234,452 236,432 C 238,410 239,388 240,368 C 240,360 240,354 241,348 C 241,332 241,316 242,298 C 243,276 243,254 243,234 C 243,220 242,208 240,200 C 237,192 232,185 226,180 C 234,172 243,167 252,168 Z',
  }),
  // اليد (موضع تشريحي: الأصابع نحو منتصف الفخذ)
  S({
    id: 'fig-hand-l',
    kind: 'p a t h',
    organId: 'skin',
    grad: 'g-skin',
    mirror: true,
    d: 'M 231,486 C 229,500 228,516 229,532 C 230,545 233,554 238,556 C 243,557 247,551 247,540 C 247,526 246,510 245,496 C 244,490 242,486 238,485 C 235,484 232,484 231,486 Z',
  }),
  S({
    id: 'fig-hand-lines-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.1,
    organId: 'skin',
    fillVar: '--chest-line',
    op: 0.5,
    mirror: true,
    d: 'M 236,548 C 236,536 236,524 236,512 M 241,546 C 241,535 241,524 241,514',
  }),
  // الساق — ذكر (فخذ قوي، سمانة، كاحل، قدم)
  S({
    id: 'fig-leg-l',
    kind: 'p a t h',
    organId: 'skin',
    sex: 'male',
    grad: 'g-skin',
    mirror: true,
    d: 'M 197,449 C 200,480 205,512 210,545 C 212,570 213,592 214,612 C 214,634 217,660 220,686 C 221,702 221,716 221,726 C 230,724 236,724 242,727 C 242,716 243,702 244,690 C 246,670 248,650 247,632 C 246,622 245,616 244,610 C 245,590 247,566 248,542 C 249,520 250,496 250,474 C 250,460 249,452 246,447 C 236,444 224,443 214,445 C 208,446 202,447 197,449 Z',
  }),
  // الساق — أنثى (فخذ أوسع، سمانة أنحف)
  S({
    id: 'fig-leg-f',
    kind: 'p a t h',
    organId: 'skin',
    sex: 'female',
    grad: 'g-skin',
    mirror: true,
    d: 'M 198,450 C 201,482 206,514 211,547 C 213,572 214,594 215,614 C 215,636 218,662 221,688 C 222,704 222,718 222,728 C 231,726 237,726 242,728 C 242,716 243,702 244,688 C 246,668 248,648 247,630 C 246,620 245,614 244,608 C 245,588 247,564 248,540 C 249,518 251,494 251,472 C 251,458 250,450 246,445 C 236,442 224,441 214,443 C 208,444 202,446 198,450 Z',
  }),
  // القدم
  S({
    id: 'fig-foot-l',
    kind: 'p a t h',
    organId: 'skin',
    grad: 'g-skin',
    mirror: true,
    d: 'M 221,726 C 220,734 219,741 220,746 C 221,751 225,753 230,753 C 235,753 240,750 242,745 C 243,740 243,733 242,727 C 235,731 228,731 221,726 Z',
  }),
  S({
    id: 'fig-toe-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.1,
    organId: 'skin',
    fillVar: '--chest-line',
    op: 0.5,
    mirror: true,
    d: 'M 224,745 C 229,748 235,748 239,744',
  }),
  // السرة
  S({
    id: 'fig-navel',
    kind: 'ellipse',
    strokeOnly: true,
    sw: 1.6,
    organId: 'skin',
    fillVar: '--chest-line',
    op: 0.6,
    cx: 180,
    cy: 388,
    rx: 2.6,
    ry: 3.4,
  }),
  // ================= تظليل 2.5D =================
  // حواف أسطوانية للجذع (تدرج g-edge على نفس المسار)
  S({
    id: 'fig-shade-torso-m',
    kind: 'p a t h',
    organId: 'skin',
    sex: 'male',
    grad: 'g-edge',
    noStroke: true,
    d: 'M 180,150 C 190,150 201,152 211,156 C 226,160 242,164 254,170 C 259,175 262,182 262,190 C 263,204 262,220 260,236 C 258,254 255,270 252,284 C 249,298 245,314 241,330 C 238,344 236,356 237,368 C 239,380 243,392 247,404 C 250,414 252,424 251,433 C 250,441 246,447 239,451 C 228,457 214,459 204,457 C 196,455 187,450 180,447 Z',
  }),
  S({
    id: 'fig-shade-torso-f',
    kind: 'p a t h',
    organId: 'skin',
    sex: 'female',
    grad: 'g-edge',
    noStroke: true,
    d: 'M 180,150 C 189,150 198,152 207,155 C 220,159 233,163 245,168 C 251,173 254,180 254,188 C 255,202 254,218 252,234 C 250,252 247,268 244,282 C 241,296 237,312 234,328 C 231,342 229,354 230,366 C 232,378 237,390 242,402 C 246,412 250,422 252,431 C 252,440 248,447 240,452 C 229,458 216,460 207,458 C 198,456 188,451 180,448 Z',
  }),
  // حواف أسطوانية للذراع
  S({
    id: 'fig-shade-arm-l',
    kind: 'p a t h',
    organId: 'skin',
    grad: 'g-edge',
    noStroke: true,
    mirror: true,
    d: 'M 252,168 C 264,170 274,177 277,188 C 280,202 279,220 277,238 C 274,262 271,290 270,318 C 269,336 270,348 269,358 C 267,382 264,410 260,436 C 257,456 252,472 248,486 C 245,490 241,492 238,492 C 235,492 232,490 231,486 C 232,470 234,452 236,432 C 238,410 239,388 240,368 C 240,360 240,354 241,348 C 241,332 241,316 242,298 C 243,276 243,254 243,234 C 243,220 242,208 240,200 C 237,192 232,185 226,180 C 234,172 243,167 252,168 Z',
  }),
  // حواف أسطوانية للساق
  S({
    id: 'fig-shade-leg-l',
    kind: 'p a t h',
    organId: 'skin',
    grad: 'g-edge',
    noStroke: true,
    mirror: true,
    d: 'M 197,449 C 200,480 205,512 210,545 C 212,570 213,592 214,612 C 214,634 217,660 220,686 C 221,702 221,716 221,726 C 230,724 236,724 242,727 C 242,716 243,702 244,690 C 246,670 248,650 247,632 C 246,622 245,616 244,610 C 245,590 247,566 248,542 C 249,520 250,496 250,474 C 250,460 249,452 246,447 C 236,444 224,443 214,445 C 208,446 202,447 197,449 Z',
  }),
  // إضاءة علوية: الرأس والصدر
  S({
    id: 'fig-glow-head',
    kind: 'ellipse',
    organId: 'skin',
    grad: 'g-glow',
    noStroke: true,
    op: 0.55,
    cx: 180,
    cy: 52,
    rx: 33,
    ry: 24,
  }),
  S({
    id: 'fig-glow-chest-m',
    kind: 'ellipse',
    organId: 'skin',
    sex: 'male',
    grad: 'g-glow',
    noStroke: true,
    op: 0.4,
    cx: 180,
    cy: 202,
    rx: 52,
    ry: 44,
  }),
  S({
    id: 'fig-glow-chest-f',
    kind: 'ellipse',
    organId: 'skin',
    sex: 'female',
    grad: 'g-glow',
    noStroke: true,
    op: 0.35,
    cx: 180,
    cy: 196,
    rx: 44,
    ry: 38,
  }),
  // ظل تحت الذقن
  S({
    id: 'fig-neck-shadow',
    kind: 'ellipse',
    organId: 'skin',
    fillVar: '--edge-shade',
    noStroke: true,
    op: 0.5,
    cx: 180,
    cy: 154,
    rx: 21,
    ry: 6.5,
  }),
  // ظل الإبط
  S({
    id: 'fig-armpit-l',
    kind: 'p a t h',
    organId: 'skin',
    fillVar: '--edge-shade',
    noStroke: true,
    op: 0.45,
    mirror: true,
    d: 'M 237,196 C 241,202 243,210 242,219 C 239,213 236,205 237,196 Z',
  }),
]

/* ============ الأنسجة السطحية (soft) — حجوم 2.5D ============ */
const SOFT: ShapeDef[] = [
  S({
    id: 'soft-chest',
    kind: 'ellipse',
    grad: 'g-soft',
    noStroke: true,
    op: 0.4,
    cx: 180,
    cy: 224,
    rx: 52,
    ry: 46,
  }),
  S({
    id: 'soft-abdomen',
    kind: 'ellipse',
    grad: 'g-soft',
    noStroke: true,
    op: 0.32,
    cx: 180,
    cy: 342,
    rx: 46,
    ry: 60,
  }),
]

/* ============ الهيكل العظمي (bones) — هيكل عظمي كامل v4 ============ */
/** جسم فقري (مستطيل مدوّر الأركان). */
const vert = (x: number, y: number, w: number, h: number, r = 1.8): string =>
  `M ${x} ${y} h ${+(w - 2 * r).toFixed(1)} a ${r} ${r} 0 0 1 ${r} ${r} v ${+(h - 2 * r).toFixed(1)} a ${r} ${r} 0 0 1 ${-r} ${r} h ${-(w - 2 * r).toFixed(1)} a ${r} ${r} 0 0 1 ${-r} ${-r} v ${-(h - 2 * r).toFixed(1)} a ${r} ${r} 0 0 1 ${r} ${-r} Z`

const CERVICAL_V = Array.from({ length: 7 }, (_, i) => vert(172, 124 + i * 5.0, 16, 4.4, 1.6)).join(' ')
const THORACIC_V = Array.from({ length: 12 }, (_, i) => vert(171, 158 + i * 8.0, 18, 6.0, 1.8)).join(' ')
const LUMBAR_V = Array.from({ length: 5 }, (_, i) => vert(170, 254 + i * 9.6, 20, 7.4, 2)).join(' ')

/** ضلع: ينحني من العمود حول الصدر ليستقر عند القص (الضلعان الأخيران معلّقان). */
const rib = (i: number): string => {
  const y0 = 172 + i * 8.2
  const xw = 238 + i * 1.2
  if (i >= 10) return `M 184 ${y0} C 198 ${y0 - 2} 220 ${y0 + 1} ${xw} ${y0 + 8}`
  return `M 184 ${y0} C 199 ${y0 - 3} 224 ${y0} ${xw} ${y0 + 8} C ${xw + 5} ${y0 + 13} ${xw - 1} ${y0 + 20} ${xw - 11} ${y0 + 23} C ${xw - 24} ${y0 + 26} 200 ${y0 + 25} 184 ${y0 + 22}`
}
const RIBS_L = Array.from({ length: 12 }, (_, i) => rib(i)).join(' ')

/** شوكات عابرة للفقرات (تفاصيل). */
const tick = (y: number, len: number, drop: number) => `M 171 ${y} l ${-len} ${drop} M 189 ${y} l ${len} ${drop}`
const SPINE_TICKS = [
  ...Array.from({ length: 7 }, (_, i) => tick(125.5 + i * 5.0, 5.5, 2.6)),
  ...Array.from({ length: 12 }, (_, i) => tick(160.5 + i * 8.0, 6.5, 3)),
  ...Array.from({ length: 5 }, (_, i) => tick(257 + i * 9.6, 7.5, 3.4)),
].join(' ')

const BONES: ShapeDef[] = [
  // الجمجمة
  S({
    id: 'bone-skull',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.5,
    organId: 'skull',
    fillVar: '--bones-c',
    op: 0.9,
    d: 'M 180,32 C 197,32 208,42 211,57 C 213,69 212,81 208,91 C 205,99 200,106 194,111 C 189,114 184,115 180,115 C 176,115 171,114 166,111 C 160,106 155,99 152,91 C 148,81 147,69 149,57 C 152,42 163,32 180,32 Z M 163,95 C 166,103 172,109 180,111 C 188,109 194,103 197,95 M 169,110 C 171,118 175,123 180,124 C 185,123 189,118 191,110',
  }),
  // الفقرات العنقية
  S({
    id: 'bone-cervical',
    kind: 'p a t h',
    organId: 'spine',
    grad: 'g-bones',
    strokeVar: '--bones-c',
    sw: 0.8,
    d: CERVICAL_V,
  }),
  // الفقرات الصدرية
  S({
    id: 'bone-thoracic',
    kind: 'p a t h',
    organId: 'spine',
    grad: 'g-bones',
    strokeVar: '--bones-c',
    sw: 0.8,
    d: THORACIC_V,
  }),
  // الفقرات القطنية
  S({
    id: 'bone-lumbar',
    kind: 'p a t h',
    organId: 'spine',
    grad: 'g-bones',
    strokeVar: '--bones-c',
    sw: 0.8,
    d: LUMBAR_V,
  }),
  // العجز والذنب
  S({
    id: 'bone-sacrum',
    kind: 'p a t h',
    organId: 'spine',
    grad: 'g-bones',
    strokeVar: '--bones-c',
    sw: 0.8,
    d: 'M 168,304 C 172,302 188,302 192,304 C 191,318 187,334 180,346 C 173,334 169,318 168,304 Z M 176,349 L 184,349 L 180,358 Z',
  }),
  // الشوكات (تفاصيل)
  S({
    id: 'bone-spine-ticks',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'spine',
    fillVar: '--bones-c',
    op: 0.75,
    d: SPINE_TICKS,
  }),
  // الضلوع (12 زوجًا)
  S({
    id: 'bone-ribs',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.6,
    organId: 'ribs',
    fillVar: '--bones-c',
    op: 0.85,
    mirror: true,
    d: RIBS_L,
  }),
  // القص
  S({
    id: 'bone-sternum',
    kind: 'p a t h',
    organId: 'ribs',
    grad: 'g-bones',
    strokeVar: '--bones-c',
    sw: 0.8,
    d: 'M 176,174 C 176,198 176,224 177,248 C 177,258 179,264 180,266 C 181,264 183,258 183,248 C 184,224 184,198 184,174 Z',
  }),
  // الترقوة
  S({
    id: 'bone-clavicle-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.8,
    organId: 'clavicle',
    fillVar: '--bones-c',
    op: 0.9,
    mirror: true,
    d: 'M 184,176 C 198,169 220,164 240,166 C 250,167 257,171 261,176',
  }),
  // لوح الكتف (إشارة خفيفة)
  S({
    id: 'bone-scapula-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    organId: 'armbones',
    fillVar: '--bones-c',
    op: 0.5,
    mirror: true,
    d: 'M 254,180 C 261,186 264,196 263,206',
  }),
  // الحوض — ذكر (ضيق، زاوية العانة حادة)
  S({
    id: 'bone-pelvis-m',
    kind: 'p a t h',
    organId: 'pelvis',
    sex: 'male',
    grad: 'g-bones',
    strokeVar: '--bones-c',
    sw: 0.8,
    mirror: true,
    d: 'M 182,306 C 196,310 213,318 226,332 C 236,342 242,354 244,366 C 245,377 242,387 235,393 C 228,398 220,397 216,390 C 212,383 212,374 214,364 C 211,355 205,347 197,341 C 189,335 183,328 181,320 C 180,315 181,309 182,306 Z M 237.5,410 A 6.5,6.5 0 1 1 224.5,410 A 6.5,6.5 0 1 1 237.5,410 Z M 182,434 C 192,427 204,423 216,425 C 224,427 229,433 229,439 C 229,445 223,449 215,448 C 203,447 191,445 182,442 Z',
  }),
  // الحوض — أنثى (أوسع، زاوية العانة واسعة)
  S({
    id: 'bone-pelvis-f',
    kind: 'p a t h',
    organId: 'pelvis',
    sex: 'female',
    grad: 'g-bones',
    strokeVar: '--bones-c',
    sw: 0.8,
    mirror: true,
    d: 'M 182,306 C 197,310 216,319 231,333 C 241,343 248,355 250,368 C 251,380 247,390 239,395 C 231,399 223,397 219,390 C 215,383 214,374 216,364 C 213,354 206,346 198,340 C 189,334 183,327 181,319 C 180,314 181,309 182,306 Z M 240.5,410 A 6.5,6.5 0 1 1 227.5,410 A 6.5,6.5 0 1 1 240.5,410 Z M 182,434 C 193,426 206,422 219,424 C 228,426 234,432 234,439 C 234,446 227,450 218,449 C 205,448 192,445 182,442 Z',
  }),
  // عظم الفخذ
  S({
    id: 'bone-femur-l',
    kind: 'p a t h',
    organId: 'femur',
    grad: 'g-bones',
    strokeVar: '--bones-c',
    sw: 0.8,
    mirror: true,
    d: 'M 222,410 C 228,404 238,407 239,415 C 240,424 237,432 235,440 C 232,470 230,500 229,530 C 228,560 228,585 229,600 C 230,607 227,611 223,611 C 219,611 217,607 218,600 C 218,585 218,560 219,530 C 220,500 221,470 222,440 C 221,432 221,422 222,410 Z',
  }),
  // الرضفة
  S({
    id: 'bone-patella-l',
    kind: 'p a t h',
    organId: 'joints',
    grad: 'g-bones',
    strokeVar: '--bones-c',
    sw: 0.8,
    mirror: true,
    d: 'M 221,618 C 225,615 231,615 234,618 C 235,622 234,627 228,628 C 222,627 220,622 221,618 Z',
  }),
  // الظنبوب
  S({
    id: 'bone-tibia-l',
    kind: 'p a t h',
    organId: 'legbones',
    grad: 'g-bones',
    strokeVar: '--bones-c',
    sw: 0.8,
    mirror: true,
    d: 'M 222,634 C 227,632 231,635 231,642 C 231,664 230,692 229,720 C 229,726 227,729 224,729 C 221,729 220,726 220,720 C 220,692 221,664 222,642 C 221,638 221,635 222,634 Z',
  }),
  // الشظية
  S({
    id: 'bone-fibula-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.4,
    organId: 'legbones',
    fillVar: '--bones-c',
    op: 0.8,
    mirror: true,
    d: 'M 234,644 C 235,672 234,700 232,724',
  }),
  // عظم العضد
  S({
    id: 'bone-humerus-l',
    kind: 'p a t h',
    organId: 'armbones',
    grad: 'g-bones',
    strokeVar: '--bones-c',
    sw: 0.8,
    mirror: true,
    d: 'M 258,188 C 264,186 268,190 268,197 C 268,204 266,210 265,218 C 263,244 261,272 260,300 C 259,320 259,334 259,342 C 259,348 256,351 253,351 C 250,351 248,348 248,342 C 248,334 249,320 250,300 C 252,272 254,244 255,218 C 255,210 256,195 258,188 Z',
  }),
  // الكعبري والزند
  S({
    id: 'bone-forearm-l',
    kind: 'p a t h',
    organId: 'armbones',
    grad: 'g-bones',
    strokeVar: '--bones-c',
    sw: 0.8,
    mirror: true,
    d: 'M 254,356 C 259,355 262,359 261,366 C 259,384 256,406 253,428 C 251,444 249,458 247,468 C 246,473 243,475 240,474 C 237,473 236,469 237,464 C 239,448 241,428 243,408 C 245,390 248,372 251,360 C 252,358 253,356 254,356 Z',
  }),
  // عظام اليد (تبسيط)
  S({
    id: 'bone-hand-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    organId: 'armbones',
    fillVar: '--bones-c',
    op: 0.6,
    mirror: true,
    d: 'M 241,506 C 242,518 242,530 241,540 M 246,505 C 247,517 247,528 246,538 M 236,508 C 236,518 236,528 237,536',
  }),
  // عظام القدم (تبسيط)
  S({
    id: 'bone-foot-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.1,
    organId: 'legbones',
    fillVar: '--bones-c',
    op: 0.55,
    mirror: true,
    d: 'M 224,734 C 228,738 234,739 239,736 M 225,742 C 229,745 234,745 238,742',
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
    d: 'M 173.3,62 C 171.4,69 171.4,77 173.3,83 M 186.7,62 C 188.6,69 188.6,77 186.7,83 M 177.1,64 C 176.6,71 176.6,78 177.1,84 M 182.9,64 C 183.4,71 183.4,78 182.9,84',
  }),
  // البلعوم: قناة خلف الفم
  S({
    id: 'res-pharynx',
    kind: 'p a t h',
    organId: 'pharynx',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    sw: 1.2,
    d: 'M 176.2,93 L 183.8,93 C 184.3,102 183.8,111 183.4,118 L 176.6,118 C 176.2,111 175.7,102 176.2,93 Z',
  }),
  // الحنجرة
  S({
    id: 'res-larynx',
    kind: 'p a t h',
    organId: 'larynx',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    sw: 1.2,
    d: 'M 173.3,110 C 176.2,106.5 183.8,106.5 186.7,110 C 185.8,116 183.8,120.5 180,121.5 C 176.2,120.5 174.2,116 173.3,110 Z',
  }),
  // القصبة الهوائية مع حلقاتها الغضروفية
  S({
    id: 'res-trachea',
    kind: 'p a t h',
    organId: 'trachea',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    sw: 1.3,
    d: 'M 177.1,121 L 182.9,121 C 183.3,134 183.3,148 183.3,161 L 176.7,161 C 176.7,148 176.7,134 177.1,121 Z',
  }),
  S({
    id: 'res-trachea-rings',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 0.9,
    fillVar: '--respiratory-c',
    op: 0.75,
    d: 'M 177.3,126 L 182.7,126 M 177.3,132 L 182.7,132 M 177.3,138 L 182.7,138 M 177.3,144 L 182.7,144 M 177.3,150 L 182.7,150 M 176.9,156 L 183.1,156',
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
    d: 'M 180,162 C 173.4,167 164.6,173 158,180 M 170.1,172 C 164.6,177 159.1,182 154.7,187',
  }),
  // الرئة اليمنى (3 فصوص) — أعلى من الترقوة تقريبًا
  S({
    id: 'res-lung-r',
    kind: 'p a t h',
    organId: 'lungs',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    sw: 1.4,
    d: 'M 148.1,156 C 138.2,160 130.5,170 127.2,184 C 123.9,202 123.9,224 127.2,244 C 129.4,258 136,268 147,272 C 158,276 169,274 173.4,266 C 176.7,258 177.8,246 177.8,232 C 177.8,212 175.6,190 171.2,174 C 167.9,163 161.6,155 148.1,156 Z',
  }),
  // الرئة اليسرى (فصان + نتوء قلبي)
  S({
    id: 'res-lung-l',
    kind: 'p a t h',
    organId: 'lungs',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    sw: 1.4,
    d: 'M 211.9,156 C 221.8,160 229.5,170 232.8,184 C 236.1,202 236.1,224 232.8,244 C 230.6,258 224,268 213,272 C 202,276 192.1,274 187.7,266 C 184.4,259 183.3,250 184.4,242 C 185.5,234 189.9,228 194.3,224 C 197.6,219 198.7,210 197.6,200 C 196.5,186 194.3,170 196.5,164 C 198.7,158 202.3,155 211.9,156 Z',
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
    d: 'M 173.4,190 C 162.4,208 149.2,228 136,248 M 171.2,222 C 161.3,224 149.2,226 138.2,228',
  }),
  S({
    id: 'res-fissure-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.3,
    organId: 'lungs',
    fillVar: '--respiratory-c',
    op: 0.85,
    d: 'M 186.6,192 C 197.6,210 210.8,230 224,248',
  }),
  // حويصلات هوائية (تفصيل)
  S({    id: 'res-alveoli',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'alveoli',
    fillVar: '--respiratory-c',
    d: 'M 164.6 196 c -2.2 -2 -4.4 -1 -4.4 1 c 0 2 2.2 3 4.4 2 c 2.2 1 4.4 0 4.4 -2 c 0 -2 -2.2 -3 -4.4 -1 Z M 169 206 c -2.2 -2 -4.4 -1 -4.4 1 c 0 2 2.2 3 4.4 2 c 2.2 1 4.4 0 4.4 -2 c 0 -2 -2.2 -3 -4.4 -1 Z M 195.4 198 c -2.2 -2 -4.4 -1 -4.4 1 c 0 2 2.2 3 4.4 2 c 2.2 1 4.4 0 4.4 -2 c 0 -2 -2.2 -3 -4.4 -1 Z M 199.8 208 c -2.2 -2 -4.4 -1 -4.4 1 c 0 2 2.2 3 4.4 2 c 2.2 1 4.4 0 4.4 -2 c 0 -2 -2.2 -3 -4.4 -1 Z',
  }),
  // الحجاب الحاجز: قبة تحت القاع
  S({
    id: 'res-diaphragm',
    kind: 'p a t h',
    organId: 'diaphragm',
    grad: 'g-respiratory',
    strokeVar: '--respiratory-c',
    op: 0.8,
    d: 'M 130.1,293.5 C 149.2,278 169,272 180,272 C 191,272 210.8,278 229.9,293.5 C 209.1,288 191,285 180,285 C 169,285 150.9,288 130.1,293.5 Z',
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
    d: 'M 167.5,95 C 174.2,99 185.8,99 192.5,95',
  }),
  S({    id: 'dig-teeth',
    kind: 'p a t h',
    organId: 'teeth',
    fillVar: '--teeth',
    d: 'M 168.5 99 h 3.8 v 5 h -3.8 Z M 173.3 100 h 3.8 v 5 h -3.8 Z M 178.1 100 h 3.8 v 5 h -3.8 Z M 182.9 100 h 3.8 v 5 h -3.8 Z M 187.7 99 h 3.8 v 5 h -3.8 Z M 169.4 105 h 3.4 v 4.5 h -3.4 Z M 174.2 106 h 3.4 v 4.5 h -3.4 Z M 179 106 h 3.4 v 4.5 h -3.4 Z M 183.8 106 h 3.4 v 4.5 h -3.4 Z M 188.6 105 h 3.4 v 4.5 h -3.4 Z',
  }),
  S({
    id: 'dig-tongue',
    kind: 'p a t h',
    organId: 'tongue',
    fillVar: '--tongue',
    strokeVar: '--tongue-b',
    sw: 0.8,
    d: 'M 172.3,100 C 176.2,106 183.8,106 187.7,100 C 185.8,98 181.9,97 180,97 C 178.1,97 174.2,98 172.3,100 Z',
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
    d: 'M 157.9,88 C 154.1,86 150.2,88 149.3,92 C 148.3,96 151.2,99 155,99 C 158.9,99 160.8,95 159.8,91 Z',
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
    d: 'M 178.1,119 C 177.1,142 176.7,165 177.8,188 C 178.9,210 180,232 182.2,252 C 183.3,258 183.3,262 183.3,266',
  }),
  // الكبد: مثلث مائل، الفص الأيمن هو الأكبر (يمين الشخص = يسار الشاشة)
  S({
    id: 'dig-liver',
    kind: 'p a t h',
    organId: 'liver',
    fillVar: '--liver',
    strokeVar: '--liver-b',
    sw: 1.5,
    d: 'M 136,272 C 147,265 163.5,263 177.8,265 C 188.8,267 198.7,272 204.2,279 C 208.6,285 208.1,294.8 205,305.7 C 201.8,316.7 193.5,323.5 184.2,324.9 C 171.7,326.2 159.2,322.1 149.8,313.9 C 141.5,305.7 136.3,292.1 133.8,282 C 133.8,277 134.9,274 136,272 Z',
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
    d: 'M 184.4,266 C 183.3,282 183.1,303 184.2,323.5 M 145.7,288 C 150.3,284 158,282 165.7,282 M 203.1,286 C 197.7,289.4 194.6,294.8 192.5,301.7',
  }),
  // المرارة: كم أسفل الكبد
  S({
    id: 'dig-gallbladder',
    kind: 'p a t h',
    organId: 'gallbladder',
    fillVar: '--gall',
    strokeVar: '--gall-b',
    sw: 1,
    d: 'M 174.8,319.4 C 170.6,318 167.5,322.1 167.5,329 C 167.5,337.1 170.6,344 175.8,345.3 C 180,342.6 183.1,334.4 182.1,326.2 C 181,320.8 179,319.4 174.8,319.4 Z',
  }),
  // المعدة: شكل حرف J — القاع يسارًا والمبايض (البواب) يمينًا أسفل
  S({
    id: 'dig-stomach',
    kind: 'p a t h',
    organId: 'stomach',
    grad: 'g-digestive',
    strokeVar: '--digestive-c',
    sw: 1.5,
    d: 'M 183.3,265 C 193.2,263 202,268 205.3,277 C 207,289.4 205,308.5 197.7,322.1 C 191.4,333.1 181,338.5 170.6,335.8 C 164.4,333.1 160.2,324.9 162.3,315.3 C 165.4,305.7 169.6,296.2 172.3,287 C 175.6,279 178.9,270 183.3,265 Z',
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
    d: 'M 197.6,279 C 199.8,289.4 197.7,305.7 191.4,316.7 M 189.9,281 C 193.5,292.1 191.4,308.5 185.2,319.4 M 182.2,284 C 186.2,294.8 185.2,308.5 180,316.7',
  }),
  // البنكرياس: رأسه يمينًا وذيله نحو الطحال
  S({
    id: 'dig-pancreas',
    kind: 'p a t h',
    organId: 'pancreas',
    fillVar: '--pancreas',
    strokeVar: '--pancreas-b',
    sw: 1.3,
    d: 'M 169.6,292.1 C 175.8,288 183.1,288 190.4,290.7 C 198.7,293.5 207,297.6 213.3,301.7 C 217.4,304.4 217.4,309.8 213.3,311.2 C 205,308.5 196.6,307.1 188.3,308.5 C 181,309.8 173.8,311.2 168.6,309.8 C 164.4,308.5 164.4,297.6 169.6,292.1 Z',
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
    d: 'M 145.7,424.5 C 142.6,394.5 141.5,364.5 143.6,339.9 C 144.6,327.6 148.8,319.4 157.1,319.4 C 171.7,324.9 188.3,327.6 200.8,322.1 C 209.1,318 213.3,309.8 214.3,298.9 C 215.4,329 215.4,359 213.3,380.8 C 211.2,408.1 205,423.2 195.6,430 C 189.4,434.1 185.2,436.8 182.1,439.5',
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
    d: 'M 141.5,353.5 L 149.8,353.5 M 141.5,369.9 L 149.8,369.9 M 142.6,386.3 L 150.9,386.3 M 143.6,402.7 L 151.9,402.7 M 163.4,319.4 L 163.4,330.3 M 173.8,322.1 L 173.8,333.1 M 184.2,323.5 L 184.2,334.4 M 194.6,323.5 L 194.6,334.4 M 210.2,326.2 L 218.5,326.2 M 210.2,345.3 L 218.5,345.3 M 209.1,364.5 L 217.4,364.5 M 208.1,383.6 L 216.4,383.6 M 207,402.7 L 214.3,402.7',
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
    d: 'M 155,339.9 C 148.8,348.1 149.8,359 157.1,363.1 C 167.5,368.5 182.1,365.8 190.4,359 C 197.7,352.2 196.6,341.2 189.4,337.1 M 154,371.3 C 147.8,379.5 148.8,390.4 156.1,394.5 C 166.5,399.9 181,397.2 189.4,390.4 C 196.6,383.6 195.6,372.6 188.3,368.5 M 156.1,402.7 C 149.8,410.9 150.9,421.8 158.2,425.9 C 168.6,431.3 183.1,428.6 191.4,421.8 C 197.7,415 196.6,405.4 190.4,401.3 M 157.1,431.3 C 153,436.8 153,442.3 156.1,445 C 165.2,446.3 177.7,445.9 185.2,442.3 C 190.4,438.2 189.4,431.3 185.2,428.6 M 189.4,337.1 C 192.5,345.3 192.5,356.3 189.4,364.5 M 188.3,368.5 C 191.4,376.7 191.4,386.3 189.4,394.5 M 190.4,401.3 C 192.5,409.5 192.5,419.1 189.4,427.3 M 185.2,428.6 C 187.3,434.1 187.3,439.5 185.2,442.3',
  }),
  // المستقيم
  S({
    id: 'dig-rectum',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 5,
    organId: 'rectum',
    fillVar: '--digestive-c',
    d: 'M 181,439.5 C 180,445.9 178.9,448.6 177.7,450.4',
  }),
  // الزائدة الدودية
  S({
    id: 'dig-appendix',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.5,
    organId: 'appendix',
    fillVar: '--digestive-b',
    d: 'M 144.6,428.6 C 142.6,436.8 137.8,445 139,447.7',
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
    d: 'M 186,191 C 176.4,189 166.8,193 161.3,200 C 156.9,210 158,221 164,231 C 169,238 178.9,243 186.6,243 C 194.3,242 199.2,235 200.9,227 C 203.6,218 202.6,205 197.6,197 C 194.3,192 189.9,191 186,191 Z',
  }),
  // الأذينان (الجزء العلوي)
  S({
    id: 'cir-atria',
    kind: 'p a t h',
    organId: 'heart',
    grad: 'g-circulatory',
    op: 0.85,
    d: 'M 164.6,208 C 162.4,201 166.8,195 173.4,193 C 180,191 186.6,191 192.1,194 C 197.6,196 199.8,201 198.7,207 C 193.2,211 185.5,212 177.8,211 C 172.8,211 168.4,210 164.6,208 Z',
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
    d: 'M 159.6,213 C 169,219 186.6,219 199.8,211 M 181.6,215 C 183.3,224 186,234 188.8,241 M 171.2,220 C 175.6,227 182.2,233 190.4,237 M 164,216 C 166.8,223 171.2,230 176.7,235',
  }),
  // قوس الأبهر
  S({
    id: 'cir-aortic-arch',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 5,
    organId: 'aorta',
    tone: 'art',
    d: 'M 175.6,192 C 172.3,182 175.6,172 183.3,168 C 191,164 197.6,168 197.6,176 C 197.6,184 194.3,190 191,196',
  }),
  // جذع الشريان الرئوي
  S({
    id: 'cir-pulm-trunk',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4.5,
    organId: 'pulmonaryartery',
    tone: 'ven',
    d: 'M 182.2,192 C 182.2,186 184.4,180 188.8,176',
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
    d: 'M 191,196 C 189.9,208 188.8,230 187.7,255 C 186.6,282 185.2,318 184.2,352.2 C 183.6,361.7 183.1,368.5 183.1,374 M 183.1,374 C 179,393.1 173.8,409.5 169.6,428.6 C 164,445.9 161.8,454.9 160.6,463.8 C 160,466.9 159.5,469.6 159.5,471.4 M 183.1,374 C 187.3,393.1 192.5,409.5 196.6,428.6 C 202.8,445.9 205.1,454.9 206.2,463.8 C 206.2,466.9 205.1,469.6 203.9,471.4',
  }),
  // الوريد الأجوف العلوي
  S({
    id: 'vas-svc',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4,
    organId: 'venacava',
    tone: 'ven',
    d: 'M 160.6,150 C 156.9,166 158,182 162.4,197',
  }),
  // الوريد الأجوف السفلي
  S({
    id: 'vas-ivc',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4,
    organId: 'venacava',
    tone: 'ven',
    d: 'M 167.5,372.6 C 167.5,334.4 166.5,296.2 164.6,266 C 163.5,240 162.4,222 162.4,206',
  }),
  // الأوردة الحرقفية
  S({
    id: 'vas-iliac-v',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3.2,
    organId: 'veins',
    tone: 'ven',
    d: 'M 170.6,374 C 166.5,393.1 161.3,409.5 157.1,428.6 C 150.4,445.9 148.1,454.9 146.9,463.8 C 146.9,466.9 146.9,469.6 146.9,471.9 M 170.6,374 C 174.8,393.1 180,409.5 184.2,428.6 C 189.1,445.9 191.4,454.9 192.5,463.8 C 192.5,466.9 192.5,469.6 192.5,471.9',
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
    d: 'M 186.6,173 C 180,167 171.2,163 162.4,164 C 154.7,165 148.1,169 143.7,175',
  }),
  // الشريان التاجي (تغذية القلب)
  S({
    id: 'vas-coronary',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.4,
    organId: 'arteries',
    tone: 'art',
    d: 'M 170.1,218 C 175.6,227 184.4,235 194.3,241 M 161.3,214 C 164.6,223 170.1,231 177.8,237',
  }),
  // الشرايين الدوية (حول الدماغ)
  S({
    id: 'vas-cerebral',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    organId: 'arteries',
    tone: 'art',
    d: 'M 172.3,50 C 174.2,43 185.8,43 187.7,50 M 174.2,49 C 170.4,57 168.5,65 169.4,73 M 185.8,49 C 189.6,57 191.5,65 190.6,73 M 176.2,45 L 176.2,40 M 183.8,45 L 183.8,40',
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
    d: 'M 175.6,166 C 173.2,152 171.3,138 171.3,124 C 171.4,110 173.3,98 176.2,90',
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
    d: 'M 183.8,90 C 181.9,104 181,118 181,132 C 181,146 181.1,158 180,167',
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
    d: 'M 183.3,166 C 194.3,161 207.5,158 220.7,158 C 230.6,158 238.3,160 243.8,164',
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
    d: 'M 241.6,164 C 250.4,196 251.5,236 248.2,276 C 242.4,320.8 240.3,369.9 239.3,413.6 C 238.8,421.8 238.2,430 237.2,438.2',
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
    d: 'M 246,168 C 252.6,200 253.7,240 250.4,280 C 244.5,326.2 242.4,375.4 241.4,416.3 C 240.8,424.5 240.3,432.7 239.3,440.9',
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
    d: 'M 186.2,289.4 C 177.9,288 169.6,288 161.3,289.4',
  }),
  // الشريان المعوي (تغذية الأمعاء)
  S({
    id: 'vas-mes-artery',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    organId: 'arteries',
    tone: 'art',
    d: 'M 185.2,315.3 C 183.1,329 181,342.6 180,356.3 M 184.2,318 C 186.2,331.7 187.3,345.3 186.2,359 M 185.2,320.8 C 182.1,331.7 177.9,342.6 174.8,350.8',
  }),
  // الشريان الكبدي
  S({
    id: 'vas-hepatic',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    organId: 'arteries',
    tone: 'art',
    d: 'M 185.2,304.4 C 181,307.1 176.9,309.8 172.7,312.6',
  }),
  // الوريد البابي (من الأمعاء إلى الكبد)
  S({
    id: 'vas-portal',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'veins',
    tone: 'ven',
    d: 'M 171.7,361.7 C 169.6,350.8 169.6,337.1 171.7,323.5',
  }),
  // الأوردة الدماغية
  S({
    id: 'vas-cerebral-v',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    organId: 'veins',
    tone: 'ven',
    d: 'M 176.2,53 C 174.2,47 185.8,47 183.8,53 M 175.2,56 C 172.3,64 171.4,72 172.3,80 M 184.8,56 C 187.7,64 188.6,72 187.7,80',
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
    d: 'M 203.9,471.4 C 203.9,509.5 201.7,554.7 199.4,595.6 C 197.1,631.3 196,665.9 197.1,694.4 C 197.7,708.7 199.4,718.8 201.7,727',
  }),
  S({
    id: 'vas-leg-v-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3,
    organId: 'veins',
    mirror: true,
    tone: 'ven',
    d: 'M 192.5,471.9 C 192.5,512.7 190.3,559 189.1,598.8 C 188,634.3 188,669 189.1,697.5 C 189.7,711.7 191.4,721.9 193.7,728.8',
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
    d: 'M 240.4,445.4 C 239.3,449 240.4,452.6 242.7,455.3 M 242.4,443.6 C 248.4,448.1 248.4,451.7 247.3,454.4 M 255.2,445.4 C 256.4,448.6 256.4,451.7 255.2,454.4',
  }),
  S({
    id: 'vas-cap-foot-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.6,
    organId: 'capillaries',
    mirror: true,
    tone: 'art',
    d: 'M 198.2,731.9 C 197.1,737.3 197.1,742.7 199.4,747.4 M 205.1,730.3 C 205.1,735.7 205.1,741.2 203.9,745.8 M 211.9,730.3 C 211.9,735 211.9,739.6 210.8,744.3',
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
    d: 'M 144.8,261 C 150.3,263 153.6,269 153.6,276 C 153.6,281 151.4,284 148.1,286 C 153,288 155,292.1 155,298.9 C 155,305.7 150.9,311.2 145.7,309.8 C 138.4,308.5 133.2,300.3 132.2,288 C 128.3,277 131.6,266 138.2,262 C 140.4,260 142.6,260 144.8,261 Z',
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
    d: 'M 151.4,276 C 148.1,280 148.1,283 150.3,286 M 153,294.8 C 149.8,298.9 148.8,303 148.8,305.7 M 136,268 C 132.7,273 131.6,279 132.7,285',
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
    d: 'M 150.9,290.7 C 156.1,318 153,348.1 156.1,375.4 C 158.2,394.5 163.4,409.5 169.6,421.8',
  }),
  // المثانة: كمгруш كبير في حوض العظم
  S({
    id: 'uri-bladder',
    kind: 'p a t h',
    organId: 'bladder',
    fillVar: '--bladder',
    strokeVar: '--bladder-b',
    sw: 1.5,
    d: 'M 180,410.9 C 170.6,410.9 163.4,419.1 162.3,430 C 161.3,442.3 165.2,447.7 174.3,449.5 C 177.7,450.4 182.3,450.4 185.7,449.5 C 194.8,447.7 198.7,442.3 197.7,430 C 196.6,419.1 189.4,410.9 180,410.9 Z',
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
    d: 'M 173.2,445.9 L 180,436.8 L 186.8,445.9 Z M 180,436.8 L 180,447.7',
  }),
  // الإحليل
  S({
    id: 'uri-urethra',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'urethra',
    fillVar: '--urinary-b',
    d: 'M 180,450.4 C 180,453.5 180,456.6 180,459.3',
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
    d: 'M 165.2,449 C 158.3,447.7 151.5,448.6 149.2,451.3 C 146.9,454.4 149.2,458 156.1,459.3 C 162.9,460.7 169.7,459.3 172,456.2 C 173.2,453.1 170.9,449.9 165.2,449 Z',
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
    d: 'M 157.2,449.9 C 154.9,453.1 154.9,456.2 158.3,458.4 M 164,449.5 C 162.9,452.6 162.9,455.7 165.2,458',
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
    d: 'M 172,449.5 C 175.4,451.7 175.4,455.7 172,458.4',
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
    d: 'M 173.2,449 C 176.6,445.4 177.9,435.4 177.9,424.5 C 177.9,416.3 177.9,410.9 179,406.8',
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
    d: 'M 167.5,430 C 163.4,427.3 159.2,430 158.2,435.4 C 157.1,442.3 157.2,445.9 161.8,446.3 C 166.3,446.8 169.7,445.4 170.6,440.9 C 170.6,435.4 169.6,431.3 167.5,430 Z',
  }),
  // البروستاتا: حلقة أسفل المثانة
  S({
    id: 'rep-m-prostate',
    kind: 'p a t h',
    organId: 'prostate',
    grad: 'g-reproductive',
    strokeVar: '--reproductive-c',
    sw: 1.2,
    d: 'M 180,451.7 C 173.2,451.7 168.6,453.5 168.6,455.7 C 168.6,458 173.2,459.8 180,459.8 C 186.8,459.8 191.4,458 191.4,455.7 C 191.4,453.5 186.8,451.7 180,451.7 Z M 180,454 C 176.6,454 174.3,454.9 174.3,455.7 C 174.3,456.6 176.6,457.5 180,457.5 C 183.4,457.5 185.7,456.6 185.7,455.7 C 185.7,454.9 183.4,454 180,454 Z',
  }),
  // القضيب: غلاف + ساق
  S({
    id: 'rep-m-penis',
    kind: 'p a t h',
    organId: 'penis',
    grad: 'g-reproductive',
    strokeVar: '--reproductive-c',
    sw: 1.2,
    d: 'M 180,459.8 C 174.3,460.2 170.9,462 170.9,464.3 C 170.9,466 174.3,467.4 180,467.4 C 185.7,467.4 189.1,466 189.1,464.3 C 189.1,462 185.7,460.2 180,459.8 Z M 175.4,466 C 174.9,468.7 175.4,471 177.7,472.3 L 182.3,472.3 C 184.6,471 185.1,468.7 184.6,466 Z',
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
    d: 'M 175.6,202 C 164.6,200 154.7,206 151.4,216 C 148.1,227 153.6,238 164.6,242 C 173.4,245 181.1,240 183.3,232 C 185.5,223 184.4,210 175.6,202 Z',
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
    d: 'M 166.8,222 C 162.4,217 158,212 155.8,207 M 166.8,222 C 163.5,226 159.1,229 155.8,231 M 166.8,222 C 166.8,216 166.8,210 166.8,205 M 166.8,222 C 170.1,227 173.4,230 176.7,232',
  }),
  // الرحم: كمгруш معكوس ضيق
  S({
    id: 'rep-f-uterus',
    kind: 'p a t h',
    organId: 'uterus',
    fillVar: '--uterus',
    strokeVar: '--uterus-b',
    sw: 1.5,
    d: 'M 180,419.1 C 171.7,419.1 165.4,427.3 164.4,438.2 C 161.8,446.3 166.3,449.5 173.2,450.8 L 176.6,451.7 L 183.4,451.7 L 186.8,450.8 C 193.7,449.5 198.2,446.3 195.6,438.2 C 194.6,427.3 188.3,419.1 180,419.1 Z',
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
    d: 'M 180,427.3 C 179.5,438.2 179.4,446.3 180,449.9 M 171.7,430 C 170.6,438.2 169.7,445.4 173.2,447.7 M 188.3,430 C 189.4,438.2 190.3,445.4 186.8,447.7',
  }),
  // عنق الرحم
  S({
    id: 'rep-f-cervix',
    kind: 'p a t h',
    organId: 'cervix',
    fillVar: '--uterus',
    strokeVar: '--uterus-b',
    sw: 1,
    d: 'M 175.4,451.7 C 174.9,454 174.9,456.2 175.4,458 L 184.6,458 C 185.1,456.2 185.1,454 184.6,451.7 C 181.7,452.6 178.3,452.6 175.4,451.7 Z',
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
    d: 'M 180,458.4 C 180,461.6 180,464.7 180,467.4',
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
    d: 'M 155,432.7 C 150.9,430 146.7,432.7 145.7,439.5 C 141.2,445.4 144.7,447.2 149.2,447.2 C 153.8,447.2 157.2,445.4 159.2,440.9 C 159.2,436.8 157.1,434.1 155,432.7 Z',
  }),
  S({    id: 'rep-f-ovary-dot',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.4,
    organId: 'ovaries',
    fillVar: '--reproductive-c',
    op: 0.8,
    mirror: true,
    d: 'M 149.8 438.2 a 1.66 1.66 0 1 0 3.32 0 a 1.66 1.66 0 1 0 -3.32 0 M 153 445 a 1.46 1.46 0 1 0 2.91 0 a 1.46 1.46 0 1 0 -2.91 0',
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
    d: 'M 167.5,424.5 C 162.3,419.1 156.1,417.7 150.9,420.4 C 146.7,423.2 144.6,428.6 143.6,434.1',
  }),
  S({
    id: 'rep-f-fimbriae',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.2,
    organId: 'fallopiantubes',
    fillVar: '--reproductive-b',
    mirror: true,
    d: 'M 143.6,434.1 L 140.5,439.5 M 144.6,430 L 141.5,435.4 M 146.7,425.9 L 143.6,431.3',
  }),
]


/* ============ الجهاز المناعي (immune) — خلايا الدم البيضاء في مجرى الدم ============ */
const IMMUNE: ShapeDef[] = [
  // كريات بيضاء (Leukocytes) على الأوعية الكبرى
  S({ id: 'imm-wbc-1', kind: 'circle', organId: 'leukocytes', cx: 158.6, cy: 170, r: 2.4, fillVar: '--surface', strokeVar: '--lymphatic-c' }),
  S({ id: 'imm-wbc-2', kind: 'circle', organId: 'leukocytes', cx: 183.3, cy: 176, r: 2.4, fillVar: '--surface', strokeVar: '--lymphatic-c' }),
  S({ id: 'imm-wbc-3', kind: 'circle', organId: 'leukocytes', cx: 192.1, cy: 194, r: 2.4, fillVar: '--surface', strokeVar: '--lymphatic-c' }),
  S({ id: 'imm-wbc-4', kind: 'circle', organId: 'leukocytes', cx: 189.9, cy: 226, r: 2.4, fillVar: '--surface', strokeVar: '--lymphatic-c' }),
  S({ id: 'imm-wbc-5', kind: 'circle', organId: 'leukocytes', cx: 188.2, cy: 254, r: 2.4, fillVar: '--surface', strokeVar: '--lymphatic-c' }),
  S({ id: 'imm-wbc-6', kind: 'circle', organId: 'leukocytes', cx: 186.2, cy: 304.4, r: 2.4, fillVar: '--surface', strokeVar: '--lymphatic-c' }),
  S({ id: 'imm-wbc-7', kind: 'circle', organId: 'leukocytes', cx: 165.4, cy: 329, r: 2.4, fillVar: '--surface', strokeVar: '--lymphatic-c' }),
  S({ id: 'imm-wbc-8', kind: 'circle', organId: 'leukocytes', cx: 164.4, cy: 369.9, r: 2.4, fillVar: '--surface', strokeVar: '--lymphatic-c' }),
  S({ id: 'imm-wbc-9', kind: 'circle', organId: 'leukocytes', cx: 180, cy: 380.8, r: 2.4, fillVar: '--surface', strokeVar: '--lymphatic-c' }),
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
    d: 'M 178.9,158 C 171.2,156 163.5,158 160.2,164 C 156.9,170 159.1,178 165.7,181 C 171.2,183 176.7,180 178.9,175 C 181.1,180 186.6,183 192.1,181 C 198.7,178 200.9,170 197.6,164 C 194.3,158 186.6,156 178.9,158 Z',
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
    d: 'M 165.6,104 C 161.8,102 157.9,104 157,108 C 156,112 158.9,115 162.7,115 C 165.6,115 167.5,112 167.5,109 C 167.5,107 166.6,105 165.6,104 Z',
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
    d: 'M 168.4,128 C 165.4,126 161.6,128 160.6,132 C 159.6,136 162.5,139 165.4,139 C 169.3,139 171.3,136 171.3,133 C 171.3,131 169.3,129 168.4,128 Z',
  }),
  S({
    id: 'lym-node-armpit-l',
    kind: 'p a t h',
    organId: 'lymphnodes',
    grad: 'g-lymphatic',
    strokeVar: '--lymphatic-c',
    sw: 1.2,
    mirror: true,
    d: 'M 230.6,196 C 227.3,194 222.9,196 221.8,200 C 220.7,204 224,207 227.3,207 C 231.7,207 233.9,204 233.9,201 C 233.9,199 231.7,197 230.6,196 Z M 236.1,210 C 232.8,208 228.4,210 227.3,214 C 226.2,218 229.5,221 232.8,221 C 237.2,221 239.4,218 239.4,215 C 239.4,213 237.2,211 236.1,210 Z',
  }),
  S({
    id: 'lym-node-groin-l',
    kind: 'p a t h',
    organId: 'lymphnodes',
    grad: 'g-lymphatic',
    strokeVar: '--lymphatic-c',
    sw: 1.2,
    mirror: true,
    d: 'M 209.1,430 C 206,427.3 201.8,430 200.8,435.4 C 199.8,440.9 205.1,445 208.5,445 C 213.1,445 212.2,440.9 212.2,436.8 C 212.2,434.1 210.2,431.3 209.1,430 Z M 218.8,445.4 C 212.2,443.6 210.8,445.4 209.6,447.2 C 208.5,449 211.9,450.4 215.3,450.4 C 219.9,450.4 222.2,449 222.2,447.7 C 222.2,446.8 219.9,445.9 218.8,445.4 Z',
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
    d: 'M 166.4,136 C 168.4,146 171.2,156 176.7,164 M 228.4,206 C 219.6,198 208.6,190 197.6,184 C 188.8,179 180,174 173.4,170 M 207,440.9 C 200.8,430 194.6,419.1 190.4,408.1 C 186.2,397.2 183.1,383.6 182.1,369.9',
  }),
  // الطحال: على يسار الشخص (يمين الشاشة) تحت الأضلاع
  S({
    id: 'lym-spleen',
    kind: 'p a t h',
    organId: 'spleen',
    grad: 'g-lymphatic',
    strokeVar: '--lymphatic-c',
    sw: 1.4,
    d: 'M 207,288 C 217.4,284 224.7,288 228.9,298.9 C 232,309.8 229.9,323.5 222.6,330.3 C 215.4,335.8 207,331.7 203.9,320.8 C 200.8,309.8 201.8,294.8 207,288 Z',
  }),
  S({
    id: 'lym-spleen-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'spleen',
    fillVar: '--lymphatic-c',
    op: 0.8,
    d: 'M 213.3,293.5 C 218.5,298.9 221.6,309.8 221.6,319.4 M 209.1,298.9 C 213.3,304.4 215.4,312.6 215.4,320.8',
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
    d: 'M 180,92 C 176.2,92 173.3,95 174.2,98 C 175.2,101 178.1,102 180,101 C 181.9,102 184.8,101 185.8,98 C 186.7,95 183.8,92 180,92 Z',
  }),
  // الغدة الدرقية: فراشة حول القصبة
  S({
    id: 'end-thyroid',
    kind: 'p a t h',
    organId: 'thyroid',
    grad: 'g-endocrine',
    strokeVar: '--endocrine-c',
    sw: 1.4,
    d: 'M 180,132 C 176.1,130 170.3,130 166.4,134 C 162.5,138 162.5,145 166.4,148 C 170.3,151 176.1,150 179,146 L 181,146 C 183.9,150 189.7,151 193.6,148 C 197.5,145 197.5,138 193.6,134 C 189.7,130 183.9,130 180,132 Z',
  }),
  S({
    id: 'end-thyroid-line',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'thyroid',
    fillVar: '--endocrine-c',
    op: 0.8,
    d: 'M 171.3,134 C 168.4,138 168.4,143 171.3,146 M 188.7,134 C 191.6,138 191.6,143 188.7,146',
  }),
  // الغدود الجار درقية (أربع نقاط)
  S({    id: 'end-parathyroid',
    kind: 'p a t h',
    organId: 'parathyroid',
    grad: 'g-endocrine',
    strokeVar: '--endocrine-c',
    sw: 1,
    mirror: true,
    d: 'M 167.4 136 a 2.13 2.13 0 1 0 4.27 0 a 2.13 2.13 0 1 0 -4.27 0 M 167.4 144 a 2.13 2.13 0 1 0 4.27 0 a 2.13 2.13 0 1 0 -4.27 0',
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
    d: 'M 137.1,257 C 140.4,253 145.9,252 149.2,254 C 152.5,256 153.6,259 151.4,262 C 147,261 141.5,261 137.1,262 C 134.9,260 134.9,258 137.1,257 Z',
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
    d: 'M 180,38 C 192.5,38 202.1,44 205.9,54 C 209.8,64 209.8,76 205.9,84 C 203,90 197.3,93 190.6,92 C 187.7,91 184.8,90 182.9,90 L 177.1,90 C 175.2,90 172.3,91 169.4,92 C 162.7,93 157,90 154.1,84 C 150.2,76 150.2,64 154.1,54 C 157.9,44 167.5,38 180,38 Z',
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
    d: 'M 180,40 L 180,88 M 167.5,46 C 171.4,56 173.3,66 172.3,76 M 192.5,46 C 188.6,56 186.7,66 187.7,76 M 157.9,72 C 165.6,70 173.3,72 179,77 M 202.1,72 C 194.4,70 186.7,72 181,77 M 160.8,52 C 163.7,50 166.6,50 169.4,52 M 174.2,60 C 177.1,58 180,58 181.9,60 M 190.6,52 C 193.4,50 196.3,50 199.2,52 M 157,64 C 159.8,62 162.7,62 165.6,64 M 194.4,64 C 197.3,62 200.2,62 203,64 M 163.7,80 C 166.6,78 170.4,79 173.3,82 M 186.7,82 C 189.6,79 193.4,78 196.3,80',
  }),
  // الخُصاء (المخيخ) أسفل خلف الدماغ
  S({
    id: 'ner-cerebellum',
    kind: 'p a t h',
    organId: 'cerebellum',
    grad: 'g-nervous',
    op: 0.9,
    d: 'M 170.4,87 C 173.3,83 186.7,83 189.6,87 C 187.7,95 183.8,98 180,98 C 176.2,98 172.3,95 170.4,87 Z',
  }),
  S({
    id: 'ner-cerebellum-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'cerebellum',
    fillVar: '--nervous-c',
    op: 0.8,
    d: 'M 174.2,89 C 177.1,88 182.9,88 185.8,89 M 175.2,93 C 178.1,92 181.9,92 184.8,93',
  }),
  // جذع الدماغ (الجسر + النخاع المستطيل)
  S({
    id: 'ner-brainstem',
    kind: 'p a t h',
    organId: 'brainstem',
    grad: 'g-nervous',
    strokeVar: '--nervous-c',
    sw: 1,
    d: 'M 176.2,90 C 174.2,97 175.2,104 178.1,110 C 179,113 181,113 181.9,110 C 184.8,104 185.8,97 183.8,90 C 181.9,93 178.1,93 176.2,90 Z',
  }),
  // النخاع الشوكي: ينتهي عند L1 (صمائل)
  S({
    id: 'ner-spinal',
    kind: 'p a t h',
    organId: 'spinalcord',
    grad: 'g-nervous',
    strokeVar: '--nervous-c',
    sw: 1,
    d: 'M 178.1,110 C 177.6,140 177.2,172 177.8,204 C 178.4,226 178.9,242 179.4,250 L 181.6,250 C 182.2,242 182.8,226 183.3,204 C 183.8,172 183.4,140 182.9,110 C 181.9,108 179,108 178.1,110 Z',
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
    d: 'M 178.9,252 C 177.8,262 177.8,272 178.9,282 M 181.1,252 C 182.2,262 182.2,272 181.1,282 M 180,252 L 180,284 M 177.2,254 C 175.6,264 175.6,274 176.7,284 M 182.8,254 C 184.4,264 184.4,274 183.3,284',
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
    d: 'M 177.1,124 L 170.3,128 M 182.9,124 L 189.7,128 M 177.1,138 L 169.8,142 M 182.9,138 L 190.2,142 M 177.1,152 L 168.4,156 M 182.9,152 L 191.6,156 M 176.7,166 L 168.4,170 M 183.3,166 L 191.6,170 M 176.7,180 L 168.4,184 M 183.3,180 L 191.6,184 M 176.7,194 L 168.4,198 M 183.3,194 L 191.6,198 M 176.7,208 L 169,212 M 183.3,208 L 191,212 M 176.7,222 L 169,226 M 183.3,222 L 191,226 M 176.7,236 L 169,240 M 183.3,236 L 191,240',
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
    d: 'M 166.6,68 C 170.4,74 173.3,80 175.2,86',
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
    d: 'M 155,82 C 162.7,85 170.4,89 176.2,93',
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
    d: 'M 181,140 C 187.8,144 195.5,146 203.3,148 M 181,145 C 185.8,151 193.2,157 199.8,162 M 181,150 C 187.8,154 197.6,157 206.4,160',
  }),
  S({
    id: 'ner-arm-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    organId: 'peripheralnerves',
    fillVar: '--nervous-c',
    mirror: true,
    d: 'M 203.3,148 C 219.6,172 230.6,204 237.2,238 C 241.6,268 240.3,304.4 240.3,348.1 C 240.3,380.8 239.3,405.4 238.2,427.3 M 199.8,162 C 210.8,188 221.8,222 228.4,256 C 231,290.7 235.1,337.1 237.2,383.6 C 237.7,402.7 237.7,416.3 237.2,430 M 206.4,160 C 215.2,176 221.8,196 226.2,216',
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
    d: 'M 181.1,246 C 186.6,250 193.2,254 199.8,258 M 181.1,254 C 185.5,260 191,266 196.5,272 M 181.1,262 C 184.4,268 188.8,274 193.2,280 M 196.5,272 C 199.8,298.9 202.9,331.7 205,364.5',
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
    d: 'M 181,301.7 C 188.3,326.2 194.6,356.3 198.7,383.6 C 201.8,405.4 203.9,430 206.2,448.1',
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
    d: 'M 206.2,448.1 C 208.5,464.3 208.5,492.2 206.2,535.3 C 205.1,571.9 203.9,610.7 203.9,647.6 C 203.9,676.1 205.1,702.5 207.4,720.9',
  }),
  S({
    id: 'ner-peroneal-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    organId: 'peripheralnerves',
    fillVar: '--nervous-c',
    mirror: true,
    d: 'M 206.2,448.1 C 211.9,463.4 214.2,490.1 213.1,533.2 C 211.9,569.8 210.8,606.4 209.6,641.5 C 208.5,667.9 208.5,692.4 209.6,714.8',
  }),
]

/* ============ العضلات (muscles) — عرض عضلي أمامي v4 ============ */
const MUSCLES: ShapeDef[] = [
  // العضلة القفوية الصدرية (الرقبة)
  S({
    id: 'mus-scm-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.4,
    organId: 'muscles',
    mirror: true,
    fillVar: '--muscles-c',
    op: 0.85,
    d: 'M 167,90 C 171,112 176,140 183,168',
  }),

  // العضلة الجبهية (الوجه)
  S({
    id: 'mus-frontalis',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.3,
    organId: 'muscles',
    fillVar: '--muscles-c',
    op: 0.7,
    d: 'M 159,57 C 166,49 174,46 180,46 C 186,46 194,49 201,57 M 163,68 C 168,64 174,62 180,62 C 186,62 192,64 197,68',
  }),
  // المنكبي (الترابيسي)
  S({
    id: 'mus-trap-l',
    kind: 'p a t h',
    organId: 'trapezius',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.2,
    mirror: true,
    d: 'M 182,150 C 196,146 212,148 226,154 C 234,158 238,164 236,170 C 230,175 220,178 209,177 C 199,176 190,170 185,162 C 183,158 182,154 182,150 Z',
  }),
  // الدلتا (غطاء الكتف)
  S({
    id: 'mus-delt-l',
    kind: 'p a t h',
    organId: 'deltoid',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.3,
    mirror: true,
    d: 'M 252,166 C 264,164 275,172 279,185 C 282,198 280,214 274,226 C 269,234 262,236 257,229 C 251,220 248,204 249,188 C 250,178 251,170 252,166 Z',
  }),
  // الصدرية الكبرى — ذكر (واسعة مسطحة)
  S({
    id: 'mus-pec-l-m',
    kind: 'p a t h',
    organId: 'pectoralis',
    sex: 'male',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.3,
    mirror: true,
    d: 'M 182,170 C 198,166 218,170 232,178 C 242,184 248,194 249,206 C 249,220 243,232 232,239 C 220,246 202,248 190,244 C 184,242 181,238 181,232 C 181,214 181,192 182,170 Z',
  }),
  // الصدرية — أنثى (أصغر، فوق تضاريس الثدي)
  S({
    id: 'mus-pec-l-f',
    kind: 'p a t h',
    organId: 'pectoralis',
    sex: 'female',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.2,
    mirror: true,
    d: 'M 182,172 C 196,169 212,172 224,179 C 233,185 238,194 239,204 C 239,216 234,226 225,232 C 215,238 200,240 190,237 C 184,235 181,231 181,226 C 181,210 181,190 182,172 Z',
  }),
  // ألياف الصدرية
  S({
    id: 'mus-pec-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'pectoralis',
    mirror: true,
    fillVar: '--muscles-c',
    op: 0.6,
    d: 'M 184,178 C 200,176 216,180 230,188 M 183,188 C 198,186 213,190 226,197 M 182,198 C 196,197 209,200 220,207 M 182,208 C 194,207 206,210 215,216',
  }),
  // العضلة العضدية (اثنى رأسي)
  S({
    id: 'mus-bicep-l',
    kind: 'p a t h',
    organId: 'biceps',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.3,
    mirror: true,
    d: 'M 258,236 C 265,238 269,246 268,258 C 267,272 264,284 259,290 C 254,292 250,286 249,274 C 248,260 251,242 258,236 Z',
  }),
  S({
    id: 'mus-bicep-line',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'biceps',
    mirror: true,
    fillVar: '--muscles-c',
    op: 0.6,
    d: 'M 259,242 C 261,256 260,272 257,284',
  }),
  // العضلة العضدية الخلفية (الحافة الجانية المرئية أماميًا)
  S({
    id: 'mus-tricep-l',
    kind: 'p a t h',
    organId: 'triceps',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.2,
    op: 0.85,
    mirror: true,
    d: 'M 268,244 C 272,248 274,258 273,270 C 272,284 269,296 265,302 C 262,296 261,284 262,270 C 263,258 265,248 268,244 Z',
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
    d: 'M 252,300 C 258,302 261,310 260,322 C 258,344 255,368 252,392 C 250,410 247,426 244,438 C 240,442 237,438 236,428 C 236,406 238,380 240,356 C 242,334 246,312 252,300 Z',
  }),
  // العضلة المستقيمة للبطن (أربع تقسيمات)
  S({
    id: 'mus-abs',
    kind: 'p a t h',
    organId: 'rectusabdominis',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.3,
    mirror: true,
    d: 'M 182,272 C 192,268 206,268 214,274 C 220,280 224,292 225,306 C 226,326 224,348 220,368 C 216,386 210,402 202,412 C 196,418 188,420 183,416 C 182,388 182,330 182,272 Z',
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
    d: 'M 184,305 C 194,308 208,308 222,304 M 184,338 C 194,341 207,341 219,337 M 184,372 C 193,375 205,375 215,371 M 182,276 L 182,412',
  }),
  // المائلة
  S({
    id: 'mus-oblique-l',
    kind: 'p a t h',
    organId: 'obliques',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.2,
    mirror: true,
    d: 'M 226,290 C 233,294 239,302 242,314 C 245,328 244,344 240,358 C 236,370 230,378 224,380 C 221,368 219,350 219,332 C 219,316 221,302 226,290 Z',
  }),
  S({
    id: 'mus-oblique-lines',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'obliques',
    mirror: true,
    fillVar: '--muscles-c',
    op: 0.6,
    d: 'M 228,300 C 233,306 237,314 239,322 M 226,318 C 231,324 235,332 237,340 M 224,336 C 228,342 232,350 234,358',
  }),
  // العجزي (الحافة المرئية أماميًا)
  S({
    id: 'mus-glute-l',
    kind: 'p a t h',
    organId: 'gluteus',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.2,
    mirror: true,
    d: 'M 224,404 C 232,402 240,406 245,414 C 248,422 248,432 244,440 C 238,446 230,446 225,440 C 221,432 220,416 224,404 Z',
  }),
  // الرباعية (الفخذ)
  S({
    id: 'mus-quad-l',
    kind: 'p a t h',
    organId: 'quadriceps',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.3,
    mirror: true,
    d: 'M 210,458 C 220,452 232,452 240,460 C 246,470 248,488 247,508 C 246,534 243,562 239,584 C 236,598 231,606 225,606 C 219,606 215,598 213,584 C 210,560 208,530 208,500 C 208,482 209,466 210,458 Z',
  }),
  S({
    id: 'mus-quad-line',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'quadriceps',
    mirror: true,
    fillVar: '--muscles-c',
    op: 0.6,
    d: 'M 226,464 C 228,494 227,532 224,572',
  }),
  // العضلة الضامة (داخل الفخذ)
  S({
    id: 'mus-adductor-l',
    kind: 'p a t h',
    organId: 'muscles',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.1,
    op: 0.9,
    mirror: true,
    d: 'M 192,462 C 197,466 200,474 201,486 C 202,506 202,530 201,554 C 200,572 198,584 195,588 C 192,584 190,572 190,554 C 190,530 190,506 191,486 C 191,474 191,466 192,462 Z',
  }),
  // سمانة الساق
  S({
    id: 'mus-calf-l',
    kind: 'p a t h',
    organId: 'calves',
    grad: 'g-muscles',
    strokeVar: '--muscles-c',
    sw: 1.3,
    mirror: true,
    d: 'M 228,632 C 236,630 243,636 245,648 C 247,664 246,682 242,696 C 239,706 234,710 230,706 C 227,700 226,688 226,672 C 226,658 227,644 228,632 Z',
  }),
  S({
    id: 'mus-calf-line',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1,
    organId: 'calves',
    mirror: true,
    fillVar: '--muscles-c',
    op: 0.6,
    d: 'M 224,640 C 221,654 221,670 223,684',
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
    d: 'M 160.8,66.5 C 163.7,64 168.5,64 171.4,66.5 C 168.5,69 163.7,69 160.8,66.5 Z',
  }),
  S({    id: 'sen-eye-iris-l',
    kind: 'p a t h',
    organId: 'eye',
    mirror: true,
    d: 'M 165.1 66 a 1.73 1.73 0 1 0 3.46 0 a 1.73 1.73 0 1 0 -3.46 0 M 166.2 66 a 0.67 0.67 0 1 0 1.34 0 a 0.67 0.67 0 1 0 -1.34 0',
  }),
  S({
    id: 'sen-brow-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.4,
    organId: 'eye',
    mirror: true,
    fillVar: '--ear-line',
    d: 'M 159.8,61 C 162.7,59 167.5,59 170.4,61',
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
    d: 'M 149.3,63 C 145,61 142.1,66.5 144.5,72.5 C 146.4,76.5 149.8,76.5 150.7,73.5',
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
    d: 'M 147.4,66 C 145.4,67 145.4,70 147.4,71 M 148.3,65 C 146.9,66 146.9,69 148.3,70',
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
    d: 'M 179,61 C 178.7,69 178.7,76 179,81 C 179.4,84 181.4,85.5 183.4,84.5',
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
    d: 'M 172.3,84 C 174.2,86 176.2,86 177.1,84 M 182.9,84 C 184.8,86 186.7,86 187.7,84',
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
  vessels: [...VESSELS, ...IMMUNE],
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
