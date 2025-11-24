const { expect } = require('@playwright/test');
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByLabel(/Email/i);      // matches "Email", "Email *", "Email: *"
    this.passwordInput = page.getByLabel(/Password/i); // matches "Password", "Password *"
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async gotoLogin() {
    await this.page.setViewportSize({ width: 1920, height: 950 })
    // Go to login page but don’t wait for all resources (like fonts, analytics)
    await this.page.goto('https://admin-qa.rooftopmeasurements.com/login', {
      waitUntil: 'domcontentloaded', // HTML & scripts ready, no need for full load
      timeout: 60000, // max 60s, adjust if server is very slow
    });

    // Wait explicitly for the login form (email input) to be visible
    await this.emailInput.waitFor({ state: 'visible', timeout: 60000 });
  }

  async login(email, password) {
    await this.emailInput.fill(email, { timeout: 60000 });
    await this.passwordInput.fill(password, { timeout: 60000 });
    await this.loginButton.click();
    // Optional: wait for navigation or some element that indicates successful login
    await this.page.waitForLoadState('networkidle');
  }
  async success() {
    await expect(this.page.getByText('Production Report')).toBeVisible({ timeout: 15000 });
  }

}

module.exports = LoginPage;
