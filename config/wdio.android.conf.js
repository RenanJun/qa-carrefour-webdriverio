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


// 🛠️ IMPORTANTE: Importa a configuração base que você me enviou
const { config } = require('./wdio.shared.conf.js');
const path = require('path');

// Identifica se o teste está rodando dentro do GitHub Actions
const IS_CI = process.env.CI === 'true';

// Sobrescreve as portas e rotas base para bater com o Appium global do CI ou local
config.hostname = '127.0.0.1';
config.port = 4723;
config.path = '/';

// Define onde estão os seus arquivos de teste (remova ou ajuste se já estiver no shared)
config.specs = [
    '../tests/**/*.js' 
];

// 🛠️ CORREÇÃO DOS SERVIÇOS: 
// No CI fica vazio [] (porque usamos o appium do terminal). No seu Mac, o WDIO gerencia o Appium sozinho.
config.services = IS_CI
  ? [] 
  : [['appium', {
      command: 'appium',
      args: {
        address: '127.0.0.1',
        port: 4723
      }
    }]];

// Define as capacidades do Android
config.capabilities = [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android Emulator',

    // Identificadores do app que foi pré-instalado via ADB no CI
    'appium:appPackage': 'com.wdiodemoapp',
    'appium:appActivity': '.MainActivity',

    'appium:noReset': true,
    'appium:newCommandTimeout': 240,

    // Timeouts de estabilidade para o ambiente lento do emulador no CI
    'appium:uiautomator2ServerInstallTimeout': 90000,
    'appium:uiautomator2ServerLaunchTimeout': 90000,
    'appium:adbExecTimeout': 120000,

    // 🛠️ CONFIGURAÇÃO LOCAL (Seu Mac): Se não for CI, ele usa o APK local e limpa o app ao rodar
    ...(!IS_CI && {
      'appium:app': path.join(process.cwd(), './apps/android.wdio.native.app.v2.2.0.apk'),
      'appium:noReset': false
    })
}];

// Aumenta o timeout do Mocha especificamente para o Android (emuladores demoram mais para interagir)
config.mochaOpts = {
    ...config.mochaOpts,
    timeout: 120000
};

exports.config = config;