const { test, expect } = require('@playwright/test');

test("security Test Request Intercept", async ({ page }) => {
    // login and reach orders
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const email = "hishosocaryy@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("hishosocaryy@gmail.com");
    await page.locator("#userPassword").fill("Test2026#");
    await page.locator("[value='Login']").click();
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();
    // continue method
    
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' })
    );
    await page.locator("button:has-text('View')").first().click();
    await expect (page.locator(".blink_me")).toHaveText("You are not authorize to view this order");

})