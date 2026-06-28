const path = require('path');
const FormsPage = require('../pageobjects/forms.page.js');
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

// it('Deve preencher o formulário selecionando itens da lista do JSON', async () => {
//         console.log(`Preenchendo texto com: ${formsData.textoInput}`);
//         await FormsPage.preencherCampoTexto(formsData.textoInput);
        
//         const textoInputResult = await FormsPage.inputTextResult.getText();
//         expect(textoInputResult).to.equal(formsData.textoInput);

//         console.log('Alternando o estado do Switch...');
//         await FormsPage.alternarSwitch();
        
//         const textoSwitch = await FormsPage.switchText.getText();
//         expect(textoSwitch).to.equal(formsData.textoSwitchOff);

//         console.log(`Dropdown ➡️ Selecionando: ${formsData.opcoesDropdown[1]}`);
//         await FormsPage.selecionarOpcaoDropdown(formsData.opcoesDropdown[1]);

//         console.log('🔍 Validando visibilidade dos botões...');
//         const isBotaoActiveDisplayed = await FormsPage.botaoActive.isDisplayed();
//         const isBotaoInactiveDisplayed = await FormsPage.botaoInactive.isDisplayed();
//         expect(isBotaoActiveDisplayed).to.be.true;   
//         expect(isBotaoInactiveDisplayed).to.be.true; 

//         console.log('Acionando o botão Active e validando o Modal...');
//         await FormsPage.clicarBotaoActive();
//     });

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
        
        // 1. Executa a rolagem nativa até o botão alvo estar visível na tela
        await $(
            'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Active"))'
        );

        // 2. Aguarda explicitamente os botões carregarem (Garante estabilidade no CI/Emulador)
        await FormsPage.botaoActive.waitForDisplayed({ 
            timeout: 20000,
            message: 'O botão Active não renderizou a tempo.' 
        });
        await FormsPage.botaoInactive.waitForDisplayed({ timeout: 15000 });

        // 3. Asserções válidas usando a sintaxe do seu Chai injetado globalmente
        const isBotaoActiveDisplayed = await FormsPage.botaoActive.isDisplayed();
        const isBotaoInactiveDisplayed = await FormsPage.botaoInactive.isDisplayed();
        
        expect(isBotaoActiveDisplayed).to.be.true;   
        expect(isBotaoInactiveDisplayed).to.be.true; 

        console.log('Acionando o botão Active e validando o Modal...');
        await FormsPage.clicarBotaoActive();
    });
});