import type { Organ, SystemId } from './types'
import { SYSTEMS } from './systems'

export { SYSTEMS, getSystem } from './systems'
import { NERVOUS_ORGANS } from './organs/nervous'
import { CIRCULATORY_ORGANS } from './organs/circulatory'
import { RESPIRATORY_ORGANS } from './organs/respiratory'
import { DIGESTIVE_ORGANS } from './organs/digestive'
import { URINARY_ORGANS } from './organs/urinary'
import { SKELETAL_ORGANS } from './organs/skeletal'
import { MUSCULAR_ORGANS } from './organs/muscular'
import { REPRO_MALE_ORGANS } from './organs/reproductive-male'
import { REPRO_FEMALE_ORGANS } from './organs/reproductive-female'
import { LYMPHATIC_ORGANS } from './organs/lymphatic'
import { ENDOCRINE_ORGANS } from './organs/endocrine'
import { SENSORY_ORGANS } from './organs/sensory'

export const ALL_ORGANS: Organ[] = [
  ...NERVOUS_ORGANS,
  ...CIRCULATORY_ORGANS,
  ...RESPIRATORY_ORGANS,
  ...DIGESTIVE_ORGANS,
  ...URINARY_ORGANS,
  ...SKELETAL_ORGANS,
  ...MUSCULAR_ORGANS,
  ...REPRO_MALE_ORGANS,
  ...REPRO_FEMALE_ORGANS,
  ...LYMPHATIC_ORGANS,
  ...ENDOCRINE_ORGANS,
  ...SENSORY_ORGANS,
]

export const ORGAN_BY_ID = new Map(ALL_ORGANS.map((o) => [o.id, o]))
export const getOrgan = (id: string): Organ | undefined => ORGAN_BY_ID.get(id)

/** أعضاء جهاز معين (مع الأجهزة الثانوية). */
export function organsOfSystem(systemId: SystemId): Organ[] {
  return ALL_ORGANS.filter((o) => o.system === systemId || o.systems?.includes(systemId))
}

/** أعضاء جهاز معيّن حسب الجنس (يخفي أعضاء الجنس الآخر). */
export function organsOfSystemForSex(systemId: SystemId, sex: 'male' | 'female' | null | undefined): Organ[] {
  if (!sex) return organsOfSystem(systemId)
  return organsOfSystem(systemId).filter((o) => !o.sex || o.sex === 'both' || o.sex === sex)
}

/** الأعضاء الظاهرة على النموذج (لها أشكال رسومية). */
export const MODEL_ORGANS = ALL_ORGANS.filter((o) => o.model && o.model.shapeIds.length > 0)

/** الأعضاء الظاهرة على النموذج حسب الجنس. */
export function modelOrgansForSex(sex: 'male' | 'female'): Organ[] {
  return MODEL_ORGANS.filter((o) => o.sex === 'both' || o.sex === undefined || o.sex === sex)
}

/** جهاز العضو (رئيسي). */
export function systemOfOrgan(id: string) {
  const o = getOrgan(id)
  if (!o) return undefined
  return SYSTEMS.find((s) => s.id === o.system)
}
