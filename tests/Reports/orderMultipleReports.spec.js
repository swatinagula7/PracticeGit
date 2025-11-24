const { test, expect } = require('@playwright/test');
const LoginPage = require('../RTM_Backoffice/pages/LoginPage');
const OrderReportPage = require('../RTM_Backoffice/pages/OrderReportPage');
const testData = require('../TestData/testData');

test('Order a Multiple reports', async ({ page }) => {
  const login = new LoginPage(page);
  const orderReport = new OrderReportPage(page);

  await login.gotoLogin();

  await login.login(testData.login.admin.email, testData.login.admin.password);

  await orderReport.navigateToOrderReport();
  await orderReport.selectCustomer(testData.orderReport.customerName);



  // Loop through all reports from testData
  for (const report of testData.orderMultipleReport.reports) {
    await orderReport.addReportItem(
      report.location,
      report.city,
      report.reportType,
      report.deliveryType
    );
  }

  await orderReport.completeOrderwithExistingcard(testData.orderMultipleReport.cardLast4);

 // await orderReport.verifyOrder();
});
