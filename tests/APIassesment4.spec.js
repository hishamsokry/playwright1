import { test, expect, request } from '@playwright/test';

    const BASE_URL = "https://eventhub.rahulshettyacademy.com"

const API_URL = `${BASE_URL}/api`

const Yahoo_Email = "hms123@yahoo.com";
const Gmail_Email = "hishosocaryy@gmail.come";
const Yahoo_Password = "Test2026#";
const Gmail_Password = "Test2026#";

async function login(page) {
  await page.goto(`${BASE_URL}/login`);

  await page.getByPlaceholder('you@email.com').fill(Gmail_Email);

  await page.getByLabel('Password').fill(Gmail_Password);

  await page.locator('#login-btn').click();

  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}



test('login and get token', async ({ request, page})=>{



const loginResponse = await request.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login', {
  data: {
    email: Yahoo_Email,
    password: Yahoo_Password
  }
});
await expect(loginResponse.ok()).toBeTruthy();
const loginData = await loginResponse.json();
const loginToken = loginData.token;
console.log('Login Token:', loginToken);

  const EventResponse = await request.get('https://api.eventhub.rahulshettyacademy.com/api/events', {
    headers: {
      'Authorization': `Bearer ${loginToken}`
    }
  });

  expect(EventResponse.ok()).toBeTruthy();

  const responseBody = await EventResponse.json();
  const eventId = responseBody.data[0].id;

  console.log('Captured eventId:', eventId);

    const BookingResponse = await request.post('https://api.eventhub.rahulshettyacademy.com/api/bookings', {
    headers: {
      'Authorization': `Bearer ${loginToken}`
    },
    data: {
      eventId: eventId, 
      customerName: 'Yahoo User',
      customerEmail: 'yahoouser@yahoo.com',
      customerPhone: '9876543210',
      quantity: 1
    }
  });

  expect(BookingResponse.ok()).toBeTruthy();

  const BookingResponseBody = await BookingResponse.json();
  const yahooBookingId = BookingResponseBody.data.id;

  console.log('Yahoo booking created with ID:', yahooBookingId);

  await login(page);

  await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`);
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.mb-2')).toContainText('Access Denied');


});

 






