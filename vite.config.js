import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { WEATHER_KEY } from './key'
import viteCompression from 'vite-plugin-compression'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // 将外部依赖单独打包
            return 'vendor';
          }
        }
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8000,
    proxy: {                // 这里设置代理仅对开发环境生效，生产环境需要单独设置，如nginx
      '/sug': {
        target: 'https://www.baidu.com/sugrec',
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/sug/, ''),
      },
      '/geo': {
        target: 'https://geoapi.qweather.com/v2/city/lookup',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/geo\//, '?key=' + WEATHER_KEY + '&location='),
      },
      '/nowWeather': {
        target: 'https://devapi.qweather.com/v7/weather/now',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nowWeather\//, '?key=' + WEATHER_KEY + '&location='),
      },
      '/nowAir': {
        target: 'https://devapi.qweather.com/v7/air/now',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nowAir\//, '?key=' + WEATHER_KEY + '&location='),
      },
      '/futureWeather': {
        target: 'https://devapi.qweather.com/v7/weather/3d',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/futureWeather\//, '?key=' + WEATHER_KEY + '&location='),
      },
      '/futureAir': {
        target: 'https://devapi.qweather.com/v7/air/5d',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/futureAir\//, '?key=' + WEATHER_KEY + '&location='),
      },
    },
  },
})
