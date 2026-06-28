const SignUpPage = require('../pageobjects/signUp.page.js');
const { abrirApp, fecharApp } = require('./utils/appLifecycle.js');

describe('Suíte de Testes - Sign Up', () => {
    beforeEach(async () => {
        await abrirApp();
        await SignUpPage.navegarParaLogin();
    });

    afterEach(async () => {
        await fecharApp();
    });

    it('Sign Up - sucesso', async () => {
        await SignUpPage.SignUpSucesso();
    });
    it('Sign Up - email inválido', async () => {
        await SignUpPage.signUpEmailnvalido();
    });
    it('Sign Up - sem enviar dados', async () => {
        await SignUpPage.signUpSemPassarDados();
    });
    it('Sign Up - senha curta', async () => {
        await SignUpPage.SignUpSenhaCurta();
    });
    it('Sign Up - sem enviar o email', async () => {
        await SignUpPage.signUpSemEmail();
    });
    it('Sign Up - sem enviar a senha', async () => {
        await SignUpPage.signUpSemSenha();
    });
});
