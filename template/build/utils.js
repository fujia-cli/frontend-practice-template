"use strict";

const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { pathExistSync } = require("@fujia/check-path");

function genMultiEntryAndPlugin(
  entryName = "app.ts",
  defaultHtmlName = "index.html"
) {
  const result = {
    entry: {},
    plugins: [],
  };
  const pagePath = path.resolve(__dirname, "../pages");

  try {
    const pages = fs.readdirSync(pagePath, {
      withFileTypes: true,
    });

    for (const pageDir of pages) {
      if (!pageDir.isDirectory()) break;

      const pageName = pageDir.name;
      const entryPath = path.resolve(pagePath, `${pageName}/${entryName}`);
      const htmlPath = path.resolve(pagePath, `${pageName}/${defaultHtmlName}`);

      if (!pathExistSync(entryPath) || !pathExistSync(htmlPath)) {
        console.error(
          `The page should provide both ${entryPath} and ${htmlPath} files`
        );
        break;
      }

      result.entry[pageName] = entryPath;

      let outputFileName;

      if (pageName === "index") {
        outputFileName = path.resolve(__dirname, `../dist/${defaultHtmlName}`);
      } else {
        outputFileName = path.resolve(
          __dirname,
          `../dist/${pageName}/${defaultHtmlName}`
        );
      }

      result.plugins.push(
        new HtmlWebpackPlugin({
          chunks: [pageName],
          template: htmlPath,
          filename: outputFileName,
          inject: "body",
          minify: false,
        })
      );
    }

    console.log();
    console.log(
      `The available pages are: ${Object.keys(result.entry).join(", ")}.`
    );
    console.log();
    return result;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  genMultiEntryAndPlugin,
};
