{
  mode: 'production',
  context: '/home/linne/Projects/vue-ts-playground',
  devtool: 'source-map',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: '/home/linne/Projects/vue-ts-playground/build',
    filename: 'js/[name].[contenthash:8].js',
    publicPath: '/',
    chunkFilename: 'js/[name].[contenthash:8].js'
  },
  resolve: {
    symlinks: false,
    alias: {
      '@': '/home/linne/Projects/vue-ts-playground/src',
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: [
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.ts',
      '.tsx'
    ],
    modules: [
      'node_modules',
      '/home/linne/Projects/vue-ts-playground/node_modules',
      '/home/linne/Projects/vue-ts-playground/node_modules/@vue/cli-service/node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      'node_modules',
      '/home/linne/Projects/vue-ts-playground/node_modules',
      '/home/linne/Projects/vue-ts-playground/node_modules/@vue/cli-service/node_modules'
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          /* config.module.rule('vue').use('cache-loader') */
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/home/linne/Projects/vue-ts-playground/node_modules/.cache/vue-loader',
              cacheIdentifier: '4941552a'
            }
          },
          /* config.module.rule('vue').use('vue-loader') */
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              },
              cacheDirectory: '/home/linne/Projects/vue-ts-playground/node_modules/.cache/vue-loader',
              cacheIdentifier: '4941552a'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          /* config.module.rule('images').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          /* config.module.rule('svg').use('file-loader') */
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          /* config.module.rule('media').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          /* config.module.rule('fonts').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        use: [
          /* config.module.rule('pug').use('pug-plain-loader') */
          {
            loader: 'pug-plain-loader'
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('css').oneOf('vue-modules').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('css').oneOf('vue').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('css').oneOf('vue').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('vue').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('css').oneOf('normal-modules').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              /* config.module.rule('css').oneOf('normal').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('css').oneOf('normal').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('postcss').oneOf('vue-modules').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('postcss').oneOf('vue').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('postcss').oneOf('normal-modules').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('postcss').oneOf('normal').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('scss').oneOf('vue-modules').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('scss').oneOf('vue').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('scss').oneOf('normal-modules').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('scss').oneOf('normal').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('sass').oneOf('vue-modules').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  indentedSyntax: true
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('sass').oneOf('vue').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  indentedSyntax: true
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('sass').oneOf('normal-modules').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  indentedSyntax: true
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal') */
          {
            use: [
              /* config.module.rule('sass').oneOf('normal').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('sass-loader') */
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  indentedSyntax: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('less').oneOf('vue-modules').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('less').oneOf('vue').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('less').oneOf('vue').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('vue').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('vue').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('less').oneOf('normal-modules').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal') */
          {
            use: [
              /* config.module.rule('less').oneOf('normal').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('less').oneOf('normal').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('normal').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('stylus').oneOf('vue-modules').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('stylus').oneOf('vue').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('stylus').oneOf('normal-modules').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]'
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal') */
          {
            use: [
              /* config.module.rule('stylus').oneOf('normal').use('extract-css-loader') */
              {
                loader: '/home/linne/Projects/vue-ts-playground/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  publicPath: '../'
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          /* config.module.rule('js').use('cache-loader') */
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/home/linne/Projects/vue-ts-playground/node_modules/.cache/babel-loader',
              cacheIdentifier: '244b45d0'
            }
          },
          /* config.module.rule('js').use('thread-loader') */
          {
            loader: 'thread-loader'
          },
          /* config.module.rule('js').use('babel-loader') */
          {
            loader: 'babel-loader'
          }
        ]
      },
      /* config.module.rule('ts') */
      {
        test: /\.ts$/,
        use: [
          /* config.module.rule('ts').use('cache-loader') */
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/home/linne/Projects/vue-ts-playground/node_modules/.cache/ts-loader',
              cacheIdentifier: '23bdad89'
            }
          },
          /* config.module.rule('ts').use('thread-loader') */
          {
            loader: 'thread-loader'
          },
          /* config.module.rule('ts').use('babel-loader') */
          {
            loader: 'babel-loader'
          },
          /* config.module.rule('ts').use('ts-loader') */
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [
                '\\.vue$'
              ],
              happyPackMode: true
            }
          }
        ]
      },
      /* config.module.rule('tsx') */
      {
        test: /\.tsx$/,
        use: [
          /* config.module.rule('tsx').use('cache-loader') */
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/home/linne/Projects/vue-ts-playground/node_modules/.cache/ts-loader',
              cacheIdentifier: '23bdad89'
            }
          },
          /* config.module.rule('tsx').use('thread-loader') */
          {
            loader: 'thread-loader'
          },
          /* config.module.rule('tsx').use('babel-loader') */
          {
            loader: 'babel-loader'
          },
          /* config.module.rule('tsx').use('ts-loader') */
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
              appendTsxSuffixTo: [
                '\\.vue$'
              ]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      {
        options: {
          test: /\.js(\?.*)?$/i,
          warningsFilter: function () {
                return true;
              },
          extractComments: false,
          sourceMap: true,
          cache: true,
          cacheKeys: function (defaultCacheKeys) {
                return defaultCacheKeys;
              },
          parallel: true,
          include: undefined,
          exclude: undefined,
          minify: undefined,
          uglifyOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            output: {
              comments: /^\**!|@preserve|@license|@cc_on/
            },
            mangle: {
              safari10: true
            }
          }
        }
      }
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"production"',
          BASE_URL: '"/"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('extract-css') */
    new MiniCssExtractPlugin(
      {
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      }
    ),
    /* config.plugin('optimize-css') */
    new OptimizeCssnanoPlugin(
      {
        sourceMap: false,
        cssnanoOptions: {
          safe: true,
          autoprefixer: {
            disable: true
          },
          mergeLonghand: false
        }
      }
    ),
    /* config.plugin('hash-module-ids') */
    new HashedModuleIdsPlugin(
      {
        hashDigest: 'hex'
      }
    ),
    /* config.plugin('named-chunks') */
    new NamedChunksPlugin(
      function () { /* omitted long function */ }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        templateParameters: function () { /* omitted long function */ },
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          removeScriptTypeAttributes: true
        },
        template: '/home/linne/Projects/vue-ts-playground/public/index.html',
        loadingCss: new Buffer('body{background-color:#303030}#loader{position:absolute;top:50%;left:50%;margin-top:-2.7em;margin-left:-2.7em;width:5.4em;height:5.4em;background-color:#f5f5f5}#hill{position:absolute;width:7.1em;height:7.1em;top:1.7em;left:1.7em;background-color:transparent;border-left:0.25em solid #303030;transform:rotate(45deg)}#hill::after{content:\'\';position:absolute;width:7.1em;height:7.1em;left:0;background-color:#f5f5f5}#box{position:absolute;left:0;bottom:-0.1em;width:1em;height:1em;background-color:transparent;border:0.25em solid #303030;border-radius:15%;transform:translate(0, -1em) rotate(-45deg);animation:push 2.5s cubic-bezier(0.79, 0, 0.47, 0.97) infinite}@keyframes push{0%{transform:translate(0, -1em) rotate(-45deg)}5%{transform:translate(0, -1em) rotate(-50deg)}20%{transform:translate(1em, -2em) rotate(47deg)}25%{transform:translate(1em, -2em) rotate(45deg)}30%{transform:translate(1em, -2em) rotate(40deg)}45%{transform:translate(2em, -3em) rotate(137deg)}50%{transform:translate(2em, -3em) rotate(135deg)}55%{transform:translate(2em, -3em) rotate(130deg)}70%{transform:translate(3em, -4em) rotate(217deg)}75%{transform:translate(3em, -4em) rotate(220deg)}100%{transform:translate(0, -1em) rotate(-225deg)}}\n')
      }
    ),
    /* config.plugin('pwa') */
    new HtmlPwaPlugin(
      {
        name: 'Demo App',
        manifestPath: 'manifest.webmanifest',
        themeColor: '#303030',
        mobileWebAppCapable: 'yes',
        appleMobileWebAppCapable: 'no',
        appleMobileWebAppStatusBarStyle: 'black-translucent',
        workboxOptions: {
          skipWaiting: true,
          clientsClaim: true
        }
      }
    ),
    /* config.plugin('preload') */
    new PreloadPlugin(
      {
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        include: 'asyncChunks'
      }
    ),
    /* config.plugin('copy') */
    new CopyWebpackPlugin(
      [
        {
          from: '/home/linne/Projects/vue-ts-playground/public',
          to: '/home/linne/Projects/vue-ts-playground/build',
          ignore: [
            'index.html',
            '.DS_Store'
          ]
        }
      ]
    ),
    /* config.plugin('workbox') */
    new GenerateSW(
      {
        exclude: [
          /\.map$/,
          /img\/icons\//,
          /favicon\.ico$/,
          /manifest\.json$/,
          /manifest\.webmanifest$/
        ],
        cacheId: 'vue-ts-playground',
        skipWaiting: true,
        clientsClaim: true
      }
    ),
    /* config.plugin('fork-ts-checker') */
    new ForkTsCheckerWebpackPlugin(
      {
        vue: true,
        tslint: false,
        formatter: 'codeframe',
        checkSyntacticErrors: true
      }
    ),
    /* config.plugin('purgecss') */
    new PurgecssPlugin(
      {
        paths: [
          '/home/linne/Projects/vue-ts-playground/public/index.html',
          '/home/linne/Projects/vue-ts-playground/src/app/app.vue',
          '/home/linne/Projects/vue-ts-playground/src/components/languageSelector/languageSelector.vue',
          '/home/linne/Projects/vue-ts-playground/src/views/404/404.vue',
          '/home/linne/Projects/vue-ts-playground/src/views/gallery/gallery.vue',
          '/home/linne/Projects/vue-ts-playground/src/views/inputTest/inputTest.vue',
          '/home/linne/Projects/vue-ts-playground/src/views/todoList/todoList.vue',
          '/home/linne/Projects/vue-ts-playground/src/views/todoList/todoListEntryDisplay.vue',
          '/home/linne/Projects/vue-ts-playground/src/views/todoList/todoListEntryEditable.vue',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/directives/click-outside.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/directives/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/directives/resize.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/directives/ripple.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/directives/scroll.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/directives/touch.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/locale/ca.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/locale/de.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/locale/en.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/locale/fa.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/locale/fr.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/locale/gr.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/locale/nl.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/locale/pl.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/locale/pt.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/locale/ru.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/locale/uk.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/locale/zh-Hans.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/locale/zh-Hant.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/applicationable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/bootable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/button-group.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/colorable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/comparable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/data-iterable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/delayable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/dependent.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/detachable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/filterable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/loadable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/maskable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/measurable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/menuable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/overlayable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/picker-button.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/picker.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/positionable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/registrable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/returnable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/rippleable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/routable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/selectable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/sizeable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/ssr-bootable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/stackable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/themeable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/toggleable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/transitionable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/translatable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/mixins/validatable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/util/SlotProvider.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/util/colorUtils.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/util/colors.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/util/component.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/util/console.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/util/dedupeModelListeners.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/util/easing-patterns.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/util/helpers.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/util/mask.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/util/mixins.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/util/rebuildFunctionalSlots.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/util/theme.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VAlert/VAlert.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VAlert/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VApp/VApp.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VApp/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VAutocomplete/VAutocomplete.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VAutocomplete/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VAvatar/VAvatar.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VAvatar/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VBadge/VBadge.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VBadge/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VBottomNav/VBottomNav.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VBottomNav/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VBottomSheet/VBottomSheet.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VBottomSheet/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VBreadcrumbs/VBreadcrumbs.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VBreadcrumbs/VBreadcrumbsItem.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VBreadcrumbs/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VBtn/VBtn.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VBtn/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VBtnToggle/VBtnToggle.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VBtnToggle/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VCard/VCard.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VCard/VCardMedia.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VCard/VCardTitle.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VCard/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VCarousel/VCarousel.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VCarousel/VCarouselItem.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VCarousel/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VCheckbox/VCheckbox.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VCheckbox/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VChip/VChip.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VChip/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VCombobox/VCombobox.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VCombobox/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VCounter/VCounter.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VCounter/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDataIterator/VDataIterator.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDataIterator/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDataTable/VDataTable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDataTable/VEditDialog.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDataTable/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDatePicker/VDatePicker.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDatePicker/VDatePickerDateTable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDatePicker/VDatePickerHeader.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDatePicker/VDatePickerMonthTable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDatePicker/VDatePickerTitle.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDatePicker/VDatePickerYears.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDatePicker/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDialog/VDialog.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDialog/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDivider/VDivider.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDivider/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VExpansionPanel/VExpansionPanel.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VExpansionPanel/VExpansionPanelContent.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VExpansionPanel/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VFooter/VFooter.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VFooter/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VForm/VForm.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VForm/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VGrid/VContainer.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VGrid/VContent.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VGrid/VFlex.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VGrid/VLayout.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VGrid/grid.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VGrid/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VHover/VHover.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VHover/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VIcon/VIcon.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VIcon/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VImg/VImg.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VImg/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VInput/VInput.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VInput/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VJumbotron/VJumbotron.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VJumbotron/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VLabel/VLabel.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VLabel/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VList/VList.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VList/VListGroup.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VList/VListTile.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VList/VListTileAction.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VList/VListTileAvatar.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VList/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VMenu/VMenu.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VMenu/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VMessages/VMessages.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VMessages/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VNavigationDrawer/VNavigationDrawer.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VNavigationDrawer/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VOverflowBtn/VOverflowBtn.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VOverflowBtn/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VPagination/VPagination.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VPagination/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VParallax/VParallax.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VParallax/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VPicker/VPicker.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VPicker/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VProgressCircular/VProgressCircular.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VProgressCircular/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VProgressLinear/VProgressLinear.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VProgressLinear/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VRadioGroup/VRadio.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VRadioGroup/VRadioGroup.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VRadioGroup/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VRangeSlider/VRangeSlider.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VRangeSlider/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VRating/VRating.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VRating/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VResponsive/VResponsive.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VResponsive/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VSelect/VSelect.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VSelect/VSelectList.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VSelect/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VSlider/VSlider.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VSlider/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VSnackbar/VSnackbar.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VSnackbar/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VSpeedDial/VSpeedDial.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VSpeedDial/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VStepper/VStepper.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VStepper/VStepperContent.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VStepper/VStepperStep.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VStepper/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VSubheader/VSubheader.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VSubheader/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VSwitch/VSwitch.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VSwitch/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VSystemBar/VSystemBar.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VSystemBar/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTabs/VTab.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTabs/VTabItem.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTabs/VTabs.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTabs/VTabsItems.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTabs/VTabsSlider.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTabs/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTextField/VTextField.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTextField/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTextarea/VTextarea.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTextarea/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTimePicker/VTimePicker.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTimePicker/VTimePickerClock.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTimePicker/VTimePickerTitle.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTimePicker/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VToolbar/VToolbar.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VToolbar/VToolbarSideIcon.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VToolbar/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTooltip/VTooltip.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTooltip/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/Vuetify/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/transitions/expand-transition.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/transitions/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/util/color/transformCIELAB.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/util/color/transformSRGB.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VApp/mixins/app-theme.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDataTable/mixins/body.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDataTable/mixins/foot.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDataTable/mixins/head.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDataTable/mixins/progress.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDatePicker/mixins/date-picker-table.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDatePicker/util/createNativeLocaleFormatter.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDatePicker/util/index.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDatePicker/util/isDateAllowed.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDatePicker/util/monthChange.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VDatePicker/util/pad.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VMenu/mixins/menu-activator.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VMenu/mixins/menu-generators.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VMenu/mixins/menu-keyable.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VMenu/mixins/menu-position.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTabs/mixins/tabs-computed.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTabs/mixins/tabs-generators.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTabs/mixins/tabs-props.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTabs/mixins/tabs-touch.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/VTabs/mixins/tabs-watchers.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/Vuetify/mixins/application.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/Vuetify/mixins/breakpoint.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/Vuetify/mixins/icons.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/Vuetify/mixins/lang.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/Vuetify/mixins/options.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/Vuetify/mixins/theme.js',
          '/home/linne/Projects/vue-ts-playground/node_modules/vuetify/es5/components/Vuetify/util/goTo.js'
        ],
        styleExtensions: [
          '.sass',
          '.scss',
          '.css',
          '.styl'
        ],
        whitelist: [
          '*:not*',
          '.notices',
          '.snackbar',
          '.carousel-3d-container'
        ],
        whitelistPatterns: [
          /v-input__(append|prepend)-outer/,
          /picker(-reverse)?-transition/,
          /tab(-reverse)?-transition/,
          /--text$/
        ]
      }
    )
  ],
  entry: {
    app: [
      './src/main.ts'
    ]
  }
}
