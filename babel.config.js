module.exports = {
  extends: "@snowpack/app-scripts-react/babel.config.json",
  env: {
    development: {
      plugins: ["react-refresh/babel"],
    },
  },
};
