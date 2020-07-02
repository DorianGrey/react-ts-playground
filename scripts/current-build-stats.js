const fs = require("fs-extra");
const path = require("path");
const glob = require("globby");
const paths = require("../config/paths");

const { gzipSizeOf } = require("../util/gzipSizeOf");
const { getRelativeChunkName } = require("../util/getRelativeChunkName");

const sourcePath = paths.appBuild;

const gzipDisplayOpts = { level: 6 };
const globbed = glob.sync(["**/*.{js,css,json,webmanifest}"], {
  cwd: sourcePath,
  absolute: true,
});
const stats = globbed.reduce((result, fileName) => {
  const contents = fs.readFileSync(fileName);
  const key = getRelativeChunkName(sourcePath, fileName);
  const originalSize = fs.statSync(fileName).size;
  result[key] = {
    original: originalSize,
    gzip: gzipSizeOf(contents, gzipDisplayOpts),
  };
  return result;
}, {});

fs.mkdirSync(paths.appTmpDir, { recursive: true });
fs.writeJSONSync(paths.appTmpDir + path.sep + "build-stats.json", stats, {});
