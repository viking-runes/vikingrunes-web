module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier', 'stylelint-order', 'stylelint-config-idiomatic-order'],
  customSyntax: 'postcss-less',

  ignoreFiles: ['./src/**/*.js'],
  rules: {
    indentation: 2,
    "font-family-no-missing-generic-family-keyword": null,
    'block-no-empty': null,
    'max-empty-lines': 1,
    'color-no-invalid-hex': [true, { message: 'color no invalid hex' }],
    'comment-no-empty': [true, { message: 'comment no empty' }],
    'no-extra-semicolons': true,
    'no-unknown-animations': true,
    'selector-max-empty-lines': 1,
    'block-closing-brace-empty-line-before': 'never',
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    "selector-class-pattern": null,
    "selector-pseudo-element-no-unknown": null,
    "alpha-value-notation": "number",
    "color-function-notation": "legacy",
    "no-descending-specificity": null,
    "selector-pseudo-class-no-unknown": [true, {
      ignorePseudoClasses: ["deep"]
    }],
    'function-no-unknown':null,
    "value-no-vendor-prefix": null
  },
};
