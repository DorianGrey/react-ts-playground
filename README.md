[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This is just a repository for playing around with React, TypeScript, HMR, ...

# Build tasks

- `build` executes the default `snowpack build` task **without** using a bundler, i.e. the output result is not minified and optimized to the full extend.
- `build:bundled` uses `snowpack build` with `webpack` under the hood.

# Other things to beware of

I'm still working on clearing up this branch a bit, since there are still a lot of things from the plain `webpack` version that are no longer required.
