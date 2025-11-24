// excel-reporter.js
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

class ExcelReporter {
  constructor(options = {}) {
    this.outputFile = options.outputFile || path.join(__dirname, 'playwright-results.xlsx');
    this.results = [];
  }

  onTestEnd(test, result) {
    this.results.push({
      title: test.title,
      file: test.location.file,
      status: result.status,
      duration: result.duration,
      error: result.error ? result.error.message : '',
    });
  }

  async onEnd() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Test Results');

    // Header row
    sheet.addRow(['Test Name', 'File', 'Status', 'Duration (ms)', 'Error']);

    // Test results
    this.results.forEach(r => {
      sheet.addRow([r.title, r.file, r.status, r.duration, r.error]);
    });

    // Styling (optional)
    sheet.getRow(1).font = { bold: true };
    sheet.columns = [
      { width: 40 },
      { width: 40 },
      { width: 15 },
      { width: 15 },
      { width: 50 },
    ];

    // Ensure directory exists
    const dir = path.dirname(this.outputFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await workbook.xlsx.writeFile(this.outputFile);
    console.log(`✅ Test results saved to ${this.outputFile}`);
  }
}

module.exports = ExcelReporter;
