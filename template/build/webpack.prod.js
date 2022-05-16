'use strict';

const { merge } = require('webpack-merge');
const { DefinePlugin, optimize } = require('webpack');
// const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    // new UglifyJsWebpackPlugin({
    //   sourceMap: true,
    // }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        //打包公共模块
        commons: {
          //initial表示提取入口文件的公共部分
          chunks: 'initial',
          //表示提取公共部分最少的文件数
          minChunks: 2,
          //表示提取公共部分最小的大小
          minSize: 0,
          //提取出来的文件命名
          name: 'commons',
        },
      },
    },
  },
});
