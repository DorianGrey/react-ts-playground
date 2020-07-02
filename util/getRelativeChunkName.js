const path = require("path");

/**
 * Gets the relative name of a file chunk, excluding potentially existing hashes in the file name.
 * Used to match current assets with their potential predecessors.
 *
 * @param fileName
 * @returns {string}
 */
function getRelativeChunkName(sourcePath, fileName) {
  // Replacing by relative path is more stable, but not always usable regarding
  // provided relative file names...
  // In case `fileName` is an absolute path, using `path.relative` is favorable,
  // since it also avoids problems with potentially leading path separators.
  const targetFileName = path.isAbsolute(fileName)
    ? path.relative(sourcePath, fileName)
    : fileName.replace(sourcePath, "");

  const filenameWithoutHash = targetFileName.replace(
    /\/?(.*)(\.[0-9a-f]{8,})(\.chunk)?\.(js|css|json|webmanifest)/,
    (match, p1, p2, p3, p4) => p1 + p4
  );

  // The path has to be normalized to properly handle different path separators on Windows vs the rest of the world.
  return path.normalize(filenameWithoutHash);
}

module.exports = { getRelativeChunkName };
