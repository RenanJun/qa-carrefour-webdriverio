const path = require('path');
const SwipePage = require('../pageobjects/swipe.page.js');
const swipeData = require(path.join(process.cwd(), './src/data/swipeData.json'));
const { abrirApp, fecharApp } = require('../tests/utils/appLifecycle.js');


describe('Suíte de Testes - Realizar o swipe até o Card desejado', () => {

    beforeEach(async () => {
    await abrirApp();
    await SwipePage.navegarParaSwipe();
});

afterEach(async () => {
    await fecharApp();
});
    it('Swipe para FULLY OPEN SOURCE', async () => {
        const nomeDoCard = 'FULLY OPEN SOURCE'; 
        const dados = swipeData.find(dado => dado.name === nomeDoCard);
        if (!dados) throw new Error(`Erro Crítico: Cenário "${nomeDoCard}" não encontrado no JSON.`);     
        await SwipePage.swipeAteOCard(dados.name, dados.text);
    });

    it('Swipe para GREAT COMMUNITY', async () => {
        const nomeDoCard = 'GREAT COMMUNITY'; 
        const dados = swipeData.find(dado => dado.name === nomeDoCard);
        if (!dados) throw new Error(`Erro Crítico: Cenário "${nomeDoCard}" não encontrado no JSON.`);     
        await SwipePage.swipeAteOCard(dados.name, dados.text);
    });

    it('Swipe para JS.FOUNDATION', async () => {
        const nomeDoCard = 'JS.FOUNDATION'; 
        const dados = swipeData.find(dado => dado.name === nomeDoCard);
        if (!dados) throw new Error(`Erro Crítico: Cenário "${nomeDoCard}" não encontrado no JSON.`);     
        await SwipePage.swipeAteOCard(dados.name, dados.text);
    });

    it('Swipe para SUPPORT VIDEOS', async () => {
        const nomeDoCard = 'SUPPORT VIDEOS'; 
        const dados = swipeData.find(dado => dado.name === nomeDoCard);
        if (!dados) throw new Error(`Erro Crítico: Cenário "${nomeDoCard}" não encontrado no JSON.`);     
        await SwipePage.swipeAteOCard(dados.name, dados.text);
    });

    it('Swipe para EXTENDABLE', async () => {
        const nomeDoCard = 'EXTENDABLE'; 
        const dados = swipeData.find(dado => dado.name === nomeDoCard);
        if (!dados) throw new Error(`Erro Crítico: Cenário "${nomeDoCard}" não encontrado no JSON.`);     
        await SwipePage.swipeAteOCard(dados.name, dados.text);
    });

    it('Swipe para COMPATIBLE', async () => {
        const nomeDoCard = 'COMPATIBLE'; 
        const dados = swipeData.find(dado => dado.name === nomeDoCard);
        if (!dados) throw new Error(`Erro Crítico: Cenário "${nomeDoCard}" não encontrado no JSON.`);     
        await SwipePage.swipeAteOCard(dados.name, dados.text);
    });
});