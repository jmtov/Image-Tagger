import globals from 'globals';
import pluginJS from '@eslint/js';
import pluginTSLint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginStylistic from '@stylistic/eslint-plugin-js';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJS.configs.recommended,
  // eslint-disable-next-line import/no-named-as-default-member
  ...pluginTSLint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginImport.flatConfigs.recommended,
  pluginJsxA11y.flatConfigs.recommended,
  pluginPrettierRecommended,
  pluginImport.configs.typescript,
  {
    plugins: {
      '@stylistic/js': pluginStylistic,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array',
          readonly: 'array',
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'error',
      '@/brace-style': ['error'],
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@/keyword-spacing': ['error'],
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignore: [0, 1, -1, 2],
          ignoreEnums: true,
        },
      ],
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'brace-style': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'import/default': 'error',
      'import/export': 'error',
      'import/extensions': [
        'error',
        'never',
        {
          js: 'never',
          svg: 'always',
          scss: 'always',
          png: 'always',
          css: 'always',
          json: 'always',
        },
      ],
      'import/first': 'error',
      'import/no-absolute-path': 'error',
      'import/no-extraneous-dependencies': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-named-as-default-member': 'error',
      'import/no-named-as-default': 'error',
      'import/no-named-default': 'error',
      'import/no-self-import': 'error',
      'import/no-unresolved': 'off',
      'import/no-webpack-loader-syntax': 'error',
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: ['builtin', 'external', ['unknown', 'internal'], 'parent', 'sibling', 'index'],
        },
      ],
      'import/prefer-default-export': 'off',
      'jsx-a11y/anchor-is-valid': 'error',
      'linebreak-style': ['error', 'unix'],
      'max-len': [
        'error',
        {
          code: 100,
          ignoreTemplateLiterals: true,
          ignoreStrings: true,
          ignoreComments: true,
        },
      ],
      'no-array-constructor': 'off',
      'no-empty-function': 'off',
      'no-extra-parens': 'off',
      'no-magic-numbers': 'off',
      'no-mixed-operators': 'off',
      'no-shadow': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      'react/boolean-prop-naming': 'error',
      'react/forbid-dom-props': [
        'error',
        {
          forbid: ['style'],
        },
      ],
      'react/forbid-foreign-prop-types': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-child-element-spacing': 'error',
      'react/jsx-closing-bracket-location': 'error',
      'react/jsx-closing-tag-location': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
        },
      ],
      'react/jsx-curly-spacing': 'error',
      'react/jsx-equals-spacing': 'error',
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      'react/jsx-first-prop-new-line': 'error',
      'react/jsx-indent': ['error', 2],
      'react/jsx-key': 'error',
      'react/jsx-max-depth': [
        'error',
        {
          max: 6,
        },
      ],
      'react/jsx-no-bind': [
        'error',
        {
          allowArrowFunctions: true,
        },
      ],
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-pascal-case': 'error',
      'react/jsx-props-no-multi-spaces': 'error',
      'react/jsx-tag-spacing': [
        'error',
        {
          beforeClosing: 'never',
        },
      ],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: false,
          assignment: false,
        },
      ],
      'react/no-access-state-in-setstate': 'error',
      'react/no-array-index-key': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger': 'error',
      'react/no-deprecated': 'error',
      'react/no-did-mount-set-state': 'error',
      'react/no-did-update-set-state': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-multi-comp': 'error',
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'error',
      'react/no-this-in-sfc': 'error',
      'react/no-typos': 'error',
      'react/no-unescaped-entities': 'error',
      'react/no-unknown-property': 'error',
      'react/no-unsafe': 'error',
      'react/no-unused-state': 'error',
      'react/no-will-update-set-state': 'error',
      'react/prefer-es6-class': 'error',
      'react/prefer-stateless-function': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react/require-render-return': 'error',
      'react/self-closing-comp': 'error',
      'react/style-prop-object': 'error',
      'react/void-dom-elements-no-children': 'error',
      'spaced-comment': [
        'error',
        'always',
        {
          markers: ['/'],
        },
      ],
      indent: 'off',
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          singleQuote: true,
          jsxSingleQuote: false,
          trailingComma: 'all',
          bracketSpacing: true,
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    ignores: ['**/node_modules', 'node_modules'],
  },
];
