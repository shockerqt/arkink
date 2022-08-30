// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:jest-dom/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'block-spacing': 'warn',
    'brace-style': ['warn', '1tbs'],
    'camelcase': ['warn', { 'properties': 'always' }],
    'comma-dangle': ['warn', 'always-multiline'],
    'comma-spacing': 'warn',
    'comma-style': 'warn',
    'eol-last': 'warn',
    'indent': ['error', 2],
    'jsx-quotes': 'warn',
    'key-spacing': 'warn',
    'keyword-spacing': 'warn',
    'no-await-in-loop': 'error',
    'no-console': 'warn',
    'no-trailing-spaces': 'warn',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'semi-spacing': 'warn',
    'semi-style': 'warn',
    'sort-vars': 'warn',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'rest-spread-spacing': 'error',
    'template-curly-spacing': 'warn',
    'object-shorthand': 'warn',
    'no-useless-rename': 'warn',
    'prefer-arrow-callback': 'warn',
    'no-duplicate-imports': 'error',
    'arrow-spacing': 'warn',
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'class-methods-use-this': 'error',
    'consistent-return': 'error',
    'dot-location': 'error',
    'dot-notation': 'error',
    'eqeqeq': 'error',
    'guard-for-in': 'error',
    'no-multi-spaces': 'warn',
  },
};
