const path = require("path");
const Config = require("webpack-chain");
const objectHash = require("node-object-hash");
const rxPaths = require("rxjs/_esm5/path-mapping");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// FIXME: Disabled temporarily - reason: https://stackoverflow.com/questions/52566349/referenceerror-undefinedcreateprovider-is-not-defined
// const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

// Plugins resolvable via path, i.e. require.resolve - is faster than a full require(...)
// esp. for those used only under particular circumstances.
const EnvironmentPlugin = require.resolve("webpack/lib/EnvironmentPlugin");
const HotModuleReplacementPlugin = require.resolve(
  "webpack/lib/HotModuleReplacementPlugin"
);
const IgnorePlugin = require.resolve("webpack/lib/IgnorePlugin");
const BundleAnalyzerPlugin = require.resolve(
  "webpack-bundle-analyzer/lib/BundleAnalyzerPlugin"
);
const CaseSensitivePathsPlugin = require.resolve(
  "case-sensitive-paths-webpack-plugin"
);
const TerserPlugin = require.resolve("terser-webpack-plugin");
const OptimizeCssnanoPlugin = require.resolve(
  "@intervolga/optimize-cssnano-plugin"
);
const HtmlWebpackPlugin = require.resolve("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require.resolve(
  "script-ext-html-webpack-plugin"
);
const ForkTsCheckerWebpackPlugin = require.resolve(
  "fork-ts-checker-webpack-plugin"
);
const FriendlyErrorsWebpackPlugin = require.resolve(
  "friendly-errors-webpack-plugin"
);
const WebpackChunkHash = require.resolve("webpack-chunk-hash");
const CopyWebpackPlugin = require.resolve("copy-webpack-plugin");
const CleanWebpackPlugin = require.resolve("clean-webpack-plugin");
const GenerateSW = require("workbox-webpack-plugin/build/generate-sw");

const BuildStatsFormatterPlugin = require("./plugins/BuildStatsFormatterPlugin");
const loadingAnimation = require("../../scripts/util/renderLoading")().css;
const paths = require("../paths");
const { log } = require("../logger");

if (!process.env.NODE_ENV) {
  throw new Error("process.env.NODE_ENV has to be defined");
}
const isProd = process.env.NODE_ENV === "production";
const hasher = objectHash().hash;

