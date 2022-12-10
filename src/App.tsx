import type { GlobalThemeOverrides } from 'naive-ui'
import {
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
  dateZhCN,
  useMessage,
  useNotification,
  zhCN,
} from 'naive-ui'
import { defineComponent, onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { configs } from '~/settings'

import { useStoreRef } from './hooks/use-store-ref'
import { useUserStore } from './stores/auth/user'
import { useThemeStore } from './stores/theme'

const Root = defineComponent({
  name: 'HomeView',

  setup() {
    const { fetchUser } = useStoreRef(useUserStore)
    const { initThemeSettings } = useStoreRef(useThemeStore)
    onMounted(() => {
      window.message = useMessage()
      window.notification = useNotification()
      fetchUser()
      initThemeSettings()
    })

    return () => {
      return <RouterView />
    }
  },
})

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: configs.colors.primary.default ?? '#1a9cf3',
    primaryColorHover: configs.colors.primary.shallow ?? '#16aae7',
    primaryColorPressed: configs.colors.primary.deep ?? '#1188e8',
    primaryColorSuppl: configs.colors.primary.suppl ?? '#2980b9',
  },
}

const App = defineComponent({
  setup() {
    return () => (
      <NConfigProvider
        locale={zhCN}
        dateLocale={dateZhCN}
        themeOverrides={themeOverrides}
      >
        <NNotificationProvider>
          <NMessageProvider>
            <NDialogProvider>
              <Root />
            </NDialogProvider>
          </NMessageProvider>
        </NNotificationProvider>
      </NConfigProvider>
    )
  },
})

export default App
