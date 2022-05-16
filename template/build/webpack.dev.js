'use strict';

const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, '../dist'),
    host: '0.0.0.0',
    port: 9527,
    hot: true,
  },
});
