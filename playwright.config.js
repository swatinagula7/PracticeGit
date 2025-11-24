const path = require('path');

module.exports = {
  //reporter: [['json',{ outputFile: 'results.json'}]],
  //reporter: [['junit',{ outputFile: 'results.xml'}]],
  // reporter: [
  //   ['list'], // keep console output
  //   [path.join(__dirname, 'excel-reporter.js'), { outputFile: 'reports/playwright-results.xlsx' }]
  // ],
  /* Run tests in files in parallel*/
  fullyParallel: false,

  reporter: [['list'],
            ['html'],
            ['junit', {outputFile: 'results.xml' }],
            ['json', {outputFile: 'results.json'}],
            ['allure-playwright', {outputFolder: 'my-allure-results'}]
],



   timeout: 120000,
  retries: 2, //Avoiding Flaky Tests
  testDir: './tests',
  use: {
    trace: "retain-on-failure",
    baseURL: 'https://restful-booker.herokuapp.com', //'https://admin-qa.rooftopmeasurements.com',
    extraHTTPHeaders: {
      Accept: "application/json"
    },
    headless: false,
    screenshot: 'only-on-failure',//on
    video: 'retain-on-failure',
    acceptDownloads: true, // Enables download handling
  },
};



// const { defineConfig } = require('@playwright/test');

// module.exports = defineConfig({
//   timeout: 60000,
//   retries: 2, //Avoiding Flaky Tests
//   testDir: './tests',
//   use: {
//     baseURL: 'https://admin-qa.rooftopmeasurements.com',
//     headless: false,
//     screenshot: 'only-on-failure',
//     video: 'retain-on-failure',
//     acceptDownloads: true, // Enables download handling
//   },
// });



























// // @ts-check
// const { devices } = require('@playwright/test');
// const { trace } = require('console');

// const Config = ({
//   testDir: './tests',
//   timeout: 40 * 1000,
//   expect: {
//     timeout: 5000,
//   },
//   reporter: 'html',

//   use: {
//     browserName: 'chromium',
//     headless: false,
//     screenshot: 'on',
//     trace: 'retain-on-failure' // off,on

//     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

//   },

// });

// module.exports = Config
// playwright.config.js















