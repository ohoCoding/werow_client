module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
      'airbnb',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:prettier/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
  ],
  rules: {
      'linebreak-style': 0,
      'import/prefer-default-export': 0,
      'prettier/prettier': 0,
      'import/extensions': 0,
      'no-use-before-define': 0,
      'import/no-unresolved': 0,
      'import/no-extraneous-dependencies': 0,
      'no-shadow': 0,
      'react/prop-types': 0,
      'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'prefer-destructuring': ['error', { object: true, array: false }],
      'jsx-a11y/no-noninteractive-element-interactions': 0,
      'react/jsx-props-no-spreading': 'off',
      'react/no-array-index-key': 'off',
      'no-underscore-dangle': 'off',
      'no-param-reassign': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'no-useless-return': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'func-names': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/self-closing-comp': 'off',
      'no-unneeded-ternary': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/mouse-events-have-key-events': 'off',
      radix: 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'react/destructuring-assignment': 'off',
  },
};