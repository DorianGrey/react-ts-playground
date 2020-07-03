"use strict";

const fs = require("fs-extra");
const _ = require("lodash");
const mkdirp = require("mkdirp");
const glob = require("globby");
const path = require("path");

module.exports = {
  async getFiles(src, options) {
    const files = await glob(src, options || {});
    return _.reject(files, (f) => _.includes(f, "*"));
  },
  readFile(src) {
    return fs.readFile(src, "utf-8");
  },
  async writeFile(dest, content, options) {
    await mkdirp(path.dirname(dest));
    return fs.writeFile(dest, content, options || {});
  },
};
