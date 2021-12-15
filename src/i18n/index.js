import { createI18n } from 'vue-i18n'
import enLocale from './en'
import zhCnLocale from './zh-cn'
import enElement from 'element-plus/lib/locale/lang/en'
import zhCnElement from 'element-plus/lib/locale/lang/zh-cn'

const messages = {
  en: {
    ...enLocale,
    ...enElement,
  },
  'zh-cn': {
    ...zhCnLocale,
    ...zhCnElement,
  },
}
const i18n = createI18n({
  locale: 'zh-cn',
  messages,
})

export default i18n
