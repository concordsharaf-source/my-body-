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
    id: 'fig-head',
    kind: 'p a t h',
    organId: 'skin',
    grad: 'g-skin',
    d: 'M 180,26 C 203,26 216,44 216,68 C 216,86 209,101 198,110 C 191,116 185,119 180,119 C 175,119 169,116 162,110 C 151,101 144,86 144,68 C 144,44 157,26 180,26 Z',
  }),
  S({
    id: 'fig-neck',
    kind: 'p a t h',
    organId: 'skin',
    grad: 'g-skin',
    d: 'M 165,112 C 166,124 166,133 163,142 L 197,142 C 194,133 194,124 195,112 C 188,118 172,118 165,112 Z',
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

/* ============ الهيكل العظمي (bones) ============ */
const BONES: ShapeDef[] = [
  S({
    id: 'bone-skull',
    kind: 'p a t h',
    organId: 'skull',
    grad: 'g-bones',
    d: 'M 180,33 C 200,33 212,49 212,69 C 212,85 206,98 196,105 C 190,109 184,111 180,111 C 176,111 170,109 164,105 C 154,98 148,85 148,69 C 148,49 160,33 180,33 Z',
  }),
  S({
    id: 'bone-cervical',
    kind: 'p a t h',
    organId: 'spine',
    grad: 'g-bones',
    d: 'M 173,118 L 187,118 Q 190,121.5 187,125 L 173,125 Q 170,121.5 173,118 Z M 173,128 L 187,128 Q 190,131.5 187,135 L 173,135 Q 170,131.5 173,128 Z M 173,138 L 187,138 Q 190,141.5 187,145 L 173,145 Q 170,141.5 173,138 Z',
  }),
  S({
    id: 'bone-thoracic',
    kind: 'p a t h',
    organId: 'spine',
    grad: 'g-bones',
    d: 'M 173,152 L 187,152 Q 190,155.5 187,159 L 173,159 Q 170,155.5 173,152 Z M 173,164 L 187,164 Q 190,167.5 187,171 L 173,171 Q 170,167.5 173,164 Z M 173,176 L 187,176 Q 190,179.5 187,183 L 173,183 Q 170,179.5 173,176 Z M 173,188 L 187,188 Q 190,191.5 187,195 L 173,195 Q 170,191.5 173,188 Z M 173,200 L 187,200 Q 190,203.5 187,207 L 173,207 Q 170,203.5 173,200 Z M 173,212 L 187,212 Q 190,215.5 187,219 L 173,219 Q 170,215.5 173,212 Z M 173,224 L 187,224 Q 190,227.5 187,231 L 173,231 Q 170,227.5 173,224 Z',
  }),
  S({
    id: 'bone-lumbar',
    kind: 'p a t h',
    organId: 'spine',
    grad: 'g-bones',
    d: 'M 172,240 L 188,240 Q 191,244 188,248 L 172,248 Q 169,244 172,240 Z M 172,252 L 188,252 Q 191,256 188,260 L 172,260 Q 169,256 172,252 Z M 172,264 L 188,264 Q 191,268 188,272 L 172,272 Q 169,268 172,264 Z M 172,276 L 188,276 Q 191,280 188,284 L 172,284 Q 169,280 172,276 Z',
  }),
  S({
    id: 'bone-sternum',
    kind: 'p a t h',
    organId: 'ribs',
    grad: 'g-bones',
    d: 'M 176,150 L 184,150 Q 186,152 186,156 L 186,224 Q 186,228 184,230 L 176,230 Q 174,228 174,224 L 174,156 Q 174,152 176,150 Z',
  }),
  S({
    id: 'bone-ribs',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 5,
    organId: 'ribs',
    fillVar: '--bones-b',
    op: 0.9,
    d: 'M 174,158 C 158,156 144,162 137,174 M 174,172 C 156,170 142,178 135,192 M 174,186 C 155,185 141,194 134,208 M 174,200 C 155,200 141,210 135,224 M 174,214 C 157,215 145,226 140,238 M 174,228 C 159,230 149,240 145,250',
  }),
  S({
    id: 'bone-pelvis',
    kind: 'p a t h',
    organId: 'pelvis',
    grad: 'g-bones',
    d: 'M 172,284 L 188,284 L 185,306 C 183,312 177,312 175,306 Z M 174,282 C 162,279 150,283 144,293 C 139,302 141,314 148,320 C 155,326 164,324 169,317 C 173,311 174,303 175,296 Z',
  }),
  S({
    id: 'bone-clavicle-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 5,
    organId: 'clavicle',
    mirror: true,
    fillVar: '--bones-b',
    d: 'M 188,149 C 199,145 214,145 227,151',
  }),
  S({
    id: 'bone-humerus-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 6.5,
    organId: 'armbones',
    mirror: true,
    fillVar: '--bones-b',
    d: 'M 245,166 C 249,192 248,220 244,244',
  }),
  S({
    id: 'bone-forearm-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4.5,
    organId: 'armbones',
    mirror: true,
    fillVar: '--bones-b',
    d: 'M 242,254 C 240,286 239,316 238,346 M 236,254 C 234,284 233,312 233,342',
  }),
  S({
    id: 'bone-femur-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 7,
    organId: 'femur',
    mirror: true,
    fillVar: '--bones-b',
    d: 'M 214,390 C 221,430 221,470 215,508',
  }),
  S({
    id: 'bone-tibia-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 5,
    organId: 'legbones',
    mirror: true,
    fillVar: '--bones-b',
    d: 'M 205,520 C 203,560 201,600 201,640',
  }),
  S({
    id: 'bone-fibula-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3.5,
    organId: 'legbones',
    mirror: true,
    fillVar: '--bones-b',
    d: 'M 215,522 C 213,560 211,598 210,636',
  }),
]

/* ============ الجهاز التنفسي (respiratory) ============ */
const RESPIRATORY: ShapeDef[] = [
  S({
    id: 'res-nasal',
    kind: 'p a t h',
    organId: 'nasalcavity',
    grad: 'g-respiratory',
    op: 0.55,
    d: 'M 174.5,81 C 174.5,77.5 177,75.5 180,75.5 C 183,75.5 185.5,77.5 185.5,81 C 185.5,86 183,90 180,90 C 177,90 174.5,86 174.5,81 Z',
  }),
  S({
    id: 'res-pharynx',
    kind: 'p a t h',
    organId: 'pharynx',
    grad: 'g-respiratory',
    d: 'M 175,114 Q 180,111 185,114 L 186,138 Q 180,141 174,138 Z',
  }),
  S({
    id: 'res-larynx',
    kind: 'p a t h',
    organId: 'larynx',
    grad: 'g-respiratory',
    d: 'M 173,141 L 187,141 L 184,154 L 176,154 Z',
  }),
  S({
    id: 'res-trachea',
    kind: 'p a t h',
    organId: 'trachea',
    grad: 'g-respiratory',
    d: 'M 176,154 L 184,154 L 184,197 Q 180,200 176,197 Z M 176,163 H 184 M 176,172 H 184 M 176,181 H 184 M 176,190 H 184',
  }),
  S({
    id: 'res-bronchi-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4.5,
    organId: 'bronchi',
    mirror: true,
    fillVar: '--respiratory-b',
    d: 'M 177,199 C 169,205 161,209 155,215 C 151,219 149,223 148,227 M 163,211 C 159,217 156,223 155,229',
  }),
  S({
    id: 'res-lung-l',
    kind: 'p a t h',
    organId: 'lungs',
    mirror: true,
    grad: 'g-respiratory',
    d: 'M 170,181 C 160,179 150,187 145,201 C 140,219 139,243 142,265 C 144,279 150,289 159,291 C 166,292 171,286 171,277 L 171,191 C 171,185 171,182 170,181 Z',
  }),
  S({
    id: 'res-lung-r',
    kind: 'p a t h',
    organId: 'lungs',
    grad: 'g-respiratory',
    d: 'M 190,181 C 200,179 210,187 215,201 C 220,219 221,243 218,265 C 216,279 210,289 201,291 C 194,292 189,286 189,277 L 189,262 C 189,257 191,253 194,249 C 197,245 198,240 196,235 C 194,230 191,228 189,228 L 189,191 C 189,185 189,182 190,181 Z',
  }),
  S({
    id: 'res-alveoli',
    kind: 'p a t h',
    organId: 'alveoli',
    grad: 'g-respiratory',
    op: 0.55,
    mirror: true,
    d: 'M 153,207 m -3.4,0 a 3.4,3.4 0 1,0 6.8,0 a 3.4,3.4 0 1,0 -6.8,0 M 161,215 m -2.8,0 a 2.8,2.8 0 1,0 5.6,0 a 2.8,2.8 0 1,0 -5.6,0 M 149,220 m -2.8,0 a 2.8,2.8 0 1,0 5.6,0 a 2.8,2.8 0 1,0 -5.6,0 M 158,199 m -2.3,0 a 2.3,2.3 0 1,0 4.6,0 a 2.3,2.3 0 1,0 -4.6,0',
  }),
  S({
    id: 'res-diaphragm',
    kind: 'p a t h',
    organId: 'diaphragm',
    grad: 'g-respiratory',
    op: 0.75,
    d: 'M 130,293 C 150,281 170,277 180,277 C 190,277 210,281 230,293 C 211,288 190,286 180,286 C 170,286 149,288 130,293 Z',
  }),
]

/* ============ الجهاز الهضمي (digestive) ============ */
const DIGESTIVE: ShapeDef[] = [
  S({
    id: 'dig-esophagus',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4,
    organId: 'esophagus',
    fillVar: '--digestive-b',
    d: 'M 179,150 C 178,182 178,222 179,252 C 179,268 180,276 182,283',
  }),
  S({
    id: 'dig-stomach',
    kind: 'p a t h',
    organId: 'stomach',
    grad: 'g-digestive',
    d: 'M 182,281 C 164,278 149,290 147,307 C 145,323 156,336 171,339 C 183,341 194,335 197,324 C 199,316 196,308 189,305 C 183,303 177,306 175,312 C 173,318 177,324 183,325 C 188,326 192,322 192,316 L 182,281 Z M 191,317 C 195,324 193,332 185,335 C 180,337 175,335 173,331 C 177,332 182,331 185,327 C 188,323 188,319 186,316 Z',
  }),
  S({
    id: 'dig-liver',
    kind: 'p a t h',
    organId: 'liver',
    grad: 'g-digestive',
    d: 'M 146,288 C 158,282 180,279 198,283 C 206,285 210,291 208,299 C 205,310 194,318 180,320 C 164,322 150,317 145,306 C 143,300 143,293 146,288 Z',
  }),
  S({
    id: 'dig-gallbladder',
    kind: 'p a t h',
    organId: 'gallbladder',
    grad: 'g-digestive',
    d: 'M 192,312 C 188,315 187,321 189,326 C 191,330 195,330 197,326 C 199,322 198,315 195,311 C 194,310 193,310 192,312 Z',
  }),
  S({
    id: 'dig-pancreas',
    kind: 'p a t h',
    organId: 'pancreas',
    grad: 'g-digestive',
    d: 'M 158,334 C 168,330 184,330 198,334 C 204,336 206,341 201,344 C 189,348 170,348 160,344 C 155,342 154,337 158,334 Z',
  }),
  S({
    id: 'dig-smallintestine',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 7,
    organId: 'smallintestine',
    fillVar: '--digestive-b',
    d: 'M 158,357 C 166,352 174,352 182,357 C 190,362 198,362 202,357 M 202,364 C 194,369 184,369 176,364 C 168,359 160,359 158,364 M 158,371 C 166,376 176,376 184,371 C 192,366 200,366 202,371 M 202,378 C 196,383 186,383 178,378 C 170,373 162,373 158,378 M 158,385 C 168,389 182,389 192,385 C 197,383 201,383 202,385',
  }),
  S({
    id: 'dig-largeintestine',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 11,
    organId: 'largeintestine',
    fillVar: '--digestive-c',
    op: 0.95,
    d: 'M 155,392 L 153,356 Q 153,348 161,348 L 199,348 Q 207,348 207,356 L 205,392 Q 205,400 196,400 L 186,400',
  }),
  S({
    id: 'dig-rectum',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 9,
    organId: 'rectum',
    fillVar: '--digestive-c',
    d: 'M 182,400 C 181,404 180,408 180,413',
  }),
  S({
    id: 'dig-appendix',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 5,
    organId: 'appendix',
    fillVar: '--digestive-b',
    d: 'M 152,392 C 149,398 148,404 152,408',
  }),
  S({
    id: 'dig-mouth',
    kind: 'p a t h',
    organId: 'mouth',
    fillVar: '--mouth',
    op: 0.85,
    d: 'M 171,102 C 174,98.5 186,98.5 189,102 C 187,108 173,108 171,102 Z',
  }),
  S({
    id: 'dig-teeth',
    kind: 'p a t h',
    organId: 'teeth',
    fillVar: '--tooth',
    d: 'M 173,99.5 L 187,99.5 Q 188,101.5 187,103.5 L 173,103.5 Q 172,101.5 173,99.5 Z',
  }),
  S({
    id: 'dig-tongue',
    kind: 'p a t h',
    organId: 'tongue',
    fillVar: '--tongue',
    d: 'M 174,104 C 176,102.5 184,102.5 186,104 C 185,108 175,108 174,104 Z',
  }),
  S({
    id: 'dig-salivary-l',
    kind: 'circle',
    organId: 'salivaryglands',
    mirror: true,
    grad: 'g-digestive',
    op: 0.8,
    cx: 151,
    cy: 93,
    r: 5,
  }),
]

/* ============ الجهاز الدوري (circulatory) ============ */
const CIRCULATORY: ShapeDef[] = [
  S({
    id: 'cir-heart',
    kind: 'p a t h',
    organId: 'heart',
    grad: 'g-circulatory',
    d: 'M 167,238 C 159,242 155,252 157,264 C 159,278 168,290 180,297 C 186,301 193,300 198,295 C 204,289 208,279 209,267 C 210,255 207,244 199,238 C 193,233 185,231 179,233 C 175,235 171,236 167,238 Z M 178,242 C 180,258 186,274 194,288',
  }),
]

/* ============ الجهاز البولي (urinary) ============ */
const URINARY: ShapeDef[] = [
  S({
    id: 'uri-kidney-l',
    kind: 'p a t h',
    organId: 'kidneys',
    mirror: true,
    grad: 'g-urinary',
    d: 'M 149,304 C 140,306 135,315 136,325 C 137,335 143,341 151,340 C 148,335 147,329 149,323 C 151,317 151,310 149,304 Z',
  }),
  S({
    id: 'uri-ureter-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3.5,
    organId: 'ureters',
    mirror: true,
    fillVar: '--urinary-b',
    d: 'M 145,340 C 149,357 160,370 170,377 C 173,379 175,381 176,383',
  }),
  S({
    id: 'uri-bladder',
    kind: 'p a t h',
    organId: 'bladder',
    grad: 'g-urinary',
    d: 'M 180,372 C 171,372 166,378 167,386 C 168,394 173,399 180,399 C 187,399 192,394 193,386 C 194,378 189,372 180,372 Z',
  }),
  S({
    id: 'uri-urethra',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4,
    organId: 'urethra',
    fillVar: '--urinary-b',
    d: 'M 180,399 L 180,412',
  }),
]

/* ============ الجهاز التناسلي (reproductive) ============ */
const REPRO_MALE: ShapeDef[] = [
  S({
    id: 'rep-m-testis-l',
    kind: 'ellipse',
    organId: 'testes',
    mirror: true,
    sex: 'male',
    grad: 'g-reproductive',
    cx: 167,
    cy: 398,
    rx: 6.5,
    ry: 7.5,
  }),
  S({
    id: 'rep-m-epididymis-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.5,
    organId: 'epididymis',
    mirror: true,
    sex: 'male',
    fillVar: '--reproductive-b',
    d: 'M 160,391 C 158,396 159,402 162,405',
  }),
  S({
    id: 'rep-m-vas-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.5,
    organId: 'vasdeferens',
    mirror: true,
    sex: 'male',
    fillVar: '--reproductive-b',
    d: 'M 162,390 C 161,381 165,373 171,367 C 175,363 178,360 179,357',
  }),
  S({
    id: 'rep-m-vesicle-l',
    kind: 'ellipse',
    organId: 'seminalvesicles',
    mirror: true,
    sex: 'male',
    grad: 'g-reproductive',
    op: 0.85,
    cx: 172,
    cy: 379,
    rx: 5,
    ry: 3.8,
  }),
  S({
    id: 'rep-m-prostate',
    kind: 'ellipse',
    organId: 'prostate',
    sex: 'male',
    grad: 'g-reproductive',
    cx: 180,
    cy: 393,
    rx: 6,
    ry: 4,
  }),
  S({
    id: 'rep-m-penis',
    kind: 'p a t h',
    organId: 'penis',
    sex: 'male',
    grad: 'g-reproductive',
    d: 'M 177,399 C 176,409 177,419 180,423 C 183,419 184,409 183,399 C 181,402 179,402 177,399 Z',
  }),
]

const REPRO_FEMALE: ShapeDef[] = [
  S({
    id: 'rep-f-breast-l',
    kind: 'p a t h',
    organId: 'breasts',
    mirror: true,
    sex: 'female',
    grad: 'g-breast',
    d: 'M 154,199 C 163,199 169,206 169,215 C 169,224 163,230 154,230 C 145,230 139,224 139,215 C 139,206 145,199 154,199 Z M 154,213 m -2.6,0 a 2.6,2.6 0 1,0 5.2,0 a 2.6,2.6 0 1,0 -5.2,0',
  }),
  S({
    id: 'rep-f-uterus',
    kind: 'p a t h',
    organId: 'uterus',
    sex: 'female',
    grad: 'g-reproductive',
    d: 'M 180,362 C 171,362 166,369 167,378 C 168,387 173,393 180,393 C 187,393 192,387 193,378 C 194,369 189,362 180,362 Z',
  }),
  S({
    id: 'rep-f-cervix',
    kind: 'p a t h',
    organId: 'cervix',
    sex: 'female',
    grad: 'g-reproductive',
    d: 'M 177,393 L 183,393 L 182,401 L 178,401 Z',
  }),
  S({
    id: 'rep-f-vagina',
    kind: 'p a t h',
    organId: 'vagina',
    sex: 'female',
    grad: 'g-reproductive',
    d: 'M 178,401 L 182,401 L 181,412 L 179,412 Z',
  }),
  S({
    id: 'rep-f-ovary-l',
    kind: 'ellipse',
    organId: 'ovaries',
    mirror: true,
    sex: 'female',
    grad: 'g-reproductive',
    cx: 153,
    cy: 371,
    rx: 6,
    ry: 7,
  }),
  S({
    id: 'rep-f-tube-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3,
    organId: 'fallopiantubes',
    mirror: true,
    sex: 'female',
    fillVar: '--reproductive-b',
    d: 'M 166,378 C 160,376 156,374 152,372',
  }),
]

/* ============ الجهاز اللمفاوي (lymphatic) ============ */
const LYMPHATIC: ShapeDef[] = [
  S({
    id: 'lym-thymus',
    kind: 'p a t h',
    organId: 'thymus',
    grad: 'g-lymphatic',
    op: 0.85,
    d: 'M 171,194 C 175,191 185,191 189,194 C 185,198 175,198 171,194 Z',
  }),
  S({
    id: 'lym-tonsil-l',
    kind: 'circle',
    organId: 'tonsils',
    mirror: true,
    grad: 'g-lymphatic',
    cx: 163,
    cy: 121,
    r: 4.5,
  }),
  S({
    id: 'lym-node-neck-l',
    kind: 'circle',
    organId: 'lymphnodes',
    mirror: true,
    grad: 'g-lymphatic',
    cx: 150,
    cy: 143,
    r: 3.6,
  }),
  S({
    id: 'lym-node-armpit-l',
    kind: 'circle',
    organId: 'lymphnodes',
    mirror: true,
    grad: 'g-lymphatic',
    cx: 233,
    cy: 179,
    r: 4,
  }),
  S({
    id: 'lym-node-groin-l',
    kind: 'circle',
    organId: 'lymphnodes',
    mirror: true,
    grad: 'g-lymphatic',
    cx: 211,
    cy: 389,
    r: 4,
  }),
  S({
    id: 'lym-vessel-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.5,
    dash: '5 4',
    organId: 'lymphvessels',
    mirror: true,
    fillVar: '--lymphatic-b',
    op: 0.8,
    d: 'M 239,192 C 241,242 241,300 237,358',
  }),
  S({
    id: 'lym-spleen',
    kind: 'p a t h',
    organId: 'spleen',
    grad: 'g-lymphatic',
    d: 'M 212,306 C 218,304 224,308 224,316 C 224,324 219,330 212,329 C 215,323 215,314 212,306 Z',
  }),
]

/* ============ الغدد الصماء (endocrine) ============ */
const ENDOCRINE: ShapeDef[] = [
  S({
    id: 'end-pituitary',
    kind: 'circle',
    organId: 'pituitary',
    grad: 'g-endocrine',
    cx: 180,
    cy: 97,
    r: 4.6,
  }),
  S({
    id: 'end-thyroid',
    kind: 'p a t h',
    organId: 'thyroid',
    grad: 'g-endocrine',
    d: 'M 170,123 C 174,120 178,121 180,124 C 182,121 186,120 190,123 C 191,127 187,131 183,130 C 181,129 180,127 180,127 C 180,127 179,129 177,130 C 173,131 169,127 170,123 Z',
  }),
  S({
    id: 'end-parathyroid',
    kind: 'p a t h',
    organId: 'parathyroid',
    mirror: true,
    grad: 'g-endocrine',
    op: 0.9,
    d: 'M 175,134 m -2.2,0 a 2.2,2.2 0 1,0 4.4,0 a 2.2,2.2 0 1,0 -4.4,0 M 172,141 m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0',
  }),
  S({
    id: 'end-adrenal-l',
    kind: 'p a t h',
    organId: 'adrenals',
    mirror: true,
    grad: 'g-endocrine',
    d: 'M 138,301 C 142,297 150,297 154,301 C 150,305 142,305 138,301 Z',
  }),
]

/* ============ الجهاز العصبي (nervous) ============ */
const NERVOUS: ShapeDef[] = [
  S({
    id: 'ner-brain',
    kind: 'p a t h',
    organId: 'brain',
    grad: 'g-nervous',
    d: 'M 180,38 C 197,38 209,49 209,64 C 209,75 203,83 195,87 C 190,89 185,90 180,90 C 175,90 170,89 165,87 C 157,83 151,75 151,64 C 151,49 163,38 180,38 Z M 180,41 L 180,88 M 165,55 C 169,52 173,54 175,59 M 185,59 C 187,54 191,52 195,55 M 162,68 C 166,65 170,67 172,72 M 188,72 C 190,67 194,65 198,68',
  }),
  S({
    id: 'ner-cerebellum',
    kind: 'p a t h',
    organId: 'cerebellum',
    grad: 'g-nervous',
    d: 'M 167,86 C 171,82 189,82 193,86 C 191,94 169,94 167,86 Z',
  }),
  S({
    id: 'ner-brainstem',
    kind: 'p a t h',
    organId: 'brainstem',
    grad: 'g-nervous',
    d: 'M 176,92 L 184,92 L 183,110 C 181,113 179,113 177,110 Z',
  }),
  S({
    id: 'ner-spinal',
    kind: 'p a t h',
    organId: 'spinalcord',
    grad: 'g-nervous',
    d: 'M 178,110 L 182,110 L 182,280 L 178,280 Z M 178,150 L 169,153 M 182,150 L 191,153 M 178,180 L 169,183 M 182,180 L 191,183 M 178,210 L 169,213 M 182,210 L 191,213 M 178,240 L 169,243 M 182,240 L 191,243 M 178,268 L 170,272 M 182,268 L 190,272',
  }),
  S({
    id: 'ner-optic-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'opticnerve',
    mirror: true,
    fillVar: '--nervous-b',
    d: 'M 165,66 C 170,71 174,76 177,81',
  }),
  S({
    id: 'ner-acoustic-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'acousticnerve',
    mirror: true,
    fillVar: '--nervous-b',
    d: 'M 152,79 C 160,81 168,85 174,89',
  }),
  S({
    id: 'ner-brachial-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'peripheralnerves',
    mirror: true,
    fillVar: '--nervous-b',
    d: 'M 180,146 C 190,150 200,152 210,154 M 204,152 C 212,156 218,161 222,167 M 180,146 C 172,150 164,153 158,156',
  }),
  S({
    id: 'ner-sciatic-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2.4,
    organId: 'peripheralnerves',
    mirror: true,
    fillVar: '--nervous-b',
    d: 'M 180,268 C 186,290 191,312 195,332 C 199,352 201,372 201,388',
  }),
]

/* ============ الأوعية الدموية (vessels) ============ */
const VESSELS: ShapeDef[] = [
  S({
    id: 'vas-aorta',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 6,
    organId: 'aorta',
    tone: 'art',
    d: 'M 181,236 C 181,222 186,214 195,212 C 203,211 209,217 209,225 M 181,238 C 180,260 180,284 182,308 C 183,324 184,338 184,352',
  }),
  S({
    id: 'vas-svc',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 5,
    organId: 'venacava',
    tone: 'ven',
    d: 'M 203,212 C 206,224 206,236 204,246',
  }),
  S({
    id: 'vas-ivc',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 5,
    organId: 'venacava',
    tone: 'ven',
    d: 'M 202,248 C 205,270 202,294 198,316 C 195,332 192,344 190,354',
  }),
  S({
    id: 'vas-pulm-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 4.5,
    organId: 'pulmonaryartery',
    mirror: true,
    tone: 'art',
    d: 'M 177,232 C 168,226 159,224 151,227 C 145,229 141,234 139,240',
  }),
  S({
    id: 'vas-arm-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3.5,
    organId: 'arteries',
    mirror: true,
    tone: 'art',
    op: 0.85,
    d: 'M 244,176 C 246,212 245,250 242,288 C 241,318 240,348 239,378',
  }),
  S({
    id: 'vas-arm-v-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3.5,
    organId: 'veins',
    mirror: true,
    tone: 'ven',
    op: 0.85,
    d: 'M 237,180 C 235,214 235,250 237,286 C 238,316 238,344 238,372',
  }),
  S({
    id: 'vas-leg-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3.5,
    organId: 'arteries',
    mirror: true,
    tone: 'art',
    op: 0.85,
    d: 'M 213,400 C 218,448 216,500 212,552 C 210,592 208,636 207,676',
  }),
  S({
    id: 'vas-leg-v-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 3.5,
    organId: 'veins',
    mirror: true,
    tone: 'ven',
    op: 0.85,
    d: 'M 206,402 C 204,448 202,500 202,552 C 202,592 202,634 202,674',
  }),
  S({
    id: 'vas-cap-hand-l',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 1.8,
    dash: '2 3',
    organId: 'capillaries',
    mirror: true,
    tone: 'art',
    d: 'M 236,402 C 235,410 236,418 238,424 M 243,400 C 243,408 243,416 242,422',
  }),
]

/* ============ العضلات (muscles) ============ */
const MUSCLES: ShapeDef[] = [
  S({
    id: 'mus-pec-l',
    kind: 'p a t h',
    organId: 'pectoralis',
    mirror: true,
    grad: 'g-muscles',
    d: 'M 177,160 C 164,158 150,162 142,171 C 137,177 136,186 140,192 C 146,199 157,201 166,196 C 173,192 177,185 178,177 C 178,171 178,165 177,160 Z',
  }),
  S({
    id: 'mus-delt-l',
    kind: 'p a t h',
    organId: 'deltoid',
    mirror: true,
    grad: 'g-muscles',
    d: 'M 238,150 C 250,150 259,160 260,174 C 261,184 256,192 249,195 C 244,197 239,193 237,187 C 235,178 235,166 237,156 Z',
  }),
  S({
    id: 'mus-bicep-l',
    kind: 'p a t h',
    organId: 'biceps',
    mirror: true,
    grad: 'g-muscles',
    d: 'M 240,198 C 248,197 254,203 255,213 C 256,225 254,237 250,245 C 246,251 240,251 238,245 C 236,235 236,215 240,198 Z',
  }),
  S({
    id: 'mus-abs',
    kind: 'p a t h',
    organId: 'muscles',
    mirror: true,
    grad: 'g-muscles',
    d: 'M 158,296 Q 166,293 172,296 L 172,311 Q 165,314 158,311 Z M 158,316 Q 166,313 172,316 L 172,331 Q 165,334 158,331 Z M 159,336 Q 166,333 172,336 L 172,350 Q 166,353 159,350 Z M 161,355 Q 166,352 171,355 L 171,368 Q 166,371 161,368 Z',
  }),
  S({
    id: 'mus-oblique-l',
    kind: 'p a t h',
    organId: 'obliques',
    mirror: true,
    grad: 'g-muscles',
    d: 'M 145,298 C 141,315 141,336 147,353 C 149,359 153,363 157,365 C 153,356 151,344 151,332 C 151,319 152,307 154,299 Z',
  }),
  S({
    id: 'mus-glute-l',
    kind: 'p a t h',
    organId: 'gluteus',
    mirror: true,
    grad: 'g-muscles',
    d: 'M 158,371 C 150,373 146,381 148,389 C 150,396 158,400 166,397 C 170,395 172,390 171,384 C 170,377 165,370 158,371 Z',
  }),
  S({
    id: 'mus-quad-l',
    kind: 'p a t h',
    organId: 'quadriceps',
    mirror: true,
    grad: 'g-muscles',
    d: 'M 209,400 C 217,397 225,401 227,410 C 230,428 229,452 225,474 C 223,488 219,498 213,502 C 209,504 206,500 206,494 C 206,470 206,440 207,416 C 207,408 207,402 209,400 Z',
  }),
  S({
    id: 'mus-calf-l',
    kind: 'p a t h',
    organId: 'calves',
    mirror: true,
    grad: 'g-muscles',
    d: 'M 211,558 C 217,556 221,561 222,571 C 223,589 221,611 218,629 C 216,639 212,645 208,643 C 205,641 204,635 205,627 C 207,609 208,587 210,571 Z',
  }),
  S({
    id: 'mus-tendon-ref',
    kind: 'p a t h',
    organId: 'tendons',
    strokeOnly: true,
    sw: 2.5,
    fillVar: '--bones-b',
    op: 0.8,
    d: 'M 212,506 C 210,516 208,524 207,530 M 208,646 C 207,658 206,670 206,680',
  }),
]

/* ============ أعضاء الحس (sensory) ============ */
const SENSORY: ShapeDef[] = [
  S({
    id: 'sen-eye-l',
    kind: 'p a t h',
    organId: 'eye',
    mirror: true,
    fillVar: '--eye',
    d: 'M 158,64 C 162,59 170,59 174,64 C 170,69 162,69 158,64 Z M 165,63.5 m -2.4,0 a 2.4,2.4 0 1,0 4.8,0 a 2.4,2.4 0 1,0 -4.8,0',
  }),
  S({
    id: 'sen-ear-l',
    kind: 'p a t h',
    organId: 'ear',
    mirror: true,
    strokeOnly: true,
    sw: 2.6,
    fillVar: '--ear-line',
    d: 'M 145,64 C 139,62 135,69 138,76 C 140,82 146,84 149,80 C 147,78 146,73 147,68 Z',
  }),
  S({
    id: 'sen-nose',
    kind: 'p a t h',
    organId: 'nose',
    strokeOnly: true,
    sw: 2.4,
    fillVar: '--nose-line',
    d: 'M 180,56 C 179,66 179,76 180,84 C 181,88 184,90 187,88 M 175,88 C 177,91 183,91 185,88',
  }),
  S({
    id: 'sen-mouth-line',
    kind: 'p a t h',
    strokeOnly: true,
    sw: 2,
    fillVar: '--mouth-line',
    op: 0.7,
    d: 'M 169.5,102 C 175,104.5 185,104.5 190.5,102',
  }),
]

/* ============ التجميع ============ */
export const LAYER_SHAPES: Record<LayerId, ShapeDef[]> = {
  skin: SKIN,
  soft: SOFT,
  bones: BONES,
  muscles: MUSCLES,
  nervous: NERVOUS,
  circulatory: CIRCULATORY,
  respiratory: RESPIRATORY,
  digestive: DIGESTIVE,
  urinary: URINARY,
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
