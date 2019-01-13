const { EnvironmentPlugin } = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./chrome_extension.config.js');

module.exports = merge(baseConfig, {
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'production',
      NETWORK_URL: 'http://localhost:8545',
    }),
  ],
});
