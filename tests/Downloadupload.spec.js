const ExcelJs = require('exceljs');
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');

async function WriteExcelTest(searchText, replacedText, change , filePath){
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output = await readexcel(worksheet, searchText);

  const cell = worksheet.getCell(output.row, output.column + change.columnChange);
  cell.value = replacedText;
  await workbook.xlsx.writeFile(filePath);
};

async function readexcel(worksheet, searchText){
    let output = {row: -1, column: -1};
    worksheet.eachRow((row, rowNumber)=> {
  row.eachCell((cell, colNumber)=>{
    if(cell.value === searchText){
        output.row = rowNumber;
        output.column = colNumber;
    }

  });
});

    return output;
};

//WriteExcelTest("Mango", 350,{rowChange:0, columnChange:2} , "C:\\Users\\hisha\\Desktop\\excelTrainingDownload.xlsx");

test('download and upload excel file', async ({ page }) => {
  const textSearch = 'Mango';
  const updatedValue = '350';
  const downloadFilePath = path.join(__dirname, 'download.xlsx');
  if (fs.existsSync(downloadFilePath)) {
    fs.unlinkSync(downloadFilePath);
  }

  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Download' }).click(),
  ]);

  await download.saveAs(downloadFilePath);

  await WriteExcelTest(textSearch, updatedValue, { rowChange: 0, columnChange: 2 }, downloadFilePath);
  await page.setInputFiles('#fileinput', downloadFilePath);
  const textLocator = await page.getByText(textSearch);
  const desiredRow = await page.getByRole('row').filter({ has: textLocator });
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updatedValue);
// Add a test case to verify the updated value in the Excel file
  
});
