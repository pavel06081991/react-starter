import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import settings from '../../settings';

const {
  PATHS,
  IS_ACTIVE_ENV,
  APP_PUBLIC_PATH,
  API_URL,
  SERVER_URL,
} = settings;

export default {
  context: PATHS.srcDir,

  entry: {
    app: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?${SERVER_URL}`,
      'webpack/hot/only-dev-server',
      './app',
    ],
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
          PATHS.globalStylesFile,
        ],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },

      {
        test: /\.css$/,
        include: PATHS.globalStylesFile,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
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

    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'source-map',
};
