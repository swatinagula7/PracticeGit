const { test, expect } = require('@playwright/test');
const LoginPage = require('../RTM_Backoffice/pages/LoginPage');
const CreditsPage = require('../RTM_Backoffice/pages/CreditsPage');
const testData = require('../TestData/testData');

test('Refund credits', async ({ page }) => {
  const login = new LoginPage(page);
  const creditsPage = new CreditsPage(page);

  await login.gotoLogin();

  await login.login(testData.login.admin.email, testData.login.admin.password);
  await creditsPage.navigateToAllCredits();

  await creditsPage.refundCredits(testData.credits.refundId);
  await page.waitForTimeout(1000);
 // await creditsPage.verifySuccessMsg();

});
