import type { LayerId } from '../../data/types'

/**
 * تعريفات أشكال النموذج التشريحي (SVG).
 * - كل شكل له id ثابتًا يربطه بقاعدة البيانات (model.shapeIds).
 * - الأشكال ذات `mirror: true` تُرسم مره (يسار) ومره معكوسة (يمين) حول محور x=180.
 * - الطبقات تُرسم بالترتيب: عظام ← أعضاء ← أوعية ← أعصاب ← عضلات ← أنسجة ← جلد ← حس.
 */
export interface ShapeDef {
  id: string
  kind: 'path' | 'circle' | 'ellipse' | 'line'
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
  /** ترتيب فرعي داخل الطبقة (لكي تُرسم بعض العناصر فوق أخرى). */
  z?: number
}

const S = (s: ShapeDef) => s

/* ============ الهيكل العظمي (bones) ============ */
const BONES: ShapeDef[] = [
  S({
    id: 'bone-skull',
    kind: 'path',
    strokeOnly: true,
    sw: 3.5,
    organId: 'skull',
    d: 'M 140 82 C 140 50 156 34 180 34 C 204 34 220 50 220 82 C 220 100 213 113 201 120 C 194 124 188 127 180 127 C 172 127 166 124 159 120 C 147 113 140 100 140 82 Z M 160 74 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0 M 200 74 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0 M 180 82 L 180 98 M 164 106 L 196 106',
  }),
  S({
    id: 'bone-cervical',
    kind: 'path',
    organId: 'spine',
    d: 'M 172 138 h 16 v 7 h -16 Z M 172 148 h 16 v 7 h -16 Z M 172 158 h 16 v 7 h -16 Z',
  }),
  S({
    id: 'bone-thoracic',
    kind: 'path',
    organId: 'spine',
    d: 'M 173 172 h 14 v 8 h -14 Z M 173 188 h 14 v 8 h -14 Z M 173 204 h 14 v 8 h -14 Z M 173 220 h 14 v 8 h -14 Z M 173 236 h 14 v 8 h -14 Z M 173 252 h 14 v 8 h -14 Z',
  }),
  S({
    id: 'bone-lumbar',
    kind: 'path',
    organId: 'spine',
    d: 'M 171 268 h 18 v 10 h -18 Z M 171 284 h 18 v 10 h -18 Z M 171 300 h 18 v 10 h -18 Z M 171 316 h 18 v 10 h -18 Z',
  }),
  S({
    id: 'bone-sacrum',
    kind: 'path',
    organId: 'pelvis',
    d: 'M 170 406 L 190 406 L 180 440 Z',
  }),
  S({
    id: 'bone-sternum',
    kind: 'path',
    organId: 'ribs',
    d: 'M 175 188 L 185 188 L 185 258 L 175 258 Z',
  }),
  S({
    id: 'bone-ribs',
    kind: 'path',
    strokeOnly: true,
    sw: 5,
    organId: 'ribs',
    d: 'M 176 192 C 158 194 142 202 134 216 M 184 192 C 202 194 218 202 226 216 M 176 208 C 156 210 138 220 130 234 M 184 208 C 204 210 222 220 230 234 M 176 224 C 154 226 134 236 128 250 M 184 224 C 206 226 226 236 232 250 M 176 240 C 156 242 140 250 134 262 M 184 240 C 204 242 220 250 226 262 M 176 256 C 160 258 146 264 142 274 M 184 256 C 200 258 214 264 218 274 M 176 272 C 164 274 154 278 150 286 M 184 272 C 196 274 206 278 210 286',
  }),
  S({
    id: 'bone-clavicle-l',
    kind: 'path',
    strokeOnly: true,
    sw: 6,
    organId: 'clavicle',
    mirror: true,
    d: 'M 182 176 C 168 168 150 166 132 172',
  }),
  S({
    id: 'bone-pelvis',
    kind: 'path',
    organId: 'pelvis',
    d: 'M 152 414 C 136 418 128 436 132 452 C 136 466 150 474 162 468 C 170 464 176 454 178 446 L 182 446 C 184 454 190 464 198 468 C 210 474 224 466 228 452 C 232 436 224 418 208 414 C 194 410 166 410 152 414 Z',
  }),
  S({
    id: 'bone-humerus-l',
    kind: 'line',
    strokeOnly: true,
    sw: 10,
    organId: 'armbones',
    mirror: true,
    x1: 102, y1: 186, x2: 88, y2: 300,
  }),
  S({
    id: 'bone-forearm-l',
    kind: 'path',
    strokeOnly: true,
    sw: 7,
    organId: 'armbones',
    mirror: true,
    d: 'M 88 314 L 96 428 M 96 314 L 106 430',
  }),
  S({
    id: 'bone-femur-l',
    kind: 'line',
    strokeOnly: true,
    sw: 11,
    organId: 'femur',
    mirror: true,
    x1: 162, y1: 452, x2: 168, y2: 588,
  }),
  S({
    id: 'bone-tibia-l',
    kind: 'line',
    strokeOnly: true,
    sw: 9,
    organId: 'legbones',
    mirror: true,
    x1: 166, y1: 602, x2: 168, y2: 714,
  }),
  S({
    id: 'bone-fibula-l',
    kind: 'line',
    strokeOnly: true,
    sw: 4,
    organId: 'legbones',
    mirror: true,
    x1: 174, y1: 604, x2: 176, y2: 712,
  }),
]

