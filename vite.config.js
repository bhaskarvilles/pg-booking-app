import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  css: {
    postcss: {
      plugins: []
    }
  },
  server: {
    port: 5173,
    open: true
  }
}) 