const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const configs = require('../configs');
const common = require('./webpack.common.conf');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',     // 使用 source map，追踪错误和警告位置  // prod 使用source-map
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(configs.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: configs.host,
    port: configs.port,
    open: configs.autoOpenBrowser,
    overlay: { warnings: false, errors: true },
    publicPath: configs.assetsPublicPath,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),   // 以便更容易查看要修补(patch)的依赖  // prod不需要
    new webpack.HotModuleReplacementPlugin(),    // prod不需要
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
});