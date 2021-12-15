import { createApp } from 'vue'
import router from './router'
import store from './store'
import './assets/styles/index.scss'
import './styles/element/index.scss'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import './assets/theme/custom.scss'
import { Setting, Sunny, Moon } from '@element-plus/icons'
import i18n from './i18n'
import App from './App.vue'

const app = createApp(App)
app.component('setting', Setting)
app.component('sunny', Sunny)
app.component('moon', Moon)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
