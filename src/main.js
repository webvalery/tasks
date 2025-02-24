import '@/assets/styles/main.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './lib/router'

import { loadIcons } from '@/lib/utils/icons.js'
import validate from '@/lib/plugins/validate.js'
loadIcons()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(validate)

app.mount('#app')
