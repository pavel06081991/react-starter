const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {
  PATHS,
  VENDOR_LIBRARY_VAR_NAME,
  VENDOR_ASSETS_FILE_NAME,
  VENDOR_PUBLIC_PATH,
} = require('../../settings');

module.exports = {
  context: PATHS.srcDir,

  entry: {
    vendor: ['./vendor'],
  },

  output: {
    path: PATHS.vendorBuildDir,
    publicPath: VENDOR_PUBLIC_PATH,
    filename: '[name].[chunkhash].min.js',
    chunkFilename: '[id].chunk.[chunkhash].min.js',
    library: VENDOR_LIBRARY_VAR_NAME,
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|gif|ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]',
        },
      },

      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
          ],
        }),
      },
    ],
  },

  resolve: {
    modules: [
      'node_modules',
    ],

    extensions: [
      '.js',
      '.css',
    ],
  },

  plugins: [
    new webpack.DllPlugin({
      path: PATHS.vendorManifestFile,
      name: VENDOR_LIBRARY_VAR_NAME,
    }),

    new AssetsPlugin({
      path: PATHS.buildInfoAssetsDir,
      filename: VENDOR_ASSETS_FILE_NAME,
    }),

    new webpack.HashedModuleIdsPlugin(),

    new BabiliPlugin({}, {
      comments: false,
    }),

    new ExtractTextPlugin({
      filename: '[name].[contenthash].min.css',
      allChunks: true,
    }),
  ],
};
