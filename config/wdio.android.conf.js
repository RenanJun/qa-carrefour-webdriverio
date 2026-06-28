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
    
    // 🛠️ TIMEOUTS EXPANDIDOS PARA O AMBIENTE SEM ACELERAÇÃO DE HARDWARE (CI)
    // Dá 90 segundos para o Appium instalar o servidor interno (UiAutomator2 Server)
    'appium:uiautomator2ServerInstallTimeout': 90000, 
    // Dá 90 segundos para os serviços internos do UiAutomator2 iniciarem no Android
    'appium:uiautomator2ServerLaunchTimeout': 90000, 
    // Aumenta o tempo limite de instalação do SEU aplicativo principal para 3 minutos
    'appium:androidInstallTimeout': 180000, 
    // Aumenta o tempo genérico de resposta e execução do ADB para 2 minutos
    'appium:adbExecTimeout': 120000,       

    // Caminho dinâmico e relativo para o APK do seu projeto
    'appium:app': path.join(process.cwd(), './apps/android.wdio.native.app.v2.2.0.apk'), 
    'appium:appPackage': 'com.wdiodemoapp',
    'appium:appActivity': '.MainActivity',
    
    'appium:ensureWebviewsHavePages': true,
    'appium:nativeWebScreenshot': true,
    'appium:newCommandTimeout': 240,
    'appium:noReset': false,

    // 🛠️ PARÂMETROS LOCAIS: Só serão aplicados no seu Mac (o GitHub Actions ignora)
    ...(!IS_CI && {
        'appium:udid': 'emulator-5554',
        'appium:avd': 'Pixel_10_Pro', 
        'appium:avdArgs': '-no-audio'
    })
}];

// 🛠️ CONFIGURAÇÃO DE SERVIÇOS DO APPIUM
// No seu Mac local, o WDIO sobe o Appium automaticamente. Na pipeline, usamos o Appium global de background.
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