/* ============ العضلات (muscles) ============ */
const MUSCLES: ShapeDef[] = [
  S({
    id: 'mus-trap-l',
    kind: 'path',
    organId: 'muscles',
    mirror: true,
    d: 'M 164 150 C 150 154 134 162 122 174 C 134 182 150 182 162 176 C 164 168 165 158 164 150 Z',
  }),
  S({
    id: 'mus-pec-l',
    kind: 'path',
    organId: 'pectoralis',
    mirror: true,
    d: 'M 134 192 C 128 210 130 232 140 246 C 152 252 168 248 176 242 L 176 196 C 164 190 146 188 134 192 Z',
  }),
  S({
    id: 'mus-delt-l',
    kind: 'path',
    organId: 'deltoid',
    mirror: true,
    d: 'M 112 170 C 96 174 88 188 86 204 C 94 212 108 214 118 208 C 118 194 116 180 112 170 Z',
  }),
  S({
    id: 'mus-bicep-l',
    kind: 'path',
    organId: 'biceps',
    mirror: true,
    d: 'M 90 216 C 82 240 80 268 84 294 C 92 302 102 300 106 292 C 108 264 108 238 106 220 C 100 212 94 212 90 216 Z',
  }),
  S({
    id: 'mus-forearm-l',
    kind: 'path',
    organId: 'muscles',
    mirror: true,
    d: 'M 88 320 C 86 352 88 386 94 420 C 100 426 108 424 110 416 C 108 384 106 350 106 322 C 100 316 92 316 88 320 Z',
  }),
  S({
    id: 'mus-abs',
    kind: 'path',
    organId: 'rectusabdominis',
    d: 'M 160 254 C 156 292 156 332 160 368 C 164 388 172 398 180 400 C 188 398 196 388 200 368 C 204 332 204 292 200 254 C 188 248 172 248 160 254 Z M 162 282 L 198 282 M 162 312 L 198 312 M 162 342 L 198 342 M 180 254 L 180 400',
  }),
  S({
    id: 'mus-oblique-l',
    kind: 'path',
    organId: 'obliques',
    mirror: true,
    d: 'M 142 260 C 138 294 140 330 148 362 C 152 374 158 382 162 386 C 166 368 168 342 168 318 C 168 294 166 274 164 260 C 156 254 148 254 142 260 Z',
  }),
  S({
    id: 'mus-glute-l',
    kind: 'path',
    organId: 'gluteus',
    mirror: true,
    d: 'M 148 432 C 142 448 144 464 152 474 C 162 480 174 476 178 466 L 178 444 C 170 436 158 430 148 432 Z',
  }),
  S({
    id: 'mus-quad-l',
    kind: 'path',
    organId: 'quadriceps',
    mirror: true,
    d: 'M 150 450 C 144 488 144 526 150 562 C 154 586 160 598 166 602 C 172 598 178 586 180 562 C 182 526 182 488 180 454 C 172 448 158 446 150 450 Z',
  }),
  S({
    id: 'mus-calf-l',
    kind: 'path',
    organId: 'calves',
    mirror: true,
    d: 'M 152 608 C 146 636 146 666 152 692 C 156 708 162 716 168 716 C 174 712 178 700 178 684 C 178 656 176 630 174 610 C 168 604 158 602 152 608 Z',
  }),
]

