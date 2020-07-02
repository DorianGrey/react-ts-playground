const zlib = require("zlib");
/**
 * Helper function to determine the gzipped size of a content.
 *
 * @param src {String|Buffer} Content to determine the size for.
 * @param gzipOpts {Object} Gzip options to apply - esp. the `level` affects the output size.
 *                          Should fit the `ZlibOptions` shape.
 * @returns {number} The size of the gzipped content in bytes.
 */
function gzipSizeOf(src, gzipOpts) {
  return zlib.gzipSync(src, gzipOpts).length;
}

module.exports = { gzipSizeOf };