module.exports = function() {
  const config = new Config();

  config.context(paths.appRoot);
  config.mode(process.env.NODE_ENV);

  // Setup entrypoint.
  config.entry("main").add(paths.appMain);

  // Setup sourcemap.
  config.when(
    isProd,
    config => config.devtool("source-map"),
    config => config.devtool("cheap-module-eval-source-map")
  );

  // Common configuration.
  // prettier-ignore
  config.output
    .publicPath("/")
      .end()
    .plugin("case-sensitive-paths")
    .use(CaseSensitivePathsPlugin);

  // Setup default rules.
  // prettier-ignore
  config.module
  .rule("js")
    .test(/\.(mjs|js)$/)
    .use("source-map")
      .loader(require.resolve("source-map-loader"))
      .end()
    .enforce("pre")
    .include.add(paths.appSrc).end()
    .end();

  // Define how scss is handled - the first loader depends on mode.
  // Development mode docs:
  // "postcss" loader applies autoprefixer to our CSS.
  // "css" loader resolves paths in CSS and adds assets as dependencies.
  // "style" loader turns CSS into JS modules that inject <style> tags.
  // In production, we use a plugin to extract that CSS to a file, but
  // in development "style" loader enables hot editing of CSS.

  // Production mode docs:
  // The notation here is somewhat confusing.
  // "postcss" loader applies autoprefixer to our CSS.
  // "css" loader resolves paths in CSS and adds assets as dependencies.
  // "style" loader normally turns CSS into JS modules injecting <style>,
  // but unlike in development configuration, we do something different.
  // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
  // (second argument), then grabs the result CSS and puts it into a
  // separate file in our build process. This way we actually ship
  // a single CSS file in production instead of JS code injecting <style>
  // tags. If you use code splitting, however, any async bundles will still
  // use the "style" loader inside the async code so CSS from them won't be
  // in the main CSS file.
  // prettier-ignore
  const scssRule = config.module
  .rule("scss")
  .test(/\.scss$/)
  .use("css-loader")
    .loader(require.resolve("css-loader"))
    .options({
      importLoaders: 1,
      minimize: isProd,
      sourceMap: !isProd
    })
    .end()
  .use("postcss-loader")
    .loader(require.resolve("postcss-loader"))
    .options({
      sourceMap: !isProd
    })
    .end()
  .use("resolve-url-loader")
    .loader(require.resolve("resolve-url-loader"))
    .options({
      sourceMap: !isProd
    })
    .end()
  .use("sass-loader")
    .loader(require.resolve("sass-loader"))
    .options({
      sourceMap: true, // Has to be true always, since the resolve-url-loader requires it to properly map the resource paths.
      outputStyle: isProd ? "compressed": "nested"
    })
    .end();

  config.when(
    isProd,
    () =>
      scssRule
        .use("mini-css-extract")
        .loader(MiniCssExtractPlugin.loader)
        .before("css-loader")
        .end(),
    () =>
      scssRule
        .use("style-loader")
        .loader(require.resolve("style-loader"))
        .before("css-loader")
        .end()
  );

  const generateCacheIdentifer = (...additionalPackageSrcs) => {
    const additional = {};
    additionalPackageSrcs.forEach(pkg => {
      additional[pkg] = require(`${pkg}/package.json`).version;
    });

    return hasher({
      ...additional,
      env: process.env.NODE_ENV,
      "cache-loader": require("cache-loader/package.json").version
    });
  };

  // Setup ts-loader
  // prettier-ignore
  config
    .module
    .rule("tsx")
      .test(/\.tsx?/)
      .use("cache-loader")
        .loader(require.resolve("cache-loader"))
        .options({
          cacheDirectory: path.resolve(paths.cacheRoot, "ts-loader"),
          cacheIdentifier: generateCacheIdentifer("ts-loader", "babel-loader")
        })
        .end()
      .use("babel-loader")
        .loader(require.resolve("babel-loader"))
        .end()
      .use("ts-loader")
        .loader(require.resolve("ts-loader"))
        .options({
          // disable type checker in development mode. - we will use it in fork plugin
          transpileOnly: !isProd,
          silent: true
        })
        .end()
      .include
        .add(paths.appSrc)
        .end();

  // Setup loader list with fallback
  // prettier-ignore
  config
    .module
    .rule("others")
      .oneOf("others-img")
        // "url" loader works like "file" loader except that it embeds assets
        // smaller than specified limit in bytes as data URLs to avoid requests.
        // A missing `test` is equivalent to a match.
        .test([/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/])
        .use("img")
          .loader(require.resolve("url-loader"))
          .options({
            limit: 10000,
            name: "static/media/[name].[hash:8].[ext]"
          })
          .end()
        .end()
      .oneOf("others-fonts")
        // Configure webfont handling
        .test(/\.(ttf|eot|svg|woff|woff2)(\?[a-z0-9]+)?$/)
        .use("fonts")
          .loader(require.resolve("url-loader"))
          .options({
            limit: 2 * 1024, // i.e. if the content has a size of > 2KB, it will be copied via file-loader.
            name: "static/media/[name].[hash:8].[ext]"
          })
          .end()
        .include.add(/node_modules/).end()
        .end()
      .oneOf("others-non-matched")
        // When you `import` an asset, you get its (virtual) filename.
        // In production, they would get copied to the `build` folder.
        // This loader doesn't use a "test" so it will catch all modules
        // that fall through the other loaders.
        .use("file-loader")
          .loader(require.resolve("file-loader"))
          .options({
            name: "static/media/[name].[hash:8].[ext]"
          })
          .end()
        // Exclude `js` and `ts` files to keep "css" loader working as it injects
        // it's runtime that would otherwise processed through "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpacks internal loaders.
        .exclude
          .add(/\.tsx?/)
          .add(/\.(mjs|js)$/)
          .add(/\.html$/)
          .add(/\.json$/)
          .add(/\.s?css$/)
          .end()
      ;

  // Setup performance config - irrelevant in dev mode, handled by build stats
  // formatter plugin in production mode.
  config.performance.hints(false);

  // Setup friendly errors plugin.
  const { transformer, formatter } = require("./resolveLoaderError");
  config.plugin("friendly-errors").use(FriendlyErrorsWebpackPlugin, [
    {
      additionalTransformers: [transformer],
      additionalFormatters: [formatter]
    }
  ]);

  // Setup Html-Webpack-Plugin
  const htmlWebpackMinifyOptions = isProd
    ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    : false;

  config.plugin("html").use(HtmlWebpackPlugin, [
    {
      filename: "index.html", // Keep in mind that the output path gets prepended to this name automatically.
      inject: "body",
      template: paths.appHtml,
      minify: htmlWebpackMinifyOptions,
      // Custom config.
      title: "Demo App",
      devMode: !isProd,
      baseHref: "/",
      loadingCss: loadingAnimation.css
    }
  ]);

  // Setup script-extender-plugin
  config
    .plugin("script-ext-html")
    .use(ScriptExtHtmlWebpackPlugin, [{ defaultAttribute: "defer" }]);

  // Setup environment-plugin
  config.plugin("environment").use(EnvironmentPlugin, [
    {
      NODE_ENV: process.env.NODE_ENV
    }
  ]);

  // Setup ignore-plugin
  config.plugin("ignore").use(IgnorePlugin, [/^\.\/locale$/, /moment$/]);

  // Setup resolve options.
  // prettier-ignore
  config
    .resolve
      .modules
        .add(paths.appNodeModules)
        .end()
      .extensions
        .add(".ts")
        .add(".tsx")
        .add(".mjs")
        .add(".js")
        .add(".json")
        .add(".jsx")
        .end()
    ;

  // Setup node options.
  // prettier-ignore
  config.node
    .set("dgram", "empty")
    .set("fs", "empty")
    .set("net", "empty")
    .set("tls", "empty")
    .set("global", true)
    .set("crypto", "empty")
    .set("process", true)
    .set("module", false)
    .set("clearImmediate", false)
    .set("setImmediate", false);

  // Other stuff exclusively for development mode.
  // prettier-ignore
  config.when(!isProd, config => {
    config
      .cache(true)
      .output
        .filename("static/js/[name].js")
        .chunkFilename("static/js/[name].js")
        .path(paths.appBuild)
        .pathinfo(true)
        .devtoolModuleFilenameTemplate(info =>
          path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
        )
        .end()
      /*.plugin("hard-source")
        .use(HardSourceWebpackPlugin, [
          {
            info: {
              level: "warn"
            }
          }
        ])
        .end()*/
        // Setup parallel typechecker - not for production, is handled by ts-loader on it.
      .plugin("fork-ts-checker")
        .use(ForkTsCheckerWebpackPlugin, [
          {
            watch: paths.appSrc,
            tsconfig: paths.appTsConfig,
            async: !isProd,
            tslint: false,
            formatter: "codeframe"
          }
        ])
        .end()
      .plugin("hot")
        .use(HotModuleReplacementPlugin)
        .end()
      ;
    });

  // Other stuff exclusively for production mode.
  config.when(isProd, config => {
    // prettier-ignore
    config
    .bail(true)
    .stats("none")
    .output
      .path(paths.appBuild)
      .filename("static/js/[name].[chunkhash:8].js")
      .chunkFilename("static/js/[name].[chunkhash:8].js")
      .devtoolModuleFilenameTemplate(info =>
        path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, "/")
      );

    // Setup rxPaths() for module.alias.
    const rxResolvedPaths = rxPaths();
    for (const p in rxResolvedPaths) {
      if (rxResolvedPaths.hasOwnProperty(p)) {
        config.resolve.alias.set(p, rxResolvedPaths[p]);
      }
    }

    // Set production optimization config.
    config.optimization
      .concatenateModules(true)
      .removeEmptyChunks(true)
      .runtimeChunk({ name: "runtime" })
      .minimize(true)
      .minimizer("js")
      .use(TerserPlugin, [
        {
          terserOptions: {
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
          sourceMap: true,
          cache: true,
          parallel: true
        }
      ]);

    // Extract styles
    config.plugin("css-extract").use(MiniCssExtractPlugin, [
      {
        filename: `static/css/[name].[contenthash:8].css`,
        chunkFilename: `static/css/[name].[contenthash:8].css`
      }
    ]);

    // Optimize styles externally
    config.plugin("cssnano-plugin").use(OptimizeCssnanoPlugin, [
      {
        sourceMap: true,
        cssnanoOptions: {
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true
              }
            }
          ]
        }
      }
    ]);

    // Set production plugins
    config.plugin("copy-static").use(CopyWebpackPlugin, [
      [
        {
          from: paths.appPublic + "/**/*",
          context: paths.appPublic,
          ignore: ["*.template.html"]
        }
      ]
    ]);

    config.plugin("clean").use(CleanWebpackPlugin, [
      [paths.appBuild],
      {
        root: paths.resolveApp(),
        verbose: false,
        // Required to get the `BuildStatsFormatterPlugin` working correctly - otherwise,
        // it could not pick up the previous output file paths.
        beforeEmit: true
      }
    ]);

    config.plugin("bundle-analyzer").use(BundleAnalyzerPlugin, [
      {
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
        logLevel: "silent"
      }
    ]);

    // Plugin for more consistent hashes.
    config.plugin("chunk-hash").use(WebpackChunkHash);

    config.plugin("workbox").use(GenerateSW, [
      {
        exclude: [
          /\.map$/,
          /img\/icons\//,
          /favicon\.ico$/,
          /manifest\.webmanifest$/
        ],
        cacheId: "react-ts-playground",
        skipWaiting: true,
        clientsClaim: true
      }
    ]);

    // Special plugin to print file sizes.
    config.plugin("build-stats").use(BuildStatsFormatterPlugin, [
      {
        log,
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
        ignorePattern: /\.map$/
      }
    ]);
  });

  return config;
};
