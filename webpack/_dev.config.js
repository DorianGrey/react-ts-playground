const NamedModulesPlugin = require("webpack/lib/NamedModulesPlugin");
const {root}             = require("./constants");
const devServerConfig    = require("./dev-server.config.js");

module.exports = function () {
  return {
    output: {
      path: root(".tmp")
    },
    /**
     * This is a rather expensive source map w.r.t. rebuild performance, but also a really
     * detailed one, which simplifies debugging.
     * The rebuild performance loss is acceptable for dev mode. If you don't think so,
     * you just have to switch to a cheaper one.
     * See the docs: http://webpack.github.io/docs/build-performance.html#sourcemaps
     */
    devtool: "inline-source-map",
    plugins: [
      new NamedModulesPlugin()
    ],
    devServer: devServerConfig
  };
};