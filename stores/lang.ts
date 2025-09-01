import { defineStore } from 'pinia'

export const useLangStore = defineStore('lang', () => {
  const langId = ref(0)
  const langName = ref('English')

  function resetLang() {
    langId.value = 0
    langName.value = 'English'
  }

  return {
    langId,
    langName,
    resetLang
  }
})
