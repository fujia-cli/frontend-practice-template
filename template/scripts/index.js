"use strict";

const path = require("path");
const inquirer = require("inquirer");
const { pathExist } = require("@fujia/check-path");
const fse = require("fs-extra");
const colors = require("colors");

const DEFAULT_PAGE_DIR_NAME = "pages";
const DEFAULT_TEMPLATE_DIR_NAME = "__DEFAULT_PAGE__";

class GeneratePage {
  constructor() {
    this.pageName = "";
    this.cwd = process.cwd();
    this.targetPageDir = path.join(this.cwd, DEFAULT_PAGE_DIR_NAME);

    this.init();
  }

  async init() {
    await this.inquirePageName();
    await this.copyTemplateToPage();
  }

  async inquirePageName() {
    const self = this;
    try {
      const result = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "please input new page name:",
        default: "",
        validate: function (name) {
          const done = this.async();

          setTimeout(async function () {
            const isValid = self.isValidPageName(name);

            if (!isValid) {
              done(
                'Oops! This name is invalid which should start with alphabets and only accept numbers, "_" or "-", please re-enter!'
              );
              return;
            }

            const isDuplicate = await self.checkPageNameExist(name);

            if (isDuplicate) {
              done("Oops! This name is duplicated, please re-enter!");
              return;
            }

            done(null, true);
          }, 300);
        },
      });

      this.pageName = result.name;
    } catch (error) {
      console.log(error);
    }
  }

  async checkPageNameExist(name) {
    return await pathExist(`${this.targetPageDir}/${name}`);
  }

  async copyTemplateToPage() {
    const templateDir = path.join(
      this.cwd,
      `templates/${DEFAULT_TEMPLATE_DIR_NAME}`
    );
    const targetDir = path.join(this.targetPageDir, DEFAULT_TEMPLATE_DIR_NAME);

    try {
      await fse.copy(templateDir, targetDir);

      await this.updatePageName();
    } catch (error) {
      console.error(`Oops! To copy the template failed: ${error}`);
    }
  }

  async updatePageName() {
    const tempDir = path.join(this.targetPageDir, DEFAULT_TEMPLATE_DIR_NAME);
    const expectPagePath = path.join(this.targetPageDir, this.pageName);

    await fse.rename(tempDir, expectPagePath);

    console.log();
    console.log(
      colors.green(
        `Okay! Created a new page named [${this.pageName}] successfully!`
      )
    );
    console.log();
    console.log(
      colors.yellow(
        `Tips! If you have started dev server, please restart the server then find the new page.`
      )
    );
    console.log();
  }

  isValidPageName(name) {
    const nameReg =
      /^[a-zA-Z]+([-][a-zA-Z][a-zA-Z0-9]*|[_][a-zA-Z][a-zA-Z0-9]*|[a-zA-Z0-9])*$/;

    return nameReg.test(name);
  }
}

function genPage() {
  return new GeneratePage();
}

genPage();

// module.exports = genPage;
