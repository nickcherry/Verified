const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    background: `${__dirname}/../src/background/index.js`,
    content: `${__dirname}/../src/content/index.js`,
    popup: `${__dirname}/../src/popup/index.js`,
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
      { from: 'src/content/style.css', to: 'content/style.css' },
      { from: 'src/icons/icon128.png', to: 'icons/icon128.png' },
      { from: 'src/icons/icon16.png', to: 'icons/icon16.png' },
      { from: 'src/icons/icon48.png', to: 'icons/icon48.png' },
      { from: 'src/manifest.json', to: 'manifest.json' },
      { from: 'src/popup/popup.html', to: 'popup/popup.html' },
    ]),
  ],
};