const { test, expect } = require('@playwright/test');
const LoginPage = require('../../RTM_Backoffice/pages/LoginPage');
const OrdersPage = require('../../RTM_Backoffice/pages/OrdersPage');
const testData = require('../../TestData/testData');
test('Download Files', async ({ page }) => {
    const login = new LoginPage(page);
    const order = new OrdersPage(page);

    await login.gotoLogin();
  
    await login.login(testData.login.admin.email, testData.login.admin.password);


    await order.navigateToAllOrdersPage();
   
    await order.searchOrder(testData.order.downloadOrder);
   
    await order.downloadFiles();
 

});
