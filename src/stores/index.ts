import { useUserStore } from './auth/user'
import { useThemeStore } from './theme'
import { useUIStore } from './ui'

;([useUserStore, useUIStore, useThemeStore] as const).forEach((store) => {
  if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot))
})

export const piniaStore = createPinia()
