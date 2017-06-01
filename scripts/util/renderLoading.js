const path = require("path");
const fs   = require("fs");
const sass = require("node-sass");

sass.render({
  file: path.resolve(process.cwd(), "src", "styles", "loading.scss"),
  outputStyle: "compressed"
}, function (error, result) {
  if (error) {
    throw error;
  } else {
    const content = JSON.stringify({css: result.css.toString("UTF-8")});
    fs.writeFileSync(path.resolve(process.cwd(), "src", "generated", "loading.scss.json"), content);
  }
});