const { test, expect } = require('@playwright/test');
const LoginPage = require('../RTM_Backoffice/pages/LoginPage');
const testData = require('../TestData/testData');


test('Login Test - Admin Backoffice', async ({ page }) => {
  const login = new LoginPage(page);

  await login.gotoLogin();
  await login.login(testData.login.admin.email, testData.login.admin.password);
  await login.success();
});