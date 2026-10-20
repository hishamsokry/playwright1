const {test, expect} = require('@playwright/test');

test('Browser Context-validating error login',{tag: '@web'},async({browser})=>{


    const context = await browser.newContext();
    const page = await context.newPage();
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const email = "hishosocaryy@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByPlaceholder("email@example.com").fill("hishosocaryy@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Test2026#");
    await page.getByRole("button", {name: "Login"}).click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button", {name: "Add To Cart"}).click();

           await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
            await page.locator("div li").first().waitFor();
            await expect (page.getByText("ZARA COAT 3")).toBeVisible();
            
            await page.getByRole("button", {name:"Checkout"}).click();
            
            await page.getByPlaceholder("Select Country").pressSequentially("Ind", {delay:150});
            await page.getByRole("button", {name: "India"}).nth(1).click();
            await page.getByText("Place Order").click();

            await expect(page.getByText("Thankyou for the order.")).toBeVisible();
            

});