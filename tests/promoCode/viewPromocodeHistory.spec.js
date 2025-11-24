const { test } = require('@playwright/test');
const LoginPage = require('../RTM_Backoffice/pages/LoginPage');
const PromocodePage = require('../RTM_Backoffice/pages/PromocodePage');
const testData = require('../TestData/testData');

test('View Promocode History', async ({ page }) => {
  const login = new LoginPage(page);
  const promo = new PromocodePage(page);

  await login.gotoLogin();
  await login.login(testData.login.admin.email, testData.login.admin.password);
  await promo.navigateToPromoCodes();

  await promo.searchPromo(testData.promoCode.promoHistory); 
  await promo.promocodeHistory(testData.promoCode.promoHistory); 

});
