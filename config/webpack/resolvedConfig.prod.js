process.env.NODE_ENV = "production";

const config = require("./config")();
const compileTranslations = require("../../scripts/translations").compile;

module.exports = async function () {
  // Create the config object up-front, so that it causes a failure before
  // generating the translations in case something is wrong with the config.
  const cfg = config.toConfig();
  await compileTranslations("src/**/*.i18n.yml", "src/generated/translations", {
    splitPerLang: true,
  });

  return Promise.resolve(cfg);
};
