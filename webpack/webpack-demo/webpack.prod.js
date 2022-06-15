const { merge } = require('webpack-merge');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new TerserWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});