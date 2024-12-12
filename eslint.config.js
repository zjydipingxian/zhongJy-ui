import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  { ignores: ['commitlint.config.cjs', 'scripts/'] },
  {
    rules: {
      'no-console': 'error',
      // 使用 TypeScript 的未使用变量规则
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
        },
      ],
      // 禁用原始的 no-unused-vars
      'no-unused-vars': 'off',
      // 不要在声明前就使用变量
      'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
      // 禁止使用未声明的变量
      'no-undef': 'off',
      // 禁止使用 alert
      'no-alert': 'error',
      // 不要出现空代码块
      'no-empty': 'error',
      // 不要出现空函数
      'no-empty-function': [
        'error',
        {
          allow: ['arrowFunctions', 'functions', 'methods'],
        },
      ],
      // 禁止使用不必要的代码块
      'no-lone-blocks': 'error',
      // 不要重复声明变量和函数
      'no-redeclare': 'error',
      // 禁止自我赋值
      'no-self-assign': 'error',
      // 箭头函数-函数体风格
      // @reason 允许灵活使用
      'arrow-body-style': [
        'off',
        'as-needed',
        {
          requireReturnForObjectLiteral: false,
        },
      ],

      // 箭头函数-函数参数始终加上小括号
      // @reason 同 prettier 默认配置值一致：https://prettier.io/docs/en/options.html#arrow-function-parentheses
      'arrow-parens': ['warn', 'always'],

      // 禁止标签与变量同名
      'no-label-var': 'error',

      semi: ['warn', 'never'],

      // 分号的前面无空格，后面有��格
      'semi-spacing': ['error', { before: false, after: true }],

      // 分号必须写在行尾
      // @unessential
      'semi-style': ['error', 'last'],
    },
  },
]
