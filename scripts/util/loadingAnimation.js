const path = require("path");
const fs = require("fs");

const paths = require("../../config/paths");

module.exports = function () {
  "use strict";

  return fs
    .readFileSync(path.resolve(paths.appStyles, "loading.css"), "utf-8")
    .toString();
};
