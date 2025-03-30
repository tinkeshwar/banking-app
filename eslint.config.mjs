import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'no-any': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
})