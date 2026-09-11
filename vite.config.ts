import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * على الاستضافة الثابتة (GitHub Pages): نُنسخ index.html إلى 404.html
 * فتعمل الروابط العميقة (مثل /organ/heart) حتى عند فتحها مباشرة.
 */
const spa404 = () => ({
  name: 'spa-404-fallback',
  writeBundle() {
    const dist = join(process.cwd(), 'dist')
    if (existsSync(join(dist, 'index.html'))) {
      mkdirSync(dist, { recursive: true })
      copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))
    }
  },
})

export default defineConfig({
  plugins: [
    spa404(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png', 'icons/maskable-512.png'],
      manifest: {
        name: 'جسمي — موسوعة تشريح تفاعلية',
        short_name: 'جسمي',
        description:
          'اكتشف جسم الإنسان بطريقة تفاعلية: طبقات تشريحية، أجهزة، أعضاء، وجولات تعليمية — يعمل دون إنترنت.',
        lang: 'ar',
        dir: 'rtl',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#0f766e',
        background_color: '#f6f8fa',
        categories: ['education', 'medical'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,woff}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'jismi-fonts',
              expiration: { maxEntries: 16, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
