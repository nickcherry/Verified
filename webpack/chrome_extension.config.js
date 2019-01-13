const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    background: `${__dirname}/../src/background.js`,
    content: `${__dirname}/../src/content.js`,
  },
  output: {
    path: `${__dirname}/../builds/chrome_extension`,
    filename: '[name].js',
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
      { from: 'src/content.css', to: 'content.css' },
    ]),
  ],
};