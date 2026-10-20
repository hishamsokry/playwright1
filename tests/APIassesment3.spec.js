import { test, expect, request } from '@playwright/test';

test('login and get token', async ({ request, page }) => {
  // Step 1: Authenticate and get token
  const loginResponse = await request.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login', {
    data: {
      email: "hishosocaryy@gmail.come",
      password: "Test2026#"
    }
  });

  const loginData = await loginResponse.json();
  const loginToken = loginData.token;
  console.log('Login Token:', loginToken);

  // Step 2: Create a booking and get the real booking ID
  const bookingsResponse = await request.post('https://api.eventhub.rahulshettyacademy.com/api/bookings', {
    headers: {
      Authorization: `Bearer ${loginToken}`,
      'Content-Type': 'application/json'
    },
    data: {
      customerName: "Hisham",
      customerEmail: "hishosocaryy@gmail.come",
      customerPhone: "1234567890",
      quantity: 1
    }
  });

  const bookingData = await bookingsResponse.json();
  const bookingId = bookingData.id || bookingData._id || bookingData.bookingId;
  console.log('Booking ID:', bookingId); // ✅ Real dynamic ID

  // Step 3: Intercept route using the REAL booking ID dynamically
  await page.route("https://eventhub.rahulshettyacademy.com/bookings/*",
    route => route.continue({ url: `https://eventhub.rahulshettyacademy.com/bookings/${bookingId}` }) // ✅ Dynamic ID
  );

  // Step 4: Navigate to bookings page
  await page.goto('https://eventhub.rahulshettyacademy.com/bookings/', {
    extraHTTPHeaders: {
      Authorization: `Bearer ${loginToken}`
    }
  });

  await page.waitForLoadState('networkidle');

  await page.locator("button:has-text('View')").first().click();
  console.log(await page.locator(".mb-2").textContent());
});