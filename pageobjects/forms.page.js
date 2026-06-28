class FormsPage {
    // ==========================================
    // 🔍 SELETORES
    // ==========================================
    get inputField() { return $('~text-input'); }
    get inputTextResult() { return $('~input-text-result'); }
    get switchButton() { return $('~switch'); }
    get switchText() { return $('~switch-text'); }
    get dropdownContainer() { return $('~Dropdown'); }
    get botaoActive() { return $('~button-Active'); }
    get botaoInactive() { return $('~button-Inactive'); }
    get alertTitle() { return $('id=com.wdiodemoapp:id/alert_title'); }
    // 🛠️ CORREÇÃO: Garante o mapeamento correto do elemento de mensagem para evitar o 'undefined'
    get alertMessage() { return $('//android.widget.TextView[@resource-id="android:id/message"]'); }
    get alertOkButton() { return $('id=android:id/button1'); }

    // ==========================================
    // 🎭 AÇÕES
    // ==========================================
    async navegarParaForms() {
        const itemMenuForms = await $('~Forms');
        await itemMenuForms.click();
        await this.inputField.waitForDisplayed({ timeout: 8000 });
    }

    async preencherCampoTexto(texto) {
        await this.inputField.setValue(texto);
    }

    async alternarSwitch() {
        await this.switchButton.click();
    }

    async selecionarOpcaoDropdown(textoOpcao) {
        await this.dropdownContainer.click();
        
        const seletorDinamico = `//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="${textoOpcao}"]`;
        const opcaoParaClicar = await $(seletorDinamico);
        
        await opcaoParaClicar.waitForDisplayed({ timeout: 5000 });
        await opcaoParaClicar.click();

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await driver.pause(1500);
    }

async clicarBotaoActive() {
        await this.botaoActive.waitForDisplayed({ timeout: 5000 });

        const androidSelector = 'new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("button-Active"))';
        const botaoNativo = await $(`android=${androidSelector}`);
        
        await botaoNativo.click();

        // 🔥 ADICIONE ESTA LINHA: Aguarda a animação do Android terminar
        await driver.pause(500); 

        // Agora o Appium já vai achar o elemento de primeira, limpando o log!
        await this.alertTitle.waitForDisplayed({ timeout: 5000 });

        const txtTitle = await this.alertTitle.getText();
        const txtMessage = await this.alertMessage.getText();

        expect(txtTitle).to.equal('This button is');
        expect(txtMessage).to.equal('This button is active');

        await this.alertOkButton.click();
        await this.alertTitle.waitForExist({ timeout: 5000, reverse: true });
    }
}

module.exports = new FormsPage();