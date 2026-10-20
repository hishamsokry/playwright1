import { test, expect } from '@playwright/test';

test.only("SauceDemo", async ({page}) => {
    await page.goto("https://www.saucedemo.com/");
    const userName = await page.locator("#user-name");
    const passWord = await page.getByPlaceholder("Password");
    await userName.fill("standard_user");
    await passWord.fill("secret_sauce");
    await page.locator("[type='submit']").click();
    await page.locator(".inventory_list").waitFor();
    await expect(page.locator(".inventory_item_description .inventory_item_name ").first()).toHaveText("Sauce Labs Backpack");
    const itemCount = await page.locator(".inventory_item").count();

    for (let i=0; i<itemCount; i++) {
        const itemName = await page.locator(".inventory_item_name").nth(i);
        console.log(await itemName.textContent());
        if (await itemName.textContent()=== "Sauce Labs Fleece Jacket") {
           await page.locator(".inventory_item").nth(i).locator("button").click();
            break;
        }
    } 
    await page.locator(".shopping_cart_link").click();
    await page.locator(".cart_item").first().waitFor();
    const cartItem = await page.locator(".cart_item").filter({ hasText: "Sauce Labs Fleece Jacket" });
    console.log(await cartItem.textContent());
    await expect(cartItem).toBeVisible();
    await page.locator("#checkout").click();
    await page.locator("#first-name").fill("hisham");
    await page.getByPlaceholder("Last Name").fill("elsocary");
    await page.locator("#postal-code").fill("12345");
    await page.getByText("Continue").click();
    const paymentValue = await page.locator('[data-test="payment-info-value"]').textContent();
    console.log(paymentValue);
    await page.locator("#finish").click();
    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");


});