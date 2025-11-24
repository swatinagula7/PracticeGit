const { test, expect } = require('@playwright/test');
const LoginPage = require('../../RTM_Backoffice/pages/LoginPage');
const OrderReportPage = require('../../RTM_Backoffice/pages/OrderReportPage');
const OrdersPage = require('../../RTM_Backoffice/pages/OrdersPage');
const testData = require('../../TestData/testData');
test('order flow', async ({ page }) => {
    const login = new LoginPage(page);
    const order = new OrdersPage(page);
    const orderReport = new OrderReportPage(page);

    await login.gotoLogin();

    await login.login(testData.login.admin.email, testData.login.admin.password);

    await orderReport.navigateToOrderReport();
    await orderReport.selectCustomer(testData.orderFlow.customerName);

    await orderReport.enterLocation(testData.orderFlow.location, testData.orderFlow.city);
    await orderReport.selectReportType(testData.orderFlow.type);

    await orderReport.selectDeliveryType(testData.orderFlow.deliveryType);
    await orderReport.addItem();
    await orderReport.completeOrderwithExistingcard(testData.orderFlow.cardLast4);

    await order.navigateToAllOrdersPage();

    await order.orderFlow(testData.orderFlow.technician,testData.orderFlow.uploadFiles,testData.orderFlow.city);
});
