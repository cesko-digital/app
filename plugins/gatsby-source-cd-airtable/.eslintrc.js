module.exports = {
  extends: ['../../.eslintrc.js'],
  overrides: [
    {
      files: ['gatsby-node.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
