//Login UI -> .json
//test -> .json, cart, order, orderdetails, orderhistory


const {test, expect} = require('@playwright/test');

let webContext;

test.beforeAll(async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("hishosocaryy@gmail.com");
    await page.locator("#userPassword").fill("Test2026#");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const storageState = await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'}); 
});

test('Browser Context-validating error login',async()=>{

    const page= await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    const products = page.locator(".card-body");
    const email = "hishosocaryy@gmail.com"; 
    const productName = "ZARA COAT 3";
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for(let i=0; i<count; i++){
        if (await products.nth(i).locator("b").textContent() === productName){
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
            await page.locator("[routerlink*='cart']").click();
            await page.locator("div li").first().waitFor();
            const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
            expect(bool).toBeTruthy();
            await page.locator("text=Checkout").click();
            await page.locator("[placeholder*='Country']").pressSequentially("Ind", {delay:150});
            const dropdown = page.locator(".ta-results");
            await dropdown.waitFor();
            const optionscount = await dropdown.locator("button").count();
            for (let i=0; i<optionscount; i++){
                const text = await dropdown.locator("button").nth(i).textContent();
                if (text.trim() === "India"){
                   await dropdown.locator("button").nth(i).click();
                   break;
                }
                
            }
            await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
            await page.locator(".action__submit").click();
            await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
            const orderID = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).replace(/\|/g, "").trim();
            console.log(orderID);

            await page.locator("button[routerlink*='myorders']").click();
            await page.locator("tbody").waitFor();
            const rows =  page.locator("tbody tr");

            for (let i=0; i< await rows.count(); i++){
                {
                    const rowOrderID =await rows.nth(i).locator("th").textContent();
                    if (orderID.includes(rowOrderID.trim())){
                        await rows.nth(i).locator("button").first().click();
                        break;
                    }
                    
                }
                
            }
            const orderIDverify = await page.locator(".col-text").textContent();
            expect(orderIDverify.trim()).toContain(orderID.trim());


});