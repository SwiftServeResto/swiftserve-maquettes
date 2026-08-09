import { defineConfig, devices } from '@playwright/test'
export default defineConfig({
  testDir: 'e2e',
  reporter: 'line',
  webServer: {
    command: 'node node_modules/vite/bin/vite.js --host 127.0.0.1 --strictPort',
    url: 'http://127.0.0.1:5173/swiftserve-maquettes/',
    reuseExistingServer: false,
    timeout: 30_000,
  },
  use: {
    baseURL: 'http://127.0.0.1:5173/swiftserve-maquettes/',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 5'] } },
    { name: 'tablet', use: { viewport: { width: 834, height: 1194 } } },
  ],
})
