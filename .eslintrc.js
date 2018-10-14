module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-shadow': ['error', { builtinGlobals: false, allow: ['state'] }],
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'import/prefer-default-export': 0,
    'vue/max-attributes-per-line': ['error', {
      singleline: 2,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for vuex state
          'acc', // for reduce accumulators
          'e', // for e.returnvalue
        ],
      },
    ],
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
