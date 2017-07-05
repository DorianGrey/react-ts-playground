const autoprefixer = require("autoprefixer");
const path = require("path");
const { DefinePlugin, IgnorePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

const paths = require("../paths");
const loadingAnimation = require("../../src/generated/loading.scss.json");
const webpackEnv = require("./build-env");

/*
 Define various constants to be used in multiple different configs here.
 */

const PLUGIN_HTML = function(isDev) {
  const minify = isDev
    ? false
    : {
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
      };

  return new HtmlWebpackPlugin({
    filename: "index.html", // Keep in mind that the output path gets prepended to this name automatically.
    inject: "body",
    template: paths.appHtml,
    minify,
    // Custom config.
    title: "Demo App",
    devMode: isDev,
    baseHref: "/",
    loadingCss: loadingAnimation.css
  });
};

const RULE_EXT_TSX = function(isDev) {
  const use = [
    {
      loader: "ts-loader",
      options: {
        // disable type checker - we will use it in fork plugin
        transpileOnly: true,
        silent: true
      }
    }
  ];
  if (isDev) {
    use.unshift("react-hot-loader/webpack");
  }

  return {
    test: /\.(ts|tsx)$/,
    include: paths.appSrc,
    use
  };
};

const RULE_EXT_JS = {
  test: /\.js$/,
  use: require.resolve("source-map-loader"),
  enforce: "pre",
  include: paths.appSrc
};

// "url" loader works like "file" loader except that it embeds assets
// smaller than specified limit in bytes as data URLs to avoid requests.
// A missing `test` is equivalent to a match.
const RULE_IMAGES = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
  use: {
    loader: require.resolve("url-loader"),
    options: {
      limit: 10000,
      name: "static/media/[name].[hash:8].[ext]"
    }
  }
};

const RULE_SCSS = function(isDev, extractTextPluginOptions) {
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

  const scssLoaderChain = [
    {
      loader: require.resolve("css-loader"),
      options: {
        importLoaders: 1,
        minimize: !isDev,
        sourceMap: isDev
      }
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: isDev,
        ident: "postcss", // https://webpack.js.org/guides/migrating/#complex-options
        plugins: () => [
          require("postcss-flexbugs-fixes"),
          autoprefixer({
            browsers: [
              ">1%",
              "last 4 versions",
              "Firefox ESR",
              "not ie < 9" // React doesn't support IE8 anyway
            ],
            flexbox: "no-2009"
          })
        ]
      }
    },
    `resolve-url-loader?sourceMap=${isDev}`,
    {
      loader: "sass-loader",
      options: {
        sourceMap: true, // Has to be true always, since the resolve-url-loader requires it to properly map the resource paths.
        outputStyle: isDev ? "nested" : "compressed"
      }
    }
  ];

  const result = { test: /\.scss$/ };
  const styleLoader = require.resolve("style-loader");

  if (isDev) {
    result.use = [styleLoader].concat(scssLoaderChain);
  } else {
    result.use = ExtractTextPlugin.extract(
      Object.assign(
        {
          fallback: styleLoader,
          use: scssLoaderChain
        },
        extractTextPluginOptions
      )
    );
  }

  return result;
};

const RULE_WEBFONTS = function() {
  const webFontRule = {
    test: /\.(ttf|eot|svg|woff|woff2)(\?[a-z0-9]+)?$/,
    use: {
      loader: "url-loader",
      query: {
        limit: 2 * 1024, // i.e. if the content has a size of > 2KB, it will be copied via file-loader.
        name: "static/media/[name].[hash:8].[ext]"
      }
    },
    include: [/node_modules/]
  };

  // TODO: We might need conditional updates to webFontRule.use.query.publicPath here.

  return webFontRule;
};

// "file" loader makes sure those assets get served by WebpackDevServer.
// When you `import` an asset, you get its (virtual) filename.
// In production, they would get copied to the `build` folder.
const RULE_COVER_NON_MATCHED = {
  exclude: [
    /\.html$/,
    // We have to write /\.(js|jsx)(\?.*)?$/ rather than just /\.(js|jsx)$/
    // because you might change the hot reloading server from the custom one
    // to Webpack's built-in webpack-dev-server/client?/, which would not
    // get properly excluded by /\.(js|jsx)$/ because of the query string.
    // Webpack 2 fixes this, but for now we include this hack.
    // https://github.com/facebookincubator/create-react-app/issues/1713
    /\.(js|jsx)(\?.*)?$/,
    /\.(ts|tsx)(\?.*)?$/,
    /\.s?css$/,
    /\.json$/,
    /\.bmp$/,
    /\.gif$/,
    /\.jpe?g$/,
    /\.png$/,
    /\.(ttf|eot|svg|woff|woff2)/
  ],
  loader: require.resolve("file-loader"),
  options: {
    name: "static/media/[name].[hash:8].[ext]"
  }
};

