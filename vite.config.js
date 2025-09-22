import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/jmemory/",
    server: {
    proxy: {
      '/api/tatoeba': {
        target: 'https://api.dev.tatoeba.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tatoeba/, ''),
        secure: true
      }
    }
  }
})
