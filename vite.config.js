import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
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
    },
  }
})
