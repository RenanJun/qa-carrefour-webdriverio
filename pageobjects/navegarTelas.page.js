const path = require('path');
const allure = require('@wdio/allure-reporter').default;

const loginData = require(path.join(process.cwd(), './src/data/loginData.json'));

class MenuPage {
    get homeMenuButton() { return $('~Home'); }
    get homeMenuText() { return $('//android.widget.TextView[@text="WEBDRIVER"]'); }
    get WebMenuButton() { return $('~Webview'); }
    get loginMenuButton() { return $('~Login'); }
    get loginMenuText() { return $('//android.widget.TextView[@text="Login / Sign up Form"]'); }
    get formsMenuButton() { return $('~Forms'); }
    get formsMenuText() { return $('//android.widget.TextView[@text="Form components"]'); }
    get swipeMenuButton() { return $('~Swipe'); }
    get swipeMenuText() { return $('//android.widget.TextView[@text="Swipe horizontal"]'); }
    get dragMenuButton() { return $('~Drag'); }
    get dragMenuText() { return $('//android.widget.TextView[@text="Drag and Drop"]'); }
    get menuButton() { return $('~Menu'); }
    get menuText() { return $('//android.widget.TextView[@text="Menu"]'); }

    get inputEmail() { return $('~input-email'); }
    get inputPassword() { return $('~input-password'); }
    get btnSubmit() { return $('~button-LOGIN'); }

    // Seletores do Modal
    get alertTitle() { return $('id=com.wdiodemoapp:id/alert_title'); }
    get alertMessage() { return $('id=android:id/message'); }
    get alertOkBtn() { return $('id=android:id/button1'); }

    // Seletores de Erros de Input
    get erroInputEmail() { return $('//android.widget.TextView[@text="Please enter a valid email address"]'); }
    get erroInputPassword() { return $('//android.widget.TextView[@text="Please enter at least 8 characters"]'); }

    async navegarParaHome() {
        await this.homeMenuButton.waitForDisplayed({ timeout: 10000 });
        await this.homeMenuButton.click();
        await this.homeMenuText.waitForDisplayed({ timeout: 10000 });
    }

    async navegarParaWeb() {
        await this.WebMenuButton.waitForDisplayed({ timeout: 10000 });
        await this.WebMenuButton.click();
    }

    async navegarParaLogin() {
        await this.loginMenuButton.waitForDisplayed({ timeout: 10000 });
        await this.loginMenuButton.click();
        await this.loginMenuText.waitForDisplayed({ timeout: 10000 });
    }

    async navegarParaForms() {
        await this.formsMenuButton.waitForDisplayed({ timeout: 10000 });
        await this.formsMenuButton.click();
        await this.formsMenuText.waitForDisplayed({ timeout: 10000 });
    }

    async navegarParaSwipe() {
        await this.swipeMenuButton.waitForDisplayed({ timeout: 10000 });
        await this.swipeMenuButton.click();
        await this.swipeMenuText.waitForDisplayed({ timeout: 10000 });
    }

    async navegarParaDrag() {
        await this.dragMenuButton.waitForDisplayed({ timeout: 10000 });
        await this.dragMenuButton.click();
        await this.dragMenuText.waitForDisplayed({ timeout: 10000 });
    }

    async navegarParaMenu() {
        await this.menuButton.waitForDisplayed({ timeout: 10000 });
        await this.menuButton.click();
        await this.menuText.waitForDisplayed({ timeout: 10000 });
    }

}

module.exports = new MenuPage();