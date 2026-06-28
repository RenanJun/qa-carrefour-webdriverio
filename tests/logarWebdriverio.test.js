const LoginPage = require('../pageobjects/login.page.js');
const { abrirApp, fecharApp } = require('../tests/utils/appLifecycle.js');

describe('Suíte de Testes - Login com Sucesso Isolado', () => {
    beforeEach(async () => {
        await abrirApp();
        await LoginPage.navegarParaLogin();
    });

    afterEach(async () => {
        await fecharApp();
    });

    // it('Deve realizar o login com sucesso consumindo a massa "Sucesso" do JSON', async () => {
    //     // O método já resolve a busca no JSON, digitação e validações do modal internamente
    //     await LoginPage.loginSucesso();
    // });
    // it('Não deve realizar o login consumindo a massa "Invalido" do JSON', async () => {
    //     // O método já resolve a busca no JSON, digitação e validações do modal internamente
    //     await LoginPage.loginIEmailnvalido();
    // });
    // it('Não deve realizar o login quando não envia o dados', async () => {
    //     // O método já resolve a busca no JSON, digitação e validações do modal internamente
    //     await LoginPage.loginSemPassarDados();
    // });
    // it('Não deve realizar o login quando envia senha inválida', async () => {
    //     // O método já resolve a busca no JSON, digitação e validações do modal internamente
    //     await LoginPage.loginSenhaCurta();
    // });
    // it('Não deve realizar o login quando não envia o email', async () => {
    //     // O método já resolve a busca no JSON, digitação e validações do modal internamente
    //     await LoginPage.loginSemEmail();
    // });
    // it('Não deve realizar o login quando não envia a senha', async () => {
    //     // O método já resolve a busca no JSON, digitação e validações do modal internamente
    //     await LoginPage.loginSemSenha();
    // });
});
