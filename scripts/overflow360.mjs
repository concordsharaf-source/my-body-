import { chromium } from 'playwright'

const BASE = 'http://127.0.0.1:4173'
const organs = ['brain', 'heart', 'liver', 'stomach', 'kidney', 'uterus', 'skin', 'pancreas', 'bladder', 'appendix', 'thyroid', 'lung']
const systems = ['skeletal', 'muscular', 'nervous', 'circulatory', 'respiratory', 'digestive', 'urinary', 'reproductive', 'lymphatic', 'endocrine', 'immune', 'sensory']
const routes = [
  '/', '/body', '/search', '/favorites', '/tours', '/quiz', '/cards', '/learning', '/compare', '/glossary', '/settings', '/about', '/nope-404',
  ...organs.map((o) => `/organ/${o}`),
  ...systems.map((s) => `/system/${s}`),
]

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 360, height: 740 } })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 })
await page.locator('.sex-btn', { hasText: 'ذكر' }).click()
await page.waitForTimeout(400)

let bad = 0
for (const r of routes) {
  await page.goto(BASE + r, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(250)
  const m = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    cw: document.documentElement.clientWidth,
  }))
  const over = m.sw > m.cw + 1
  if (over) bad++
  console.log(`${over ? '✗ OVERFLOW' : '✓'} ${r} — scrollWidth ${m.sw}/${m.cw}`)
}
// female-only organ
await page.evaluate(() => {
  const b = document.querySelector('.sex-toggle button:last-child')
  if (b) b.click()
})
await page.waitForTimeout(300)
await page.goto(BASE + '/organ/uterus', { waitUntil: 'networkidle', timeout: 30000 })
await page.waitForTimeout(250)
const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }))
if (m.sw > m.cw + 1) bad++
console.log(`${m.sw > m.cw + 1 ? '✗ OVERFLOW' : '✓'} /organ/uterus (female) — scrollWidth ${m.sw}/${m.cw}`)

console.log(`\nأخطاء: ${errors.length ? errors.slice(0, 5).join(' | ') : 'لا أخطاء'}`)
console.log(`النتيجة: ${bad === 0 ? 'لا تجاوز عرض' : bad + ' مسارات متجاوزة'}`)
await browser.close()
process.exit(bad === 0 && errors.length === 0 ? 0 : 1)
