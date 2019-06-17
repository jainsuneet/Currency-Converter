import Vue from 'vue'
import './plugins/vuetify'
import './stylus/main.styl'
import App from './App.vue'
import CurrencyBadge from 'vue-currency-symbol'

Vue.config.productionTip = false
Vue.use(CurrencyBadge)

new Vue({
  render: h => h(App),
}).$mount('#app')
