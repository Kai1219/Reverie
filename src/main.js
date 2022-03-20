import { createApp } from 'vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { date, currency } from './methods/filters'
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import App from './App.vue'
import router from './router'

/* 載入所有表單規則 */
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

/* Activate the locale設定與驗證的方式 */
configure({
  generateMessage: localize({ zh_TW: zhTW }) /* 語系設定 */,
  validateOnInput: true /* 調整為輸入字元立即進行驗證 */
})

/* 設定預設語系 */
setLocale('zh_TW')

const app = createApp(App)
app.config.globalProperties.$filters = {
  date,
  currency
}
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
