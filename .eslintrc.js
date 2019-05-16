module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    "ecmaVersion": 6,
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard',
    '@vue/standard',
    'plugin:vue/essential'
  ],
  globals: {
    __static: true
  },
  plugins: [
    "vue",
    'html'
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
