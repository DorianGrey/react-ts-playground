const path                  = require("path");
const {LoaderOptionsPlugin} = require("webpack");
const ExtractTextPlugin     = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin     = require("html-webpack-plugin");

const loadingAnimation = require("../src/generated/loading.scss.json");

const rootDir = path.resolve(__dirname, "..");

exports.root = function root(...relativePathSegments) {
  return path.resolve(rootDir, ...relativePathSegments);
};

/*
 * Include polyfills or mocks for various node stuff
 * Description: Node configuration
 *
 * See: https://webpack.github.io/docs/configuration.html#node
 */
exports.NODE_CONFIG = {
  global: true,
  crypto: "empty",
  process: true,
  module: false,
  clearImmediate: false,
  setImmediate: false
};

exports.RULE_TS_LOADING = function RULE_TS_LOADING(isDev) {
  const use = [
    {
      loader: "string-replace-loader", // For being able to use webpack's import() function without causing conflicts with the TS parser.
      query: {
        search: "_import_",
        replace: "import",
        flags: "g"
      }
    },
    "awesome-typescript-loader"
  ];
  if (isDev) {
    use.unshift("react-hot-loader/webpack");
  }
  return {
    test: /\.tsx?$/,
    use: use,
    exclude: /node_modules/
  }
};

exports.RULE_SASS_LOADING = function RULE_MAIN_SASS_LOADING(isDev) {
  const scssLoaderChain = [
    {
      loader: "css-loader",
      options: {
        sourceMap: isDev,
        minimize: !isDev,
        importLoaders: 1
      }
    },
    {
      loader: "postcss-loader",
      options: {
        sourceMap: isDev,
        plugins: (loader) => [
          require("autoprefixer")({
            "browsers": ["last 2 versions"]
          }),
          require("postcss-flexbugs-fixes")
        ]
      }
    },
    `resolve-url-loader?sourceMap=${isDev}`,
    `sass-loader?sourceMap=true` // Has to be true always, since the resolve-url-loader requires it to properly map the resource paths.
  ];

  const result = {
    test: /\.scss$/
  };
  if (isDev) {
    result.use = ["style-loader"].concat(scssLoaderChain);
  } else {
    result.use = ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: scssLoaderChain
    });
  }
  return result;
};

exports.RULE_WEBFONTS = function (isDev) {
  const webFontRule = {
    test: /\.(ttf|eot|svg|woff|woff2)(\?[a-z0-9]+)?$/,
    use: {
      loader: "url-loader",
      query: {
        limit: (
          /*
           Note: Due to the problem with source-maps in conjunction with css-loader (see https://github.com/webpack-contrib/css-loader/issues/29),
           we're inlining most of the referenced fonts and images directly. Although this raises the stylesheet size to > 10 MB in dev mode,
           it should be acceptable. In production, the CSS is extracted to a file, thus, we can stick with the lower limit.
           */
          /*isDev ? 250 :*/ 2
        ) * 1024, // i.e. if the content has a size of > 2KB resp. 250KB, it will be copied via file-loader.
        name: "[ext]/[name].[hash].[ext]"
      }
    },
    include: [
      /node_modules/
    ]
  };

  // TODO: We might need conditional updates to webFontRule.use.query.publicPath here.

  return webFontRule;
};

exports.RULE_TS_LINT_LOADING = function (isDevMode) {
  const options = {
    configuration: require("../tslint.json"),
    emitErrors: !isDevMode,
    failOnHint: !isDevMode
    /* typeCheck: !isDevMode */ // Currently makes things fail with a curious error: https://github.com/palantir/tslint/issues/2208
  };

  return {
    enforce: "pre",
    test: /\.tsx?$/,
    use: {
      loader: "tslint-loader",
      options: options
    },
    include: [
      exports.root("src")
    ]
  };
};

exports.getLoaderOptionsPlugin = function getLoaderOptionsPlugin(isDevMode) {
  const options = {
    options: {}
  };

  if (!isDevMode) {
    // Forwards options to the sass-loader (and thus: node-sass); put more of them here as required.
    options.options.sassLoader = {
      outputStyle: "compressed"
    };
  }

  return new LoaderOptionsPlugin(options)
};

exports.DEFAULT_RESOLVE_EXTENSIONS = [".tsx", ".ts", ".js", ".json"];

exports.getHtmlTemplatePlugin = function getHtmlTemplatePlugin(isDevMode) {
  return new HtmlWebpackPlugin({
    template: "src/index.template.html",
    filename: "index.html", // Keep in mind that the output path gets prepended to this name automatically.
    inject: "body",
    // Custom config.
    title: "Demo App",
    devMode: isDevMode,
    baseHref: "/",
    loadingCss: loadingAnimation.css
  });
};

exports.getPerformanceOptions = function getPerformanceOptions(isProdMode) {
  return {
    /**
     * Show performance hints / warnings / errors. Especially displays warnings about too large entry points and chunks.
     * This is not useful in development mode (since no optimization is performed at this stage), but for any production
     * mode.
     */
    hints: isProdMode ? "warning" : false
  }
};