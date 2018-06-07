import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Chinese from './chinese'
import English from './english'
import Spanish from './spanish'

Vue.use(VueI18n)

const language = localStorage.getItem('ELEMENT_LANGUAGE') ? localStorage.getItem('ELEMENT_LANGUAGE') : 'zh'

export default new VueI18n({
  locale: language,
  fallbackLocale: language,
  messages: {
    zh: Chinese,
    en: English,
    mx: Spanish
  }
})