/* ============ القلب (circulatory) ============ */
const CIRCULATORY: ShapeDef[] = [
  S({
    id: 'cir-heart',
    kind: 'path',
    organId: 'heart',
    d: 'M 182 232 C 176 224 164 222 158 228 C 152 234 152 246 156 254 C 160 266 170 274 180 280 C 182 282 184 282 186 280 C 196 274 206 264 208 252 C 210 242 206 232 198 228 C 191 224 186 226 182 232 Z M 168 240 C 166 252 170 264 178 272',
  }),
]

/* ============ الجهاز التنفسي (respiratory) ============ */
const RESPIRATORY: ShapeDef[] = [
  S({ id: 'res-nasal', kind: 'path', organId: 'nasalcavity', d: 'M 172 78 C 172 88 175 96 180 98 C 185 96 188 88 188 78 C 182 74 178 74 172 78 Z' }),
  S({ id: 'res-pharynx', kind: 'path', organId: 'pharynx', d: 'M 170 100 C 170 98 190 98 190 100 L 190 140 L 170 140 Z' }),
  S({ id: 'res-larynx', kind: 'path', organId: 'larynx', d: 'M 172 140 C 168 144 168 150 172 154 L 188 154 C 192 150 192 144 188 140 Z' }),
  S({ id: 'res-trachea', kind: 'path', organId: 'trachea', d: 'M 175 154 L 185 154 L 185 200 L 175 200 Z M 175 162 L 185 162 M 175 172 L 185 172 M 175 182 L 185 182 M 175 192 L 185 192' }),
  S({ id: 'res-bronchi-l', kind: 'path', strokeOnly: true, sw: 5, organId: 'bronchi', mirror: true, d: 'M 180 200 C 172 206 164 214 158 224' }),
  S({ id: 'res-lung-l', kind: 'path', organId: 'lungs', mirror: true, d: 'M 140 196 C 130 204 126 224 126 246 C 126 272 132 292 142 300 C 154 306 166 300 172 290 C 176 282 178 260 178 240 C 178 218 172 200 162 194 C 156 190 146 190 140 196 Z' }),
  S({
    id: 'res-alveoli',
    kind: 'path',
    organId: 'alveoli',
    d: 'M 214 282 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0 M 222 286 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 228 278 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0 M 224 271 m -3.5 0 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0 M 215 273 m -3.5 0 a 3.5 3.5 0 1 0 7 0 a 3.5 3.5 0 1 0 -7 0',
  }),
  S({ id: 'res-diaphragm', kind: 'path', organId: 'diaphragm', d: 'M 132 300 C 152 288 208 288 228 300 C 208 308 152 308 132 300 Z' }),
]

