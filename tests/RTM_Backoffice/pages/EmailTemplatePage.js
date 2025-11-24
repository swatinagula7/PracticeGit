const { expect } = require('@playwright/test');
class EmailTemplatePage {
  constructor(page) {
    this.page = page;
  }

  async navigateToEmailTemplate() {
    // Wait and click Settings
    const settingsBtn = this.page.getByRole('button', { name: 'Settings ' });
    await expect(settingsBtn).toBeVisible({ timeout: 10000 });
    await settingsBtn.click();

    // Wait and click Email Templates link
    const emailTemplatesLink = this.page.getByRole('link', { name: 'Email Templates' });
    await expect(emailTemplatesLink).toBeVisible({ timeout: 10000 });
    await emailTemplatesLink.click();

    // Verify navigation
    const heading = this.page.getByRole('heading', { name: 'Email Template Manage' });
    await expect(heading).toBeVisible({ timeout: 10000 });

  }
}

module.exports = EmailTemplatePage;