const { expect } = require('@playwright/test');
class PromocodePage {
  constructor(page) {
    this.page = page;
  }
  async verifyToast() {
    const toast = this.page.locator('.rz-notification');
    await expect(toast).toBeVisible({ timeout: 6000 });
  }

  async navigateToPromoCodes() {
    const settingsBtn = this.page.getByRole('button', { name: 'Settings ' });
    await expect(settingsBtn).toBeVisible({ timeout: 6000 });
    await settingsBtn.click();

    const promoLink = this.page.getByRole('link', { name: 'Promo Codes' });
    await expect(promoLink).toBeVisible({ timeout: 6000 });
    await promoLink.click();
  }

  async createPromoCode(code, desc, value, type = 'F', sdate, edate, limit) {
    await this.page.getByRole('textbox', { name: 'Enter Promo Code' }).fill(code);
    await this.page.getByRole('textbox', { name: 'Enter Description Promo Code' }).fill(desc);

    const typeDropdown = this.page.getByRole('combobox');
    await expect(typeDropdown).toBeVisible({ timeout: 5000 });
    await typeDropdown.selectOption(type);

    await this.page.getByPlaceholder('$').fill(value);
    await this.page.getByRole('textbox', { name: 'Start Date*' }).fill(sdate);

    await this.page.getByRole('checkbox').first().uncheck();
    await this.page.getByRole('textbox', { name: 'End Date' }).fill(edate);
    await this.page.getByRole('checkbox').nth(2).uncheck();

    await this.page.getByRole('spinbutton').nth(2).fill(limit);
    await this.page.getByRole('checkbox').nth(2).check();

    const saveBtn = this.page.getByRole('button', { name: 'Save' });
    await expect(saveBtn).toBeEnabled({ timeout: 5000 });
    await saveBtn.click();
    await this.page.waitForTimeout(4000);
  }

  async promocodeForOrder(promo) {
    await this.page.getByRole('button', { name: '+ Add PromoCode' }).click();
    await this.page.getByRole('radio', { name: 'Order', exact: true }).check();
    await this.page.getByRole('radio', { name: promo.orderType }).check();
    await this.page.getByRole('radio', { name: promo.reportType }).check();
    await this.createPromoCode(promo.code, promo.desc, promo.value, promo.type, promo.startDate, promo.endDate, promo.limit);
    await this.verifyPromoCreation();
  }

  async promocodeForAccountCredits(promo) {
    await this.page.getByRole('button', { name: '+ Add PromoCode' }).click();
    await this.page.getByRole('radio', { name: 'Account Credits' }).check();
    await this.page.getByRole('radio', { name: promo.reportType }).check();
    await this.createPromoCode(promo.code, promo.desc, promo.value, promo.type, promo.startDate, promo.endDate, promo.limit);
    await this.verifyPromoCreation();
  }

  async promocodeForRushDeliveryType(promo) {
    await this.page.getByRole('button', { name: '+ Add PromoCode' }).click();
    await this.page.getByRole('radio', { name: 'Rush Delivery Type' }).check();
    await this.page.getByRole('radio', { name: promo.orderType }).check();
    await this.createPromoCode(promo.code, promo.desc, promo.value, promo.type, promo.startDate, promo.endDate, promo.limit);
    await this.verifyPromoCreation();
  }
  async verifyPromoCreation() {
    await this.page.getByRole('heading', { name: 'Promo Code Manager' }).waitFor({ state: 'visible' });

  }
  async searchPromo(code) {
    const searchBox = this.page.getByLabel('', { exact: true }).first();
    await expect(searchBox).toBeVisible({ timeout: 5000 });
    await searchBox.fill(code);
    await this.page.waitForTimeout(4000);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(4000);

  }

   async deactivatePromo() {
    const btn = this.page.getByRole('cell', { name: 'account_circle' }).getByRole('button').nth(1);
    await expect(btn).toBeVisible({ timeout: 6000 });
    await btn.click();

    const deactivateMenu = this.page.getByRole('menuitem', { name: 'DeActivate' }).locator('a');
    await expect(deactivateMenu).toBeVisible({ timeout: 6000 });
    await deactivateMenu.click();

    const yesBtn = this.page.getByRole('button', { name: 'Yes' }).nth(1);
    await expect(yesBtn).toBeEnabled({ timeout: 6000 });
    await yesBtn.click();
    await this.page.waitForTimeout(1000);
  }

  async activatePromo() {
    const btn = this.page.getByRole('cell', { name: 'account_circle' }).getByRole('button').nth(1);
    await expect(btn).toBeVisible({ timeout: 6000 });
    await btn.click();

    const activateMenu = this.page.getByRole('menuitem', { name: 'Activate' }).locator('a');
    await expect(activateMenu).toBeVisible({ timeout: 6000 });
    await activateMenu.click();

    const yesBtn = this.page.getByRole('button', { name: 'Yes' }).nth(1);
    await expect(yesBtn).toBeEnabled({ timeout: 6000 });
    await yesBtn.click();
    await this.page.waitForTimeout(1000);
  }

  async deletePromo() {
    const btn = this.page.getByRole('cell', { name: 'account_circle' }).getByRole('button').nth(1);
    await expect(btn).toBeVisible({ timeout: 6000 });
    await btn.click();

    const deleteMenu = this.page.getByRole('menuitem', { name: 'Delete' }).locator('a');
    await expect(deleteMenu).toBeVisible({ timeout: 6000 });
    await deleteMenu.click();

    const yesBtn = this.page.getByRole('button', { name: 'Yes' }).nth(1);
    await expect(yesBtn).toBeEnabled({ timeout: 6000 });
    await yesBtn.click();
  }

  async promocodeHistory(code) {

    await this.page.getByRole('cell', { name: 'account_circle' }).getByRole('button').nth(1).click();
    await this.page.getByRole('menuitem', { name: 'History' }).locator('a').click();
    await expect(this.page.getByRole('heading', { name: 'Promo Code History' })).toBeVisible({ timeout: 6000 });
  }
}

module.exports = PromocodePage;
