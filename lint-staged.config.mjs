/**  @type {import('lint-staged').Config} */
export default {
  '*.{vue,js,ts,jsx,tsx,md,json}': ['prettier --write'],
  '*.{vue,js,ts,jsx,tsx}': ['eslint --fix'],
  '*.{scss,html}': ['stylelint --fix --allow-empty-input'],
}
