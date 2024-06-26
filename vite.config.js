import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { weatherKey } from './key'
import viteCompression from 'vite-plugin-compression'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
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
    outDir: 'dist/qingheGuide',
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
    host: 'localhost',
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
        rewrite: (path) => path.replace(/^\/geo\//, '?key=' + weatherKey + '&location='), 
      },
      '/nowWeather': {
        target: 'https://devapi.qweather.com/v7/weather/now',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nowWeather\//, '?key=' + weatherKey + '&location='), 
      },
      '/nowAir': {
        target: 'https://devapi.qweather.com/v7/air/now',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nowAir\//, '?key=' + weatherKey + '&location='), 
      },
      '/futureWeather': {
        target: 'https://devapi.qweather.com/v7/weather/3d',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/futureWeather\//, '?key=' + weatherKey + '&location='), 
      },
      '/futureAir': {
        target: 'https://devapi.qweather.com/v7/air/5d',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/futureAir\//, '?key=' + weatherKey + '&location='),
      },
    },
  },
})
