import { PlaywrightTestConfig, devices } from '@playwright/test'
import path from 'path'

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  timeout: 30 * 1000,
  testDir: path.join(__dirname, 'tests'),
  testMatch: 'e2e/**/*.spec.ts',
  retries: 0,
  outputDir: 'tests/results/',

  webServer: {
    command: 'yarn dev',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    browserName: 'chromium',
  },
}
export default config