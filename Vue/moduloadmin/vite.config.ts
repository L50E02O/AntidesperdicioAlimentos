import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    port: 3002
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts' // archivo opcional para configurar el entorno
  }
})
