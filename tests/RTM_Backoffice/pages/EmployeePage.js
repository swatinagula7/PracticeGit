const { expect } = require('@playwright/test');
class EmployeePage {
    constructor(page) {
        this.page = page;
        this.exportButton = page.getByRole('button', { name: 'grid_on Export' });
    }
    async verifyToast() {
        const toast = this.page.locator('.rz-notification');
        await expect(toast).toBeVisible({ timeout: 10000 });
    }
    async goToEmployees() {
        const settingsBtn = this.page.getByRole('button', { name: 'Settings ' });
        await expect(settingsBtn).toBeVisible({ timeout: 10000 });
        await settingsBtn.click();

        const employeesLink = this.page.getByRole('link', { name: 'Employees' });
        await expect(employeesLink).toBeVisible({ timeout: 10000 });
        await employeesLink.click();

        await expect(this.page.getByRole('heading', { name: 'Employees' }))
            .toBeVisible({ timeout: 10000 });
    }

    async addEmployee(name, email, phone, password) {
        await this.page.getByRole('button', { name: '+ Add Employee' }).click();
        await this.page.getByRole('textbox', { name: 'Name*' }).fill(name);
        await this.page.getByRole('textbox', { name: 'Email*' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Phone' }).fill(phone);
        await this.page.getByRole('textbox', { name: 'Password*', exact: true }).fill(password);
        await this.page.getByRole('textbox', { name: 'RepeatPassword*' }).fill(password);
        await this.page.getByLabel('Role').selectOption('Technician');
        await this.page.getByRole('button', { name: 'Create' }).click();
    }

    async searchEmployee(email) {
        const searchBox = this.page.getByLabel('', { exact: true }).nth(2);

        await expect(searchBox).toBeVisible({ timeout: 5000 });
        await searchBox.fill(email);
        await this.page.waitForTimeout(4000);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(4000);

    }
    async deleteEmployee(email) {
        await this.searchEmployee(email);

        const updateBtn = this.page.getByRole('button', { name: 'Update' });
        await expect(updateBtn).toBeVisible({ timeout: 5000 });
        await updateBtn.click();

        await this.page.getByRole('button', { name: 'Delete' }).click();
        await this.page.getByRole('button', { name: 'Yes' }).nth(1).click();
        await this.page.waitForTimeout(1000);

    }
    async activateEmp(email) {
        await this.page.locator("//i[@class='rz-dropdown-clear-icon rzi rzi-times']").click();
        await this.searchEmployee(email);

        const updateBtn = this.page.getByRole('button', { name: 'Update' });
        await expect(updateBtn).toBeVisible({ timeout: 60000 });
        await updateBtn.click();
        const activateBtn = this.page.getByRole('button', { name: 'Activate' });
        await expect(activateBtn).toBeEnabled({ timeout: 60000 });
        await activateBtn.click();

        const yesButton = this.page.getByRole('button', { name: 'Yes' }).nth(1);
        await expect(yesButton).toBeEnabled({ timeout: 60000 });
        await yesButton.click();
        await this.page.waitForTimeout(4000);
        const deactivateBtn = this.page.getByRole('button', { name: 'Deactivate' });
        await expect(deactivateBtn).toBeVisible({ timeout: 5000 });
    }
    async deactivateEmp(email) {
        await this.searchEmployee(email);
        const updateBtn = this.page.getByRole('button', { name: 'Update' });
        await expect(updateBtn).toBeVisible({ timeout: 60000 });
        await updateBtn.click();

        const deactivateBtn = this.page.getByRole('button', { name: 'Deactivate' });
        await expect(deactivateBtn).toBeEnabled({ timeout: 60000 });
        await deactivateBtn.click();

        const yesButton = this.page.getByRole('button', { name: 'Yes' }).nth(1);
        await expect(yesButton).toBeEnabled({ timeout: 60000 });
        await yesButton.click();
        await this.page.waitForTimeout(4000);
        const activateBtn = this.page.getByRole('button', { name: 'Activate' });
        await expect(activateBtn).toBeVisible({ timeout: 60000 });
    }

    async updatePhone(email, newPhone) {
        await this.searchEmployee(email);
        const updateBtn = this.page.getByRole('button', { name: 'Update' });
        await expect(updateBtn).toBeVisible({ timeout: 5000 });
        await updateBtn.click();

        await this.page.waitForTimeout(4000);
        const phoneInput = this.page.locator('#phone');
        await expect(phoneInput).toBeVisible({ timeout: 5000 });
        await phoneInput.fill(newPhone);

        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForTimeout(1000);
    }
    async exportEmp() {
        const exportButton = this.page.getByRole('button', { name: 'grid_on Export' });
        // Wait for the download event triggered by clicking the export button
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            exportButton.click()
        ]);

        // Get the suggested filename and save the file
        const suggestedName = await download.suggestedFilename();
        await download.saveAs(`downloads/${suggestedName}`);

        console.log(`Exported and saved: downloads/${suggestedName}`);
    }

    async checkEmp(emp) {
        const EmpName = await this.page.locator('body > div:nth-child(1) > div:nth-child(1) > main:nth-child(2) > article:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(2)');
        await this.page.waitForTimeout(4000);
        await expect(EmpName).toBeVisible();
        await expect(EmpName).toContainText(emp);
    }





}
module.exports = EmployeePage;
