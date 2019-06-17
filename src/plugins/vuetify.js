import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import en from '../locale/en'
import de from '../locale/de'

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: { en, de },
    current: 'en'
  }
})