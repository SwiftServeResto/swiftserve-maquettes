import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  base: '/swiftserve-maquettes/',
  plugins: [vue()],
  test: { environment: 'jsdom', include: ['src/**/*.test.ts'] },
})
