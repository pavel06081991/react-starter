import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import settings from '../settings';
import webpackAppDevConfig from '../webpack/development/app.config';

const {
  PATHS,
  APP_PUBLIC_PATH,
  API_PROXY_URL,
} = settings;

export default new WebpackDevServer(webpack(webpackAppDevConfig), {
  hot: true,
  publicPath: APP_PUBLIC_PATH,
  contentBase: PATHS.appBuildDir,
  open: true,
  proxy: {
    '/api': API_PROXY_URL,
  },
});
