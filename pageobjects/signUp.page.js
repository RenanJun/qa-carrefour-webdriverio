const path = require('path');
const allure = require('@wdio/allure-reporter').default;

// Carrega os dados do arquivo JSON utilizando o caminho baseado na raiz do projeto
const signUpData = require(path.join(process.cwd(), './src/data/signUpData.json'));

class SignUpPage {

    get loginMenuButton() { return $('~Login'); }
    get signUpTab() { return $('~button-sign-up-container'); }
    get inputEmail() { return $('~input-email'); }
    get inputPassword() { return $('~input-password'); }
    get inputConfirmPassword() { return $('~input-repeat-password'); }
    get btnSubmit() { return $('~button-SIGN UP'); }

    // Seletores do Modal
    get alertTitle() { return $('id=com.wdiodemoapp:id/alert_title'); }
    get alertMessage() { return $('id=android:id/message'); }
    get alertOkBtn() { return $('id=android:id/button1'); }

    // Seletores de Erros de Input
    get erroInputEmail() { return $('//android.widget.TextView[@text="Please enter a valid email address"]'); }
    get erroInputPassword() { return $('//android.widget.TextView[@text="Please enter at least 8 characters"]'); }
    get erroInputConfirmPassword() { return $('//android.widget.TextView[@text="Please enter the same password"]'); }

    async navegarParaLogin() {
        await this.loginMenuButton.waitForDisplayed({ timeout: 10000 });
        await this.loginMenuButton.click();
    }
    async tirarPrintAllure(nomeDoAnexo) {
        const screenshot = await driver.takeScreenshot();
        allure.addAttachment(nomeDoAnexo, Buffer.from(screenshot, 'base64'), 'image/png');
        console.log(`📸 Evidência anexada ao Allure: ${nomeDoAnexo}`);
    }

    async _preencherFormulario(email = '', password = '', confirmPassword = '', printName = 'Tentativa de Sign Up') {
        await this.signUpTab.waitForDisplayed({ timeout: 5000 });
        await this.signUpTab.click();

        await this.inputEmail.setValue(email ? String(email) : '');
        await this.inputPassword.setValue(password ? String(password) : '');
        await this.inputConfirmPassword.setValue(password ? String(password) : '');

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await this.btnSubmit.waitForDisplayed({ timeout: 3000 });
        await this.btnSubmit.click();

        await this.tirarPrintAllure(printName);
    }

    async SignUpSucesso() {
        const dados = signUpData.find(dado => dado.scenario === 'Sucesso');
        if (!dados) throw new Error('Erro Crítico: Cenário não encontrado no JSON.');

        await this._preencherFormulario(dados.email, dados.password, dados.confirmPassword, 'Formulário de Sign Up Enviado');

        if (await this.alertTitle.waitForExist({ timeout: 6000 }).catch(() => false)) {
            await this.tirarPrintAllure('Modal de Sucesso Exibido');

            const txtTitle = await this.alertTitle.getText();
            let txtMessage = await this.alertMessage.getText().catch(async () =>
                $('//android.widget.TextView[@resource-id="android:id/message"]').getText()
            );

            expect(txtTitle).to.equal('Signed Up!');
            expect(txtMessage).to.equal('You successfully signed up!');

            await this.alertOkBtn.click();
            await this.alertTitle.waitForExist({ timeout: 5000, reverse: true });
        } else {
            throw new Error('O Signed Up sucesso, mas o modal não apareceu.');
        }
    }

    async signUpEmailnvalido() {
        const dados = signUpData.find(dado => dado.scenario === 'Email Invalido');
        if (!dados) throw new Error('Erro Crítico: Cenário não encontrado no JSON.');

        await this._preencherFormulario(dados.email, dados.password, dados.confirmPassword, 'Formulário de Email inválido');

        if (await this.erroInputEmail.waitForExist({ timeout: 5000 }).catch(() => false)) {
            await this.tirarPrintAllure('Mensagens de erro inline exibidas');

            const txtErroEmail = await this.erroInputEmail.getText();
            expect(txtErroEmail).to.equal('Please enter a valid email address');
        } else {
            throw new Error('O sign up deveria exibir erro de validação, mas os alertas inline não apareceram.');
        }
    }

