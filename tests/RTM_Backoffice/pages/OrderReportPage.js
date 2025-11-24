const { expect } = require('@playwright/test');
class OrderReportPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToOrderReport() {
        const orderReportLink = this.page.getByRole('link', { name: 'Order Reports' });
        await expect(orderReportLink).toBeVisible({ timeout: 15000 });
        await orderReportLink.click();

    }
    async orderforNewCustomer(newCus) {
        await this.page.getByRole('radio', { name: 'New Customer' }).check();
        await this.page.locator('.form-control').first().fill(newCus.email);
        await this.page.locator('div:nth-child(2) > .col-sm-6 > .form-control').fill(newCus.password);
        await this.page.locator('div:nth-child(3) > .col-sm-6 > .form-control').fill(newCus.confirmPassword);
        await this.page.locator('.col-sm-3 > .form-control').first().fill(newCus.firstName);
        await this.page.locator('div:nth-child(2) > .col-md-12 > .card > .card-body > .card-text > div:nth-child(2) > div > .form-control').first().fill(newCus.lastName);
        await this.page.locator('input[type="text"]').nth(1).fill(newCus.companyName);
        await this.page.locator('div:nth-child(4) > div > .form-control').fill(newCus.phone);
        await this.page.locator('div:nth-child(4) > .form-control').first().fill(newCus.address);

        await this.page.click('body');
        for (let i = 0; i < 4; i++) {
            await this.page.keyboard.press('ArrowDown');
        }

        await this.page.locator('div:nth-child(3) > div:nth-child(4) > .form-control').fill(newCus.city);
        //await this.page.pause();
        await this.page.locator("//div[@class='rz-dropdown valid']").click()
        await this.page.locator("//li[@aria-label='Arkansas']").click()
        await this.page.waitForTimeout(5000);

        //  const stateOption = this.page.locator(`text=${newCus.state}`);
        //     await expect(stateOption).toBeVisible({ timeout: 10000 });
        //     await stateOption.click();

        const dropdownTrigger = this.page.locator('.rz-dropdown-trigger');
        await dropdownTrigger.click();


        await this.page.locator('div:nth-child(5) > div:nth-child(4) > .form-control').fill(newCus.zip);

        const nextButton = this.page.getByRole('button', { name: 'Next' });
        await expect(nextButton).toBeVisible({ timeout: 10000 });
        await expect(nextButton).toBeEnabled({ timeout: 10000 });
        await nextButton.click();
    }


    async selectCustomer(name) {
        const customerInput = this.page.getByRole('combobox');
        await expect(customerInput).toBeVisible({ timeout: 10000 });
        await customerInput.type(name, { delay: 100 });

        await this.page.keyboard.press('ArrowDown');
        const firstOption = this.page.locator('li.rz-autocomplete-list-item').first();
        await expect(firstOption).toBeVisible({ timeout: 10000 });
        await firstOption.click();

        const nextButton = this.page.getByRole('button', { name: 'Next' });
        await expect(nextButton).toBeVisible({ timeout: 10000 });
        await expect(nextButton).toBeEnabled({ timeout: 10000 });
        await nextButton.click();
    }

    async enterLocation(location, city) {

        const locationInput = this.page.getByRole('textbox', { name: 'Enter a location' });
        await expect(locationInput).toBeVisible({ timeout: 50000 });
        await locationInput.fill(location);
        await this.page.waitForTimeout(1000);
        // Wait for autocomplete suggestions
        await this.page.waitForSelector("//div[@class='pac-item']", { timeout: 10000 });
        const addressOptions = await this.page.$$("div.pac-item");

        for (let option of addressOptions) {
            const text = await option.textContent();
            if (text.includes(city)) {
                await option.click();
                break;
            }
        }
    }
    async addReportItem(location, city, reportType, deliveryType) {
        await this.enterLocation(location, city);
        await this.selectReportType(reportType);
        await this.selectDeliveryType(deliveryType);
        await this.addItem();
    }

    async selectReportType(reportType) {
        switch (reportType.trim().toLowerCase()) {
            case "comprehensive":
                await this.page.locator("#Comprehensive").check();
                break;
            case "basic":
                await this.page.locator("#Basic").check();
                break;
            case "standard":
                await this.page.locator("#Standard").check();
                break;
            case "claims":
                await this.page.locator("#Claims").check();
                break;
            default:
                throw new Error(`Invalid report type: ${reportType}. Expected: Comprehensive, Basic, Standard, Claims`);
        }
    }

    async selectDeliveryType(type) {
        switch (type.trim().toLowerCase()) {
            case "rush":
                await this.page.locator("#DeliveryTypeDTO").check();   // Apply rush
                break;
            case "normal":
                await this.page.locator("#DeliveryTypeDTO").uncheck(); // Ensure it's normal
                break;
            default:
                throw new Error(`Invalid delivery type: ${type}. Expected: "Rush" or "Normal"`);
        }
    }



    async completeOrderwithNewcard(cardNumber, month, year, cardName) {

        // Wait and click Next button
        const nextButton = this.page.getByRole('button', { name: 'Next' });
        await expect(nextButton).toBeVisible({ timeout: 15000 });
        await expect(nextButton).toBeEnabled({ timeout: 15000 });
        await nextButton.click();

        // Wait for Credit Card radio and select it
        const creditRadio = this.page.getByRole('radio', { name: 'Credit Card' });
        await expect(creditRadio).toBeVisible({ timeout: 15000 });
        await creditRadio.check();

        // Wait for Card Number textbox and fill it
        const cardNumberInput = this.page.getByRole('textbox', { name: 'Card Number*' });
        await expect(cardNumberInput).toBeVisible({ timeout: 15000 });
        await cardNumberInput.fill(cardNumber);

        // Wait for expiry month/year dropdowns and select options
        const monthDropdown = this.page.locator('#cardExpiryMonth');
        await expect(monthDropdown).toBeVisible({ timeout: 15000 });
        await monthDropdown.selectOption(month);

        const yearDropdown = this.page.locator('#cardExpiryYear');
        await expect(yearDropdown).toBeVisible({ timeout: 15000 });
        await yearDropdown.selectOption(year);

        // Wait for Name on Card input and fill it
        const cardNameInput = this.page.getByRole('textbox', { name: 'Name on Card*' });
        await expect(cardNameInput).toBeVisible({ timeout: 15000 });
        await cardNameInput.fill(cardName);

        // Wait for checkboxes and select them
        const checkboxes = this.page.getByRole('checkbox');
        await expect(checkboxes.nth(0)).toBeVisible({ timeout: 15000 });
        await checkboxes.nth(0).check();
        await expect(checkboxes.nth(1)).toBeVisible({ timeout: 15000 });
        await checkboxes.nth(1).check();

        // Wait for Finish button and click
        const finishButton = this.page.getByRole('button', { name: 'Finish' });
        await expect(finishButton).toBeVisible({ timeout: 15000 });
        await expect(finishButton).toBeEnabled({ timeout: 15000 });
        await finishButton.click();
        await this.page.waitForTimeout(6000);
    }

    async addItem() {
        const addButton = this.page.getByRole('button', { name: 'Add Item' });
        await expect(addButton).toBeVisible({ timeout: 10000 });
        await expect(addButton).toBeEnabled({ timeout: 10000 });
        await addButton.click();
    }

    async completeOrderwithExistingcard(cardLast4) {

        const nextButton = this.page.getByRole('button', { name: 'Next' });
        await expect(nextButton).toBeVisible({ timeout: 15000 });
        await nextButton.click();

        const creditRadio = this.page.getByRole('radio', { name: 'Credit Card' });
        await expect(creditRadio).toBeVisible({ timeout: 15000 });
        await creditRadio.check();

        if (cardLast4) {
            const cardOption = this.page.getByText(cardLast4, { exact: false });
            await expect(cardOption).toBeVisible({ timeout: 10000 });
            await cardOption.click();
        }

        const finishButton = this.page.getByRole('button', { name: 'Finish' });
        await expect(finishButton).toBeVisible({ timeout: 15000 });
        await expect(finishButton).toBeEnabled({ timeout: 15000 });
        await finishButton.click();
        await this.page.waitForTimeout(60000);
    }

    async completeOrderwithPromocode(promo) {
        await this.addItem();
        // await this.page.getByRole('button', { name: 'Add Item' }).click();
        const nextButton = this.page.getByRole('button', { name: 'Next' });
        await expect(nextButton).toBeVisible({ timeout: 15000 });
        await nextButton.click();

        const creditRadio = this.page.getByRole('radio', { name: 'Credit Card' });
        await expect(creditRadio).toBeVisible({ timeout: 15000 });
        await creditRadio.check();

        const promoInput = this.page.getByRole('textbox', { name: 'Promo Code' });
        await expect(promoInput).toBeVisible({ timeout: 10000 });
        await promoInput.fill(promo);

        const applyButton = this.page.getByRole('button', { name: 'Apply' });
        await expect(applyButton).toBeVisible({ timeout: 10000 });
        await applyButton.click();

        const finishButton = this.page.getByRole('button', { name: 'Finish' });
        await expect(finishButton).toBeEnabled({ timeout: 60000 });
        await finishButton.click();
        await this.page.waitForTimeout(60000);
    }
    async orderReportWithPackageCredit(deliveryType, cardLast4) {
        await this.addItem();
        const nextButton = this.page.getByRole('button', { name: 'Next' });
        await expect(nextButton).toBeVisible({ timeout: 15000 });
        await nextButton.click();

        const packageRadio = this.page.getByRole('radio', { name: 'Package Credits' });
        await expect(packageRadio).toBeVisible({ timeout: 15000 });
        await packageRadio.check();

        if (deliveryType?.toLowerCase() === 'rush' && cardLast4) {
            const cardOption = this.page.getByText(cardLast4, { exact: false });
            await expect(cardOption).toBeVisible({ timeout: 10000 });
            await cardOption.click();
        }

        const finishButton = this.page.getByRole('button', { name: 'Finish' });
        await expect(finishButton).toBeVisible({ timeout: 15000 });
        await finishButton.click();
        await this.page.waitForTimeout(60000);
    }
    async orderReportWithInvoice() {
        await this.addItem();
        const nextButton = this.page.getByRole('button', { name: 'Next' });
        await expect(nextButton).toBeVisible({ timeout: 15000 });
        await nextButton.click();

        const invoiceRadio = this.page.getByRole('radio', { name: 'Invoice' });
        await expect(invoiceRadio).toBeVisible({ timeout: 15000 });
        await invoiceRadio.check();

        const finishButton = this.page.getByRole('button', { name: 'Finish' });
        await expect(finishButton).toBeVisible({ timeout: 15000 });
        await finishButton.click();
        await this.page.waitForTimeout(60000);
    }
    async verifyOrder() {
        await this.page.waitForTimeout(10000);
        const customerInfoTab = this.page.getByRole('tab', { name: 'Customer Info' });
        await expect(customerInfoTab).toBeVisible({ timeout: 15000 });

    }

}

module.exports = OrderReportPage;
