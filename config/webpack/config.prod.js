"use strict";

const path                  = require("path");
const {
        NoEmitOnErrorsPlugin
      }                     = require("webpack");
const CommonsChunkPlugin    = require("webpack/lib/optimize/CommonsChunkPlugin");
const HashedModuleIdsPlugin = require("webpack/lib/HashedModuleIdsPlugin");
const UglifyJsPlugin        = require("webpack/lib/optimize/UglifyJsPlugin");

const ExtractTextPlugin                    = require("extract-text-webpack-plugin");
const InlineChunkManifestHtmlWebpackPlugin = require("inline-chunk-manifest-html-webpack-plugin");
const SWPrecacheWebpackPlugin              = require("sw-precache-webpack-plugin");
const merge                                = require("webpack-merge");
const ClosureCompilerPlugin                = require("webpack-closure-compiler");

const commonConfig         = require("./config.common");
const paths                = require("../paths");
const getClientEnvironment = require("../env");
const webpackEnv           = require("./build-env");

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === "./";
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env       = getClientEnvironment(publicUrl);

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified["process.env"].NODE_ENV !== '"production"') {
  throw new Error("Production builds must have NODE_ENV=production.");
}

// Note: defined here because it will be used more than once.
const cssFilename = "static/css/[name].[contenthash:8].css";

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
  {publicPath: Array(cssFilename.split("/").length).join("../")}
  : {};

// Determine minifier. Note that without its 'ADVANCED' mode, the closure compiler does
// necessarily generate smaller results. Although - in most cases - the results ARE smaller
// than with UglifyJs, at least several KB. However, it also takes longer to build.
const minifier = webpackEnv.useClosureCompiler ?
  new ClosureCompilerPlugin({
    compiler: {
      language_in: "ECMASCRIPT5",
      language_out: "ECMASCRIPT5"
      // Note: compilation_level: 'ADVANCED' does not work (yet?).
    },
    concurrency: 3,
  })
  :
  new UglifyJsPlugin({
    compress: {
      warnings: false,
      // This feature has been reported as buggy a few times, such as:
      // https://github.com/mishoo/UglifyJS2/issues/1964
      // We'll wait with enabling it by default until it is more solid.
      reduce_vars: false,
    },
    output: {
      comments: false,
    },
    sourceMap: true,
  });

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = merge.smart(commonConfig(false, env, extractTextPluginOptions), {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: "source-map",
  // In production, we only want to load the polyfills and the app code.
  entry: [require.resolve("../polyfills"), paths.appIndexJs],
  output: {
    // The build folder.
    path: paths.appBuild,
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: "static/js/[name].[chunkhash:8].js",
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: publicPath,
    // Point sourcemap entries to original disk location
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath),
  },

  plugins: [
    // Plugins for optimized caching usage.
    // Used plugins and setup primarily based on https://webpack.js.org/guides/caching/.

    // For more consistent module IDs
    new HashedModuleIdsPlugin(),
    // Creates a dynamic vendor chunk by including all entries from the `node_modules` directory.
    new CommonsChunkPlugin({
      name: "vendor",
      minChunks: ({resource}) => /node_modules/.test(resource)
    }),
    // Externalizes the application manifest.
    new CommonsChunkPlugin("manifest"),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    // Extracts the chunk manifest and inlines it into the template, while retaining
    // the original file.
    new InlineChunkManifestHtmlWebpackPlugin({
      filename: "asset-manifest.json",
      dropAsset: false
    }),

    // EO

    // Plugin to let the whole build fail on any error; i.e. do not tolerate these
    new NoEmitOnErrorsPlugin(),
    // Minify the code.
    minifier,
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
      filename: cssFilename,
    }),

    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: "service-worker.js",
      logger(message) {
        if (message.indexOf("Total precache size is") === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        console.log(message);
      },
      minify: true,
      // For unknown URLs, fallback to the index page
      navigateFallback: publicUrl + "/index.html",
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      // Work around Windows path issue in SWPrecacheWebpackPlugin:
      // https://github.com/facebookincubator/create-react-app/issues/2235
      stripPrefix: paths.appBuild.replace(/\\/g, "/") + "/",
    })
  ]
});
