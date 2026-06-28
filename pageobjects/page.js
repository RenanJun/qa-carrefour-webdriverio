// module.exports = class Page {
//     async waitForElement(element, timeout = 10000) {
//         await element.waitForDisplayed({ timeout });
//     }

//     async click(element) {
//         await this.waitForElement(element);
//         await element.click();
//     }

//     async setValue(element, value) {
//         await this.waitForElement(element);
//         await element.setValue(value);
//     }
// };