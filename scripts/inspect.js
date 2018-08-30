process.env.NODE_ENV = process.env.NODE_ENV || "development";

const config = require("../config/webpack/config")();
console.warn(config.toString());
