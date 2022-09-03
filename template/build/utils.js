"use strict";

const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { pathExistSync } = require("@fujia/check-path");
const tLink = require("terminal-link");
const colors = require("colors");

const { SERVER_PORT } = require("./constants");

const HOMO_URL_PATH = "index";

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
      /**
       * NOTE: Please distinguish between "break" and "continue" key words in for...of loop.
       */
      if (!pageDir.isDirectory()) continue;

      const pageName = pageDir.name;
      const entryPath = path.resolve(pagePath, `${pageName}/${entryName}`);
      const htmlPath = path.resolve(pagePath, `${pageName}/${defaultHtmlName}`);

      if (!pathExistSync(entryPath) || !pathExistSync(htmlPath)) {
        console.error(
          `The page should provide both ${entryPath} and ${htmlPath} files`
        );
        continue;
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

    const allPages = Object.keys(result.entry);

    console.log();
    console.log("The available pages and page urls as below: ");
    console.log();
    allPages.forEach((p) => {
      const formatPath = p === HOMO_URL_PATH ? "" : `/${p}`;

      const link = tLink(
        `http://127.0.0.1:${SERVER_PORT}${formatPath}`,
        `http://127.0.0.1:${SERVER_PORT}${formatPath}`
      );

      console.log(` ${p}: `, colors.blue(link));
    });
    console.log();

    return result;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  genMultiEntryAndPlugin,
};
