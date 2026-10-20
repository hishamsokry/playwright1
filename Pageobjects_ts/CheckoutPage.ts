import  {test, expect, Page, Locator} from  '@playwright/test';

export class CheckoutPage{

    countryInput: Locator;
    dropdown: Locator;
    submitButton: Locator;
    emailId: Locator;
    orderConfirmationText: Locator;
    orderId: any;
    page: Page;
    text: any;

constructor(page: Page){

    this.page = page;
    this.countryInput = page.locator("[placeholder*='Country']");
    this.dropdown = page.locator(".ta-results");
    this.submitButton = page.locator(".action__submit");
    this.emailId = page.locator(".user__name [type='text']").first();
    this.orderConfirmationText =
     page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");

}

async checkoutProduct(countryName: string){
            
            await this.countryInput.pressSequentially("Ind", {delay:150});
            const dropdown = this.dropdown;
            await dropdown.waitFor();
            const optionscount = await dropdown.locator("button").count();
            for (let i=0; i<optionscount; i++){
                const text = await dropdown.locator("button").nth(i).textContent();
                if (text?.trim() === "India"){
                   await dropdown.locator("button").nth(i).click();
                   break;
                }
                
            }
}

async VerifyEmailId(username: string){

        await expect(this.emailId).toHaveText(username);

}


async submitOrder(){
    
    await this.submitButton.click();
    await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
    return await this.orderId.textContent();
}

}

module.exports = {CheckoutPage};