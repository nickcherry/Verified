const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    background: `${__dirname}/../chromeExtension/background/index.js`,
    popup: `${__dirname}/../chromeExtension/popup/index.js`,
  },
  output: {
    path: `${__dirname}/../builds/chrome_extension`,
    filename: '[name]/index.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }],
  },
  plugins: [
    new copyWebpackPlugin([
      { from: 'chromeExtension/icons/icon128.png', to: 'icons/icon128.png' },
      { from: 'chromeExtension/icons/icon16.png', to: 'icons/icon16.png' },
      { from: 'chromeExtension/icons/icon48.png', to: 'icons/icon48.png' },
      { from: 'chromeExtension/manifest.json', to: 'manifest.json' },
      { from: 'chromeExtension/popup/index.html', to: 'popup/index.html' },
    ]),
  ],
};