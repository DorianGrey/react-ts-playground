module.exports = {
  globDirectory: "build/",
  globPatterns: ["**/*.{js,yml,svg,html,txt,json}"],
  swDest: "build/sw.js",
  cacheId: "react-ts-playground",
  skipWaiting: true,
  clientsClaim: true,
};
