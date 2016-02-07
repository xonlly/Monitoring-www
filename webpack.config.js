var path = require('path')

module.exports = {
  entry: path.join(__dirname, "src/index.js"),
  output: {
      path: path.join(__dirname, 'www/js'),
      filename: "bundle.js"
  },
  module: {
    loaders: [
      {
          test: /\.js$/,
          exclude: /(node_modules|\.tmp)/,
          loader: 'babel-loader',
          query: {
              cacheDirectory: true,
              presets: ['es2015', 'stage-0', 'react'],
          }
      },
      {
          test: /\.jsx$/,
          exclude: /(node_modules|\.tmp)/,
          loader: 'babel-loader',
          query: {
              cacheDirectory: true,
              presets: ['es2015', 'stage-0', 'react'],
          }
      }
    ]
  }
}
