import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('file:///C:/Users/hisha/Desktop/Clinic.html');
  await page.getByTestId('nav-register').click();
  await page.getByTestId('input-name').click();
  await page.getByTestId('input-name').fill('Hisham');
  await page.getByTestId('input-name').press('Enter');
  await page.getByTestId('input-email').click();
  await page.getByTestId('input-email').fill('Hishamelsocary@gmail.com');
  await page.getByText('🦷 DentCare — Mini Clinic Register Book Appointment My Appointments Patient').click();
  await page.getByText('🦷 DentCare — Mini Clinic Register Book Appointment My Appointments Patient').click();
  await page.getByTestId('input-phone').click();
  await page.getByTestId('input-phone').fill('01114457032');
  await page.getByTestId('input-dob').fill('2022-04-14');
  await page.getByTestId('input-reason').selectOption('Pain');
  await page.getByText('🦷 DentCare — Mini Clinic Register Book Appointment My Appointments Patient').click();
  await page.getByTestId('input-phone').press('ArrowDown');
  await page.getByTestId('input-phone').press('ArrowDown');
  await page.locator('html').click();
  await page.getByTestId('btn-register').click();
  await expect(page.getByTestId('register-success')).toBeVisible();
});