const resolveOptions = {
  // This allows you to set a fallback for where Webpack should look for modules.
  // We placed these paths second because we want `node_modules` to "win"
  // if there are any conflicts. This matches Node resolution mechanism.
  // https://github.com/facebookincubator/create-react-app/issues/253
  modules: ["node_modules", paths.appNodeModules].concat(
    // It is guaranteed to exist because we tweak it in `env.js`
    process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
  ),
  // These are the reasonable defaults supported by the Node ecosystem.
  // We also include JSX as a common component filename extension to support
  // some tools, although we do not recommend using it, see:
  // https://github.com/facebookincubator/create-react-app/issues/290
  extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
  alias: {
    // Support React Native Web
    // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
    "react-native": "react-native-web"
  },
  plugins: [
    // Prevents users from importing files from outside of src/ (or node_modules/).
    // This often causes confusion because we only process files within src/ with babel.
    // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
    // please link the files into your node_modules/ and let module-resolution kick in.
    // Make sure your source files are compiled, as they will not be processed in any way.
    new ModuleScopePlugin(paths.appSrc)
  ]
};

const nodeOptions = {
  fs: "empty",
  net: "empty",
  tls: "empty",
  global: true,
  crypto: "empty",
  process: true,
  module: false,
  clearImmediate: false,
  setImmediate: false
};

/**
 * Export the target config.
 */
module.exports = function(isDev, env, extractTextPluginOptions) {
  return {
    resolve: resolveOptions,
    module: {
      strictExportPresence: true,
      rules: [
        // TODO: Disable require.ensure as it's not a standard language feature.
        // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
        // { parser: { requireEnsure: false } },
        RULE_EXT_JS,
        // ** ADDING/UPDATING LOADERS **
        // The "file" loader handles all assets unless explicitly excluded.
        // The `exclude` list *must* be updated with every change to loader extensions.
        // When adding a new loader, you must add its `test`
        // as a new entry in the `exclude` list in the "file" loader.

        RULE_COVER_NON_MATCHED,
        RULE_IMAGES,
        RULE_EXT_TSX(isDev),
        RULE_SCSS(isDev, extractTextPluginOptions),
        RULE_WEBFONTS()
        // ** STOP ** Are you adding a new loader?
        // Remember to add the new extension(s) to the "file" loader exclusion list.
      ]
    },
    plugins: [
      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      // In development, this will be an empty string.
      new InterpolateHtmlPlugin(env.raw),
      // Generates an `index.html` file with the <script> injected.
      PLUGIN_HTML(isDev),
      // May manipulate various <script>-attributes. Atm., it only sets "defer" to all script tags.
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: "defer"
      }),
      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
      //Note: Webpack is capable of conditionally dropping code w.r.t. these variables.
      // E.g. if a variable `ENV` is defined as `"whatever"`, and you have some code like:
      //
      //     if (ENV !== "whatever") {...}
      //
      // Then the code inside the braces will be dropped during the bundle process.
      // We're using this for conditionally executing development / production code.
      new DefinePlugin(env.stringified),
      // Moment.js is an extremely popular library that bundles large locale files
      // by default due to how Webpack interprets its code. This is a practical
      // solution that requires the user to opt into importing specific locales.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You can remove this if you don't use Moment.js:
      new IgnorePlugin(/^\.\/locale$/, /moment$/),
      // This plugin externalizes type-checking and linting to a separate process.
      // Since these operations are usually the expensive ones, it optimizes your performance
      // drastically.
      new ForkTsCheckerWebpackPlugin({
        watch: "./src",
        tsconfig: "./tsconfig.json",
        blockEmit: !webpackEnv.isWatch,
        tslint: "./tslint.json"
      }),
      // This plugin lints your SCSS stylesheets.
      new StyleLintPlugin({
        failOnError: !isDev,
        configFile: paths.styleLintConfig,
        files: "src/**/*.scss",
        syntax: "scss"
      })
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: nodeOptions,
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
      hints: isDev ? false : "warning"
    }
  };
};
