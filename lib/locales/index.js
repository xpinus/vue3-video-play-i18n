import { createI18n } from 'vue-i18n'
import { ref, watch } from 'vue'
import zh from './zh-CN.json'
import en from './en.json'

const messages = {
  'zh-CN': zh,
  'en-US': en
}

export const i18n = createI18n({
  legacy: false, 
  locale: 'zh-CN',
  messages
})


export function useComponentI18n() {
  // 翻译函数
  const t = (key, params) => {
    return i18n.global.t(key, params)
  }
  
  // 切换语言
  const setLocale = (newLocale) => {
    i18n.global.locale.value = newLocale
  }

  // 获取当前语言
  function getLocale() {
    return i18n.global.locale.value
  }
  
  return {
    t,
    setLocale,
    getLocale
  }
}
