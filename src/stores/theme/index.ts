import { defineStore } from 'pinia'

import { lsg } from '~/utils/storage'

export const useThemeStore = defineStore('theme', () => {
  const initThemeSettings = () => {
    const isProd = import.meta.env.PROD
    const storageTheme = lsg.get('themeSettings')
    if (isProd && storageTheme) {
      return storageTheme
    }
    // const theme = lsg.get('themeColor') || storageTheme.themeColor
  }
  return {
    initThemeSettings,
  }
})
