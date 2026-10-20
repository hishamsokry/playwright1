const { expect } = require("@playwright/test");

class OrdersPage {

    constructor(page){

            this.myordersLink =  page.locator("button[routerlink*='myorders']");
            this.rowsTable =  page.locator("tbody");
            this.rows =  page.locator("tbody tr");
            this.orderIDverify =  page.locator(".col-text");
                       
    }

    async gotoMyOrders (){
        await this.myordersLink.click();
    }

    
    async viewOrder(orderID) {
    await this.rows.first().waitFor();
    for (let i = 0; i < await this.rows.count(); i++) {
        const row = this.rows.nth(i);
        const rowOrderID = await row.locator("th").textContent();

        if (rowOrderID && rowOrderID.trim().includes(orderID.trim())) {
            await row.locator("button").first().click();
            break;
        }
    }
}
    async getOrderId()
{
    return await this.orderIDverify.textContent();
}

}

module.exports = { OrdersPage };