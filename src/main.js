import { createApp } from 'vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { date, currency } from './methods/filters'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.globalProperties.$filters = {
  date,
  currency
}
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
