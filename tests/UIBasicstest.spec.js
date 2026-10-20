const {test, expect} = require('@playwright/test');

test('UI controls', async ({page}) =>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    const dropDown = page.locator("select.form-control");
    await dropDown.selectOption("consult");
    

    await page.locator(".radiotextsty").last().click();
    await page .locator("#okayBtn").click();
    const documentLink = page.locator("[href*='documents-request']");
    //assertions
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    await expect( page.locator("#terms")).not.toBeChecked();
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class", /blinkingText/);


});

test("Child windows hdl", async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] =  await Promise.all([
        context.waitForEvent("page"),
        documentLink.click(),
    ])
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
    
    console.log(await page.locator("#username").inputValue());
});





test('Browser context playwright test',async ({browser})=>
{
 //chrome - plugin/ cookies
 const context = await browser.newContext();
 const page = await context.newPage();
 const userName = page.locator("#username");
 const signIn = page.locator("#signInBtn"); 
 const cardTitles = page.locator(".card-body a");
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
 console.log(await page.title());
 //CSS / xpath
 await userName.fill("rahulshetty");
 await page.locator("[type='password']").fill("Learning@830$3mK2");
 await signIn.click();
 console.log(await page.locator("[style*='block']").textContent());
 await expect(page.locator("[style*='block']")).toContainText("Incorrect");

 await userName.fill("");
 await userName.fill("rahulshettyacademy");
 await signIn.click();
 //console.log (await cardTitles.first().textContent());
 //console.log (await cardTitles.nth(1).textContent());
 const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});
