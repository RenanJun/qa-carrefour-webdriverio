const path = require('path');
const SwipePage = require('../pageobjects/swipe.page.js');
const swipeData = require(path.join(process.cwd(), './src/data/swipeData.json'));
const { abrirApp, fecharApp } = require('../tests/utils/appLifecycle.js');


describe('Suíte de Testes - Realizar o swipe até o Card desejado', () => {

//     beforeEach(async () => {
//     await abrirApp();
//     await SwipePage.navegarParaSwipe();
// });

// afterEach(async () => {
//     await fecharApp();
// });

    // 🚀 ANTES DE CADA TESTE: Garante que o app abra do zero absoluto e navegue
    // beforeEach(async () => {
    //     // console.log('\n🔄 [Mata/Inicia] Forçando abertura limpa do aplicativo...');
    //     // await driver.activateApp('com.wdiodemoapp');
    //     // await browser.pause(3000); // Aguarda o carregamento do sistema operacional
        
    //     console.log('📍 [Mata/Inicia] Navegando até a tela de Swipe...');
    //     await SwipePage.navegarParaSwipe();
    // });

    // 🧹 DEPOIS DE CADA TESTE: Tira o print e mata o app imediatamente
    // afterEach(async function () {
    //     const estadoTeste = this.currentTest.state; 
    //     const tituloTeste = this.currentTest.title;
        
    //     // 1. Tira o screenshot com o app ainda ativo na tela
    //     try {
    //         console.log(`📸 [Evidência] Capturando tela final para o cenário: "${tituloTeste}"`);
    //         await driver.takeScreenshot(); 
    //     } catch (error) {
    //         console.log(`⚠️ Erro ao tirar print: ${error.message}`);
    //     }

    //     // 2. Encerra o processo do app para o próximo 'it' começar limpo
    //     try {
    //         console.log('🧹 [Mata/Inicia] Encerrando o processo do aplicativo...');
    //         await driver.terminateApp('com.wdiodemoapp');
    //         await browser.pause(1000); // Margem de segurança para o Android liberar a memória
    //     } catch (error) {
    //         console.log(`⚠️ Erro ao fechar o app: ${error.message}`);
    //     }
    // });

    // ==========================================
    // 🎭 CENÁRIOS DE TESTE EM FILA INDIANA
    // ==========================================

    // it('Swipe para FULLY OPEN SOURCE', async () => {
    //     const nomeDoCard = 'FULLY OPEN SOURCE'; 
    //     const dados = swipeData.find(dado => dado.name === nomeDoCard);
    //     if (!dados) throw new Error(`Erro Crítico: Cenário "${nomeDoCard}" não encontrado no JSON.`);     
    //     await SwipePage.swipeAteOCard(dados.name, dados.text);
    // });

    // it('Swipe para GREAT COMMUNITY', async () => {
    //     const nomeDoCard = 'GREAT COMMUNITY'; 
    //     const dados = swipeData.find(dado => dado.name === nomeDoCard);
    //     if (!dados) throw new Error(`Erro Crítico: Cenário "${nomeDoCard}" não encontrado no JSON.`);     
    //     await SwipePage.swipeAteOCard(dados.name, dados.text);
    // });

    // it('Swipe para JS.FOUNDATION', async () => {
    //     const nomeDoCard = 'JS.FOUNDATION'; 
    //     const dados = swipeData.find(dado => dado.name === nomeDoCard);
    //     if (!dados) throw new Error(`Erro Crítico: Cenário "${nomeDoCard}" não encontrado no JSON.`);     
    //     await SwipePage.swipeAteOCard(dados.name, dados.text);
    // });

    // it('Swipe para SUPPORT VIDEOS', async () => {
    //     const nomeDoCard = 'SUPPORT VIDEOS'; 
    //     const dados = swipeData.find(dado => dado.name === nomeDoCard);
    //     if (!dados) throw new Error(`Erro Crítico: Cenário "${nomeDoCard}" não encontrado no JSON.`);     
    //     await SwipePage.swipeAteOCard(dados.name, dados.text);
    // });

    // it('Swipe para EXTENDABLE', async () => {
    //     const nomeDoCard = 'EXTENDABLE'; 
    //     const dados = swipeData.find(dado => dado.name === nomeDoCard);
    //     if (!dados) throw new Error(`Erro Crítico: Cenário "${nomeDoCard}" não encontrado no JSON.`);     
    //     await SwipePage.swipeAteOCard(dados.name, dados.text);
    // });

    // it('Swipe para COMPATIBLE', async () => {
    //     const nomeDoCard = 'COMPATIBLE'; 
    //     const dados = swipeData.find(dado => dado.name === nomeDoCard);
    //     if (!dados) throw new Error(`Erro Crítico: Cenário "${nomeDoCard}" não encontrado no JSON.`);     
    //     await SwipePage.swipeAteOCard(dados.name, dados.text);
    // });
});