const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {
//   CleanWebpackPlugin
// } = require('clean-webpack-plugin');
// const webpack = require('webpack');
// import { Configuration } from 'webpack' // 放开后可以看到webpack配置提示

/**
 * @type {Configuration}
 */
const config = {
  mode: 'production',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  // module: {
  //   rules: [{
  //     test: /\.css$/,
  //     use: ['style-loader', 'css-loader']
  //   }]
  // },
  // devServer: {
  //   static: './dist',
  //   hot: true
  // },
  plugins: [
  //   new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'development',
    }),
  //   new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map',
};

module.exports = config