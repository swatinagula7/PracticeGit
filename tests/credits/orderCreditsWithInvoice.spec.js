const { test } = require('@playwright/test');
const LoginPage = require('../RTM_Backoffice/pages/LoginPage');
const CreditsPage = require('../RTM_Backoffice/pages/CreditsPage');
const testData = require('../TestData/testData');
test('Order credits with Invoice', async ({ page }) => {
  const login = new LoginPage(page);
  const credits = new CreditsPage(page);

  await login.gotoLogin();
  //await page.pause();
  await login.login(testData.login.admin.email, testData.login.admin.password);

  await credits.navigateToOrderCredits();
  await credits.selectEmployee(testData.credits.customerName);
  await credits.orderWithInvoice(testData.credits.reportType);
  //await credits.verifyOrder();
});
