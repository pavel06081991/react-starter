import path from 'path';

const ACTIVE_ENV = process.env.NODE_ENV;

const ENVS = {
  production: 'production',
  development: 'development',
};

const IS_ACTIVE_ENV = {
  production: ENVS.production === ACTIVE_ENV,
  development: ENVS.development === ACTIVE_ENV,
};

const API_PORT = process.env.API_PORT || 3004;
const API_HOST = 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SERVER_HOST = 'localhost';
const API_URL = `http://localhost:${SERVER_PORT}/api/`; // for webpack define plugin
const API_PROXY_URL = `http://localhost:${API_PORT}`; // for webpack-dev-server

const APP_PUBLIC_PATH = '/';
const VENDOR_PUBLIC_PATH = '/dll/vendor/';

const VENDOR_ASSETS_FILE_NAME = 'vendor.json';
const POSTCSS_CONFIG_FILE_NAME = 'postcss.config.js';
const VENDOR_MANIFEST_FILE_NAME = 'vendor.json';
const WEBPACK_APP_CONFIG_FILENAME = 'app.config.js';

const VENDOR_LIBRARY_VAR_NAME = 'vendor';

const rootDir = __dirname;
const srcDir = path.join(rootDir, 'src');
const ciDir = path.join(rootDir, 'ci');
const unitTestCoverageDir = path.join(ciDir, 'tests/unit/coverage');
const globalStylesDir = path.join(srcDir, 'styles');
const apiDir = path.join(rootDir, 'api');
const serverDir = path.join(rootDir, 'server');
const appBuildDir = path.join(rootDir, 'public');
const webpackConfigsDir = path.join(rootDir, 'webpack');
const webpackDevConfigsDir = path.join(webpackConfigsDir, 'development');
const webpackTestConfigsDir = path.join(webpackConfigsDir, 'testing');
const nodeModulesDir = path.join(rootDir, 'node_modules');
const cacheDir = path.join(nodeModulesDir, '.cache');
const buildInfoDir = path.join(cacheDir, 'build_info');
const buildInfoAssetsDir = path.join(buildInfoDir, 'assets');
const buildInfoManifestsDir = path.join(buildInfoDir, 'manifests');
const dllBuildsDir = path.join(appBuildDir, 'dll');
const vendorBuildDir = path.join(dllBuildsDir, 'vendor');
const vendorManifestFile = path.join(buildInfoManifestsDir, VENDOR_MANIFEST_FILE_NAME);
const vendorAssetsFile = path.join(buildInfoAssetsDir, VENDOR_ASSETS_FILE_NAME);
const postcssConfigFile = path.join(rootDir, POSTCSS_CONFIG_FILE_NAME);
const wdioConfigFile = path.join(rootDir, 'wdio.conf.js');
const webpackAppDevConfigFile = path.join(webpackDevConfigsDir, WEBPACK_APP_CONFIG_FILENAME);
const webpackAppTestConfigFile = path.join(webpackTestConfigsDir, WEBPACK_APP_CONFIG_FILENAME);
const serverIndexFile = path.join(appBuildDir, 'index.html');
const apiDataFile = path.join(apiDir, 'db.json');
const apiFile = path.join(apiDir, 'index.js');
const serverFile = path.join(serverDir, 'index.js');
const indexTemplateFile = path.join(srcDir, 'index.pug');

const PATHS = {
  rootDir,
  srcDir,
  apiDir,
  webpackConfigsDir,
  unitTestCoverageDir,
  appBuildDir,
  buildInfoAssetsDir,
  vendorBuildDir,
  globalStylesDir,
  apiDataFile,
  serverIndexFile,
  webpackAppDevConfigFile,
  webpackAppTestConfigFile,
  vendorAssetsFile,
  vendorManifestFile,
  postcssConfigFile,
  apiFile,
  serverFile,
  wdioConfigFile,
  indexTemplateFile,
};

export default {
  API_PORT,
  API_HOST,
  API_URL,
  API_PROXY_URL,
  SERVER_PORT,
  SERVER_HOST,
  PATHS,
  ACTIVE_ENV,
  ENVS,
  IS_ACTIVE_ENV,
  APP_PUBLIC_PATH,
  VENDOR_PUBLIC_PATH,
  VENDOR_LIBRARY_VAR_NAME,
  VENDOR_ASSETS_FILE_NAME,
};
