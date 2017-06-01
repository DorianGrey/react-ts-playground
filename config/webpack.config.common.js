const autoprefixer      = require("autoprefixer");
const path              = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

const paths = require("./paths");

exports.RULE_EXT_TSX = {
  test: /\.(ts|tsx)$/,
  include: paths.appSrc,
  loader: require.resolve("ts-loader")
};

exports.RULE_EXT_JS = {
  test: /\.js$/,
  loader: require.resolve("source-map-loader"),
  enforce: "pre",
  include: paths.appSrc,
};

// "url" loader works like "file" loader except that it embeds assets
// smaller than specified limit in bytes as data URLs to avoid requests.
// A missing `test` is equivalent to a match.
exports.RULE_IMAGES = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  loader: require.resolve("url-loader"),
  options: {
    limit: 10000,
    name: "static/media/[name].[hash:8].[ext]",
  }
};

exports.RULE_CSS = function (isDev, extractTextPluginOptions) {

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

  const rule = {test: /\.css$/};

  const use = [
    {
      loader: require.resolve("css-loader"),
      options: {
        importLoaders: 1,
        minimize: !isDev,
        sourceMap: !isDev,
      },
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
        plugins: () => [
          require("postcss-flexbugs-fixes"),
          autoprefixer({
            browsers: [
              ">1%",
              "last 4 versions",
              "Firefox ESR",
              "not ie < 9", // React doesn't support IE8 anyway
            ],
            flexbox: "no-2009",
          }),
        ],
      },
    },
  ];

  if (isDev) {
    Object.assign(rule, {use});
  } else {
    Object.assign(
      rule,
      {
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: require.resolve("style-loader"),
              use: use,
            },
            extractTextPluginOptions
          )
        )
      }
    );
  }

  return rule;
};

// "file" loader makes sure those assets get served by WebpackDevServer.
// When you `import` an asset, you get its (virtual) filename.
// In production, they would get copied to the `build` folder.
exports.RULE_COVER_NON_MATCHED = {
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
  ],
  loader: require.resolve("file-loader"),
  options: {
    name: "static/media/[name].[hash:8].[ext]",
  }
};

exports.resolveOptions = {
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
    "react-native": "react-native-web",
  },
  plugins: [
    // Prevents users from importing files from outside of src/ (or node_modules/).
    // This often causes confusion because we only process files within src/ with babel.
    // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
    // please link the files into your node_modules/ and let module-resolution kick in.
    // Make sure your source files are compiled, as they will not be processed in any way.
    new ModuleScopePlugin(paths.appSrc),
  ],
};

exports.nodeOptions = {
  fs: "empty",
  net: "empty",
  tls: "empty"
};
