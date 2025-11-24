const { test, expect } = require('@playwright/test');
const LoginPage = require('../RTM_Backoffice/pages/LoginPage');
const OrderReportPage = require('../RTM_Backoffice/pages/OrderReportPage');
const testData = require('../TestData/testData');

test('Order a report with Invoice', async ({ page }) => {
  const login = new LoginPage(page);
  const orderReport = new OrderReportPage(page);

  await login.gotoLogin();

  await login.login(testData.login.admin.email, testData.login.admin.password);

  await orderReport.navigateToOrderReport();
  await orderReport.selectCustomer(testData.orderReport.customerName);
  
  await orderReport.enterLocation(testData.orderReport.location, testData.orderReport.city);
  await orderReport.selectReportType(testData.orderReport.type);
  await orderReport.orderReportWithInvoice();

  //await orderReport.verifyOrder();
});
