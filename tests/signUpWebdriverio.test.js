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

    // it('Sign Up - sucesso', async () => {
    //     // O método já resolve a busca no JSON, digitação e validações do modal internamente
    //     await SignUpPage.SignUpSucesso();
    // });
    // it('Sign Up - email inválido', async () => {
    //     // O método já resolve a busca no JSON, digitação e validações do modal internamente
    //     await SignUpPage.signUpEmailnvalido();
    // });
    // it('Sign Up - sem enviar dados', async () => {
    //     // O método já resolve a busca no JSON, digitação e validações do modal internamente
    //     await SignUpPage.signUpSemPassarDados();
    // });
    // it('Sign Up - senha curta', async () => {
    //     // O método já resolve a busca no JSON, digitação e validações do modal internamente
    //     await SignUpPage.SignUpSenhaCurta();
    // });
    // it('Sign Up - sem enviar o email', async () => {
    //     // O método já resolve a busca no JSON, digitação e validações do modal internamente
    //     await SignUpPage.signUpSemEmail();
    // });
    // it('Sign Up - sem enviar a senha', async () => {
    //     // O método já resolve a busca no JSON, digitação e validações do modal internamente
    //     await SignUpPage.signUpSemSenha();
    // });
});
