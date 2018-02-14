module.exports = {
  parser: 'babel-eslint',
  // commonjs: true,
  env: {
    browser: false,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb'],
  // installedESLint: true,
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  plugins: [],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    camelcase: 0,
    'arrow-parens': ['error', 'as-needed'],
    // 'import/no-unresolved': [2, { ignore: ['^/'] }],
    // 'import/no-extraneous-dependencies': 0,
    'forbid-prop-types': [0, { forbid: [] }],

    'prop-types': [
      0,
      {
        ignore: ['children'],
      },
    ],
    // 'import/extensions': 0,
    'new-cap': [
      'error',
      {
        capIsNewExceptions: [],
        newIsCapExceptions: [],
      },
    ],
    'no-param-reassign': ['error', { props: false }],
    'no-restricted-syntax': 'off',
    'no-warning-comments': [
      1,
      { terms: ['fixme', 'todo', 'hack'], location: 'start' },
    ],
    'no-unused-expressions': 0,
    // 'chai-friendly/no-unused-expressions': 2,
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'global-require': 0,
    'no-warning-comments': 0,
  },
  globals: {
    Assets: true,
  },
}
