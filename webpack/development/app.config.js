const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {
  PATHS,
  IS_ACTIVE_ENV,
  APP_PUBLIC_PATH,
  API_URL,
} = require('../../settings');

module.exports = {
  context: PATHS.srcDir,

  entry: {
    app: './app',
  },

  output: {
    path: PATHS.appBuildDir,
    publicPath: APP_PUBLIC_PATH,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },

      {
        test: /\.(png|jpg|svg|gif|ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },

      {
        test: /\.css$/,
        exclude: [
          /node_modules/,
          PATHS.globalStylesDir,
        ],
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: PATHS.postcssConfigFile,
              },
            },
          ],
        }),
      },

      {
        test: /\.css$/,
        include: PATHS.globalStylesDir,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: PATHS.postcssConfigFile,
              },
            },
          ],
        }),
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  resolve: {
    modules: [
      'src',
      'node_modules',
    ],

    extensions: [
      '.js',
      '.css',
    ],
  },

  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(PATHS.vendorManifestFile),
      context: PATHS.srcDir,
    }),

    new HtmlWebpackPlugin({
      template: PATHS.indexTemplateFile,
      inject: false,
      custom: {
        IS_PRODUCTION_ENV: IS_ACTIVE_ENV.production,
        IS_DEVELOPMENT_ENV: IS_ACTIVE_ENV.development,
        assets: {
          vendor: require(PATHS.vendorAssetsFile).vendor,
        },
      },
    }),

    new webpack.DefinePlugin({
      __IS_PRODUCTION_ENV__: JSON.stringify(IS_ACTIVE_ENV.production),
      __IS_DEVELOPMENT_ENV__: JSON.stringify(IS_ACTIVE_ENV.development),
      __API_URL__: JSON.stringify(API_URL),
    }),

    new webpack.NamedModulesPlugin(),

    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
  ],

  devtool: 'source-map',
};
