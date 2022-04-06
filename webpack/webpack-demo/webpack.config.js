const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// import { Configuration } from 'webpack' 放开后可以看到webpack配置提示

/**
 * @type {Configuration}
 */
 const config = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'development',
    }),
  ],
  devtool: 'inline-source-map',
};

module.exports = config