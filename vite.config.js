import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// defineConfig 用于 ts 的类型判断，使用 js 语法开发也能获得良好的语法提示
export default defineConfig({
  server: {
    host: 'localhost',
    port: 8015,
    proxy: {
      '/api': {
        // localhost:8015/api 会转发到 localhost:3000/api
        target: 'http://localhost:3000'
      }
    }
  },
  plugins: [vue()]
})
