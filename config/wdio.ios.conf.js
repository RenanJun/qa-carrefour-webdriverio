const { config } = require('./wdio.shared.conf.js');
const path = require('path');

config.capabilities = [{
    'appium:platformName': 'Android',
    'appium:deviceName': 'Android Emulator',
    'appium:automationName': 'UiAutomator2',
    'appium:app': path.join(process.cwd(), './apps/android-demo-app.apk'), // Coloque o .apk baixado aqui
    'appium:appActivity': '.MainActivity',
    'appium:ensureWebviewsHavePages': true,
    'appium:nativeWebScreenshot': true,
    'appium:newCommandTimeout': 240
}];

config.services = ['appium'];

config.specs = [
    '../src/specs/**/*.js'
];

exports.config = config;