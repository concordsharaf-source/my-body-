// اختبار دخان شامل للتطبيق المبني (dist/) عبر Playwright
import { chromium } from 'playwright'

const BASE = process.env.BASE || 'http://127.0.0.1:4173'
const results = []
const errors = []

function check(name, ok, extra = '') {
  results.push({ name, ok })
  console.log(`${ok ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`)
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })

page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})
page.on('pageerror', (err) => errors.push('PAGEERROR: ' + err.message))

// 1) الصفحة الرئيسية
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.waitForTimeout(600)
check('الرئيسية: عنوان التطبيق', await page.title().then((t) => t.includes('جسمي')))
check('الرئيسية: شاشة اختيار الجنس', await page.locator('.sex-select').count() === 1)

// 2) اختيار الجنس
await page.locator('.sex-btn', { hasText: 'ذكر' }).first().click()
await page.waitForTimeout(600)
check('اختيار الجنس: دخلنا الرئيسية', await page.locator('.home-hero').count() === 1)
check('الرئيسية: النموذج مرسوم (أشكال SVG)', (await page.locator('.body-svg path').count()) > 20)

// 3) صفحة الجسم + طبقات
await page.goto(BASE + '/body')
await page.waitForTimeout(800)
const shapeCount = await page.locator('.body-svg .organ-shape').count()
check('الجسم: أشكال أعضاء تفاعلية', shapeCount > 30, `(${shapeCount} شكل)`)

// 4) النقر على عضو (القلب)
await page.locator('.organ-shape').first().click({ force: true })
await page.waitForTimeout(400)
check('النقر: بطاقة العضو ظهرت', await page.locator('.organ-card').count() === 1)

// 5) نظام معزول
await page.goto(BASE + '/system/circulatory')
await page.waitForTimeout(800)
check('نظام: لافتة الجهاز', await page.locator('.system-banner').count() === 1)
check('نظام: عدّاد الأجزاء', await page.locator('.system-banner strong').count() >= 1)

// 6) عضلة القلب عبر الرابط العميق
await page.goto(BASE + '/organ/heart')
await page.waitForTimeout(800)
check('رابط عميق /organ/heart: البطاقة', await page.locator('.organ-card').count() === 1)
check('رابط عميق: اسم العضو', (await page.locator('.organ-card').innerText()).includes('قلب'))

// 7) البحث العربي
await page.goto(BASE + '/search')
await page.waitForTimeout(400)
await page.fill('.search-box input', 'تنقية الدم')
await page.waitForTimeout(600)
const searchText = await page.locator('.search-results').innerText().catch(() => '')
check('بحث مفهوم (تنقية الدم): نتائج', searchText.includes('الكلي'), searchText.slice(0, 60))

// 8) البحث الإنجليزي
await page.fill('.search-box input', 'heart')
await page.waitForTimeout(500)
check('بحث إنجليزي (heart): نتائج', (await page.locator('.search-results').innerText()).toLowerCase().includes('heart'))

// 9) المفضلة: إضافة ثم ظهور
await page.goto(BASE + '/organ/liver')
await page.waitForTimeout(500)
const favBtn = page.locator('.organ-card-actions .btn', { hasText: 'أضف للمفضلة' }).first()
if (await favBtn.count()) {
  await favBtn.click()
  await page.goto(BASE + '/favorites')
  await page.waitForTimeout(400)
  check('مفضلة: العضو المضاف يظهر', (await page.locator('.fav-item').count()) >= 1)
} else {
  check('مفضلة: زر الإضافة موجود', false, 'لم أجد زر القلب في البطاقة')
}

// 10) الاختبار
await page.goto(BASE + '/quiz')
await page.waitForTimeout(400)
await page.locator('button', { hasText: 'ابدأ' }).first().click()
await page.waitForTimeout(500)
check('اختبار: سؤال أول', await page.locator('.quiz-option').count() >= 2)
// إجابة على السؤال الأول
await page.locator('.quiz-option').first().click()
await page.locator('.quiz-card .btn-primary').click()
await page.waitForTimeout(400)
check('اختبار: السؤال الثاني', (await page.locator('.quiz-option').count()) >= 2)

