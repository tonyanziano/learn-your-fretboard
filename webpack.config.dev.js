const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  devServer: {
    static: {
      directory: path.join(__dirname, 'src/public'),
      publicPath: '/',
    },
    compress: true,
    port: 9000,
    liveReload: true, // refresh on new changes
    open: true, // open default browser
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index-bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
};
