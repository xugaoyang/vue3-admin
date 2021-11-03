import { createApp } from 'vue'
import router from './router'
import store from './store'
import './assets/styles/index.css'
import './styles/element/index.scss'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import { Setting, Sunny, Moon } from '@element-plus/icons'
import App from './App.vue'




const app = createApp(App)
app.component('setting', Setting)
app.component('sunny', Sunny)
app.component('moon', Moon)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
