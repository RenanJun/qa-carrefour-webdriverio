const MenuPage = require('../pageobjects/navegarTelas.page.js');
const { abrirApp, fecharApp } = require('../tests/utils/appLifecycle.js');
const menuData = require('../src/data/menuData.json');

describe('Suíte de Testes - Login com Sucesso Isolado', () => {
    beforeEach(async () => {
        await abrirApp();
    });

    afterEach(async () => {
        await fecharApp();
    });
    // it('Navegar para Login', async () => {
    //     await MenuPage.navegarParaWeb();
    // });
    // it('Navegar para Login', async () => {
    //     await MenuPage.navegarParaLogin();
    // });
    // it('Navegar para Forms', async () => {
    //     await MenuPage.navegarParaForms();
    // });
    // it('Navegar para Drag', async () => {
    //     await MenuPage.navegarParaDrag();
    // });
    // it('Navegar para Menu', async () => {
    //     await MenuPage.navegarParaMenu();
    // });
    // it('Navegar para Home', async () => {
    //     await MenuPage.navegarParaHome();
    // });
    // it('Deve garantir que todos os itens do menu estão visíveis', async () => {
    //     for (const menu of menuData.menus) {
    //         const itemMenu = await $(`~${menu.id}`);
    //         const isDisplayed = await itemMenu.isDisplayed();
            
    //         console.log(`🔍 Validando menu: ${menu.nome} -> Visível: ${isDisplayed}`);
    //         expect(isDisplayed).to.be.true;
    //     }
    // });

    const posicaoFixa = 6; 
    const menuEspecifico = menuData.menus[posicaoFixa];

    it(`Deve ser capaz de selecionar e clicar no menu da posição ${posicaoFixa}: ${menuEspecifico.nome}`, async () => {
        await MenuPage.navegarParaMenu(); 

        console.log(`🎯 Testando clique no menu específico: ${menuEspecifico.nome} (ID: ${menuEspecifico.id})`);

        const itemMenu = await $(`~${menuEspecifico.id}`);
        await itemMenu.waitForDisplayed({ timeout: 5000 });
        
        expect(await itemMenu.isDisplayed()).to.be.true;
        await itemMenu.click();

        const tituloTela = await $(`//android.widget.TextView[@text="${menuEspecifico.nome}"]`);
        await tituloTela.waitForDisplayed({ timeout: 5000 });
        expect(await tituloTela.isDisplayed()).to.be.true;
    });
});