/* ============ الجهاز الهضمي (digestive) ============ */
const DIGESTIVE: ShapeDef[] = [
  S({ id: 'dig-mouth', kind: 'path', organId: 'mouth', d: 'M 166 98 C 172 96 188 96 194 98 C 196 104 194 110 188 112 C 180 114 172 114 170 112 C 164 108 164 102 166 98 Z' }),
  S({ id: 'dig-teeth', kind: 'path', strokeOnly: true, sw: 2, organId: 'teeth', d: 'M 170 97 L 170 103 M 176 97 L 176 103 M 182 97 L 182 103 M 188 97 L 188 103' }),
  S({ id: 'dig-tongue', kind: 'path', organId: 'tongue', d: 'M 168 104 C 174 102 186 102 192 104 C 192 110 186 114 180 114 C 174 114 168 110 168 104 Z' }),
  S({ id: 'dig-salivary-l', kind: 'ellipse', cx: 150, cy: 108, rx: 7, ry: 5, organId: 'salivaryglands', mirror: true }),
  S({ id: 'dig-esophagus', kind: 'line', strokeOnly: true, sw: 6, organId: 'esophagus', x1: 172, y1: 152, x2: 172, y2: 300 }),
  S({ id: 'dig-stomach', kind: 'path', organId: 'stomach', d: 'M 176 298 C 172 306 170 318 174 330 C 178 342 188 350 200 350 C 212 350 222 342 224 330 C 225 322 222 312 216 306 C 206 300 190 296 176 298 Z' }),
  S({ id: 'dig-liver', kind: 'path', organId: 'liver', d: 'M 128 302 C 124 316 124 332 130 342 C 140 350 160 350 174 344 C 180 340 184 330 184 318 C 184 308 180 302 172 300 C 156 296 138 296 128 302 Z' }),
  S({ id: 'dig-gallbladder', kind: 'path', organId: 'gallbladder', d: 'M 172 344 C 168 350 168 358 172 362 C 176 364 180 360 180 354 C 180 348 178 344 172 344 Z' }),
  S({ id: 'dig-pancreas', kind: 'path', organId: 'pancreas', d: 'M 150 356 C 146 362 148 368 154 370 C 168 374 190 372 206 368 C 212 366 214 360 210 356 C 192 352 166 352 150 356 Z' }),
  S({
    id: 'dig-smallintestine',
    kind: 'path',
    strokeOnly: true,
    sw: 9,
    organId: 'smallintestine',
    d: 'M 146 382 C 140 398 142 414 152 422 C 164 430 186 430 198 422 C 208 414 210 398 204 386 C 196 376 178 374 166 380 C 156 384 152 394 156 402 C 160 410 172 412 180 408',
  }),
  S({
    id: 'dig-largeintestine',
    kind: 'path',
    strokeOnly: true,
    sw: 9,
    organId: 'largeintestine',
    d: 'M 140 372 L 140 420 C 140 432 148 440 160 440 L 196 440 C 208 440 216 432 216 420 L 216 372 C 216 366 212 362 208 366 L 208 372 L 152 372 C 148 362 140 366 140 372 Z',
  }),
  S({ id: 'dig-appendix', kind: 'path', organId: 'appendix', d: 'M 148 436 C 144 442 146 450 152 452 C 156 452 158 446 156 442 Z' }),
  S({ id: 'dig-rectum', kind: 'line', strokeOnly: true, sw: 8, organId: 'rectum', x1: 180, y1: 442, x2: 180, y2: 470 }),
]

/* ============ الجهاز البولي (urinary) ============ */
const URINARY: ShapeDef[] = [
  S({ id: 'uri-kidney-l', kind: 'path', organId: 'kidneys', mirror: true, d: 'M 140 350 C 132 358 132 376 140 386 C 148 394 160 390 160 380 C 160 374 154 372 154 366 C 154 360 160 356 158 350 C 154 344 146 344 140 350 Z' }),
  S({ id: 'uri-ureter-l', kind: 'path', strokeOnly: true, sw: 3.5, organId: 'ureters', mirror: true, d: 'M 148 390 L 172 428' }),
  S({ id: 'uri-bladder', kind: 'ellipse', cx: 180, cy: 438, rx: 16, ry: 13, organId: 'bladder' }),
  S({ id: 'uri-urethra', kind: 'line', strokeOnly: true, sw: 3.5, organId: 'urethra', x1: 180, y1: 452, x2: 180, y2: 472 }),
]

