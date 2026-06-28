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

config.capabilities = [{
    'appium:platformName': 'Android',
    'appium:deviceName': 'emulator-5554', 
    'appium:udid': 'emulator-5554', // Força a conexão direta no canal do emulador ativo
    'appium:automationName': 'UiAutomator2',
    
    // 🚀 AUTO-BOOT: Força o WebDriverIO/Appium a ligar o emulador sozinho caso esteja fechado
    'appium:avd': 'Pixel_10_Pro', 
    'appium:avdArgs': '-no-audio',
    
    // Caminho dinâmico e relativo para o APK
    'appium:app': path.join(process.cwd(), './apps/android.wdio.native.app.v2.2.0.apk'), 
    'appium:appPackage': 'com.wdiodemoapp',
    'appium:appActivity': '.MainActivity',
    
    // Proteções de timeout para evitar quedas no ambiente local do Mac
    'appium:adbExecTimeout': 60000,       // Dá 60 segundos para o ADB responder
    'appium:androidInstallTimeout': 90000, // Tempo extra para instalar o APK completo
    
    'appium:ensureWebviewsHavePages': true,
    'appium:nativeWebScreenshot': true,
    'appium:newCommandTimeout': 240,
    'appium:noReset': false
}];

// Definição fixa da porta padrão para isolar o processo de portas dinâmicas
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

config.specs = ['../tests/**/*.js'];

exports.config = config;