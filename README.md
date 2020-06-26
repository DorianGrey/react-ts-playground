[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This is just a repository for playing around with React, TypeScript, HMR, ...

# Build tasks

- `build` executes the default `snowpack build` task **without** using a bundler, i.e. the output result is not minified and optimized to the full extend.
- `build:bundled` uses `snowpack build` with `webpack` under the hood.

# Known issues

- The `build:bundled` task utilizing `snowpack` with a bundler is not working yet, but will be as soon as the issue [regarding bundle splitting](https://github.com/pikapkg/create-snowpack-app/issues/152) will be resolved.

# Other things to beware of

- Importing types from modules: Although the `importsNotUsedAsValues` flag is set to `error`, not all of those imports seems to cause a complaint from the compiler. However, it is required to import types from modules solely using the `import type` clause so that the ESM build does not considers those to be values existing during runtime, which will cause the `build` task to fail. **Note**: This might no longer be necessary in upcoming releases of `snowpack`.
