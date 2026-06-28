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
    
    // Como o app já vai ser instalado via terminal no CI, passamos apenas o Package e Activity
    'appium:appPackage': 'com.wdiodemoapp',
    'appium:appActivity': '.MainActivity',
    
    // Mantemos os timeouts longos apenas para o servidor interno do UiAutomator2 ligar com calma
    'appium:uiautomator2ServerInstallTimeout': 90000, 
    'appium:uiautomator2ServerLaunchTimeout': 90000, 
    'appium:adbExecTimeout': 120000,       
    
    'appium:ensureWebviewsHavePages': true,
    'appium:nativeWebScreenshot': true,
    'appium:newCommandTimeout': 240,
    'appium:noReset': true, // Evita que o Appium limpe ou desinstale o app colocado manualmente

    // 🛠️ PARÂMETROS LOCAIS: No seu Mac ele ainda usa o APK local e limpa o app normalmente
    ...(IS_CI ? {} : {
        'appium:app': path.join(process.cwd(), './apps/android.wdio.native.app.v2.2.0.apk'),
        'appium:udid': 'emulator-5554',
        'appium:avd': 'Pixel_10_Pro', 
        'appium:avdArgs': '-no-audio',
        'appium:noReset': false
    })
}];

// 🛠️ CONFIGURAÇÃO DE SERVIÇOS DO APPIUM
if (IS_CI) {
    config.services = []; // Desativa o gerenciamento automático para evitar o erro ENOENT no CI
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