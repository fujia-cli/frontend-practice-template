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

      result.plugins.push(
        new HtmlWebpackPlugin({
          chunks: [pageName],
          template: htmlPath,
          filename: path.resolve(
            __dirname,
            `../dist/${pageName}/${defaultHtmlName}`
          ),
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
