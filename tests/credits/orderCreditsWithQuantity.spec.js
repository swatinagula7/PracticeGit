const { test } = require('@playwright/test');
const LoginPage = require('../RTM_Backoffice/pages/LoginPage');
const CreditsPage = require('../RTM_Backoffice/pages/CreditsPage');
const testData = require('../TestData/testData');

test('Order credits using manually setting the price and Quantity', async ({ page }) => {
  const login = new LoginPage(page);
  const credits = new CreditsPage(page);

  await login.gotoLogin();

  await login.login(testData.login.admin.email, testData.login.admin.password);

  await credits.navigateToOrderCredits();
 
  await credits.selectEmployee(testData.credits.customerName);
  
  await credits.orderWithQuantity(testData.credits.reportType, testData.credits.packagePrice, testData.credits.quantity, testData.credits.card);
 //await credits.verifyOrder();
});
