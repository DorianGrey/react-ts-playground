const commonConfig = require("./_common.config");
const devConfig    = require("./_dev.config");
const prodConfig   = require("./_production.config");
const merge        = require("webpack-merge");

const logger = require("log4js").getLogger("webpack-build");

module.exports = function (env = {}) {
  process.env.NODE_ENV = process.env.NODE_ENV || "development";
  // Eval configurable parts.
  env.isDev            = process.env.NODE_ENV !== "production";
  env.isWatch          = /dev-server/.test(process.env.npm_lifecycle_event);

  logger.debug("Using build env:", JSON.stringify(env, null, 4));
  logger.debug("Build mode:", env.isDev ? "development" : "production");
  if (!env.isDev) {
    logger.debug("Using minifier:", env.useClosureCompiler ? "Closure Compiler" : "UglifyJs");
  }

  return merge.smart(
    commonConfig(env),
    env.isDev ? devConfig(env) : prodConfig(env)
  );
};