import { createApp } from 'vue'
import App from './App.vue'
import ChengUI from '../../packages/index'
import ChenUIcon from '../../packages/icons.js'
import '../../packages/themes/src/index.scss'

const app = createApp(App)
app.use(ChengUI)
app.use(ChenUIcon)
app.mount('#app')
