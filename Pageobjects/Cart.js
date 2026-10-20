const {test, expect} = require('@playwright/test');
class Cart {

    constructor(page){

    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.checkoutButton = page.locator("text=Checkout");

    }

    async VerifyProductInCart (productName){

            await this.cartProducts.waitFor();
            const bool = await this.getProductLocator(productName).isVisible();
            expect(bool).toBeTruthy();


    }

    async checkout()
{
    await this.checkoutButton.click();
}

     getProductLocator(productName){

            return  this.page.locator("h3:has-text('"+productName+"')");

    }

}

module.exports = {Cart};