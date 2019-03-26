// https://github.com/michael-ciniawsky/postcss-load-config

// module.exports = {
//   plugins: [
//     require('postcss-import'),
//     require('postcss-url'),
//     require('postcss-cssnext'),
//     // add your "plugins" here
//     // ...
//     // and if you want to compress
//     // require('cssnano'),
//     require('postcss-browser-reporter')
//   ]
// }
const webpack = require('webpack');
module.exports = {
  plugins: [
    require('postcss-import')({
      path: './src/styles/*.css',
      addDependencyTo: webpack
    }),
    require('postcss-url'),
    require('precss'),
    require('postcss-for'),
    require('postcss-browser-reporter')
    require('postcss-cssnext')({ browsers:['Android >= 4.0', 'ios >= 6', 'last 2 versions'] })
  ]
};