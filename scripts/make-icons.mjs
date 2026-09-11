// توليد أيقونات PWA من الشعار (SVG → PNG) عبر sharp
import sharp from 'sharp'
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const svg = readFileSync(join(root, 'public/logo.svg')).toString('utf8')

// نسخة maskable: خلفية ممتدة حتى الحواف مع مساحة أمان
const maskableSvg = svg.replace(/rx="112"/, 'rx="0"').replace('scale(0.92)', 'scale(0.78)')

mkdirSync(join(root, 'public/icons'), { recursive: true })
rmSync(join(root, 'public/icon-192.png'), { force: true })
rmSync(join(root, 'public/icon-512.png'), { force: true })
rmSync(join(root, 'public/icon-maskable-512.png'), { force: true })

const targets = [
  ['icons/icon-192.png', svg, 192],
  ['icons/icon-512.png', svg, 512],
  ['icons/maskable-512.png', maskableSvg, 512],
  ['icons/apple-touch-icon.png', maskableSvg, 180],
]

for (const [name, input, size] of targets) {
  await sharp(Buffer.from(input), { density: 300 }).resize(size, size).png().toFile(join(root, 'public', name))
  console.log('✓ public/' + name)
}

writeFileSync(join(root, 'public/favicon.svg'), svg)
console.log('✓ public/favicon.svg')
