const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    background: `${__dirname}/../src/scripts/background.js`,
    content: `${__dirname}/../src/scripts/content.js`,
  },
  output: {
    path: `${__dirname}/../builds/chrome_extension`,
    filename: 'scripts/[name].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/manifest.json', to: 'manifest.json' },
      { from: 'src/styles/content.css', to: 'styles/content.css' },
      { from: 'src/images/icon16.png', to: 'images/icon16.png' },
      { from: 'src/images/icon48.png', to: 'images/icon48.png' },
      { from: 'src/images/icon128.png', to: 'images/icon128.png' },
    ]),
  ],
};