import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change 'packdog' to your actual GitHub repo name
const REPO_NAME = 'packdog'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages deployment path: https://username.github.io/packdog/
  base: process.env.NODE_ENV === 'production' ? `/${REPO_NAME}/` : '/',
  server: {
    port: 5173,
    proxy: {
      // In dev, proxy /api calls to local backend
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