/* ============ التناسلي (ذكر) ============ */
const REPRO_MALE: ShapeDef[] = [
  S({ id: 'rep-m-scrotum', kind: 'path', sex: 'male', d: 'M 152 470 C 148 480 150 494 160 498 C 172 502 188 502 200 498 C 210 494 212 480 208 470 C 198 464 162 464 152 470 Z' }),
  S({ id: 'rep-m-testis-l', kind: 'ellipse', cx: 164, cy: 484, rx: 9, ry: 11, organId: 'testes', sex: 'male', mirror: true }),
  S({ id: 'rep-m-epididymis-l', kind: 'path', strokeOnly: true, sw: 3, organId: 'epididymis', sex: 'male', mirror: true, d: 'M 155 474 C 151 480 151 490 155 496' }),
  S({ id: 'rep-m-vas-l', kind: 'path', strokeOnly: true, sw: 2.5, organId: 'vasdeferens', sex: 'male', mirror: true, d: 'M 164 472 L 174 458 L 176 450' }),
  S({ id: 'rep-m-vesicle-l', kind: 'ellipse', cx: 166, cy: 450, rx: 5, ry: 4, organId: 'seminalvesicles', sex: 'male', mirror: true }),
  S({ id: 'rep-m-prostate', kind: 'ellipse', cx: 180, cy: 456, rx: 8, ry: 6, organId: 'prostate', sex: 'male' }),
  S({ id: 'rep-m-penis', kind: 'path', organId: 'penis', sex: 'male', d: 'M 177 462 C 175 468 175 478 177 484 C 179 487 181 487 183 484 C 185 478 185 468 183 462 Z' }),
]

/* ============ التناسلي (أنثى) ============ */
const REPRO_FEMALE: ShapeDef[] = [
  S({ id: 'rep-f-breast-l', kind: 'circle', cx: 152, cy: 246, r: 17, organId: 'breasts', sex: 'female', mirror: true }),
  S({ id: 'rep-f-ovary-l', kind: 'ellipse', cx: 150, cy: 450, rx: 9, ry: 6, organId: 'ovaries', sex: 'female', mirror: true }),
  S({ id: 'rep-f-tube-l', kind: 'path', strokeOnly: true, sw: 3, organId: 'fallopiantubes', sex: 'female', mirror: true, d: 'M 158 448 C 164 438 172 434 178 436' }),
  S({ id: 'rep-f-uterus', kind: 'path', organId: 'uterus', sex: 'female', d: 'M 168 432 C 162 438 162 448 168 454 C 172 458 188 458 192 454 C 198 448 198 438 192 432 C 186 428 174 428 168 432 Z' }),
  S({ id: 'rep-f-cervix', kind: 'path', organId: 'cervix', sex: 'female', d: 'M 176 456 L 184 456 L 184 464 L 176 464 Z' }),
  S({ id: 'rep-f-vagina', kind: 'line', strokeOnly: true, sw: 4, organId: 'vagina', sex: 'female', x1: 180, y1: 464, x2: 180, y2: 488 }),
]

/* ============ الجهاز اللمفاوي (lymphatic) ============ */
const LYMPHATIC: ShapeDef[] = [
  S({ id: 'lym-tonsil-l', kind: 'circle', cx: 160, cy: 126, r: 4, organId: 'tonsils', mirror: true }),
  S({ id: 'lym-thymus', kind: 'path', organId: 'thymus', d: 'M 162 182 C 156 190 156 204 162 212 C 170 216 178 214 180 210 C 182 214 190 216 198 212 C 204 204 204 190 198 182 C 188 178 172 178 162 182 Z' }),
  S({ id: 'lym-spleen', kind: 'path', organId: 'spleen', d: 'M 222 328 C 216 334 216 346 222 352 C 228 356 236 352 238 344 C 239 336 234 328 228 326 Z' }),
  S({ id: 'lym-node-neck-l', kind: 'path', organId: 'lymphnodes', mirror: true, d: 'M 150 150 m -2.5 0 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0 M 145 158 m -2.5 0 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0' }),
  S({ id: 'lym-node-armpit-l', kind: 'path', organId: 'lymphnodes', mirror: true, d: 'M 114 214 m -2.5 0 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0 M 118 222 m -2.5 0 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0' }),
  S({ id: 'lym-node-groin-l', kind: 'path', organId: 'lymphnodes', mirror: true, d: 'M 162 472 m -2.5 0 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0 M 166 478 m -2.5 0 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0' }),
  S({ id: 'lym-vessel-l', kind: 'path', strokeOnly: true, sw: 1.5, dash: '3 4', organId: 'lymphvessels', mirror: true, d: 'M 114 216 C 130 260 144 320 152 380 C 156 410 158 440 162 470' }),
]

