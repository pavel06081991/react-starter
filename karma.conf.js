import settings from './settings';
import webpackAppTestConfig from './webpack/testing/app.config';

const {
  PATHS,
} = settings;

export default (config) => {
  config.set({
    basePath: PATHS.rootDir,
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: [
      'mocha',
      'chai',
      'sinon',
    ],
    files: [
      'tests/unit/tests.js',
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
    ],
    preprocessors: {
      'tests/unit/tests.js': [
        'webpack',
        'sourcemap',
      ],
    },
    reporters: [
      'progress',
      'coverage',
    ],
    webpack: webpackAppTestConfig,
    coverageReporter: {
      type: 'html',
      dir: PATHS.unitTestCoverageDir,
    },
  });
};
