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

    it('Deve realizar o login com sucesso consumindo a massa "Sucesso" do JSON', async () => {
        await LoginPage.loginSucesso();
    });
    it('Não deve realizar o login consumindo a massa "Invalido" do JSON', async () => {
        await LoginPage.loginIEmailnvalido();
    });
    it('Não deve realizar o login quando não envia o dados', async () => {
        await LoginPage.loginSemPassarDados();
    });
    it('Não deve realizar o login quando envia senha inválida', async () => {
        await LoginPage.loginSenhaCurta();
    });
    it('Não deve realizar o login quando não envia o email', async () => {
        await LoginPage.loginSemEmail();
    });
    it('Não deve realizar o login quando não envia a senha', async () => {
        await LoginPage.loginSemSenha();
    });
});
