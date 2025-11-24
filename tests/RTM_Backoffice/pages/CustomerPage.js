const { test, expect, chromium } = require('@playwright/test');
class CustomerPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToCustomerPage() {
        await this.page.getByRole('link', { name: 'Customers' }).click();
    }

    async addNewCustomer({
        companyName,
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zip,
        password
    }) {
        
        await this.page.getByRole('button', { name: '+ Add Customer' }).click();

        await this.page.getByRole('textbox', { name: 'Company Name*' }).fill(companyName);
        await this.page.getByRole('textbox', { name: 'First Name*' }).fill(firstName);
        await this.page.getByRole('textbox', { name: 'Last Name*' }).fill(lastName);
        await this.page.getByRole('textbox', { name: 'Email*' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Phone1*' }).fill(phone);
        await this.page.getByRole('textbox', { name: 'StreetAddress1*' }).fill(address);
        await this.page.getByRole('textbox', { name: 'City*' }).fill(city);
        await this.page.pause()
        await this.page.locator("//div[@class='rz-dropdown valid']").click()
        await this.page.locator("//li[@aria-label='Arkansas']").click()
        await this.page.waitForTimeout(5000);

       // await this.page.locator('label').filter({ hasText: 'Alabama' }).click();
        await this.page.getByText(state).click();
        await this.page.getByRole('textbox', { name: 'ZipCode*' }).fill(zip);
        await this.page.getByRole('textbox', { name: 'Password*', exact: true }).fill(password);
        await this.page.getByRole('textbox', { name: 'Repeat Password*' }).fill(password);
        await this.page.getByRole('button', { name: 'Create' }).click();
        await this.page.waitForTimeout(1000);
    }

    async verifyCustomerCreated(expectedFullName) {
        const customerNameLocator = this.page.locator('//body[1]/div[1]/div[1]/main[1]/article[1]/div[1]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[2]');

        await expect(customerNameLocator).toContainText(expectedFullName, { timeout: 15000 });


    }
    async searchCustomer(custEmail) {

        await this.page.getByLabel('', { exact: true }).nth(2).type(custEmail, { delay: 100 });
        //await this.page.getByLabel('', { exact: true }).nth(2).fill(custEmail);
        await this.page.keyboard.press('Enter');
        // ✅ wait until searched customer row appears
        const customerRow = this.page.locator(`tr:has-text("${custEmail}")`);
        await expect(customerRow).toBeVisible({ timeout: 20000 });
    }


    async openCustomerView() {
        const context = this.page.context();

        // ✅ ensure View button is visible before clicking
        const viewButton = this.page.getByRole('button', { name: 'View' }).first();
        await expect(viewButton).toBeVisible({ timeout: 10000 });

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            viewButton.click(),
        ]);

        await newPage.waitForLoadState('domcontentloaded');
        // ✅ Extra wait: make sure "Customer Info" tab is visible
        await expect(newPage.getByRole('tab', { name: 'Customer Info' })).toBeVisible({ timeout: 20000 });
        return newPage;
    }
    async addCCEmail(CCEmail) {
        const newPage = await this.openCustomerView();
       // await this.newPage.waitForTimeout(4000);
        await newPage.getByRole('button', { name: 'Add CC Email' }).click();
        await newPage.getByRole('textbox', { name: 'Email' }).fill(CCEmail);
        await newPage.getByRole('checkbox', { name: 'Always CC' }).check();
        await newPage.getByRole('button', { name: 'Add', exact: true }).click();
        await newPage.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForTimeout(1000);
        //await this.verifyToast(newPage);

    }

    async deleteCCEmail() {
        const newPage = await this.openCustomerView();
        await this.page.waitForTimeout(4000);
        
        await newPage.getByRole('cell', { name: 'Delete' }).getByRole('button').click();
      
        await newPage.getByRole('button', { name: 'Yes' }).nth(1).click();
        await this.page.waitForTimeout(1000);
     

        //await this.verifyToast(newPage);

    }
    async verifyToast(pageInstance = this.page) {
        const toast = pageInstance.locator('.rz-notification');
        await expect(toast).toBeVisible({ timeout: 20000 });
    }

    async updateCustomer(phone) {
        const newPage = await this.openCustomerView();
        await this.page.waitForTimeout(4000);
        // Wait for Update button and click
        const updateBtn = newPage.getByRole('button', { name: 'Update' }).first();
        await expect(updateBtn).toBeVisible({ timeout: 10000 });
        await updateBtn.click();
        await this.page.waitForTimeout(4000);
        // Fill phone number
        const phoneInput = newPage.getByRole('textbox', { name: 'Phone1*' });
        await expect(phoneInput).toBeVisible({ timeout: 10000 });
        await phoneInput.fill(phone);
        const submitBtn = newPage.getByRole('button', { name: 'Submit' });
        await expect(submitBtn).toBeEnabled({ timeout: 10000 });
        await submitBtn.click();

        await this.verifyToast(newPage);
    }

    async deactivateCustomer() {
        const newPage = await this.openCustomerView();

        // Wait until the Deactivate button is visible and enabled
        const deactivateButton = newPage.getByRole('button', { name: 'Deactivate' });
        await expect(deactivateButton).toBeEnabled({ timeout: 15000 });
        await deactivateButton.click();

        // Wait until the confirmation dialog's Yes button is visible and enabled
        const yesButton = newPage.getByRole('button', { name: 'Yes' }).nth(1);
        await expect(yesButton).toBeEnabled({ timeout: 10000 });
        await yesButton.click();

        // Wait for the success toast to appear
        await this.verifyToast(newPage);
    }

    async activateCustomer() {
        const newPage = await this.openCustomerView();

        const activateButton = newPage.getByRole('button', { name: 'Activate' });
        await expect(activateButton).toBeEnabled({ timeout: 15000 });
        await activateButton.click();

        const yesButton = newPage.getByRole('button', { name: 'Yes' }).nth(1);
        await expect(yesButton).toBeEnabled({ timeout: 10000 });
        await yesButton.click();

        await this.verifyToast(newPage);
    }

    async deleteCustomer() {
        const newPage = await this.openCustomerView();

        const deleteBtn = newPage.getByRole('button', { name: 'Delete' });
        //  await expect(deleteBtn).toBeEnabled({ timeout: 15000 });
        await deleteBtn.click();

        const yesButton = newPage.getByRole('button', { name: 'Yes' }).nth(1);
        await expect(yesButton).toBeEnabled({ timeout: 10000 });
        await yesButton.click();

        await this.verifyToast(newPage);
    }



    async updateCCEmail(oldEmail, CCEmail) {
        const newPage = await this.openCustomerView();

        await this.page.waitForTimeout(4000);

        // Wait for the row with the old email to appear
        const row = newPage.locator('tr', { hasText: oldEmail });
        await expect(row).toBeVisible({ timeout: 15000 });

        const updateBtn = row.getByRole('button', { name: 'Update' });
        await expect(updateBtn).toBeVisible({ timeout: 10000 });
        await updateBtn.click();


        // Wait for the Email textbox to appear
        const emailInput = newPage.getByRole('textbox', { name: 'Email' });
        await expect(emailInput).toBeVisible({ timeout: 15000 });
        // Clear the field
        await emailInput.evaluate(input => input.value = '');

        // Type the new CC email
        await emailInput.type(CCEmail, { delay: 100 });


        // Trigger events to ensure frontend updates and backend receives the change
        await emailInput.evaluate(input => {
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            input.blur();
        });

        // Optional small wait for UI to catch up
        await newPage.waitForTimeout(1000);

        // Click Submit
        const submitButton = newPage.getByRole('button', { name: 'Submit' });
        await expect(submitButton).toBeVisible({ timeout: 10000 });
        await expect(submitButton).toBeEnabled({ timeout: 10000 });
        await submitButton.click();


        await this.verifyToast(newPage);

    }

    async addCard(cardNumber, month, year, cardName) {
        const newPage = await this.openCustomerView();
        await this.page.waitForTimeout(4000);
        await newPage.getByRole('button', { name: 'Add Card' }).click();
        await newPage.getByRole('textbox', { name: 'Card Number* Name on Card*' }).fill(cardNumber);
        await newPage.locator('#cardExpiryMonth').selectOption(month);
        await newPage.locator('#cardExpiryYear').selectOption(year);
        await newPage.getByRole('checkbox', { name: 'IsDefault' }).check();

        await newPage.locator('#cardnumber').nth(1).fill(cardName);
        await newPage.getByRole('button', { name: 'Save' }).click();
        await this.verifyToast(newPage);
    }
    async orderHistory() {
        const newPage = await this.openCustomerView();
        await this.page.waitForTimeout(4000);
        await newPage.getByRole('tab', { name: 'Customer Order History' }).click();
        await expect(newPage.getByRole('heading', { name: 'Customer History' })).toBeVisible();
        await this.page.waitForTimeout(1000);

    }

    async exportCustomer() {
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


}

module.exports = CustomerPage;
