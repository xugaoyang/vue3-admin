import { createApp } from 'vue'
import router from './router'
import './assets/styles/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { Setting } from '@element-plus/icons'
import App from './App.vue'




const app = createApp(App)
app.component('setting', Setting)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
