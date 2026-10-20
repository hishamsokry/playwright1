const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APiUtils');
const loginPayload = {userEmail: "hishosocaryy@gmail.com", userPassword: "Test2026#"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let response;

test.beforeAll( async () => {
    const APIContext = await request.newContext();
    const apiUtils = new APIUtils(APIContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
     
})





test('Place order',async({page})=>{

    
        page.addInitScript(value => {

        window.localStorage.setItem('token',value);
    }, response.token);

    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client/");
    const email ="hishosocaryy@gmail.com";


            await page.locator("button[routerlink*='myorders']").click();
            await page.locator("tbody").waitFor();
            const rows =  page.locator("tbody tr");

            for (let i=0; i< await rows.count(); i++){
                {
                    const rowOrderID =await rows.nth(i).locator("th").textContent();
                    if (response.orderID.includes(rowOrderID.trim())){
                        await rows.nth(i).locator("button").first().click();
                        break;
                    }
                    
                }
                
            }
            const orderIDverify = await page.locator(".col-text").textContent();
            expect(orderIDverify.trim()).toContain(response.orderID.trim());


});