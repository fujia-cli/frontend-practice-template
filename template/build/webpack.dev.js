"use strict";

const path = require("path");
const { merge } = require("webpack-merge");

const common = require("./webpack.common");
const { SERVER_HOST, SERVER_PORT } = require("./constants");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.resolve(__dirname, "../dist"),
    host: SERVER_HOST,
    port: SERVER_PORT,
    hot: true,
  },
});
