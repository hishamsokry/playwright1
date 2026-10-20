const {When, Then, Given} = require('@cucumber/cucumber');
const {POManager} = require('../../pageobjects/POManager');
const {expect} = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to ecommerce website with {string} and {string}',{timeout:100*1000}, async function (username, password){
        const browser = await playwright.chromium.launch({headless:false});
        const context = await browser.newContext();
        this.page = await context.newPage();
        this.poManager = new POManager(this.page);
        this.username = username;

        const loginPage = this.poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(username, password);
});

When('Add product {string} to the cart', async function (productName){
    this.dashBoardPage = this.poManager.getDashBoardPage();
    await this.dashBoardPage.searchProductAddToCart(productName);
    await this.dashBoardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName){

    const cart = this.poManager.getCart();
    await cart.VerifyProductInCart(productName);
    await cart.checkout();

});

When('Enter valid details and place the order', async function (){
        const countryName = "India";
    const checkoutPage = this.poManager.getCheckoutPage();
            await checkoutPage.VerifyEmailId(this.username);
    await checkoutPage.checkoutProduct(countryName);
            await checkoutPage.submitOrder();

                //await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
                //await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
                this.orderID = (await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent()).replace(/\|/g, "").trim();
});

Then('Verify the order is present in the OrderHistory', async function (){
    const orderspage = this.poManager.getOrdersPage();
    await orderspage.gotoMyOrders();
        await orderspage.viewOrder(this.orderID);
    const orderId = await orderspage.getOrderId();
});



Given('a login to ecommerce2 website with {string} and {string}',{timeout:100*1000},async function (string, string2) {
    const userName = this.page.locator("#username");
    const signIn = this.page.locator("#signInBtn");
 await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");


 console.log(await this.page.title());
 await userName.fill(string);
    await this.page.locator("[type='password']").fill(string2);
    await signIn.click();


});

Then('Verify error message is displayed', async function () {
 console.log (await this.page.locator("[style*='block']").textContent());
 await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});