module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-console': ['error', { allow: ['error'] }],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    'react/prop-types': ['off', { ignore: ['children'] }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    'no-warning-comments': [
      'error',
      { terms: ['todo', 'fixme'], location: 'anywhere' },
    ],
  },
  overrides: [
    {
      files: ['gatsby-config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
