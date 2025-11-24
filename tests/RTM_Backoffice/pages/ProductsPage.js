const { expect } = require('@playwright/test');
class ProductsPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToProductsPage() {
    await this.page.getByRole('button', { name: 'Settings ' }).click();
    await this.page.getByRole('link', { name: 'Products' }).click();
    await expect(this.page.getByRole('heading', { name: 'Product Manager' })).toBeVisible();


  }
}

module.exports = ProductsPage;