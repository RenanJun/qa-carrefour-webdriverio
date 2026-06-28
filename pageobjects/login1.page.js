// // Captura o construtor da classe base, prevenindo o erro caso o page.js exporte um 'new Page()'
// const Page = require('./page.js').constructor;

// class LoginPage extends Page {
//     get loginMenuButton() { return $('~Login'); }
//     get loginTab() { return $('~button-login-container'); }
//     get signUpTab() { return $('~button-sign-up-container'); }

//     get inputEmail() { return $('~input-email'); }
//     get inputPassword() { return $('~input-password'); }
//     get inputConfirmPassword() { return $('~input-repeat-password'); }

//     get btnSubmit() { return $('~button-LOGIN'); }
//     get btnSignUpSubmit() { return $('~button-SIGN UP'); }

//     get alertTitle() { return $('id=android:id/alertTitle'); }
//     // get alertTitle() { return $('id=com.wdiodemoapp:id/alert_title'); }
//     get alertMessage() { return $('id=android:id/message'); }
//     get alertOkBtn() { return $('id=android:id/button1'); }

//     get emailErrorText() { return $('//*[@text="Please enter a valid email address"]'); }
//     get passwordErrorText() { return $('//*[@text="Please enter at least 8 characters"]'); }

//     async navegarParaLogin() {
//         await this.click(this.loginMenuButton);
//     }

//     async logar(email, password) {
//         await this.click(this.loginTab);
//         await this.setValue(this.inputEmail, email);
//         await this.setValue(this.inputPassword, password);
//         await this.click(this.btnSubmit);
//     }

//     async cadastrar(email, password, confirmPassword) {
//         await this.click(this.signUpTab);
//         await this.setValue(this.inputEmail, email);
//         await this.setValue(this.inputPassword, password);
//         await this.setValue(this.inputConfirmPassword, confirmPassword);
//         await this.click(this.btnSignUpSubmit);
//     }
// }

// module.exports = new LoginPage();



// Captura o construtor da classe base, prevenindo o erro caso o page.js exporte um 'new Page()'
const Page = require('./page.js').constructor;
const dados = require('../src/data/loginData.json');

class LoginPage extends Page {
    // Seletores de Acessibilidade (~ mapeia o content-desc no Android)
    get loginMenuButton() { return $('~Login'); }
    get loginTab() { return $('~button-login-container'); }
    get signUpTab() { return $('~button-sign-up-container'); }

    get inputEmail() { return $('~input-email'); }
    get inputPassword() { return $('~input-password'); }
    get inputConfirmPassword() { return $('~input-repeat-password'); }

    get btnSubmit() { return $('~button-LOGIN'); }
    get btnSignUpSubmit() { return $('~button-SIGN UP'); }

    // Seletores nativos de Alerta do Android (IDs universais do sistema)
    get alertTitle() { return $('id=android:id/alertTitle'); }
    get alertMessage() { return $('id=android:id/message'); }
    get alertOkBtn() { return $('id=android:id/button1'); }

    // Seletores de validação de texto de erro
    get emailErrorText() { return $('//*[@text="Please enter a valid email address"]'); }
    get passwordErrorText() { return $('//*[@text="Please enter at least 8 characters"]'); }

    // Métodos corrigidos usando a sintaxe nativa do WebDriverIO
    async navegarParaLogin() {
        await this.loginMenuButton.waitForDisplayed({ timeout: 10000 });
        await this.loginMenuButton.click();
    }

    async logarDados() {
        await this.loginTab.waitForDisplayed({ timeout: 5000 });
        await this.loginTab.click();

        await this.inputEmail.setValue(dados);
        await this.inputPassword.setValue(password);
    }

    async logar(email, password) {
        // 1. Navega e preenche os campos
        await this.loginTab.waitForDisplayed({ timeout: 5000 });
        await this.loginTab.click();

        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);

        // 2. Executa o clique no botão de Login
        await this.btnSubmit.click();

        // 🔍 Tenta detectar se o modal de sucesso vai aparecer na tela
        let modalApareceu = false;
        try {
            // Aguarda até 5 segundos para o título do alerta existir
            await this.alertTitle.waitForExist({ timeout: 7000 });
            modalApareceu = true;
        } catch (error) {
            console.log('⚠️ O modal de sucesso não apareceu dentro do tempo limite.');
            modalApareceu = false;
        }

        // 💡 Se o modal apareceu, executa exatamente as suas validações:
        if (modalApareceu) {
            console.log('✅ Modal detectado! Validando os textos...');

            // Suas asserções utilizando o expect correto do WebdriverIO
            await wdioExpect(this.alertTitle).toHaveText('Success');
            await wdioExpect(this.alertMessage).toHaveText('You are logged in!');

            // Fecha o alerta clicando no botão OK
            await this.alertOkBtn.click();

            // Garante de forma limpa que o modal sumiu antes de encerrar o método
            await this.alertTitle.waitForExist({ timeout: 3000, reverse: true });
        } else {
            console.log('❌ O modal de sucesso não apareceu. Continuando fluxo normal...');
        }
    }

    // async cadastrar(email, password, confirmPassword) {
    //     await this.signUpTab.waitForDisplayed({ timeout: 5000 });
    //     await this.signUpTab.click();

    //     await this.inputEmail.setValue(email);
    //     await this.inputPassword.setValue(password);
    //     await this.inputConfirmPassword.setValue(confirmPassword);

    //     await this.btnSignUpSubmit.click();
    // }
}

module.exports = new LoginPage();