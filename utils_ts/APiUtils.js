const { expect } = require('@playwright/test');
class APIUtils 


{
            constructor(apiContxt, loginPayload)
        {
           this.apiContxt = apiContxt;
           this.loginPayload = loginPayload;

        }

   async getToken (){

        const loginResponse  = await this.apiContxt.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
                {
                     data: this.loginPayload
        
                    });
                    await expect (loginResponse.ok()).toBeTruthy();
                    const loginResponseJson = await loginResponse.json();
                    const token =  loginResponseJson.token;
                    console.log(token);
                    return token;
 
               }

               async createOrder (orderPayload) {
                let response = {};  
                response.token = await this.getToken();
                const orderResponse = await this.apiContxt.post("https://rahulshettyacademy.com/api/ecom/order/create-order",             {
                data:orderPayload,
                headers:{
                    'Authorization' : response.token,
                    'content-type' : 'application/json' 
                },
            })
                           await expect(orderResponse.ok()).toBeTruthy();           
                                       const orderResponseJson = await orderResponse.json();
                                       console.log('orderResponseJson:', orderResponseJson);
                                       const orderItem = orderResponseJson.orders && orderResponseJson.orders[0];
                                       let orderID;
                                       if (typeof orderItem === 'string') {
                                           orderID = orderItem;
                                       } else if (orderItem && (orderItem._id || orderItem.orderId || orderItem.id)) {
                                           orderID = orderItem._id || orderItem.orderId || orderItem.id;
                                       } else {
                                           orderID = String(orderItem);
                                       }
                                       response.orderID = orderID;
                                       console.log('createOrder response object:', response);
                                       return response;
               }
}

module.exports = {APIUtils};