// 11) الجولات: قطرة الدم
await page.goto(BASE + '/tours/blood')
await page.waitForTimeout(600)
check('جولة الدم: بطاقة المرحلة', await page.locator('.tour-card').count() === 1)
await page.locator('.tour-nav .btn-primary').first().click()
await page.waitForTimeout(600)
check('جولة الدم: المرحلة التالية', (await page.locator('.tour-card').innerText()).length > 10)

// 12) صفحة جهاز (عزل + تسميات)
await page.goto(BASE + '/system/digestive')
await page.waitForTimeout(500)
check('صفحة الجهاز: شريط الجهاز ظاهر', await page.locator('.system-banner').count() === 1)

// 13) البطاقات التعليمية
await page.goto(BASE + '/cards')
await page.waitForTimeout(400)
check('بطاقات: واجهة البطاقة', await page.locator('.flashcard').count() === 1)
await page.locator('.flashcard').click()
await page.waitForTimeout(500)
check('بطاقات: الوجه الخلفي (اسم العضو)', await page.locator('.flashcard.flipped .flashcard-back h2').count() === 1)

// 14) تعلمي
await page.goto(BASE + '/learning')
await page.waitForTimeout(400)
check('تعلمي: إحصاءات', (await page.locator('.stat-card').count()) >= 4)

// 15) المقارنة
await page.goto(BASE + '/compare')
await page.waitForTimeout(300)
check('مقارنة: جدول الفروق', (await page.locator('.compare-table tbody tr').count()) >= 5)

// 16) المصطلحات
await page.goto(BASE + '/glossary')
await page.waitForTimeout(300)
check('مصطلحات: قائمة المصطلحات', (await page.locator('.glossary-item').count()) >= 10)

// 17) الإعدادات: الوضع الداكن
await page.goto(BASE + '/settings')
await page.waitForTimeout(300)
await page.locator('.segmented button', { hasText: 'داكن' }).first().click()
await page.waitForTimeout(300)
check('إعدادات: الوضع الداكن مفعّل', await page.evaluate(() => document.documentElement.classList.contains('dark')))
await page.locator('.segmented button', { hasText: 'فاتح' }).first().click()
await page.waitForTimeout(200)

// 18) Service Worker
const swCount = await page.evaluate(async () => {
  const regs = await navigator.serviceWorker.getRegistrations()
  return regs.length
})
check('Service Worker مسجل', swCount >= 1)

// 18b) وضع الأنثى: أعضاء تناسلية إناث
await page.goto(BASE + '/body')
await page.waitForTimeout(500)
await page.locator('.sex-toggle button', { hasText: 'أنثى' }).click()
await page.waitForTimeout(600)
const femaleShapes = await page.evaluate(() => {
  const g = [...document.querySelectorAll('.body-root > g')].find((x) => x.className.baseVal.includes('layer-reproductive'))
  return g ? g.querySelectorAll('.organ-shape').length : 0
})
check('نموذج أنثى: أشكال تناسلية مختلفة', femaleShapes >= 4, `(${femaleShapes})`)

// 18c) وضع offline (SW)
await page.evaluate(() => navigator.serviceWorker.ready)
await page.context().setOffline(true)
await page.reload({ waitUntil: 'load' })
await page.waitForTimeout(1500)
const offlineOk = await page.evaluate(() => !!document.querySelector('.app-shell') || !!document.querySelector('.sex-select'))
check('وضع offline: التطبيق يعمل بدون شبكة', offlineOk)
await page.context().setOffline(false)

// 19) Manifest
const manifestUrl = await page.evaluate(async () => {
  const link = document.querySelector('link[rel="manifest"]')
  if (!link) return null
  const res = await fetch(link.href)
  return await res.json()
})
check('Manifest: موجود + عربي', !!manifestUrl && manifestUrl.lang === 'ar', manifestUrl?.name ?? '')
check('Manifest: أيقونات', !!manifestUrl && manifestUrl.icons.length >= 2)

// 20) 404
await page.goto(BASE + '/nope')
await page.waitForTimeout(300)
check('صفحة 404', (await page.locator('.empty-state').innerText()).includes('404'))

await browser.close()

const failed = results.filter((r) => !r.ok)
console.log(`\n=== النتيجة: ${results.length - failed.length}/${results.length} ناجح ===`)
console.log(`أخطاء الكونسول: ${errors.length}`)
errors.slice(0, 15).forEach((e) => console.log('  ⚠', e.slice(0, 200)))
process.exit(failed.length ? 1 : 0)
