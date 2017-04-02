const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const {
  PATHS,
  APP_PUBLIC_PATH,
  API_PROXY_URL,
} = require('../settings');

const webpackAppDevConfig = require(PATHS.webpackAppDevConfigFile);

module.exports = new WebpackDevServer(webpack(webpackAppDevConfig), {
  publicPath: APP_PUBLIC_PATH,
  contentBase: PATHS.appBuildDir,
  open: true,
  proxy: {
    '/api': API_PROXY_URL,
  },
});