/* ============ الغدد الصماء (endocrine) ============ */
const ENDOCRINE: ShapeDef[] = [
  S({ id: 'end-pituitary', kind: 'ellipse', cx: 180, cy: 66, rx: 8, ry: 5, organId: 'pituitary' }),
  S({ id: 'end-thyroid', kind: 'path', organId: 'thyroid', d: 'M 168 140 C 162 144 162 152 168 154 C 174 156 178 152 180 148 C 182 152 186 156 192 154 C 198 152 198 144 192 140 C 186 136 174 136 168 140 Z' }),
  S({ id: 'end-parathyroid', kind: 'path', organId: 'parathyroid', d: 'M 170 142 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0 M 190 142 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0 M 170 150 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0 M 190 150 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0' }),
  S({ id: 'end-adrenal-l', kind: 'path', organId: 'adrenals', mirror: true, d: 'M 138 346 C 142 338 152 338 156 344 C 152 347 142 347 138 346 Z' }),
]

/* ============ الأوعية الدموية (vessels) ============ */
const VESSELS: ShapeDef[] = [
  S({ id: 'vas-aorta', kind: 'path', strokeOnly: true, sw: 7, organId: 'aorta', d: 'M 182 232 C 182 220 178 212 170 210 C 162 208 158 214 158 222 L 158 300 C 158 320 162 336 166 344' }),
  S({ id: 'vas-svc', kind: 'line', strokeOnly: true, sw: 6, organId: 'venacava', x1: 198, y1: 214, x2: 198, y2: 240 }),
  S({ id: 'vas-ivc', kind: 'path', strokeOnly: true, sw: 6, organId: 'venacava', d: 'M 194 270 L 194 336 C 194 344 190 350 186 352' }),
  S({ id: 'vas-pulm-l', kind: 'path', strokeOnly: true, sw: 5, organId: 'pulmonaryartery', mirror: true, d: 'M 176 238 C 166 232 158 228 150 226' }),
  S({ id: 'vas-arm-l', kind: 'path', strokeOnly: true, sw: 3.5, organId: 'arteries', mirror: true, d: 'M 94 192 C 88 240 86 280 90 320 C 92 360 94 400 96 436' }),
  S({ id: 'vas-arm-v-l', kind: 'path', strokeOnly: true, sw: 3.5, organId: 'veins', mirror: true, d: 'M 102 192 C 98 240 98 280 100 320 C 102 360 104 400 106 436' }),
  S({ id: 'vas-leg-l', kind: 'path', strokeOnly: true, sw: 3.5, organId: 'arteries', mirror: true, d: 'M 162 484 C 160 540 158 600 158 660 C 158 680 158 694 158 706' }),
  S({ id: 'vas-leg-v-l', kind: 'path', strokeOnly: true, sw: 3.5, organId: 'veins', mirror: true, d: 'M 172 484 C 170 540 168 600 168 660 C 168 680 168 694 168 706' }),
  S({
    id: 'vas-cap-hand-l',
    kind: 'path',
    strokeOnly: true,
    sw: 1.5,
    dash: '2 3',
    organId: 'capillaries',
    mirror: true,
    d: 'M 92 452 C 96 458 100 452 104 458 C 108 464 112 458 112 466 M 90 466 C 94 472 100 466 104 472 C 108 476 110 472 112 476',
  }),
]

