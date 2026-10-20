// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
    retries: 1,
    workers: 1,
    timeout: 100 *1000,
    expect: {
      timeout: 5000
    },
    reporter: 'html',
    projects : [
      {
    name: 'safari',  
    use: {
      
      browserName: 'webkit',
      headless: false,
      screenshot: 'on',
      trace: 'on',
      acceptDownloads: true,
      downloadsPath: 'test-results/downloads',
      ...devices["iPhone 13"]
      
    }

  }, {
    name: 'chrome',  
    use: {
      
      browserName: 'chromium',
      video: 'retain-on-failure',
      headless: false,
      screenshot: 'on',
      trace: 'on',
      acceptDownloads: true,
      downloadsPath: 'test-results/downloads',
      //viewport: {width:720, height:720}
      ...devices["Galaxy A55"]
    
    
    }
}

  ],
    outputDir: 'test-results',


});

module.exports = config

