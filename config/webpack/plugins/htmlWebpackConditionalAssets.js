"use strict";

const crypto = require("crypto");

const defaultOptions = {
  assets: []
};

class HtmlWebpackConditionAsset {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);
  }

  apply(compiler) {
    const options = this.options;

    compiler.plugin("compilation", compilation => {
      compilation.plugin(
        "html-webpack-plugin-alter-asset-tags",
        (htmlPluginData, cb) => {
          const publicPath = compilation.outputOptions.publicPath || "";
          const assetNames = this.options.assets.map(option => {
            option.chunkName = new RegExp(option.chunkName);
            return option;
          });

          htmlPluginData.body = htmlPluginData.body.map(entry => {
            const match = assetNames.find(e =>
              e.chunkName.test(entry.attributes.src)
            );
            if (match) {
              const path = entry.attributes.src;
              entry.attributes.id = this.generateAnchorId(path);
              entry.innerHTML = this.buildTemplate(
                entry.attributes.id,
                match.condition,
                path
              );

              // Src is inlined.
              delete entry.attributes.src;
              // defer and async are not useful here...
              delete entry.attributes.defer;
              delete entry.attributes.async;
            }
            return entry;
          });
          // Ensure that conditionally loaded assets are on top of everything else.
          // The order of conditional and other chunks is retained separately.
          htmlPluginData.body = this.reorderAssets(htmlPluginData.body);

          cb(null, htmlPluginData);
        }
      );
    });
  }

  generateAnchorId(path) {
    const split = path.split("/");
    const last = split[split.length - 1];

    return crypto
      .createHash("md5")
      .update(last)
      .digest("hex");
  }

  buildTemplate(anchorId, condition, path) {
    return `if (${condition}) {
      (function(d, t){
        var s = d.createElement(t);
        var m = d.getElementById("${anchorId}");
        s.src = "${path}";
        m.parentNode.insertBefore(s, m);
      })(document, "script");
    }`;
  }

  reorderAssets(assets) {
    // Note: The "runtime" chunk has to be loaded first to properly provide
    // `webpackJsonp` for the conditional chunks.
    let runtimeChunkTest = /runtime/;
    let runtimeChunks = [],
      conditionalChunks = [],
      regularChunks = [];

    for (let entry of assets) {
      if (runtimeChunkTest.test(entry.attributes.src)) {
        runtimeChunks.push(entry);
      } else {
        (entry.innerHTML ? conditionalChunks : regularChunks).push(entry);
      }
    }

    return runtimeChunks.concat(conditionalChunks, regularChunks);
  }
}

module.exports = HtmlWebpackConditionAsset;
