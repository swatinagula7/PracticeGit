import { test, expect } from '@playwright/test';
test('Tracing ', async ({ page }) => {
    await page.goto('https://admin-qa.rooftopmeasurements.com/login');
    await page.getByLabel(/Email/i).fill('admin@email.com');
    await page.getByLabel(/Password/i).fill('admin@email.com');
    await page.getByRole('button', {name: 'Save'}).click();
          
    });