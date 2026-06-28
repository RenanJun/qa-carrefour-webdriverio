const { config } = require('./wdio.shared.conf.js');

config.user = process.env.BROWSERSTACK_USERNAME || 'SEU_USER';
config.key = process.env.BROWSERSTACK_ACCESS_KEY || 'SUA_KEY';

config.specs = [
    '../src/specs/**/*.js'
];

config.capabilities = [{
    'platformName': 'android',
    'browserstack.appium_version': '1.22.0',
    'device': 'Google Pixel 7',
    'os_version': '13.0',
    'app': 'bs://<hashed-app-id>', // ID gerado ao fazer upload do app no BrowserStack
    'project': 'WebDriverIO Demo Native App',
    'build': 'Automated-Build-CI',
    'name': 'Execution_BrowserStack_Parallel'
}];

config.services = ['browserstack'];

exports.config = config;