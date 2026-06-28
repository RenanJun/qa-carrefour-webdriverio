const APP_PACKAGE = 'com.wdiodemoapp';

function registerAppHooks() {

    beforeEach(async function () {

        console.log('\n=======================================');
        console.log('🚀 Abrindo aplicativo');
        console.log('=======================================\n');

        try {
            // Garante que não existe processo anterior
            await driver.terminateApp(APP_PACKAGE);
        } catch (e) {}

        await browser.pause(1000);

        await driver.activateApp(APP_PACKAGE);

        await browser.pause(3000);

    });

    afterEach(async function () {

        console.log('\n=======================================');
        console.log('📸 Evidência');
        console.log('=======================================\n');

        try {
            await driver.takeScreenshot();
        } catch (e) {}

        console.log('\n=======================================');
        console.log('🛑 Encerrando aplicativo');
        console.log('=======================================\n');

        try {
            await driver.terminateApp(APP_PACKAGE);
        } catch (e) {}

        await browser.pause(1000);

    });

}

module.exports = registerAppHooks;