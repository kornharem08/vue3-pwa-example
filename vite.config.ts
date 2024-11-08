// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt','cat.png','vite.svg'], // ไฟล์ที่คุณต้องการเพิ่มใน cache
      manifest: {
        name: 'Your App Name',
        short_name: 'AppName',
        description: 'Your app description',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'cat.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document' || request.destination === 'script' || request.destination === 'style' || request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'offline-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60 // เก็บข้อมูลใน cache 30 วัน
              }
            }
          }
        ]
      }
    })
  ]
})
