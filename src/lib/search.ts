import type { Organ } from '../data/types'
import { ALL_ORGANS } from '../data'

/** تطبيع النص العربي: إزالة التشكيل وتوحيد الهمزات والتاء المربوطة. */
export function normalizeAr(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0640]/g, '') // تشكيل + تطويل
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[\u200f\u200e]/g, '')
    .trim()
}

function normAny(text: string): string {
  return normalizeAr(text).replace(/\s+/g, ' ')
}

export interface SearchHit {
  organ: Organ
  score: number
  /** أين وقع التطابق (للعرض). */
  matchedOn: 'name' | 'en' | 'medical' | 'keyword' | 'function' | 'alias' | 'disease' | 'food'
}

/**
 * محرك البحث المحلي:
 * يدعم العربية/الإنجليزية/الأسماء الطبية/المرادفات/الوصف الوظيفي.
 */
export function searchOrgans(query: string): SearchHit[] {
  const q = normAny(query)
  if (q.length < 2) return []
  const terms = q.split(' ').filter(Boolean)
  const hits: SearchHit[] = []

  for (const organ of ALL_ORGANS) {
    const ar = normAny(organ.ar)
    const en = normAny(organ.en)
    const medical = normAny(organ.medical ?? '')
    const keywords = (organ.keywords ?? []).map(normAny)
    const func = normAny(organ.function)
    const what = normAny(organ.levels[1])

    let best = 0
    let matchedOn: SearchHit['matchedOn'] = 'name'

    // تطابق مباشر على الاسم العربي
    if (ar.includes(q)) {
      best = ar === q ? 100 : ar.startsWith(q) ? 85 : 70
      matchedOn = 'name'
    }
    // تطابق على الاسم الإنجليزي/الطبي
    if (en.includes(q)) {
      const s = en === q ? 95 : en.startsWith(q) ? 80 : 65
      if (s > best) {
        best = s
        matchedOn = 'en'
      }
    }
    if (medical && medical.includes(q)) {
      const s = medical.startsWith(q) ? 60 : 55
      if (s > best) {
        best = s
        matchedOn = 'medical'
      }
    }
    // كلمات مفتاحية (مرادفات + مفاهيم)
    for (const kw of keywords) {
      if (kw === q) {
        if (80 > best) {
          best = 80
          matchedOn = 'keyword'
        }
        break
      }
      if (kw.startsWith(q) || q.startsWith(kw)) {
        if (60 > best) {
          best = 60
          matchedOn = 'keyword'
        }
      }
    }
    // بحث مفاهيمي: جملة كاملة تطابق الوصف/الوظيفة
    if (q.length >= 4 && (func.includes(q) || what.includes(q))) {
      if (50 > best) {
        best = 50
        matchedOn = 'function'
      }
    }
    // أمراض العضو
    const diseaseHay = (organ.diseases ?? [])
      .map((d) => `${normAny(d.ar)} ${normAny(d.en)}`)
      .join(' ')
    if (diseaseHay && (diseaseHay.includes(q) || terms.every((t) => diseaseHay.includes(t)))) {
      if (45 > best) {
        best = 45
        matchedOn = 'disease'
      }
    }
    // أطعمة العضو
    const foodHay = (organ.foods ?? []).map((f) => normAny(f.ar)).join(' ')
    if (foodHay && (foodHay.includes(q) || terms.every((t) => foodHay.includes(t)))) {
      if (40 > best) {
        best = 40
        matchedOn = 'food'
      }
    }
    // تطابق متعدد الكلمات: كل كلمة يجب أن تظهر في مكان ما
    if (terms.length > 1) {
      const hay = `${ar} ${en} ${medical} ${keywords.join(' ')} ${func}`
      const allFound = terms.every((t) => hay.includes(t))
      if (allFound) {
        best = Math.max(best, 45)
        if (matchedOn !== 'name') matchedOn = 'alias'
      } else {
        // كلمة واحدة على الأقل
        const found = terms.filter((t) => hay.includes(t)).length
        if (found < terms.length && best < 45) best = Math.min(best, found * 15)
      }
    }

    if (best >= 30) hits.push({ organ, score: best, matchedOn })
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, 20)
}
