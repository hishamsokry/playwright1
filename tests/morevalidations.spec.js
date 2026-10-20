const {test, expect} = require('@playwright/test');


test.describe.configure({mode: 'parallel'});
test('Popup validation', async ({page})=>{
   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//    await page.goto("https://www.google.com/"); 
//    await page.goBack();
//    await page.goForward();
 await expect(page.locator("#displayed-text")).toBeVisible();
 await page.locator("#hide-textbox").click();
 await expect(page.locator("#displayed-text")).toBeHidden();
 await page.locator("#alertbtn").click();
 page.on("dialog", dialog =>{dialog.accept()});
 await page.locator("#mousehover").hover();
 const iFrame = page.frameLocator("#courses-iframe");
 await iFrame.locator("li a[href*='lifetime-access']:visible").click();
 const txtCheck = await iFrame.locator(".text h2").textContent();
 console.log(txtCheck.split(" ")[1]);

});

test('screenshots and visual comparison', async ({page})=>{
  
   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   await expect(page.locator("#displayed-text")).toBeVisible();
   await page.locator("#displayed-text").screenshot({path: "element.png"});
   await page.locator("#hide-textbox").click();
   await page.screenshot({path: "screenshot.png"});
   await expect(page.locator("#displayed-text")).toBeHidden();





});



   //screenshot >> store >> screenshot >>

   test.only('Visual', async ({page})=>{
      await page.goto("https://www.flightaware.com/");
      expect(await page.screenshot()).toMatchSnapshot("landing.png");
   } );
   

   
