module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'prettier'],
  extends: ['alloy', 'alloy/react', 'alloy/typescript', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-underscore-dangle': 0,
    'no-template-curly-in-string': 0,
    'max-classes-per-file': ['error', 2], // https://cn.eslint.org/docs/rules/max-classes-per-file
    'max-params': ['error', 7],
    '@typescript-eslint/no-require-imports': 'off',
    'no-undef': 'off',
    'no-extend-native': 'off',
    'max-nested-callbacks': ['error', 5],
    complexity: ['error', 60],
    'prettier/prettier': 'error',
    '@typescript-eslint/consistent-type-assertions': 'off',
    'max-depth': [2, 10],
    'no-useless-call': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'no-async-promise-executor': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-param-reassign': 'off'
  }
};