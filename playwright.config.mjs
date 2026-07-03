import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      ...process.env,
      FIRESTORE_EMULATOR_HOST: '127.0.0.1:8080',
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'demo-test-project',
      FIREBASE_SERVICE_ACCOUNT_KEY: '',
      FIREBASE_SERVICE_ACCOUNT_JSON: '',
    },
  },
});
