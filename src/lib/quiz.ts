import type { QuizQuestion, SystemId } from '../data/types'
import { ALL_ORGANS, MODEL_ORGANS, organsOfSystem, getOrgan } from '../data'
import { SYSTEMS, systemById } from '../data/systems'
import { QUIZ_BANK } from '../data/quizzes'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pick<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n)
}

/** سؤال: إلى أي جهاز ينتمي العضو X؟ */
function systemQuestion(organId: string): QuizQuestion {
  const organ = getOrgan(organId)!
  const correct = systemById.get(organ.system)!.ar
  const wrong = pick(SYSTEMS.filter((s) => s.id !== organ.system), 3).map((s) => s.ar)
  const options = shuffle([correct, ...wrong])
  return {
    id: `gen-sys-${organId}`,
    type: 'system',
    organId: organ.id,
    text: `إلى أي جهاز ينتمي: ${organ.ar}؟`,
    options,
    answer: options.indexOf(correct),
    explain: `${organ.ar} ينتمي إلى ${correct}.`,
  }
}

/** سؤال: ما وظيفة العضو X؟ (4 وظائف) */
function functionQuestion(organId: string): QuizQuestion {
  const organ = getOrgan(organId)!
  const others = pick(ALL_ORGANS.filter((o) => o.id !== organ.id && o.function.length < 90), 3)
  const options = shuffle([organ.function, ...others.map((o) => o.function)])
  return {
    id: `gen-func-${organId}`,
    type: 'mcq',
    organId: organ.id,
    text: `ما الوظيفة الأساسية لـ${organ.ar}؟`,
    options,
    answer: options.indexOf(organ.function),
  }
}

/** سؤال: أين يوجد العضو X؟ */
function locationQuestion(organId: string): QuizQuestion {
  const organ = getOrgan(organId)!
  const others = pick(ALL_ORGANS.filter((o) => o.id !== organ.id && o.location.length < 80), 3)
  const options = shuffle([organ.location, ...others.map((o) => o.location)])
  return {
    id: `gen-loc-${organId}`,
    type: 'location',
    organId: organ.id,
    text: `أين يوجد ${organ.ar}؟`,
    options,
    answer: options.indexOf(organ.location),
  }
}

/** سؤال: ما العضو ذو الوصف التالي؟ */
function reverseQuestion(organId: string): QuizQuestion {
  const organ = getOrgan(organId)!
  const others = pick(ALL_ORGANS.filter((o) => o.id !== organ.id), 3)
  const options = shuffle([organ.ar, ...others.map((o) => o.ar)])
  return {
    id: `gen-rev-${organId}`,
    type: 'mcq',
    text: `أي عضو: «${organ.levels[1].split('.').slice(0, 1)[0]}»?`,
    options,
    answer: options.indexOf(organ.ar),
    organId: organ.id,
  }
}

/**
 * بناء اختبار من 10 أسئلة:
 * 4 من البنك المصنوع + توليد من قاعدة البيانات (جهاز/وظيفة/موقع/عكسي).
 */
export function buildQuiz(): QuizQuestion[] {
  const modelIds = MODEL_ORGANS.map((o) => o.id)
  const genIds = pick(modelIds, 6)
  const generated: QuizQuestion[] = [
    systemQuestion(genIds[0]),
    functionQuestion(genIds[1]),
    locationQuestion(genIds[2]),
    reverseQuestion(genIds[3]),
    systemQuestion(genIds[4]),
    functionQuestion(genIds[5]),
  ]
  const banked = pick(QUIZ_BANK, 4)
  return shuffle([...banked, ...generated])
}

/** الأجهزة التي لها أعضاء على النموذج (لعرض "اختر من النموذج"). */
export function systemsWithShapes(): SystemId[] {
  return SYSTEMS.filter((s) => s.hasModelShapes).map((s) => s.id)
}

/** عدد أعضاء الجهاز (للشارات). */
export function systemPartsCount(systemId: SystemId): number {
  return organsOfSystem(systemId).length
}
