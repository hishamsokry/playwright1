const {test, expect} = require('@playwright/test');


test('test', async ({ page }) => {
  
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("hishosocaryy@gmail.com");
    await page.locator("#userPassword").fill("Test2026#");
    await page.locator("[value='Login']").click();
    await page.locator(".card-body b").first().waitFor();
    for (let i=0; i< await page.locator(".card-body").count(); i++){
     if (await page.locator(".card-body").nth(i).locator("b").textContent() === "iphone 13 pro") {
        await page.locator(".card-body").nth(i).locator("text= Add To Cart").click();
        break
     }
    };
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('Select Country').pressSequentially("Egy", {delay:150});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    await page.getByRole('button', { name: 'Egypt' }).click();
    await page.getByText('Place Order').click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).replace(/\|/g, "").trim();
    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for (let i=0; i< await rows.count(); i++){

        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderID.trim())){
            await rows.nth(i).locator("button").last().click();
            break;
        }

    }

});

