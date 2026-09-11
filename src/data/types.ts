/** أنواع البيانات المركزية لموسوعة جسمي. */

export type Sex = 'male' | 'female'

export type SystemId =
  | 'nervous'
  | 'circulatory'
  | 'respiratory'
  | 'digestive'
  | 'urinary'
  | 'skeletal'
  | 'muscular'
  | 'reproductive'
  | 'lymphatic'
  | 'endocrine'
  | 'immune'
  | 'sensory'

/** معرّفات الطبقات البصرية على النموذج (ترتيب العرض من الأسفل إلى الأعلى). */
export type LayerId =
  | 'bones'
  | 'circulatory'
  | 'respiratory'
  | 'digestive'
  | 'urinary'
  | 'reproductive'
  | 'lymphatic'
  | 'endocrine'
  | 'vessels'
  | 'nervous'
  | 'muscles'
  | 'soft'
  | 'skin'
  | 'sensory'

export type OrganLevel = 1 | 2 | 3

export interface OrganRelation {
  /** معرف العضو المرتبط. */
  id: string
  /** وصف العلاقة باختصار. */
  note?: string
}

export interface OrganTerm {
  ar: string
  en: string
}

export interface OrganFaq {
  q: string
  a: string
}

export interface OrganModelRef {
  /** معرّفات الأشكال على النموذج التي تمثل هذا العضو. */
  shapeIds: string[]
  /** مربع القصّ [x, y, w, h] للتركيز على العضو. */
  box: [number, number, number, number]
  /** نقطة تسمية [x, y]. */
  label: [number, number]
}

export interface Organ {
  id: string
  /** الاسم العربي. */
  ar: string
  /** الاسم الإنجليزي. */
  en: string
  /** الاسم الطبي/اللاتيني عند توفره. */
  medical?: string
  /** الجهاز الرئيسي. */
  system: SystemId
  /** أجهزة فرعية إضافية. */
  systems?: SystemId[]
  /** الطبقة البصرية الأساسية على النموذج. */
  layer: LayerId
  /** الجنس: both (افتراضي) | male | female — يخص الاختلافات التشريحية. */
  sex?: Sex | 'both'
  /** ثلاث مستويات من الشرح: مبسط، تعليمي، متقدم. */
  levels: [string, string, string]
  /** الوظيفة. */
  function: string
  /** الموقع التشريحي. */
  location: string
  /** كيف يعمل. */
  how: string
  /** المكونات/الأجزاء الرئيسية. */
  parts?: string[]
  /** العلاقات مع أعضاء أخرى. */
  relations?: OrganRelation[]
  /** حقائق سريعة. */
  facts?: string[]
  /** مصطلحات (عربي + إنجليزي). */
  terms?: OrganTerm[]
  /** هل تعلم؟ */
  didYouKnow?: string
  /** أسئلة شائعة. */
  faqs?: OrganFaq[]
  /** ماذا يحدث عند توقف وظيفته؟ (تعليمي عام). */
  ifStopped?: string
  /** كلمات مفتاحية للبحث (عربي + إنجليزي + مرادفات). */
  keywords?: string[]
  /** مصدر المحتوى. */
  source?: string
  /** مراجع. */
  refs?: string[]
  /** تاريخ المراجعة. */
  reviewedAt?: string
  /** ربط بالرسوم على النموذج. */
  model?: OrganModelRef
}

export interface System {
  id: SystemId
  ar: string
  en: string
  icon: string
  /** لون مميز للجهاز (قيمة css). */
  color: string
  description: string
  /** ترتيب العرض. */
  order: number
  /** هل للجهاز أعضاء تظهر على النموذج. */
  hasModelShapes: boolean
  /** ملاحظة عن الجنس (للمحتوى المختلف). */
  sexNote?: string
}

export interface LayerDef {
  id: LayerId
  ar: string
  en: string
  icon: string
  /** هل هي طبقة نسيجية (جلد/عضلات/عظام) أم جهاز. */
  kind: 'tissue' | 'system'
  /** الجهاز المرتبط إن كانت من نوع system. */
  systemId?: SystemId
  /** مفعّلة افتراضيًا. */
  defaultOn: boolean
  order: number
}

export interface GlossaryTerm {
  ar: string
  en: string
  definition: string
  /** عضو/جهاز مرتبط (اختياري). */
  organId?: string
  systemId?: SystemId
  keywords?: string[]
}

export type QuizType = 'mcq' | 'tf' | 'system' | 'location'

export interface QuizQuestion {
  id: string
  type: QuizType
  /** نص السؤال. */
  text: string
  /** العضو المرتبط (إن وجد) لعرض رسمة. */
  organId?: string
  /** الخيارات. */
  options: string[]
  /** فهرس الإجابة الصحيحة. */
  answer: number
  /** توضيح بعد الإجابة. */
  explain?: string
}

export interface JourneyStep {
  id: string
  title: string
  /** نص الشرح (مستوى 2 افتراضيًا). */
  text: string
  /** عضو يُضاء على النموذج (اختياري). */
  organId?: string
  /** طبقة تُبرز (اختياري). */
  layer?: LayerId
  icon: string
}

export interface BloodTourStep {
  organId: string
  title: string
  text: string
  /** نقطة مسار متحركة [x,y] (اختياري). */
  point?: [number, number]
}

export interface CompareRow {
  feature: string
  male: string
  female: string
  note?: string
}

export interface TourDef {
  id: 'blood' | 'food' | 'air'
  ar: string
  icon: string
  color: string
  intro: string
  steps: { organId: string; title: string; text: string }[]
}
