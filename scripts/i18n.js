if (process.argv.includes("--watch")) {
  const watchTranslations = require("./translations").watch;
  const translationWatcher = watchTranslations(
    "src/**/*.i18n.yml",
    "src/generated/translations",
    {
      chokidarOpts: { ignoreInitial: true },
      splitPerLang: true,
    }
  );
  ["SIGINT", "SIGTERM"].forEach((sig) => {
    process.on(sig, () => {
      translationWatcher.close();
    });
  });
} else {
  const compileTranslations = require("./translations").compile;

  compileTranslations("src/**/*.i18n.yml", "src/generated/translations", {
    splitPerLang: true,
  });
}
