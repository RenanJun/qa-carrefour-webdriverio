const path = require('path');
const FormsPage = require('../pageobjects/forms.page.js');
// 🔥 Importa o arquivo JSON de dados
const formsData = require(path.join(process.cwd(), './src/data/formsData.json'));
const { abrirApp, fecharApp } = require('../tests/utils/appLifecycle.js');

describe('Suíte de Testes - Componentes de Formulário com JSON', () => {

    beforeEach(async () => {
        await abrirApp();
        await FormsPage.navegarParaForms();
    });

    afterEach(async () => {
        await fecharApp();
    });

it('Deve preencher o formulário selecionando itens da lista do JSON', async () => {
        console.log(`Preenchendo texto com: ${formsData.textoInput}`);
        await FormsPage.preencherCampoTexto(formsData.textoInput);
        
        const textoInputResult = await FormsPage.inputTextResult.getText();
        expect(textoInputResult).to.equal(formsData.textoInput);

        console.log('Alternando o estado do Switch...');
        await FormsPage.alternarSwitch();
        
        const textoSwitch = await FormsPage.switchText.getText();
        expect(textoSwitch).to.equal(formsData.textoSwitchOff);

        console.log(`Dropdown ➡️ Selecionando: ${formsData.opcoesDropdown[1]}`);
        await FormsPage.selecionarOpcaoDropdown(formsData.opcoesDropdown[1]);

        console.log('🔍 Validando visibilidade dos botões...');
        const isBotaoActiveDisplayed = await FormsPage.botaoActive.isDisplayed();
        const isBotaoInactiveDisplayed = await FormsPage.botaoInactive.isDisplayed();
        expect(isBotaoActiveDisplayed).to.be.true;   
        expect(isBotaoInactiveDisplayed).to.be.true; 

        console.log('Acionando o botão Active e validando o Modal...');
        await FormsPage.clicarBotaoActive();
    });
});