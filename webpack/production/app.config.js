import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import BabiliPlugin from 'babili-webpack-plugin';
import InlineChunkManifestHtmlWebpackPlugin from 'inline-chunk-manifest-html-webpack-plugin';
import settings from '../../settings';

const {
  PATHS,
  IS_ACTIVE_ENV,
  APP_PUBLIC_PATH,
  API_URL,
} = settings;

export default {
  context: PATHS.srcDir,

  entry: {
    app: './app',
  },

  output: {
    path: PATHS.appBuildDir,
    publicPath: APP_PUBLIC_PATH,
    filename: '[name].[chunkhash].min.js',
    chunkFilename: '[id].chunk.[chunkhash].min.js',
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
          name: '[path][name].[hash].[ext]',
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
                minimize: true,
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
                minimize: true,
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

    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      minChunks: 2,
      async: true,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'webpack-runtime',
      minChunks: Infinity,
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

    new webpack.HashedModuleIdsPlugin(),

    new BabiliPlugin({}, {
      comments: false,
    }),

    new ExtractTextPlugin({
      filename: '[name].[contenthash].min.css',
      allChunks: true,
    }),

    new InlineChunkManifestHtmlWebpackPlugin(),
  ],
};