    async signUpSemPassarDados() {

        const dados = signUpData.find(dado => dado.scenario === 'Sem dados');
        if (!dados) throw new Error('Erro Crítico: Cenário não encontrado no JSON.');

        await this._preencherFormulario(dados.email, dados.password, dados.confirmPassword, 'Formulário sem enviar dados');

        if (await this.erroInputEmail.waitForExist({ timeout: 5000 }).catch(() => false)) {
            await this.tirarPrintAllure('Mensagens de erro dos inputs vazios');

            const txtErroEmail = await this.erroInputEmail.getText();
            const txtErroSenha = await this.erroInputPassword.getText();
            const txtErroConfirmarSenha = await this.erroInputConfirmPassword.getText();

            expect(txtErroEmail).to.equal('Please enter a valid email address');
            expect(txtErroSenha).to.equal('Please enter at least 8 characters');
            expect(txtErroConfirmarSenha).to.equal('Please enter the same password');
        } else {
            throw new Error('Deveria exibir validações de campos obrigatórios, mas os alertas inline não apareceram.');
        }
    }

    async SignUpSenhaCurta() {
        const dados = signUpData.find(dado => dado.scenario === 'Senha Curta');
        if (!dados) throw new Error('Erro Crítico: Cenário não encontrado no JSON.');
        await this._preencherFormulario(dados.email, dados.password, dados.confirmPassword, 'Formulário de Senha Curta');
        if (await this.erroInputPassword.waitForExist({ timeout: 5000 }).catch(() => false)) {
            await this.tirarPrintAllure('Mensagens de erro inline exibidas');

            const txtErro = await this.erroInputPassword.getText();
            const txtErroConfirmarSenha = await this.erroInputConfirmPassword.getText();
            expect(txtErro).to.equal('Please enter at least 8 characters');
            expect(txtErroConfirmarSenha).to.equal('Please enter the same password');
        } else {
            throw new Error('O sign up deveria exibir erro de validação, mas os alertas inline não apareceram.');
        }
    }
    async signUpSemEmail() {
        const dados = signUpData.find(dado => dado.scenario === 'Sem Email');
        if (!dados) throw new Error('Erro Crítico: Cenário não encontrado no JSON.');
        await this._preencherFormulario(dados.email, dados.password, dados.confirmPassword, 'Formulário sem enviar email');
        if (await this.erroInputEmail.waitForExist({ timeout: 5000 }).catch(() => false)) {
            await this.tirarPrintAllure('Mensagens de erro inline exibidas');

            const txtErro = await this.erroInputEmail.getText();
            expect(txtErro).to.equal('Please enter a valid email address');
        } else {
            throw new Error('O sign up deveria exibir erro de validação, mas os alertas inline não apareceram.');
        }
    }
    async signUpSemSenha() {
        const dados = signUpData.find(dado => dado.scenario === 'Sem Senha');
        if (!dados) throw new Error('Erro Crítico: Cenário não encontrado no JSON.');
        await this._preencherFormulario(dados.email, dados.password, dados.confirmPassword, 'Sem senha');
        if (await this.erroInputPassword.waitForExist({ timeout: 5000 }).catch(() => false)) {
            await this.tirarPrintAllure('Mensagens de erro inline exibidas');

            const txtErro = await this.erroInputPassword.getText();
            const txtErroConfirmarSenha = await this.erroInputConfirmPassword.getText();
            expect(txtErro).to.equal('Please enter at least 8 characters');
            expect(txtErroConfirmarSenha).to.equal('Please enter the same password');
        } else {
            throw new Error('O sign up deveria exibir erro de validação, mas os alertas inline não apareceram.');
        }
    }
}

module.exports = new SignUpPage();