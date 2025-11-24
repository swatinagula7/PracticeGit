const { expect } = require('@playwright/test');
class DashboardPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToPrductionSnapshotPage() {

        // Click the link
        await this.page.getByRole('link', { name: 'Production Snapshot' }).click();
        await this.page.waitForTimeout(4000);
        // Wait for page heading
        await expect(this.page.getByText('Production Report')).toBeVisible({ timeout: 15000 });

        // Open dropdown and select option
        const dropdown = this.page.locator('.rz-dropdown');
        await expect(dropdown).toBeVisible({ timeout: 10000 });
        await dropdown.click();

        const ytdOption = this.page.getByRole('option', { name: 'YTD' });
        await expect(ytdOption).toBeVisible({ timeout: 10000 });
        await ytdOption.click();


    }
    async navigateToSalesStatisticPage() {
        // Click the link
    await this.page.getByRole('link', { name: 'Sales Statistics' }).click();

    // Wait for heading
    await expect(this.page.getByRole('article').getByText('Sales Statistics')).toBeVisible({ timeout: 15000 });

    // Cycle through dropdown options
    const dropdown = this.page.locator('.rz-dropdown-trigger');
    await expect(dropdown).toBeVisible({ timeout: 10000 });

    await dropdown.click();
    await this.page.getByRole('option', { name: 'WTD' }).click();

    await dropdown.click();
    await this.page.getByRole('option', { name: 'MTD' }).click();

    await dropdown.click();
    await this.page.getByRole('option', { name: 'YTD' }).click();
    }
}

module.exports = DashboardPage;