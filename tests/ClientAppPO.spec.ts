// const {test, expect} = require('@playwright/test');
import {test, expect, Locator} from "@playwright/test";
//const {customTest} = require("./utils/test-base");
import {customTest} from "../utils_ts/test-base";
import {POManager} from  "../Pageobjects_ts/POManager";
const dataSet = JSON.parse(JSON.stringify(require("./utils/placeorderdata.json")));
for (const data of dataSet) {
test(`Client App Login for ${data.productName}`,{tag: '@web'}, async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    //const username = "hishosocaryy@gmail.com";
    //const password = "Test2026#";
    //const products: Locator = page.locator(".card-body");
    //const productName = "ZARA COAT 3";
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    const dashBoardPage = poManager.getDashBoardPage();
    await dashBoardPage.searchProductAddToCart(data.productName);
    await dashBoardPage.navigateToCart();
    const cart = poManager.getCart();
    await cart.VerifyProductInCart(data.productName);
    await cart.checkout();
    const countryName = "India";
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.VerifyEmailId(data.username);
    await checkoutPage.checkoutProduct(countryName);
    await checkoutPage.submitOrder();

            //await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
            //await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
            const orderID : any = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).replace(/\|/g, "").trim();
            //console.log(orderID);

const orderspage: any = poManager.getOrdersPage();
await orderspage.gotoMyOrders();
await orderspage.viewOrder(orderID);
const orderId: any = await orderspage.getOrderId();
            


});
}

customTest.only('client app login', async({browser, testDataForOrder})=>{

const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    //const username = "hishosocaryy@gmail.com";
    //const password = "Test2026#";
    //const products: Locator = page.locator(".card-body");
    //const productName = "ZARA COAT 3";
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashBoardPage = poManager.getDashBoardPage();
    await dashBoardPage.searchProductAddToCart(testDataForOrder.productName);
    await dashBoardPage.navigateToCart();
    const cart = poManager.getCart();
    await cart.VerifyProductInCart(testDataForOrder.productName);
    
    await cart.checkout();

});




