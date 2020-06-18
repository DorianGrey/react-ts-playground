const productionPresets = [];
if (process.env.BUNDLED === "true") {
  productionPresets.push([
    "@babel/preset-env",
    {
      useBuiltIns: "usage",
      corejs: 3,
    },
  ]);
}

module.exports = {
  extends: "@snowpack/app-scripts-react/babel.config.json",
  plugins: ["@babel/plugin-syntax-dynamic-import"],
  env: {
    production: {
      presets: productionPresets,
    },
  },
};
