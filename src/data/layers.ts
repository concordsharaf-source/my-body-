import type { LayerDef, LayerId } from './types'

/**
 * طبقات العرض على النموذج — بترتيب "التقشير" التشريحي:
 * السطح (جلد، أنسجة) ← عمق (عضلات، عظام) ← أجهزة داخلية.
 */
export const LAYERS: LayerDef[] = [
  { id: 'skin', ar: 'الجلد', en: 'Skin', icon: '️', kind: 'tissue', defaultOn: true, order: 1 },
  { id: 'soft', ar: 'الأنسجة السطحية', en: 'Superficial Tissue', icon: '🫧', kind: 'tissue', defaultOn: false, order: 2 },
  { id: 'muscles', ar: 'العضلات', en: 'Muscles', icon: '💪', kind: 'tissue', defaultOn: false, order: 3 },
  { id: 'bones', ar: 'الهيكل العظمي', en: 'Skeleton', icon: '🦴', kind: 'tissue', defaultOn: false, order: 4 },
  { id: 'nervous', ar: 'الجهاز العصبي', en: 'Nervous System', icon: '🧠', kind: 'system', systemId: 'nervous', defaultOn: false, order: 5 },
  { id: 'circulatory', ar: 'القلب', en: 'Heart', icon: '❤️', kind: 'system', systemId: 'circulatory', defaultOn: true, order: 6 },
  { id: 'vessels', ar: 'الأوعية الدموية', en: 'Blood Vessels', icon: '🩸', kind: 'system', systemId: 'circulatory', defaultOn: false, order: 7 },
  { id: 'respiratory', ar: 'الجهاز التنفسي', en: 'Respiratory', icon: '🫁', kind: 'system', systemId: 'respiratory', defaultOn: true, order: 8 },
  { id: 'digestive', ar: 'الجهاز الهضمي', en: 'Digestive', icon: '🍽️', kind: 'system', systemId: 'digestive', defaultOn: true, order: 9 },
  { id: 'urinary', ar: 'الجهاز البولي', en: 'Urinary', icon: '💧', kind: 'system', systemId: 'urinary', defaultOn: true, order: 10 },
  { id: 'reproductive', ar: 'الجهاز التناسلي', en: 'Reproductive', icon: '🧬', kind: 'system', systemId: 'reproductive', defaultOn: true, order: 11 },
  { id: 'lymphatic', ar: 'الجهاز اللمفاوي', en: 'Lymphatic', icon: '🔬', kind: 'system', systemId: 'lymphatic', defaultOn: false, order: 12 },
  { id: 'endocrine', ar: 'الغدد الصماء', en: 'Endocrine', icon: '⚡', kind: 'system', systemId: 'endocrine', defaultOn: false, order: 13 },
  { id: 'sensory', ar: 'أعضاء الحس', en: 'Sensory Organs', icon: '👁️', kind: 'system', systemId: 'sensory', defaultOn: true, order: 14 },
]

export const LAYER_BY_ID = new Map(LAYERS.map((l) => [l.id, l]))

/** "الأعضاء الداخلية" = مجموعة الطبقات الحشوية. */
export const INTERNAL_LAYERS: LayerId[] = [
  'circulatory',
  'respiratory',
  'digestive',
  'urinary',
  'reproductive',
  'lymphatic',
  'endocrine',
]

export function defaultLayerState(): Record<LayerId, boolean> {
  const s = {} as Record<LayerId, boolean>
  for (const l of LAYERS) s[l.id] = l.defaultOn
  return s
}

/**
 * خطوات وضع "تشريح طبقي": كل خطوة تبرز طبقة وتعتّم ما فوقها،
 * كأن الجسم يتم تقشيره طبقة بعد طبقة.
 */
export const DISSECTION_STEPS: { id: string; ar: string; layer: LayerId | null; icon: string }[] = [
  { id: 'normal', ar: 'عرض عادي', layer: null, icon: '🧍' },
  { id: 'skin', ar: 'الجلد', layer: 'skin', icon: '🖐️' },
  { id: 'muscles', ar: 'العضلات', layer: 'muscles', icon: '💪' },
  { id: 'bones', ar: 'العظام', layer: 'bones', icon: '🦴' },
  { id: 'vessels', ar: 'الأوعية', layer: 'vessels', icon: '🩸' },
  { id: 'nervous', ar: 'الأعصاب', layer: 'nervous', icon: '🧠' },
  { id: 'organs', ar: 'الأعضاء', layer: null, icon: '🫀' },
  { id: 'systems', ar: 'الأجهزة الداخلية', layer: null, icon: '🏥' },
]
