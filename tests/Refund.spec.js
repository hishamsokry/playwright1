import { test, expect } from '@playwright/test';

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const UserName = "hishosocaryy@gmail.come";
const Password = "Test2026#";

async function login(page){
  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder('you@email.com').fill(UserName);
  await page.getByLabel('Password').fill(Password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →'})).toBeVisible();

};

test ('Refund', async ({page})=>{

    await login(page);
    await page.goto(`${BASE_URL}/events`);
    const Cards = page.getByTestId("event-card");
    await expect(Cards.first()).toBeVisible();
    const bookedCard = Cards.first();
    await bookedCard.getByTestId("book-now-btn").click();

    const fullName = "Hisham Elsocary";
    const Phone = "01114457032";
    await page.locator("#customerName").fill(fullName);
    await page.locator("#customer-email").fill(UserName);
    await page.locator("#phone").fill(Phone);
    await page.getByRole("button", { name: "Confirm Booking" }).click();
    await page.getByRole("button", { name: "View My Bookings" }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    const bookingCard = await page.getByTestId("booking-card").first();
    await bookingCard.getByRole("button", {name: "View Details"}).click();
    await page.locator(".space-y-4").waitFor();
    await expect (page.getByText("Booking Information")).toBeVisible();
    const bookingRefElement = page.locator('.items-start .py-1');
    const eventTitleLocator = page.locator('h1');
    const bookingText = await bookingRefElement.innerText();
    const eventTitleText = await eventTitleLocator.innerText();
    const bookingFirstChar = bookingText.trim().charAt(0);
    const eventTitleFirstChar = eventTitleText.trim().charAt(0); 
    await expect(bookingFirstChar).toEqual(eventTitleFirstChar);

    await page.locator('#check-refund-btn').click();
    await expect (page.locator("#refund-spinner")).toBeVisible();
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });
    await expect (page.locator("#refund-result")).toBeVisible();
    await expect (page.locator("#refund-result")).toContainText("Eligible for refund");
    await expect (page.locator("#refund-result")).toContainText("Single-ticket bookings qualify for a full refund");


});

test('Not eligible Refund', async ({page})=>{

    await login(page);
    await page.goto(`${BASE_URL}/events`);
    const Cards = page.getByTestId("event-card");
    await expect(Cards.first()).toBeVisible();
    const bookedCard = Cards.first();
    await bookedCard.getByTestId("book-now-btn").click();

    const fullName = "Hisham Elsocary";
    const Phone = "01114457032";
    await page.getByRole('button',{name: "+"}).click();
    await page.getByRole('button',{name: "+"}).click();
    await page.locator("#customerName").fill(fullName);
    await page.locator("#customer-email").fill(UserName);
    await page.locator("#phone").fill(Phone);
    await page.getByRole("button", { name: "Confirm Booking" }).click();
    await page.getByRole("button", { name: "View My Bookings" }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    const bookingCard = await page.getByTestId("booking-card").first();
    await bookingCard.getByRole("button", {name: "View Details"}).click();
    await page.locator(".space-y-4").waitFor();
    await expect (page.getByText("Booking Information")).toBeVisible();
    const bookingRefElement = page.locator('.items-start .py-1');
    const eventTitleLocator = page.locator('h1');
    const bookingText = await bookingRefElement.innerText();
    const eventTitleText = await eventTitleLocator.innerText();
    const bookingFirstChar = bookingText.trim().charAt(0);
    const eventTitleFirstChar = eventTitleText.trim().charAt(0); 
    await expect(bookingFirstChar).toEqual(eventTitleFirstChar);

    await page.locator('#check-refund-btn').click();
    await expect (page.locator("#refund-spinner")).toBeVisible();
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });
    await expect (page.locator("#refund-result")).toBeVisible();
    await expect (page.locator("#refund-result")).toContainText("Not eligible for refund");
    await expect (page.locator("#refund-result")).toContainText("Group bookings (3 tickets) are non-refundable");


});


