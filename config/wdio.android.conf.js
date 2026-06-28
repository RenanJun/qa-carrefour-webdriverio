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

config.capabilities = [{
    'appium:platformName': 'Android',
    'appium:automationName': 'UiAutomator2',

    'appium:deviceName': 'Android Emulator',
    'appium:udid': 'emulator-5554',

    'appium:appPackage': 'com.wdiodemoapp',
    'appium:appActivity': '.MainActivity',

    'appium:uiautomator2ServerInstallTimeout': 90000,
    'appium:uiautomator2ServerLaunchTimeout': 90000,
    'appium:adbExecTimeout': 120000,

    'appium:ensureWebviewsHavePages': true,
    'appium:nativeWebScreenshot': true,
    'appium:newCommandTimeout': 240,

    'appium:noReset': IS_CI ? true : false,

    ...(IS_CI ? {} : {
        'appium:app': path.join(process.cwd(), './apps/android.wdio.native.app.v2.2.0.apk')
    })
}];

config.services = [
    ['appium', {
        args: {
            address: '127.0.0.1',
            port: 4723,
            basePath: '/'
        }
    }]
];

config.specs = ['../tests/**/*.js'];

exports.config = config;