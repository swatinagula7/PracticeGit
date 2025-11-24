const { test, expect } = require('@playwright/test');
const LoginPage = require('../RTM_Backoffice/pages/LoginPage');
const EmployeePage = require('../RTM_Backoffice/pages/EmployeePage');
const testData = require('../TestData/testData');

test('Delete employee', async ({ page }) => {
    const login = new LoginPage(page);
    const employee = new EmployeePage(page);

    await login.gotoLogin();
   
    await login.login(testData.login.admin.email, testData.login.admin.password);

    await employee.goToEmployees();
    await employee.deleteEmployee(testData.employee.deleteEmp);
    //await employee.verifyToast();
});
