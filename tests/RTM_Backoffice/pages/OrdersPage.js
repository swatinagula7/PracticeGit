const { expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
class OrdersPage {
  constructor(page) {
    this.page = page;
    this.statusDropdown = '#SelectStatus'; // must be a string selector
    //this.saveButton = '#nV6GmgQE2E';
  }
  async navigateToAllOrdersPage() {
    await this.page.getByRole('button', { name: 'Orders ' }).click();
    await expect(this.page.getByRole('link', { name: 'All Orders' }))
      .toBeVisible({ timeout: 6000 });
    await this.page.getByRole('link', { name: 'All Orders' }).click();
  }
  async exportOrders() {
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


  async searchOrder(orderId) {
    const filterInput = this.page.locator("(//div[contains(@class,'rz-cell-filter')])[2]//input");
    await expect(filterInput).toBeVisible({ timeout: 6000 });

    await filterInput.fill(orderId);
    await this.page.waitForTimeout(6000);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(4000);
    // await this.page.locator('input.rz-textbox').nth(2).fill(streetName);
    // await this.page.keyboard.press('Enter');
  }
  async updateOrder(update) {

    await this.view();
    await this.page.getByRole('button', { name: 'Update Order' }).click();
    await this.page.getByRole('textbox', { name: 'Zip:' }).fill(update.zip);
    await this.page.getByRole('textbox', { name: 'Lat, Lon:' }).fill(update.latLon);
    await this.page.locator('input[type="text"]').nth(1).fill(update.ccemail);
    // await this.page.getByRole('textbox', { name: 'Manager Notes' }).fill(update.managerNotes);
    // await this.page.getByRole('textbox', { name: 'Additional Production Notes' }).fill(update.productionNotes);
    const submitBtn = this.page.getByRole('button', { name: 'Submit' });
    await expect(submitBtn).toBeEnabled({ timeout: 10000 });
    await submitBtn.click();
    await this.page.waitForTimeout(1000);
  }
  async verifySuccessMsg() {
    const toast = this.page.locator('.rz-notification');
    await expect(toast).toBeVisible({ timeout: 6000 });// success message

  }
  async view() {
    const viewBtn = this.page.locator("(//a[@class='btn btn-sm'][normalize-space()='View'])[1]");
    await expect(viewBtn).toBeVisible({ timeout: 6000 });
    await viewBtn.click();
    await this.page.waitForTimeout(6000);
  }
  async resendReceipt() {
    await this.view();
    const btn = this.page.getByRole('button', { name: 'Resend Receipt' });
    await expect(btn).toBeEnabled({ timeout: 10000 });
    await btn.click();
    await this.page.waitForTimeout(1000);
  }
  async assignTechnician(name) {
    await this.view();
    await this.page.selectOption('#SelectEmployee', { label: name });
    const btn = await this.page.getByRole('button', { name: 'Assign', exact: true });
    await expect(btn).toBeEnabled({ timeout: 40000 });

    await btn.click();
    await this.page.waitForTimeout(4000);

  }
  async uploadFiles(upload) {
    await this.view();
    const fileInput = this.page.locator('input[type="file"]');
    await expect(fileInput).toBeVisible({ timeout: 10000 });
    await fileInput.setInputFiles([upload.file1, upload.file2]);
    await this.page.getByRole('button', { name: 'Upload Files' }).click();
    await this.page.waitForTimeout(10000);
  }

  async orderFlow(name, upload, city) {
    //search with city
    const filterInput = this.page.locator("(//div[contains(@class,'rz-cell-filter')])[9]//input");
    await expect(filterInput).toBeVisible({ timeout: 6000 });

    await filterInput.fill(city);
    await this.page.waitForTimeout(6000);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(4000);

    //assign technician
    await this.view();
    await this.page.selectOption('#SelectEmployee', { label: name });
    const btn = await this.page.getByRole('button', { name: 'Assign', exact: true });
    await expect(btn).toBeEnabled({ timeout: 10000 });

    await btn.click();
    await this.page.waitForTimeout(4000);

    //upload files   
    const fileInput = this.page.locator('input[type="file"]');
    await expect(fileInput).toBeVisible({ timeout: 10000 });
    await fileInput.setInputFiles([upload.file1, upload.file2]);
    await this.page.getByRole('button', { name: 'Upload Files' }).click();
    await this.page.waitForTimeout(4000);

    //deliver report
    await this.page.getByRole('button', { name: 'Deliver' }).click();
    await this.page.waitForTimeout(4000);
  }

  async downloadFiles() {
    await this.view();

    // Step 1: Prepare download folder
    const downloadPath = path.join(__dirname, '../fixtures/downloads');
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
      console.log('Created download folder:', downloadPath);
    }

    // Step 2: Wait for the API response that contains the file
    const [response] = await Promise.all([
      this.page.waitForResponse(resp =>
        resp.url().includes('/api/download') && resp.status() === 200
      ),
      this.page.getByRole('button', { name: 'Download All Files' }).click()
    ]);

    // Step 3: Get the file data as a buffer
    const buffer = await response.body();

    // Step 4: Determine file name
    let fileName = 'downloaded_file.zip'; // default
    const contentDisposition = response.headers()['content-disposition'];
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?(.+?)"?$/);
      if (match) fileName = match[1];
    }

    // Step 5: Save file to local folder
    const filePath = path.join(downloadPath, fileName);
    fs.writeFileSync(filePath, buffer);

    // Step 6: Verify file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`❌ File not downloaded: ${filePath}`);
    }

    console.log(`✅ File downloaded successfully: ${filePath}`);
    return filePath;
  }
  // async downloadFiles() {
  //   await this.view();

  //   // Step 1: Prepare download folder
  //   const downloadPath = path.join(__dirname, '../fixtures/downloads');
  //   if (!fs.existsSync(downloadPath)) {
  //     fs.mkdirSync(downloadPath, { recursive: true });
  //     console.log('Created download folder:', downloadPath);
  //   }

  //   // Step 2: Trigger download via browser execution
  //   await this.page.evaluate(() => {
  //     // Find button by text content
  //     const buttons = Array.from(document.querySelectorAll('button'));
  //     const downloadButton = buttons.find(btn => btn.textContent.includes('Download All Files'));
  //     if (downloadButton) downloadButton.click();
  //   });

  //   // Step 3: Wait until a new file appears in the download folder
  //   const waitForFile = (folder, timeout = 30000) => {
  //     const pollInterval = 500; // 0.5s
  //     const start = Date.now();

  //     return new Promise((resolve, reject) => {
  //       const check = () => {
  //         const files = fs.readdirSync(folder);
  //         if (files.length > 0) {
  //           // pick the most recent file
  //           const filePath = path.join(folder, files.sort((a, b) => {
  //             return fs.statSync(path.join(folder, b)).mtimeMs -
  //               fs.statSync(path.join(folder, a)).mtimeMs;
  //           })[0]);
  //           resolve(filePath);
  //         } else if (Date.now() - start > timeout) {
  //           reject(new Error('❌ File download timed out'));
  //         } else {
  //           setTimeout(check, pollInterval);
  //         }
  //       };
  //       check();
  //     });
  //   };

  //   const filePath = await waitForFile(downloadPath);
  //   console.log(`✅ File downloaded successfully: ${filePath}`);
  //   return filePath;
  // }
  async refundOrder(refundAmount) {

    await this.view();
    await this.page.getByRole('button', { name: 'Refund' }).click();
    await this.page.getByRole('button', { name: 'Yes' }).nth(1).click();
    if (refundAmount > 0) {
      await this.page.getByRole('spinbutton', { name: 'Refund Amount $' }).fill(refundAmount);
      await this.page.getByRole('button', { name: 'Submit' }).click();
    }
    await this.page.waitForTimeout(4000);
  }


  async deliverOrder() {
    await this.view();
    await this.page.getByRole('button', { name: 'Deliver' }).click();
    await this.page.waitForTimeout(6000);
  }

  async navigateToPage(orderStatus) {
    await this.page.getByRole('button', { name: 'Orders ' }).click();
    await this.page.getByRole('link', { name: orderStatus }).click();

  }
  async verifyOrdersPage() {
    await expect(this.page.getByRole('heading', { name: 'Orders' }))
      .toBeVisible({ timeout: 10000 });
  }

  // === Order Info Tab Methods ===
  async selectReportType(reportType) {
    const normalized = reportType?.trim().toLowerCase();

    if (normalized === 'claims') {
      await this.page.getByRole('radio', { name: 'Claims' }).check();
    } else if (normalized === 'comprehensive') {
      await this.page.getByRole('radio', { name: 'Comprehensive' }).check();
    } else if (normalized === 'basic') {
      await this.page.getByRole('radio', { name: 'Basic' }).check();
    } else if (normalized === 'standard') {
      await this.page.getByRole('radio', { name: 'Standard' }).check();
    } else {
      throw new Error(`Unsupported report type: ${reportType}`);
    }
  }


  async enterQuantity(quantity) {
    const qty = this.page.locator('#quantity');
    await expect(qty).toBeVisible({ timeout: 5000 });
    await qty.fill(quantity);
  }

  async toggleRushDelivery(deliveryType) {

    const deliveryCheckbox = this.page.getByRole('checkbox', { name: 'Rush Delivery' });
    await expect(deliveryCheckbox).toBeVisible({ timeout: 5000 });

    const isChecked = await deliveryCheckbox.isChecked();
    if (isChecked !== deliveryType) {
      deliveryType ? await deliveryCheckbox.check() : await deliveryCheckbox.uncheck();
    }
  }

  async goToPaymentTab() {
    const nextButton = this.page.getByRole('button', { name: 'Next' });
    await nextButton.waitFor({ state: 'visible', timeout: 5000 });
    await nextButton.click();
  }

  // === Payment Tab Methods ===
  async selectPayment(paymentMethod, cardLast4) {
    if (!paymentMethod) {
      return; // skip payment tab
    }

    switch (paymentMethod) {
      case 'Credit Card':
        await this.page.getByRole('radio', { name: 'Credit Card' }).check();
        if (cardLast4) {
          const cardOption = this.page.getByText(cardLast4, { exact: false });
          await cardOption.waitFor({ state: 'visible', timeout: 5000 });
          await cardOption.click();
        }
        break;
      case 'No Charge':
      case 'Invoice':
      case 'Package Credit':
        await this.page.getByRole('radio', { name: paymentMethod }).check();
        break;
      default:
        throw new Error(`Unsupported payment method: ${paymentMethod}`);
    }

  }
  async submitOrder() {
    const submitButton = this.page.getByRole('button', { name: 'Submit' });
    const refundButton = this.page.getByRole('button', { name: 'Refund' }).nth(1);


    if (await submitButton.isVisible() && await submitButton.isEnabled()) {
      await submitButton.click();
      await this.page.waitForTimeout(6000);
    }
    else if (await refundButton.isVisible() && await refundButton.isEnabled()) {
      await refundButton.click({ delay: 200 });

    }

  }
  async changeOrder(order) {
    // 1. Fill Order Info tab
    await this.selectReportType(order.reportType);
    await this.enterQuantity(order.quantity);
    await this.toggleRushDelivery(order.deliveryType);

    // 2. Go to Payment tab
    await this.goToPaymentTab();

    //3. Payment selection
    await this.selectPayment(order.paymentMethod, order.cardLast4);
    await this.submitOrder();
    await this.page.waitForTimeout(6000);

  }
}

module.exports = OrdersPage;