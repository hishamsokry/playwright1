const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APiUtils');
const loginPayload = {userEmail: "hishosocaryy@gmail.com", userPassword: "Test2026#"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let response;
const fakePayLoadOrders = {"data":[],"message":"No Orders"};
test.beforeAll( async () => {
    const APIContext = await request.newContext();
    const apiUtils = new APIUtils(APIContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    console.log('beforeAll createOrder response:', response);
    // quick sanity checks
    // expect(response).toBeTruthy();
    // expect(response.token).toBeTruthy();
    // expect(response.orderID).toBeTruthy();
})





test('Place order',async({page})=>{

    
        page.addInitScript(value => {

        window.localStorage.setItem('token',value);
    }, response.token);

    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69fbd1adeb0333b6db396ade", 
    async  route=> {
       //intercepting response - API response > playwright fake response > render data on front end
    const response = await page.request.fetch(route.request());
    let body = JSON.stringify(fakePayLoadOrders);
    route.fulfill({
        response,
        body

    });
    }
    );
    

    const email ="hishosocaryy@gmail.com";


            await page.locator("button[routerlink*='myorders']").click();
            console.log("Current URL after clicking myorders:", page.url());
            await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
            console.log("After API response - .mt-4 text:", await page.locator(".mt-4").textContent());
            
            // Check if tbody exists at all
            const tbodyExists = await page.locator("tbody").count();
            console.log("tbody count:", tbodyExists);
            
            // Check for error messages on page
            const errorMsg = await page.locator("[class*='error'], [class*='Error']").textContent().catch(() => "no error");
            console.log("Error messages on page:", errorMsg);
            
            // Wait with better error handling
            try {
                await page.locator("tbody").waitFor({ timeout: 5000 });
            } catch (e) {
                console.log("tbody waitFor failed. Full page HTML:", await page.content());
                throw e;
            }
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