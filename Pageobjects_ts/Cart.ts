import {test, expect, Locator, Page} from '@playwright/test';
export class Cart {

    cartProducts: Locator;
    productsText: Locator;
    cart: Locator;
    checkoutButton: Locator;
    page: Page;

    constructor(page: Page){

    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.checkoutButton = page.locator("text=Checkout");

    }

    async VerifyProductInCart (productName: string) {

            await this.cartProducts.waitFor();
            const bool = await this.getProductLocator(productName).isVisible();
            expect(bool).toBeTruthy();


    }

    async checkout()
{
    await this.checkoutButton.click();
}

     getProductLocator(productName: string){

            return  this.page.locator("h3:has-text('"+productName+"')");

    }

}

module.exports = {Cart};