import { test, expect, request } from '@playwright/test';

test('login and get token', async ({ request, page})=> {
//authenticate and get token
const loginResponse = await request.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login', {
  data: {
    email: "hms123@yahoo.com",
    password: "Test2026#"
  }
});
const loginData = await loginResponse.json();
const loginToken = loginData.token;
console.log('Login Token:', loginToken);

const bookingsResponse = await request.post('https://api.eventhub.rahulshettyacademy.com/api/bookings',{

  
},
{ 
  data : {
    customerName: "Hisham",
    customerEmail: "hms123@yahoo.com",
    customerPhone: "1234567890",
    quantity: 1
  }
})

});

