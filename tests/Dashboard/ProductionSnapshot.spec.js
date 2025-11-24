const { test, expect } = require('@playwright/test');
const LoginPage = require('../RTM_Backoffice/pages/LoginPage');
const DashboardPage = require('../RTM_Backoffice/pages/DashboardPage');
const testData = require('../TestData/testData');

test('Navigate to Prduction Snapshot Page', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new DashboardPage(page);

  await login.gotoLogin();
  
  await login.login(testData.login.admin.email, testData.login.admin.password);

  await products.navigateToPrductionSnapshotPage();
});
