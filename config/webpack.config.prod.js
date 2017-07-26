/* eslint global-require: off, no-console: off */

const path = require('path')

const eslintFormatter = require('react-dev-utils/eslintFormatter')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const webpack = require('webpack')

const getClientEnvironment = require('./env')
const paths = require('./paths')

const publicPath = paths.servedPath
const shouldUseRelativeAssetPaths = publicPath === './'
const publicUrl = publicPath.slice(0, -1)
const env = getClientEnvironment(publicUrl)

if (process.env.NODE_ENV !== 'production') {
  throw new Error('Production builds must have NODE_ENV=production.')
}

const cssFilename = 'static/css/[name].[contenthash:8].css'
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {}

module.exports = {
  entry: ['babel-polyfill', paths.appIndexJs],
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.js', '.jsx', '.json'],
    plugins: [new ModuleScopePlugin(paths.appSrc)]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        use: [
          {
            options: {
              formatter: eslintFormatter
            },
            loader: 'eslint-loader'
          }
        ],
        include: paths.appSrc
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.json$/,
          /\.css$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/
        ],
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: paths.appSrc,
        options: {
          compact: true
        }
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: require.resolve('style-loader'),
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: true
                  }
                }
              ]
            },
            extractTextPluginOptions
          )
        )
      }
    ]
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin(env.stringified),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false
      },
      output: {
        comments: false,
        ascii_only: true
      },
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: cssFilename
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return
        }
        if (message.indexOf('Skipping static resource') === 0) {
          return
        }
        console.log(message)
      },
      minify: true,
      navigateFallback: `${publicUrl}/index.html`,
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  bail: true,
  devtool: 'source-map',
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
