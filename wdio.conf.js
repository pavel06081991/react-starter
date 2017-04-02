exports.config = {
  specs: [
    'tests/e2e/**/*.spec.js',
  ],

  capabilities: [
    {
      browserName: 'chrome',
    },
    {
      browserName: 'firefox',
    },
  ],

  screenshotPath: 'ci/tests/e2e/screenshots/',

  baseUrl: 'http://localhost:3000',

  framework: 'mocha',

  before: function before() {
    const chai = require('chai');
    global.expect = chai.expect;
  },
};

