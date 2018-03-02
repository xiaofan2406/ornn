const path = require('path');

module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  settings: {
    'import/resolver': {
      jest: {
        jestConfigFile: path.join(__dirname, './config/jest.config.json'),
      },
      node: { extensions: ['.js', '.mjs'] },
    },
  },
  plugins: ['flowtype'],
  extends: ['airbnb-base', 'prettier', 'plugin:flowtype/recommended'],
  rules: {
    'no-restricted-syntax': [
      2,
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-continue': 0,
    'no-param-reassign': [2, { props: false }],
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': [2, 'always', { js: 'never', mjs: 'never' }],
    'flowtype/no-types-missing-file-annotation': 0,
  },
};
