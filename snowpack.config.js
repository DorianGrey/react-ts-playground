const path = require("path");
const paths = require("./config/paths");

const plugins = [
  [
    "@snowpack/plugin-webpack",
    {
      extendConfig: (config) => {
        const WebpackChunkHash = require("webpack-chunk-hash");
        const TerserPlugin = require("terser-webpack-plugin");
        const GenerateSW = require("workbox-webpack-plugin/build/generate-sw");
        const BundleAnalyzerPlugin = require("webpack-bundle-analyzer/lib/BundleAnalyzerPlugin");
        // const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

        // TODO: Try to figure out why the output of this plugin is only partially visible if added.
        // In addition, the "stats" config for webpack does not seem to be evaluated, however
        // that is not the cause of this problem.
        const BuildStatsFormatterPlugin = require("./config/webpack/plugins/BuildStatsFormatterPlugin");

        config.output.filename = "js/[name].[chunkhash:8].js";
        config.output.chunkFilename = "js/[name].[chunkhash:8].js";

        config.mode = "production";
        config.bail = true;
        config.stats = "none";
        config.devtool = "source-map";

        config.plugins.push(
          new GenerateSW({
            swDest: "sw.js",
            exclude: [
              /\.map$/,
              /img\/icons\//,
              /favicon\.ico$/,
              /manifest\.webmanifest$/,
            ],
            cacheId: "react-ts-playground",
            skipWaiting: true,
            clientsClaim: true,
          }),
          // Plugin for more consistent hashes
          new WebpackChunkHash(),
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: path.join(
              paths.appBuildStats,
              "bundle-size-report.html"
            ),
            openAnalyzer: false,
            generateStatsFile: true,
            statsFilename: path.join(
              paths.appBuildStats,
              "bundle-size-report.json"
            ),
            logLevel: "silent",
          }),
          new BuildStatsFormatterPlugin({
            categorizeAssets: false,
            /* TODO - Maybe use this:
            categorizeAssets: {
              "Service worker": /(workbox|service-worker|precache-manifest).*\.js$/,
              Scripts: /\.js$/,
              Styles: /\.css$/,
              "Source maps": /\.map$/,
              Favicons: /favicon(\d+x\d+)?\.png$/,
              Images: /\.(jpe?g|png|gif|bmp)$/,
              Fonts: /\.(woff2?|eot|ttf|svg)$/
            },
          */
            assetsSizeWarnLimit: 250 * 1024, // <=> 250 KB.
            potentiallyExtractedChunkSizeLimit: 512, // <=> 512 Byte.
            // This gzip level is used heavily, i.e. by nginx, so it makes sense
            // to take it as a reference.
            gzipDisplayOpts: { level: 6 },
            ignorePattern: /\.map$/,
          })
        );

        config.optimization = {
          concatenateModules: true,
          removeEmptyChunks: true,
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  warnings: false,
                  // Disabled because of an issue with Uglify breaking seemingly valid code:
                  // https://github.com/facebookincubator/create-react-app/issues/2376
                  // Pending further investigation:
                  // https://github.com/mishoo/UglifyJS2/issues/2011
                  comparisons: false,
                },
                mangle: {
                  safari10: true,
                },
                output: {
                  comments: false,
                  // Turned on because emoji and regex is not minified properly using default
                  // https://github.com/facebookincubator/create-react-app/issues/2488
                  ascii_only: true,
                },
              },
              sourceMap: true,
              cache: true,
              parallel: true,
            }),
          ],
          splitChunks: {
            chunks: "all",
          },
        };

        return config;
      },
    },
  ],
];

module.exports = {
  extends: "@snowpack/app-scripts-react",
  scripts: {
    "run:i18n": "node ./scripts/i18n.js",
    "run:i18n::watch": "$1 --watch",
  },
  plugins: plugins,
};
