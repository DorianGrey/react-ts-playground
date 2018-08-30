process.env.NODE_ENV = "development";

const fs = require("fs-extra");

const config = require("./config")();
const { PUBLIC_ADDRESS, HOST, selectPort } = require("../hostInfo");
const paths = require("../paths");
const compileTranslations = require("../../scripts/translations").compile;
const watchTranslations = require("../../scripts/translations").watch;

function handleWatchTranslations() {
  return new Promise(resolve => {
    const translationsWatcher = watchTranslations(
      "src/**/*.i18n.yml",
      "src/generated/translations",
      {
        chokidarOpts: { ignoreInitial: true },
        splitPerLang: true
      }
    );

    translationsWatcher.on("ready", () => {
      resolve(translationsWatcher);
    });
  });
}

module.exports = async function() {
  const selectedPort = await selectPort(3000);

  await fs.emptyDir(paths.devTmp);
  await fs.emptyDir(paths.appGenerated);
  await compileTranslations("src/**/*.i18n.yml", "src/generated/translations", {
    splitPerLang: true
  });
  const translationWatcher = await handleWatchTranslations();
  ["SIGINT", "SIGTERM"].forEach(sig => {
    process.on(sig, () => {
      translationWatcher.close();
    });
  });

  config.devServer
    .publicPath("/")
    .port(selectedPort)
    .historyApiFallback(true)
    .host("::")
    .public(`${PUBLIC_ADDRESS}:${selectedPort}`)
    .stats("minimal")
    .compress(true)
    .inline(true)
    .hot(true)
    .quiet(true)
    .watchOptions({
      ignored: /node_modules|\.tmp/
    })
    .contentBase([
      paths.resolveApp("public"),
      paths.resolveApp("src"),
      paths.resolveApp(".tmp"),
      paths.resolveApp(""),
      paths.appBuild
    ]);

  return Promise.resolve(config.toConfig());
};
