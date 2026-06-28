const APP_PACKAGE = 'com.wdiodemoapp';

async function abrirApp() {
    await driver.activateApp(APP_PACKAGE);
    await browser.pause(3000);
}

async function fecharApp() {
    try {
        await driver.takeScreenshot();
    } finally {
        await driver.terminateApp(APP_PACKAGE);
        await browser.pause(1000);
    }
}

module.exports = {
    abrirApp,
    fecharApp
};