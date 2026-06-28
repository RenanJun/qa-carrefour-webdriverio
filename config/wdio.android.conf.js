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

const IS_CI = process.env.CI === 'true';

config.hostname = '127.0.0.1';
config.port = 4723;
config.path = '/';

config.specs = [
    '../tests/**/*.js'
];

config.services = IS_CI
  ? [] 
  : [['appium', {
      command: 'appium',
      args: {
        address: '127.0.0.1',
        port: 4723
      }
    }]];

config.capabilities = [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android Emulator',

    'appium:appPackage': 'com.wdiodemoapp',
    'appium:appActivity': '.MainActivity',

    'appium:noReset': true,
    'appium:newCommandTimeout': 240,

    'appium:uiautomator2ServerInstallTimeout': 90000,
    'appium:uiautomator2ServerLaunchTimeout': 90000,
    'appium:adbExecTimeout': 120000,

    // Se não for CI (Execução no seu computador)
    ...(!IS_CI && {
        // 🛠️ Alterado para buscar o nome exato do APK original que usamos no projeto
        'appium:app': path.resolve(process.cwd(), 'apps', 'android.wdio.native.app.v2.2.0.apk'),
        'appium:noReset': false
    })
}];

config.mochaOpts = {
    ...config.mochaOpts,
    timeout: 120000
};

exports.config = config;