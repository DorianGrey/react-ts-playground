const argv = process.argv.slice(2);

module.exports = {
  isDev: (process.env.NODE_ENV !== "production"),
  isTest: (process.env.NODE_ENV === "test"),
  isWatch: (/dev-server|start/.test(process.env.npm_lifecycle_event)),
  useClosureCompiler: argv.indexOf("--use-closure-compiler") < 0
};