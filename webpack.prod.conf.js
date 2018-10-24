/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const resolve = dir => path.join(__dirname, dir);

process.envNODE_ENV = 'production';

const config = {
  devtool: false,
  entry: {
    app: './src/index.tsx',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': process.envNODE_ENV,
    }),
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      path: resolve('dist'),
      publicPath: '/',
      filename: 'css/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: resolve('dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: 'dependency',
    }),
    new BundleAnalyzerPlugin(),
    new WebpackBar({
      name: process.envNODE_ENV,
      color: 'green',
      profile: true,
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          reuseExistingChunk: false,
          priority: -10,
        },
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          chunks: 'async',
          name: 'async-vendors',
          priority: -20,
        },
      },
    },
    runtimeChunk: { name: 'runtime' },
    noEmitOnErrors: true,
  },
  performance: {
    hints: false,
  },
};

module.exports = merge(baseWebpackConfig, config);
