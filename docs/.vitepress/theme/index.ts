import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import JyUI from 'jy-ui'
import ExampleDemo from '../components/Demo.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(JyUI)
    app.component('ExampleDemo', ExampleDemo)
  },
} as Theme
