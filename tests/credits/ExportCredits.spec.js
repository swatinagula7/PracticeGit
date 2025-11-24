const { test, expect } = require('@playwright/test');
const LoginPage = require('../RTM_Backoffice/pages/LoginPage');
const CreditsPage = require('../RTM_Backoffice/pages/CreditsPage');
const testData= require('../TestData/testData');

test('Export credits', async ({ page }) => {
  const login = new LoginPage(page);
  const credits = new CreditsPage(page);

  await login.gotoLogin();

  await login.login(testData.login.admin.email, testData.login.admin.password);

  await credits.navigateToAllCredits();
  await credits.exportCredits();
});