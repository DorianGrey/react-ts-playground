"use strict";

const path = require("path");
const NamedModulesPlugin = require("webpack/lib/NamedModulesPlugin");
const NamedChunksPlugin = require("webpack/lib/NamedChunksPlugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const NameAllModulesPlugin = require("name-all-modules-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const InlineChunkManifestHtmlWebpackPlugin = require("inline-chunk-manifest-html-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const merge = require("webpack-merge");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const rxPaths = require("rxjs/_esm5/path-mapping");
const ShakePlugin = require("webpack-common-shake").Plugin;

const commonConfig = require("./config.common");
const paths = require("../paths");
const getClientEnvironment = require("../env");

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === "./";
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified["process.env"].NODE_ENV !== '"production"') {
  throw new Error("Production builds must have NODE_ENV=production.");
}

// Note: defined here because it will be used more than once.
const cssFilename = "static/css/[name].[contenthash:8].css";

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = merge.smart(commonConfig(false, env), {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // Set production mode
  mode: "production",
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: shouldUseSourceMap ? "source-map" : false,
  // In production, we only want to load the polyfills and the app code.
  entry: [require.resolve("../polyfills"), paths.appIndexJsProd],
  output: {
    // The build folder.
    path: paths.appBuild,
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: "static/js/[name].[chunkhash:8].js",
    chunkFilename: "static/js/[name].[chunkhash:8].js",
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: publicPath,
    // Point sourcemap entries to original disk location
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, "/")
  },

  resolve: {
    alias: rxPaths()
  },

  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendor"
    },
    // Externalizes the application runtime.
    runtimeChunk: { name: "runtime" },
    concatenateModules: true,
    removeEmptyChunks: true,
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 5,
          compress: {
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebookincubator/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false
          },
          mangle: {
            safari10: true
          },
          output: {
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebookincubator/create-react-app/issues/2488
            ascii_only: true
          }
        },
        sourceMap: shouldUseSourceMap
      })
    ]
  },

  plugins: [
    // Plugins for optimized caching usage.
    // Used plugins and setup primarily based on https://webpack.js.org/guides/caching/.

    // For more consistent module identifiers.
    new NamedModulesPlugin(),
    // In case any chunk does NOT yet have a name...
    new NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name;
      }
      return chunk
        .mapModules(m => {
          if (!m.context || !m.request) {
            return null;
          }
          return path.relative(m.context, m.request);
        })
        .filter(Boolean)
        .join("_");
    }),

    // In case anyone does NOT yet have a name...
    new NameAllModulesPlugin(),

    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    // Extracts the chunk manifest and inlines it into the template, while retaining
    // the original file.
    // TODO: Re-enabled for webpack 4 once available.
    // new InlineChunkManifestHtmlWebpackPlugin({
    //   filename: "asset-manifest.json",
    //   dropAsset: false
    // }),

    // Improved tree-shaking for CJS modules... at least as far as safely possible.
    // TODO: Re-enabled for webpack 4 once available.
    // new ShakePlugin(),

    // Note: this won't work without MiniCssExtractPlugin.loader in `loaders`.
    new MiniCssExtractPlugin({
      filename: cssFilename,
      chunkFilename: cssFilename
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
        if (message.indexOf("Skipping static resource") === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
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
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: path.join(paths.appBuildStats, "bundle-size-report.html"),
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: path.join(paths.appBuildStats, "bundle-size-report.json"),
      logLevel: "silent"
    })
  ]
});
