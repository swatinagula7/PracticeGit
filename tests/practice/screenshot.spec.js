import { test, expect } from '@playwright/test';
test('page screenshot', async ({ page }) => {
    await page.goto('https://admin-qa.rooftopmeasurements.com/login');
    await page.getByLabel(/Email/i).fill('admin@email.com');
    await page.getByLabel(/Password/i).fill('admin@email.com');
    //await page.screenshot({ path: 'tests/screenshots/'+Date.now()+'HomePage.png'})

    //await page.screenshot({ path: 'tests/screenshots/'+Date.now()+'FullPage.png',fullPage:true})
    await page.locator("//input[@name='Username']").screenshot({ path: 'tests/screenshots/' + Date.now() + 'Mackbook.png', fullPage: true })

});