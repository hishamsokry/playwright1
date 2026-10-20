//const base = require('@playwright/test');
import {test as baseTest} from "@playwright/test";
interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
};

export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>({
    testDataForOrder:     {
    username : "hishosocaryy@gmail.com",
    password : "Test2026#",
    productName : "ZARA COAT 3"
}
});