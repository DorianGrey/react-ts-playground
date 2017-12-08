const {
  CSSPlugin,
  EnvPlugin,
  FuseBox,
  PostCSSPlugin,
  QuantumPlugin,
  SassPlugin,
  Sparky,
  SVGPlugin,
  UglifyESPlugin,
  WebIndexPlugin
} = require("fuse-box");

const path = require("path");
const express = require("express")

let fuse, app, vendor;
let isProduction = false;

Sparky.task("config", () => {
  fuse = new FuseBox({
    homeDir: "src",
    sourceMaps: { inline: false },
    hash: isProduction,
    target: "browser",
    output: isProduction ? "build/$name.$hash.js": "build/$name.js",
    useTypescriptCompiler: true,
    experimentalFeatures: true,
    useJsNext : ["react-loadable"],
    polyfillNonStandardDefaultUsage : true,
    plugins: [
      EnvPlugin({ NODE_ENV: isProduction ? "production" : "development" }),
      SVGPlugin(),
      [
        SassPlugin({
          outputStyle: isProduction ? "compressed" : "nested"
        }),
        PostCSSPlugin(
          [
            require("postcss-flexbugs-fixes"),
            require("autoprefixer")({
              browsers: [
                ">1%",
                "last 4 versions",
                "Firefox ESR",
                "not ie < 9" // React doesn't support IE8 anyway
              ],
              flexbox: "no-2009"
            })
          ],
          {
            // should fusebox generate sourcemaps (see below), default: true
            sourceMaps: !isProduction,
          }
        ),
        CSSPlugin()
      ],
      WebIndexPlugin({
        template: "public/index.html",
        title: "Demo App"
      }),

      isProduction &&
        QuantumPlugin({
          bakeApiIntoBundle : "vendor",
          treeshake: true,
          uglify: false
        }),
      isProduction && UglifyESPlugin({
        compress: {
          warnings: false,
          // This feature has been reported as buggy a few times, such as:
          // https://github.com/mishoo/UglifyJS2/issues/1964
          // We'll wait with enabling it by default until it is more solid.
          reduce_vars: false
        },
        output: {
          comments: false,
          // Turned on because emoji and regex is not minified properly using default
          // https://github.com/facebookincubator/create-react-app/issues/2488
          ascii_only: true
        },
        sourceMap: true
      })
    ].filter(e => !!e)
  });
  

  vendor = fuse.bundle("vendor").instructions(`~ **/**.{ts,tsx} +tslib -**/**.d.ts`);

  app = fuse.bundle("app")
    .splitConfig({ browser: "/static/", dest: "bundles/" })
    .split("app/routes/testRoute1/**", "testRoute1 > app/routes/testRoute1/TestRoute1.tsx")
    .split("app/todo-list/**", "todo-list > app/todo-list/TodoList.tsx")
    .split("app/routes/parseParams/**", "parseParamsTest > app/routes/parseParams/ParseParamsTestRoute.tsx")
    .instructions("> [index.prod.tsx] + [app/{routes,todo-list}/**/**.{ts, tsx}]")
});

Sparky.task("default", ["config"], () => {
  fuse.dev({
    port: 3000,
    root: false
  }, server => {
    const dist = path.join(__dirname, "build");
    const app = server.httpServer.app;
    app.use("/", express.static(dist));
    app.get("*", function(req, res) {
        res.sendFile(path.join(dist, "index.html"));
    });
  });
  // add dev instructions
  vendor.hmr();
  app.watch().hmr();
  return fuse.run();
});

Sparky.task("set-prod-env", [], () => {
  isProduction = true;
});

Sparky.task("build", ["set-prod-env", "config"], () => {
  fuse.run();
});