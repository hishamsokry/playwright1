// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
    timeout: 100 *1000,
    expect: {
      timeout: 5000
    },
    reporter: 'html',
    outputDir: 'test-results',

    use: {

      browserName: 'chromium',
      headless: false,
      screenshot: 'on',
      trace: 'on',
      acceptDownloads: true,
      downloadsPath: 'test-results/downloads'
      
    },
});

module.exports = config

