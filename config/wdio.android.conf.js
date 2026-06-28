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


const path = require('path');

const IS_CI = process.env.CI === 'true';

exports.config = {
  runner: 'local',

  hostname: '127.0.0.1',
  port: 4723,
  path: '/',

  maxInstances: 1,

  services: IS_CI
    ? [['appium', {
        command: 'appium',
        args: {
          address: '127.0.0.1',
          port: 4723,
          logLevel: 'error'
        }
      }]]
    : [],

  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android Emulator',

    'appium:appPackage': 'com.wdiodemoapp',
    'appium:appActivity': '.MainActivity',

    'appium:noReset': true,
    'appium:newCommandTimeout': 240
  }],

  mochaOpts: {
    timeout: 120000
  }
};