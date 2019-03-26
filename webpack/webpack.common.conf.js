const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('../configs');
const { srcRoot, rootNode, src } = require('../configs/helpers/path');

module.exports = {
  entry: // 入口文件
    // `${srcRoot('index.js')}`,
    { // 多文件
      main: `${srcRoot('main.js')}`
      // print: `${srcRoot('print.js')}`,
    },
  output: {
    filename: '[name].bundle.js',           // 输出文件
    path: rootNode('dist'),          // 输出文件的路径
    // 给url-loader用的资源文件前缀路径,表示资源的发布地址，当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换。
    // 具体表现为：被设置为url-loader的outputPath前的路径  -->  ..path/dist/img
    // publicPath: 'dist/'
  },
  resolve: {
    extensions: ['.vue', '.js', '.jsx', 'less', 'scss', 'css', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': src(),
      'configs': `${srcRoot('configs')}`,
      'utils': `${srcRoot('utils')}`,
      'views': `${srcRoot('views')}`,
      'styles': `${srcRoot('styles')}`,
      'router': `${srcRoot('router')}`
    }
  },
  module: {
    rules: [
      // 加载vue文件
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      // use babel es6 > es5。(UglifyJsPlugin, 不能压缩es6的代码文件。我们把es6的代码用babel转换成es5即可)
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      
      },
      // 加载样式文件 style-loader  css-loader  sass-loader
      // {
      //   test: /\.css$/,
      //   use: [
      //     'vue-style-loader',
      //     'style-loader',
      //     {
      //       loader: "css-loader",
      //       options: {
      //           modules: true,
      //           importLoaders: 1,
      //           sourceMap: true
      //       }
      //     },
      //   ]
      // },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'vue-style-loader',
      //     'style-loader',
      //     {
      //       loader: "css-loader",
      //       options: {
      //           modules: true,
      //           importLoaders: 1,
      //           sourceMap: true
      //       }
      //     },
      //     'postcss-loader',
      //     'sass-loader?outputStyle=expanded'
      //   ]
      // },
      // {
      //   test: /\.less$/,
      //   use: [
      //     'vue-style-loader',
      //     'style-loader',
      //     {
      //       loader: "css-loader",
      //       options: {
      //           modules: true,
      //           importLoaders: 1,
      //           sourceMap: true
      //       }
      //     },
      //     'postcss-loader',
      //     {
      //       loader: 'less-loader',
      //       options: {
      //         outputStyle: 'expanded',
      //         sourceMap: false
      //       }
      //     }
      //   ]
      // },
      // 加载图片 file-loader url-loader
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: 'img/',    // 在output中的publicPath路径中的路径
              limit: 8192     // 小于8129字节的被转为baes64引入，大于8129字节的正常打包在指定的路径下
            }
          }
        ]
      },
      // 加载字体文件 file-loader url-loader
      { test: /\.(woff|woff2)(\?v=\d\.\d\.\d)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d\.\d\.\d)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d\.\d\.\d)?$/, loader: 'file-loader' },
      // 加载资源文件，csv/tsv/xml (json默认支持)
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  },
  plugins: [
    // 打包构建前先清理输出文件夹
    new CleanWebpackPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
};
