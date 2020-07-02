[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This is just a repository for playing around with React, TypeScript, HMR, ...


# Branch: Snowpack with webpack as production bundler

https://github.com/DorianGrey/react-ts-playground/tree/master

Uses [snowpack](https://www.snowpack.dev/) for the default setup and its plugin for [webpack](https://webpack.js.org) for creating production builds.

## Notable aspects
- Uses ES modules during development and thus only works in browsers that support those natively.
- Provides a very responsive developer experience for the same reason, since no (re-)bundling is required.
- The production output is a bit smaller than the one from the `webpack`-only version.
- Not as mature as the `webpack`-only version, thus might still have some rough edges or glitches for now (but it works very well for most cases!), e.g.:
    - No source maps for your app code in dev mode (for now)
    - No named dynamic imports (for now)

## Build tasks

- `build` executes the default `snowpack build` task **without** using a bundler, i.e. the output result is not minified and optimized to the full extend.
- `build:bundled` uses `snowpack build` with `webpack` under the hood.

## Build stats
```
js\index.f7bd87a1.js                               373.09 KB   112.66 KB
js\2.25316f78.js                                   161.02 KB   40.65 KB
js\vendors~index.ed4d11ef.js                       61.29 KB    21.38 KB
js\3.a24af7d0.js                                   17.33 KB    6.41 KB
.\favicon.ico                                      24.26 KB    3.63 KB
.\workbox-df7e707f.js                              7.88 KB     3 KB
js\6.8e6d1154.js                                   9.58 KB     2.84 KB
js\4.59392cad.js                                   8.4 KB      2.73 KB
assets\logo-103b5fa18196d5665a7e12318285c916.svg   2.61 KB     1.28 KB
js\5.666626fa.js                                   2.49 KB     1.13 KB
.\index.html                                       2.63 KB     1.08 KB
.\sw.js                                            1.87 KB     1.08 KB
js\7.dd690105.js                                   786 B       418 B
.\manifest.webmanifest                             317 B       220 B
js\index.f7bd87a1.js.LICENSE.txt                   165 B       154 B
.\robots.txt                                       67 B        78 B
__snowpack__\env.js                                61 B        68 B
```

# Branch: Webpack only

https://github.com/DorianGrey/react-ts-playground/tree/alternative/webpack

Uses [webpack](https://webpack.js.org) and several related plugins for both modes.

## Notable aspects
- Very mature technical basis.
- Requires less tools, but more plugins for `webpack` and configuration for both.

## Build tasks

- `build` is the only task here, performing all optimizations.

## Build stats
```
static\js\main.78f28f65.js                     401.68 KB     124.16 KB
static\js\vendors~todos.321799ce.js            160.25 KB     43.02 KB
static\js\vendors~parseParamTest.3bdab249.js   27.21 KB      10.23 KB
static\js\testRoute1.5d216bbe.js               7.9 KB        3.69 KB
.\favicon.ico                                  24.26 KB      3.63 KB
.\workbox-df7e707f.js                          7.88 KB       3 KB
static\js\lang-de.ba1e9765.js                  9.68 KB       2.82 KB
static\js\lang-en.b521ec04.js                  8.56 KB       2.73 KB
static\js\todos.162909ea.js                    7.53 KB       2.5 KB
static\js\runtime.d41d8cd9.js                  2.47 KB       1.27 KB
.\service-worker.js                            1.93 KB       1.05 KB
.\index.html                                   1.91 KB       792 B
static\js\parseParamTest.194c898c.js           813 B         430 B
static\js\main.78f28f65.js.LICENSE.txt         1.34 KB       357 B
.\manifest.webmanifest                         317 B         220 B
```