[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This is just a repository for playing around with React, TypeScript, HMR, ...

# Build tasks

- `build` executes the default `snowpack build` task **without** using a bundler, i.e. the output result is not minified and optimized to the full extend.
- `build:bundled` uses `snowpack build` with `webpack` under the hood.

# Known issues

- The `build` task utilizing `snowpack` without a bundler does currently not include a service worker, thus the served build will complain about it being missing.
- The `build` task utilizing `snowpack` with a bundler does currently not include a service worker, since the module used for it fails with an `exports is not defined` error.

# Other things to beware of

- Importing types from modules: Although the `importsNotUsedAsValues` flag is set to `error`, not all of those imports seems to cause a complaint from the compiler. However, it is required to import types from modules solely using the `import type` clause so that the ESM build does not considers those to be values existing during runtime, which will cause the `build` task to fail.
