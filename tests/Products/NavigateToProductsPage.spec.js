const { test, expect } = require('@playwright/test');
const LoginPage = require('../RTM_Backoffice/pages/LoginPage');
const ProductsPage = require('../RTM_Backoffice/pages/ProductsPage');
const testData = require('../TestData/testData');

test('Navigate to products page', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);

  await login.gotoLogin();
  await page.pause();
  await login.login(testData.login.admin.email, testData.login.admin.password);

  await products.navigateToProductsPage();
});
