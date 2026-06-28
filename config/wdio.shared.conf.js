// const { expect } = require('chai');

// exports.config = {
//     runner: 'local',
//     exclude: [],
//     maxInstances: 1,
//     logLevel: 'info',
//     bail: 0,
//     baseUrl: '',
//     waitforTimeout: 12000,
//     connectionRetryTimeout: 90000,
//     connectionRetryCount: 3,
//     framework: 'mocha',
//     reporters: [
//         'spec',
//         ['allure', {
//             outputDir: 'allure-results',
//             disableWebdriverStepsReporting: true,
//             disableWebdriverScreenshotsReporting: false,
//         }]
//     ],
//     mochaOpts: {
//         ui: 'bdd',
//         timeout: 60000
//     },
//     before: function () {
//         global.expect = expect;
//     },
//     afterTest: async function(test, context, { error, duration, passed, id }) {
//         if (!passed) {
//             await browser.takeScreenshot();
//         }
//     }
// };


const { expect } = require('chai');

exports.config = {
    runner: 'local',

    maxInstances: 1,

    logLevel: process.env.CI ? 'warn' : 'info',

    bail: 0,

    baseUrl: '',

    waitforTimeout: 25000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    before: function () {
        global.expect = expect;
    },

    afterTest: async function (test, context, { passed }) {
        if (!passed) {
            await browser.saveScreenshot(`./allure-results/error-${Date.now()}.png`);
        }
    }
};