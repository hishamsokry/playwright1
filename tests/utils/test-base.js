const base = require('@playwright/test');
exports.customTest = base.test.extend({
    testDataForOrder:     {
    username : "hishosocaryy@gmail.com",
    password : "Test2026#",
    productName : "ZARA COAT 3"
}
});