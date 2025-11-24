const { expect } = require('@playwright/test');
class CreditsPage {
  constructor(page) {
    this.page = page;

    this.creditsRadioButton = page.getByRole('button', { name: 'Credits ' });
    this.orderCreditsLink = page.getByRole('link', { name: 'Order Credits' });
  }
  async verifySuccessMsg() {
    const toast = this.page.locator('.rz-notification');
    await expect(toast).toBeVisible(); // success message

  }
  async navigateToOrderCredits() {
    await this.creditsRadioButton.click();
    await this.orderCreditsLink.click();

  }
  async navigateToAllCredits() {
    await this.page.getByRole('button', { name: 'Credits ' }).click();
    await this.page.getByRole('link', { name: 'All Credits' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async refundCredits(orderId) {

    // Enter the orderId in the filter
    const filterInput = this.page.locator("(//div[contains(@class,'rz-cell-filter')])[2]//input");
    await expect(filterInput).toBeVisible({ timeout: 10000 });
    await filterInput.type(orderId, { delay: 100 });

    await this.page.keyboard.press('Enter');


    // Wait for the row/button to appear
    const accountButton = this.page
      .getByRole('cell', { name: 'account_circle' })
      .getByRole('button')
      .nth(1);
  //  await expect(accountButton).toBeVisible({ timeout: 15000 });
    await accountButton.click();

    // Click "Refund" from the menu
    const refundMenuItem = this.page.getByRole('menuitem', { name: 'Refund' });
    //await expect(refundMenuItem).toBeVisible({ timeout: 10000 });
    await refundMenuItem.click();

    // Click Submit in the refund dialog
    const submitButton = this.page.getByRole('button', { name: 'Submit' });
    await Promise.all([
      this.page.waitForLoadState('load'), // waits for page to finish loading
      submitButton.click(),
    ]);
    
 await this.page.waitForTimeout(60000);

    const heading = this.page.getByRole('heading', { name: 'Credits Manager' });
    await expect(heading).toBeVisible({ timeout: 60000 });
  }



  async updateCredits(orderId, credits) {
    // Search the order
    const orderInput = this.page.locator("(//div[contains(@class,'rz-cell-filter')])[2]//input");
    await expect(orderInput).toBeVisible({ timeout: 15000 });


    await orderInput.type(orderId, { delay: 100 });
    await this.page.waitForTimeout(3000);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);

    const actionButton = this.page.getByRole('cell', { name: 'account_circle' }).getByRole('button').nth(1);
    await expect(actionButton).toBeVisible({ timeout: 15000 });
    await expect(actionButton).toBeEnabled({ timeout: 60000 });
    await actionButton.click();
    await this.page.waitForTimeout(1000);

    const updateMenu = this.page.getByRole('menuitem', { name: 'Update' });
    await expect(updateMenu).toBeVisible({ timeout: 60000 });
    await updateMenu.click();
    await this.page.waitForTimeout(1000);

    const remainingInput = this.page.locator("(//input[@id='Remaining'])[1]");
    await expect(remainingInput).toBeVisible({ timeout: 60000 });
    // await remainingInput.fill(credits);

    await remainingInput.click({ clickCount: 3 }); // select all text
    await this.page.keyboard.press('Backspace');      // delete selected text
    await this.page.waitForTimeout(500);
    await remainingInput.type(credits, { delay: 150 });
    await this.page.waitForTimeout(500);



    const submitBtn = this.page.locator('.modal-footer >> role=button[name="Submit"]');
    await expect(submitBtn).toBeVisible({ timeout: 10000 });
    await expect(submitBtn).toBeEnabled({ timeout: 60000 });
    await submitBtn.click();
    await this.page.waitForTimeout(1000);

  }


  async selectEmployee(name) {
    await this.page.getByRole('combobox').type(name, { delay: 100 });

    // Trigger dropdown
    await this.page.keyboard.press('ArrowDown');

    // 3. Click on the first matching item in the list
    await this.page.locator('li.rz-autocomplete-list-item').first().click();

  }


  async addCard(card) {
    await this.page.getByRole('radio', { name: 'Credit Card' }).waitFor({ state: 'visible' });
    await this.page.getByRole('radio', { name: 'Credit Card' }).check();
    // await this.page.waitForTimeout(4000);
    await this.page.locator('#cardnumber').fill(card.number);
    await this.page.selectOption('#cardExpiryMonth', card.month);
    await this.page.selectOption('#cardExpiryYear', card.year);
    await this.page.locator('#cardname').fill(card.name);
  }
  async orderWithQuantity(report, packagePrice, quantity, card) {
    const reportUpper = report.toUpperCase();
    await this.page.getByRole('radio', { name: reportUpper }).click();
    await this.page.getByRole('radio', { name: 'Manually Set the Price for' }).check();
    await this.page.getByRole('textbox', { name: 'Package Price*' }).fill(packagePrice);
    await this.page.getByRole('textbox', { name: 'Quantity*' }).fill(quantity);

    await this.page.getByRole('button', { name: 'Next' }).click();

    await this.addCard(card);

    // await this.page.getByRole('radio', { name: 'Credit Card' }).waitFor({ state: 'visible' });
    // await this.page.getByRole('radio', { name: 'Credit Card' }).check();
    // if (cardLast4) {
    //   const cardOption = this.page.getByText(cardLast4, { exact: false });
    //   //await cardOption.waitFor({ state: 'visible', timeout: 5000 });
    //   await cardOption.click();
    // }

    await this.page.getByRole('button', { name: 'Finish' }).click();
    await this.page.waitForTimeout(4000);
  }

  // ✅ Now takes a creditCard object from testData
  async orderWithCreditCard(report, card) {
    const reportUpper = report.toUpperCase();
    await this.page.getByRole('radio', { name: reportUpper }).click();
    await this.page.getByRole('button', { name: 'Next' }).click();

    await this.addCard(card);

    await this.page.getByRole('button', { name: 'Finish' }).click();
    await this.page.waitForTimeout(4000);
  }

  async orderWithPromocode(report, promoCode, card) {
    const reportUpper = report.toUpperCase();
    await this.page.getByRole('radio', { name: reportUpper }).click();
    await this.page.getByRole('button', { name: 'Next' }).click();

    await this.page.waitForTimeout(4000);

    await this.page.getByRole('radio', { name: 'Credit Card' }).waitFor({ state: 'visible' });
    await this.page.getByRole('radio', { name: 'Credit Card' }).check();
    await this.page.getByRole('radio', { name: 'Use New Card' }).check();

    await this.page.locator('#cardnumber').fill(card.number);
    await this.page.selectOption('#cardExpiryMonth', card.month);
    await this.page.selectOption('#cardExpiryYear', card.year);
    await this.page.locator('#cardname').fill(card.name);
    await this.page.getByRole('textbox', { name: 'Promo Code' }).fill(promoCode);
    await this.page.getByRole('button', { name: 'Apply' }).click();

    await this.page.getByRole('button', { name: 'Finish' }).click();
    await this.page.waitForTimeout(4000);
  }
  async orderWithInvoice(report) {
    const reportUpper = report.toUpperCase();
    await this.page.getByRole('radio', { name: reportUpper }).click();
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('radio', { name: 'Invoice' }).waitFor({ state: 'visible' });
    await this.page.getByRole('radio', { name: 'Invoice' }).check();

    await this.page.getByRole('button', { name: 'Finish' }).click();
    await this.page.waitForTimeout(4000);

  }
  async verifyOrder() {
    const heading = this.page.getByRole('heading', { name: 'Credits Manager' });
    await expect(heading).toBeVisible({ timeout: 60000 }); // give 60s if payments are slow
  }
  async exportCredits() {
    const exportButton = this.page.getByRole('button', { name: 'grid_on Export' });
    // Wait for the download event triggered by clicking the export button
    const [download] = await Promise.all([
      this.page.waitForEvent('download', { timeout: 60000 }),
      exportButton.click()
    ]);

    // Get the suggested filename and save the file
    const suggestedName = await download.suggestedFilename();
    await download.saveAs(`downloads/${suggestedName}`);

    console.log(`Exported and saved: downloads/${suggestedName}`);
  }
}
module.exports = CreditsPage;
