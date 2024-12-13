import { createApp } from 'vue'
import App from './App.vue'

import jyUI from 'jy-ui'
console.log('🚀 ~ jyUI:', jyUI)

const app = createApp(App)
app.use(jyUI).mount('#app')
