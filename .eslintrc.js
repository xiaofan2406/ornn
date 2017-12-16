const path = require('path');

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      impliedStrict: true,
      experimentalObjectRestSpread: true,
    },
  },
  settings: {
    'import/resolver': {
      jest: {
        jestConfigFile: path.join(__dirname, './config/jest.config.json'),
      },
    },
  },
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'no-restricted-syntax': [
      2,
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-param-reassign': [2, { props: false }],
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': 0,
  },
};
