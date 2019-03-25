const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.conf');

module.exports = merge(common, {
  module: {
    rules: utils.styleLoaders({
      hotReload: false, 
      extract: true, 
      sourceMap: false, 
      usePostCSS: true 
    })
  },
  devtool: 'source-map',     // 使用 source map，追踪错误和警告位置  // prod 使用source-map
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
            warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    }), // dev可以不需要
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
  ]
});