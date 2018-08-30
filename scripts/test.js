"use strict";

process.env.NODE_ENV = "test";
process.env.PUBLIC_URL = "";

const compileTranslations = require("./translations").compile;

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

async function runTest() {
  await compileTranslations("src/**/*.i18n.yml", "src/generated/translations", {
    splitPerLang: true
  });

  const jest = require("jest");
  const argv = process.argv.slice(2);

  // Watch unless on CI or in coverage mode
  if (!process.env.CI && argv.indexOf("--coverage") < 0) {
    argv.push("--watch");
  }

  jest.run(argv);
}

runTest().catch(err => {
  console.error(err);
});
