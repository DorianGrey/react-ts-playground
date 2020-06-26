const plugins = [
  [
    "@snowpack/plugin-webpack",
    {
      extendConfig: (config) => {
        const TerserPlugin = require("terser-webpack-plugin");
        const GenerateSW = require("workbox-webpack-plugin/build/generate-sw");

        config.output.filename = "js/[name].[chunkhash:8].js";
        config.output.chunkFilename = "js/[name].[chunkhash:8].js";

        config.mode = "production";
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
