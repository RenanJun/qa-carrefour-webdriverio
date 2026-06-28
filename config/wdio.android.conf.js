// const { config } = require('./wdio.shared.conf.js');
// const path = require('path');

// config.capabilities = [{
//     'appium:platformName': 'Android',
//     'appium:deviceName': 'emulator-5554',
//     'appium:automationName': 'UiAutomator2',
//     'appium:app': path.join(process.cwd(), '/Users/renanjun/Documents/apk/android.wdio.native.app.v2.2.0.apk'), // Coloque o .apk baixado aqui
//     'appium:appActivity': '.MainActivity',
//     'appium:ensureWebviewsHavePages': true,
//     'appium:nativeWebScreenshot': true,
//     'appium:newCommandTimeout': 240
// }];

// config.services = ['appium'];

// config.specs = [
//     '../src/specs/**/*.js'
// ];

// exports.config = config;


const { config } = require('./wdio.shared.conf.js');
const path = require('path');

// Identifica se o teste está rodando dentro do GitHub Actions
const IS_CI = process.env.CI === 'true';

config.capabilities = [{
    'appium:platformName': 'Android',
    'appium:deviceName': 'Android Emulator', 
    'appium:automationName': 'UiAutomator2',
    
    // Caminho dinâmico e relativo para o APK
    'appium:app': path.join(process.cwd(), './apps/android.wdio.native.app.v2.2.0.apk'), 
    'appium:appPackage': 'com.wdiodemoapp',
    'appium:appActivity': '.MainActivity',
    
    // Proteções de timeout essenciais para o Mac local e para a nuvem
    'appium:adbExecTimeout': 60000,       
    'appium:androidInstallTimeout': 90000, 
    
    'appium:ensureWebviewsHavePages': true,
    'appium:nativeWebScreenshot': true,
    'appium:newCommandTimeout': 240,
    'appium:noReset': false,

    // 🛠️ PARÂMETROS LOCAIS (Só serão aplicados no seu Mac, o GitHub Actions ignora)
    ...(!IS_CI && {
        'appium:udid': 'emulator-5554',
        'appium:avd': 'Pixel_10_Pro', 
        'appium:avdArgs': '-no-audio'
    })
}];

// 🛠️ CONFIGURAÇÃO DE SERVIÇOS DO APPIUM
// No seu Mac local, o WDIO sobe o Appium automaticamente. Na pipeline (CI), nós usamos o Appium global de background.
if (IS_CI) {
    config.services = []; // Desativa o gerenciamento automático para evitar o erro ENOENT
    config.port = 4723;
    config.path = '/';
} else {
    config.services = [
        ['appium', { 
            args: {
                address: '127.0.0.1',
                port: 4723,
                basePath: '/'
            },
            command: 'appium' 
        }]
    ];
}

config.specs = ['../tests/**/*.js'];

exports.config = config;