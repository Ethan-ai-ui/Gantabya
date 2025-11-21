import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
    // ✅ Add CSP headers here
    headers: {
      'Content-Security-Policy': 
        "default-src 'self'; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; " +
        "script-src 'self'; " +
        "img-src 'self' data:;"
    }
  }
})
