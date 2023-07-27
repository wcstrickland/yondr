import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(),VitePWA({
    registerType: 'autoUpdate',
    workbox: {
      // maximumFileSizeToCacheInBytes: 7000000
    }

  })],
  base: 'https://wcstrickland.github.io/yondr/',
  build:{
    outDir: './docs'
  }
})
