const path              = require("path");
const {
        ContextReplacementPlugin,
        LoaderOptionsPlugin
      }                 = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
  const use = ["awesome-typescript-loader"];
  if (isDev) {
    use.unshift("react-hot-loader/webpack");
  }
  return {
    test: /\.tsx?/,
    use: use,
    exclude: /node_modules/
  }
};

const scssLoaderChain     = ["css-loader?importLoaders=1", "postcss-loader", "sass-loader"];
exports.RULE_SASS_LOADING = function RULE_MAIN_SASS_LOADING(isDev) {
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

exports.getLoaderOptionsPlugin = function getLoaderOptionsPlugin(isDevMode) {
  const options = {
    options: {
      // Forwards options to the postcss-loader; put more of them here as required.
      // In its current state, only
      postcss: {
        plugins: [
          require("autoprefixer")({
            "browsers": ["last 2 versions"]
          }),
          require("postcss-flexbugs-fixes")
        ]
      }
    }
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
    baseHref: "/"
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