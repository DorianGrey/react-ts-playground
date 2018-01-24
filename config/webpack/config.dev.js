"use strict";

const AutoDllPlugin = require("autodll-webpack-plugin");
const path = require("path");
const HotModuleReplacementPlugin = require("webpack/lib/HotModuleReplacementPlugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const NamedModulesPlugin = require("webpack/lib/NamedModulesPlugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const merge = require("webpack-merge");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const commonConfig = require("./config.common");
const paths = require("../paths");
const getClientEnvironment = require("../env");
const dllConfig = require("./config.dll");

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = "/";
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = "";
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = merge.smart(commonConfig(true, env, {}), {
  cache: true,
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: "cheap-module-eval-source-map",
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  // The first two entry points enable "hot" CSS and auto-refreshes for JS.
  entry: {
    app: [
      // We ship a few polyfills by default:
      require.resolve("../polyfills"),
      // Include an alternative client for WebpackDevServer. A client's job is to
      // connect to WebpackDevServer by a socket and get notified about changes.
      // When you save a file, the client will either apply hot updates (in case
      // of CSS changes), or refresh the page (in case of JS changes). When you
      // make a syntax error, this client will display a syntax error overlay.
      // Note: instead of the default WebpackDevServer client, we use a custom one
      // to bring better experience for Create React App users. You can replace
      // the line below with these two lines if you prefer the stock client:
      // require.resolve('webpack-dev-server/client') + '?/',
      // require.resolve('webpack/hot/dev-server'),
      require.resolve("react-dev-utils/webpackHotDevClient"),
      // For easier hot reloading.
      require.resolve("react-hot-loader/patch"),
      // Finally, this is your app's code:
      paths.appIndexJsDev
      // We include the app code last so that if there is a runtime error during
      // initialization, it doesn't blow up the WebpackDevServer client, and
      // changing JS code would still trigger a refresh.
    ],
    browserCompat: path.resolve(paths.appSrc, "browserCompat.js")
  },
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: "static/js/[name].js",
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: "static/js/[name].chunk.js",
    // This is the URL that app is served from. We use "/" in development.
    publicPath: publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
  },

  context: paths.appRoot,

  plugins: [
    // Speeds up build and rebuild performance drastically.
    new AutoDllPlugin(dllConfig),
    // See https://github.com/mzgoddard/hard-source-webpack-plugin
    new HardSourceWebpackPlugin(),
    // Makes it easier to identify which modules have been reloaded by HMR.
    // Regularly, webpack generates an numeric ID as an identifier for each module.
    // Using this plugin, it instead uses the module's name.
    // Note: This should NOT be used in production, since it may drastically increase
    // your bundle size!
    new NamedModulesPlugin(),
    // This is necessary to emit hot updates (currently CSS only):
    new HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules)
  ]
});
