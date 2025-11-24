class BasePage {
  constructor(page) {
    this.page = page;
  }

  async login(email, password) {
    await this.page.goto('/login');
    await this.page.getByRole('textbox', { name: 'Email: *' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password: *' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
module.exports = BasePage;