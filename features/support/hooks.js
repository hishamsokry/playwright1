const playwright = require('@playwright/test');
const {POManager} = require('../../pageobjects/POManager');
const {Before, After, BeforeStep, AfterStep, Status} = require('@cucumber/cucumber');

Before(async function () {
  const browser = await playwright.chromium.launch({headless:false});
        const context = await browser.newContext();
        this.page = await context.newPage();
        this.poManager = new POManager(this.page);
});


BeforeStep(async function () {

})


AfterStep(async function ({result}) {

  if (result.status === 'FAILED') {
    const screenshot = await this.page.screenshot({ path: `./screenshots/${Date.now()}.png`, fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  
})

After(function () {

       console.log("After hook - closing the page"); 

});
