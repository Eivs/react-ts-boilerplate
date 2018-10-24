/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const resolve = dir => path.join(__dirname, dir);

process.envNODE_ENV = 'development';

const config = {
  devtool: 'inline-source-map',
  entry: ['react-hot-loader/patch', './src/index.tsx'],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': process.envNODE_ENV,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackBar({
      name: process.envNODE_ENV,
      color: 'green',
      profile: false,
    }),
  ],
  cache: true,
  devServer: {
    hot: true,
    compress: true,
    contentBase: resolve('dist'),
    open: true,
    inline: true,
    overlay: true,
    stats: 'errors-only',
    port: 8080,
  },
};

module.exports = merge(baseWebpackConfig, config);
