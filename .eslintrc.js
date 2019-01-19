module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "mocha": true,
    "node": true,
  },
  "globals": {
    "artifacts": true,
    "chrome": true,
    "contract": true,
    "expect": true,
    "sinon": true,
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
  },
  "plugins": [
    "mocha",
  ],
  "rules": {
    "indent": [
      "error",
      2,
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single",
    ],
    "semi": [
      "error",
      "always",
    ],
    "no-console": "off",
    "mocha/no-exclusive-tests": "error",
    "no-unused-vars": ["error", { "varsIgnorePattern": "should|expect" }],
  }
};