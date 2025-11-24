const { test, expect } = require('@playwright/test');
const LoginPage = require('../RTM_Backoffice/pages/LoginPage');
const OrderReportPage = require('../RTM_Backoffice/pages/OrderReportPage');
const testData = require('../TestData/testData');

test('Order a report with New customer', async ({ page }) => {
  const login = new LoginPage(page);
  const orderReport = new OrderReportPage(page);

  await login.gotoLogin();
  
  await login.login(testData.login.admin.email, testData.login.admin.password);

  await orderReport.navigateToOrderReport();
  await orderReport.orderforNewCustomer(testData.orderReport.newCustomer);

 
  await orderReport.enterLocation(testData.orderReport.location, testData.orderReport.city);
  await orderReport.selectReportType(testData.orderReport.type);
  await orderReport.selectDeliveryType(testData.orderReport.deliveryType);
  await orderReport.addItem();
  await orderReport.completeOrderwithNewcard(
    testData.orderReport.addCard.cardNumber,
    testData.orderReport.addCard.expiryMonth,
    testData.orderReport.addCard.expiryYear,
    testData.orderReport.addCard.cardName
  );
  

 // await orderReport.verifyOrder();
});
