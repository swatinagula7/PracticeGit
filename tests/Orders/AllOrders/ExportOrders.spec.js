const { test, expect } = require('@playwright/test');
const LoginPage = require('../../RTM_Backoffice/pages/LoginPage');
const OrdersPage = require('../../RTM_Backoffice/pages/OrdersPage');

test('Export Orders', async ({ page }) => {
    const login = new LoginPage(page);
    const order = new OrdersPage(page);

  await login.gotoLogin();

  await login.login('admin@email.com', 'admin@email.com');

  await order.navigateToAllOrdersPage();
  
  await order.exportOrders();


});
