const { test, expect } = require('@playwright/test');
const LoginPage = require('../RTM_Backoffice/pages/LoginPage');
const EmailTemplatePage = require('../RTM_Backoffice/pages/EmailTemplatePage');
const testData = require('../TestData/testData'); // central testData

test('Navigate to Email Template page', async ({ page }) => {
  const login = new LoginPage(page);
  const emailTemp = new EmailTemplatePage(page);

  await login.gotoLogin();
  
  await login.login(testData.login.admin.email, testData.login.admin.password); // use central testData

  await emailTemp.navigateToEmailTemplate();
});
