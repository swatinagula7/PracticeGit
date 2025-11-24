const { test, expect } = require('@playwright/test');
const LoginPage = require('../RTM_Backoffice/pages/LoginPage');
const CustomerPage = require('../RTM_Backoffice/pages/CustomerPage');
const testData = require('../TestData/testData');

test('Activate customer', async ({ page }) => {
    const login = new LoginPage(page);
    const customer = new CustomerPage(page);

    await login.gotoLogin();


    await login.login(testData.login.admin.email, testData.login.admin.password);

    await customer.navigateToCustomerPage();
   
    await customer.searchCustomer(testData.customer.activateCustomer);

    await customer.activateCustomer();
});