/* ============ الجهاز العصبي (nervous) ============ */
const NERVOUS: ShapeDef[] = [
  S({
    id: 'ner-brain',
    kind: 'path',
    organId: 'brain',
    d: 'M 148 64 C 146 48 158 40 172 40 C 176 38 184 38 188 40 C 202 40 214 48 212 64 C 216 74 210 84 200 88 C 192 93 168 93 160 88 C 150 84 144 74 148 64 Z M 164 48 C 160 56 162 64 168 68 M 196 48 C 200 56 198 64 192 68 M 180 40 L 180 88',
  }),
  S({ id: 'ner-cerebellum', kind: 'ellipse', cx: 180, cy: 100, rx: 15, ry: 9, organId: 'cerebellum' }),
  S({ id: 'ner-brainstem', kind: 'path', organId: 'brainstem', d: 'M 176 106 L 184 106 L 183 134 L 177 134 Z' }),
  S({ id: 'ner-spinal', kind: 'line', strokeOnly: true, sw: 5, organId: 'spinalcord', x1: 180, y1: 136, x2: 180, y2: 424 }),
  S({ id: 'ner-brachial-l', kind: 'path', strokeOnly: true, sw: 2, organId: 'peripheralnerves', mirror: true, d: 'M 178 152 C 162 158 144 162 128 170 C 116 178 108 190 104 204 M 128 170 C 122 184 118 198 116 210' }),
  S({ id: 'ner-sciatic-l', kind: 'path', strokeOnly: true, sw: 2, organId: 'peripheralnerves', mirror: true, d: 'M 180 432 C 172 472 168 522 166 572 C 165 622 166 672 168 712' }),
  S({ id: 'ner-optic-l', kind: 'line', strokeOnly: true, sw: 2, organId: 'opticnerve', mirror: true, x1: 162, y1: 74, x2: 176, y2: 66 }),
  S({ id: 'ner-acoustic-l', kind: 'line', strokeOnly: true, sw: 1.5, organId: 'acousticnerve', mirror: true, x1: 138, y1: 82, x2: 162, y2: 70 }),
]

/* ============ الأنسجة السطحية (soft) ============ */
const SOFT: ShapeDef[] = [
  S({ id: 'soft-chest', kind: 'path', d: 'M 140 200 C 136 224 140 244 152 252 C 168 258 192 258 208 252 C 220 244 224 224 220 200 C 204 192 156 192 140 200 Z' }),
  S({ id: 'soft-abdomen', kind: 'path', d: 'M 148 268 C 144 300 146 336 154 362 C 166 370 194 370 206 362 C 214 336 216 300 212 268 C 196 260 164 260 148 268 Z' }),
  S({ id: 'soft-thigh-l', kind: 'path', d: 'M 150 452 C 146 486 146 520 150 552 C 156 560 172 560 176 552 C 180 520 180 486 178 454 C 170 448 158 448 150 452 Z', mirror: true }),
]

