const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (...relativePath) =>
  path.resolve(appDirectory, ...relativePath);

// config after eject: we're in ./config/
module.exports = {
  resolveApp,
  appBuildStats: resolveApp("buildStats"),
};
