"use strict";

const yargs  = require("yargs");
const logger = require("log4js").getLogger("translations");

const compileTranslations = require("../dev/translations").compile;

let argv = yargs
  .usage('$0 <files-glob> <output> [options]')
  .demandCommand(2)
  .option("watch", {
    describe: "Watch the translation files",
    alias: "w"
  })
  .option("verbose", {
    describe: "Log some additional information",
    alias: "v"
  })
  .option("duplicate-threshold <threshold>", {
    describe: "Limit the allowed translation duplication (in percent)",
    alias: "d"
  })
  .help("help", "Show this help")
  .argv;


const [filesGlob, output] = argv._;

compileTranslations(filesGlob, output)
  .catch(e => {
    logger.error(e);
    if (!argv.watch) {
      process.exit(1);
    }
  });

if (argv.watch) {
  const watch = require("../dev/watch");
  watch(filesGlob, () => {
    compileTranslations(filesGlob, output).then(
      () => logger.log(`Translations written to ${output}`),
      err => logger.error("Error processing translation:", err)
    );
  }, {events: ["change", "unlink"]});
}