/* ============ الجلد (skin) — شكل الجسم ============ */
const SKIN: ShapeDef[] = [
  S({
    id: 'fig-head',
    kind: 'path',
    organId: 'skin',
    d: 'M 134 82 C 134 44 152 26 180 26 C 208 26 226 44 226 82 C 226 104 218 120 204 128 C 196 133 190 136 180 136 C 170 136 164 133 156 128 C 142 120 134 104 134 82 Z',
  }),
  S({
    id: 'fig-ear-l',
    kind: 'path',
    mirror: true,
    d: 'M 132 72 C 122 66 116 78 122 90 C 126 98 134 96 133 88 C 133 82 132 76 132 72 Z',
  }),
  S({
    id: 'fig-neck',
    kind: 'path',
    d: 'M 164 126 C 164 140 164 150 161 160 L 199 160 C 196 150 196 140 196 126 C 188 133 172 133 164 126 Z',
  }),
  S({
    id: 'fig-torso-m',
    kind: 'path',
    sex: 'male',
    d: 'M 116 168 C 112 182 110 204 112 232 C 114 264 118 296 124 326 C 128 352 134 374 140 396 C 144 414 148 428 150 440 L 210 440 C 212 428 216 414 220 396 C 226 374 232 352 236 326 C 242 296 246 264 248 232 C 250 204 248 182 244 168 C 224 158 136 158 116 168 Z',
  }),
  S({
    id: 'fig-torso-f',
    kind: 'path',
    sex: 'female',
    d: 'M 116 168 C 112 182 110 204 112 232 C 114 264 118 296 124 326 C 128 352 134 374 140 396 C 145 414 151 428 152 440 L 208 440 C 209 428 215 414 220 396 C 226 374 232 352 236 326 C 242 296 246 264 248 232 C 250 204 248 182 244 168 C 224 158 136 158 116 168 Z',
  }),
  S({
    id: 'fig-arm-l',
    kind: 'path',
    mirror: true,
    d: 'M 110 170 C 96 176 88 190 85 208 L 76 296 C 74 312 77 326 83 338 L 90 424 C 91 442 95 456 103 464 L 105 490 C 106 502 118 502 119 491 L 120 460 C 116 448 114 438 114 428 L 108 344 C 107 330 109 318 114 308 L 122 218 C 124 200 122 184 114 172 Z',
  }),
  S({
    id: 'fig-hand-l',
    kind: 'path',
    mirror: true,
    d: 'M 100 490 C 98 506 104 514 111 514 C 118 514 122 505 120 491 C 114 495 106 495 100 490 Z',
  }),
  S({
    id: 'fig-leg-l',
    kind: 'path',
    mirror: true,
    d: 'M 150 428 C 143 470 141 510 145 548 C 149 586 154 620 158 650 C 160 676 161 700 162 720 C 162 735 177 737 178 724 L 179 700 C 180 674 181 648 181 624 C 182 596 183 568 183 546 C 184 514 183 484 180 464 C 177 452 171 442 163 434 Z',
  }),
  S({
    id: 'fig-foot-l',
    kind: 'path',
    mirror: true,
    d: 'M 150 724 L 178 724 C 180 736 174 744 163 744 C 152 744 146 734 150 724 Z',
  }),
  // تفاصيل ذكرية/أنثوية على الجلد
  S({
    id: 'fig-pec-line-m',
    kind: 'path',
    strokeOnly: true,
    sw: 2,
    sex: 'male',
    d: 'M 138 238 C 146 246 160 248 172 244 M 222 238 C 214 246 200 248 188 244 M 180 240 L 180 252',
  }),
  S({
    id: 'fig-adams-m',
    kind: 'path',
    sex: 'male',
    d: 'M 177 136 C 176 140 176 144 180 146 C 184 144 184 140 183 136 Z',
  }),
]

/* ============ أعضاء الحس (sensory) ============ */
const SENSORY: ShapeDef[] = [
  S({
    id: 'sen-eye-l',
    kind: 'path',
    organId: 'eye',
    mirror: true,
    d: 'M 148 74 C 148 69 153 66 158 66 C 163 66 168 69 168 74 C 168 79 163 82 158 82 C 153 82 148 79 148 74 Z M 158 74 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0',
  }),
  S({
    id: 'sen-ear-l',
    kind: 'path',
    organId: 'ear',
    mirror: true,
    d: 'M 130 70 C 122 66 116 76 120 88 C 123 96 130 96 131 88 C 131 82 130 76 130 70 Z',
  }),
  S({
    id: 'sen-nose',
    kind: 'path',
    organId: 'nose',
    d: 'M 174 80 C 174 90 176 98 180 100 C 184 98 186 90 186 80 C 182 76 178 76 174 80 Z',
  }),
]

/* ============ تجميع حسب الطبقة ============ */
export const LAYER_SHAPES: Record<LayerId, ShapeDef[]> = {
  bones: BONES,
  circulatory: CIRCULATORY,
  respiratory: RESPIRATORY,
  digestive: DIGESTIVE,
  urinary: URINARY,
  reproductive: [...REPRO_MALE, ...REPRO_FEMALE],
  lymphatic: LYMPHATIC,
  endocrine: ENDOCRINE,
  vessels: VESSELS,
  nervous: NERVOUS,
  muscles: MUSCLES,
  soft: SOFT,
  skin: SKIN,
  sensory: SENSORY,
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
    const def = allShapes().find((s) => s.def.id === sid)
    if (def?.def.mirror) set.add(sid) // المرآة لها نفس المعرف
  }
  return set
}
