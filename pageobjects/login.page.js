const path = require('path');
const allure = require('@wdio/allure-reporter').default;

const loginData = require(path.join(process.cwd(), './src/data/loginData.json'));

class LoginPage {
    get loginMenuButton() { return $('~Login'); }
    get loginTab() { return $('~button-login-container'); }
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

    async tirarPrintAllure(nomeDoAnexo) {
        const screenshot = await driver.takeScreenshot();
        allure.addAttachment(nomeDoAnexo, Buffer.from(screenshot, 'base64'), 'image/png');
        console.log(`📸 Evidência anexada ao Allure: ${nomeDoAnexo}`);
    }

    async navegarParaLogin() {
        await this.loginMenuButton.waitForDisplayed({ timeout: 10000 });
        await this.loginMenuButton.click();
    }

    async _preencherFormulario(email = '', password = '', printName = 'Tentativa de login') {
        await this.loginTab.waitForDisplayed({ timeout: 5000 });
        await this.loginTab.click();

        await this.inputEmail.setValue(email ? String(email) : '');
        await this.inputPassword.setValue(password ? String(password) : '');

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await this.btnSubmit.waitForDisplayed({ timeout: 3000 });
        await this.btnSubmit.click();

        await this.tirarPrintAllure(printName);
    }

    async loginSucesso() {
        const dados = loginData.find(dado => dado.scenario === 'Sucesso');
        if (!dados) throw new Error('Erro Crítico: Cenário não encontrado no JSON.');

        await this._preencherFormulario(dados.email, dados.password, 'Formulário de Login Enviado');

        if (await this.alertTitle.waitForExist({ timeout: 6000 }).catch(() => false)) {
            await this.tirarPrintAllure('Modal de Sucesso Exibido');

            const txtTitle = await this.alertTitle.getText();
            let txtMessage = await this.alertMessage.getText().catch(async () => 
                $('//android.widget.TextView[contains(@text, "logged in")]').getText()
            );

            expect(txtTitle).to.equal('Success');
            expect(txtMessage).to.equal('You are logged in!');

            await this.alertOkBtn.click();
            await this.alertTitle.waitForExist({ timeout: 5000, reverse: true });
        } else {
            throw new Error('O login deveria ter retornado sucesso, mas o modal não apareceu.');
        }
    }

    async loginIEmailnvalido() {
        const dados = loginData.find(dado => dado.scenario === 'Email Invalido');
        if (!dados) throw new Error('Erro Crítico: Cenário não encontrado no JSON.');

        // Executa o preenchimento padrão
        await this._preencherFormulario(dados.email, dados.password, 'Formulário de Email inválido');

        // Valida se o texto de erro do e-mail foi exibido na tela
        if (await this.erroInputEmail.waitForExist({ timeout: 5000 }).catch(() => false)) {
            await this.tirarPrintAllure('Mensagens de erro inline exibidas');
            
            const txtErroEmail = await this.erroInputEmail.getText();
            expect(txtErroEmail).to.equal('Please enter a valid email address');
        } else {
            throw new Error('O login deveria exibir erro de validação, mas os alertas inline não apareceram.');
        }
    }


    async loginSemPassarDados() {
        const dados = loginData.find(dado => dado.scenario === 'Sem dados');
        if (!dados) throw new Error('Erro Crítico: Cenário não encontrado no JSON.');

        await this._preencherFormulario(dados.email, dados.password, 'Formulário de Email inválido');

        if (await this.erroInputEmail.waitForExist({ timeout: 5000 }).catch(() => false)) {
            await this.tirarPrintAllure('Mensagens de erro dos inputs vazios');
            
            const txtErroEmail = await this.erroInputEmail.getText();
            const txtErroSenha = await this.erroInputPassword.getText();

            expect(txtErroEmail).to.equal('Please enter a valid email address');
            expect(txtErroSenha).to.equal('Please enter at least 8 characters');
        } else {
            throw new Error('Deveria exibir validações de campos obrigatórios, mas os alertas inline não apareceram.');
        }
    }

    async loginSenhaCurta() {
        const dados = loginData.find(dado => dado.scenario === 'Senha Curta');
        if (!dados) throw new Error('Erro Crítico: Cenário não encontrado no JSON.');
        await this._preencherFormulario(dados.email, dados.password, 'Formulário de Senha Curta');
        if (await this.erroInputPassword.waitForExist({ timeout: 5000 }).catch(() => false)) {
            await this.tirarPrintAllure('Mensagens de erro inline exibidas');
            
            const txtErro = await this.erroInputPassword.getText();
            expect(txtErro).to.equal('Please enter at least 8 characters');
        } else {
            throw new Error('O login deveria exibir erro de validação, mas os alertas inline não apareceram.');
        }
    }
    async loginSemEmail() {
        const dados = loginData.find(dado => dado.scenario === 'Sem Email');
        if (!dados) throw new Error('Erro Crítico: Cenário não encontrado no JSON.');
        await this._preencherFormulario(dados.email, dados.password, 'Formulário de Senha Curta');
        if (await this.erroInputEmail.waitForExist({ timeout: 5000 }).catch(() => false)) {
            await this.tirarPrintAllure('Mensagens de erro inline exibidas');
            
            const txtErro = await this.erroInputEmail.getText();
            expect(txtErro).to.equal('Please enter a valid email address');
        } else {
            throw new Error('O login deveria exibir erro de validação, mas os alertas inline não apareceram.');
        }
    }
     async loginSemSenha() {
        const dados = loginData.find(dado => dado.scenario === 'Sem Senha');
        if (!dados) throw new Error('Erro Crítico: Cenário não encontrado no JSON.');
        await this._preencherFormulario(dados.email, dados.password, 'Sem senha');
        if (await this.erroInputPassword.waitForExist({ timeout: 5000 }).catch(() => false)) {
            await this.tirarPrintAllure('Mensagens de erro inline exibidas');
            
            const txtErro = await this.erroInputPassword.getText();
            expect(txtErro).to.equal('Please enter at least 8 characters');
        } else {
            throw new Error('O login deveria exibir erro de validação, mas os alertas inline não apareceram.');
        }
    }
}

module.exports = new LoginPage();