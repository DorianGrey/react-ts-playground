"use strict";

const yargs = require("yargs");
const logger = require("log4js").getLogger("translations");

const compileTranslations = require("./translations").compile;

let argv = yargs
  .usage("$0 <files-glob> <output> [options]")
  .demandCommand(2)
  .option("no-initial-compile", {
    describe: "Skips initial compilation",
    alias: "n"
  })
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
  .option("format", {
    describe: "Output format. Currently available are 'ts' and 'json'.",
    alias: "f",
    default: "ts"
  })
  .option("splitPerLang", {
    describe: "Generate one output file per lang.",
    alias: "s",
    default: false
  })
  .help("help", "Show this help").argv;

const [filesGlob, output] = argv._;

if (!argv.noInitialCompile) {
  compileTranslations(filesGlob, output, argv).catch(e => {
    logger.error(e);
    if (!argv.watch) {
      process.exit(1);
    }
  });
}

if (argv.watch) {
  const watch = require("../dev/watch");
  watch(
    filesGlob,
    () => {
      compileTranslations(filesGlob, output, argv).then(
        () => logger.log(`Translations written to ${output}`),
        err => logger.error("Error processing translation:", err)
      );
    },
    { events: ["change", "unlink"] }
  );
}
