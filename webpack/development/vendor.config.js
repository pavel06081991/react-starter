import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import settings from '../../settings';

const {
  PATHS,
  VENDOR_LIBRARY_VAR_NAME,
  VENDOR_ASSETS_FILE_NAME,
  VENDOR_PUBLIC_PATH,
} = settings;

export default {
  context: PATHS.srcDir,

  entry: {
    vendor: ['./vendor'],
  },

  output: {
    path: PATHS.vendorBuildDir,
    publicPath: VENDOR_PUBLIC_PATH,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    library: VENDOR_LIBRARY_VAR_NAME,
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|gif|ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
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
                sourceMap: true,
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

    new webpack.NamedModulesPlugin(),

    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
  ],

  devtool: 'source-map',
};
