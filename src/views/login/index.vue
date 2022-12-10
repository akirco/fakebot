<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import Avatar from '../../components/avatar/index.vue'
import ParallaxButtonVue from '../../components/button/parallax-button.vue'
import { useStoreRef } from '../../hooks/use-store-ref'
import type { UserModel } from '../../models/user'
import { configs } from '../../settings'
import { useUserStore } from '../../stores/auth/user'
import { RESTManager } from '../../utils/rest'

const bgUrl = configs.loginBg
export const LoginView = defineComponent({
  components: { Avatar, ParallaxButtonVue },
  setup() {
    const loaded = ref(false)
    const { user, updateToken } = useStoreRef(useUserStore)
    const router = useRouter()
    const input = ref<HTMLInputElement>(null!)
    onMounted(() => {
      const $$ = new Image()
      $$.src = bgUrl
      $$.onload = () => {
        loaded.value = true
      }
      input.value.focus()

      document.onkeydown = () => {
        input.value.focus()
      }
    })

    onUnmounted(() => {
      document.onkeydown = null
    })

    const toast = useMessage()

    const password = ref('')

    const handleLogin = async () => {
      try {
        if (!user.value || !user.value.username) {
          toast.error('主人信息无法获取')
          return
        }
        const res = await RESTManager.api.mock.login.post<{
          data: {
            refreshToken: string
            token: string
          } & UserModel
        }>({
          data: {
            username: user.value?.username,
            password: password.value,
          },
        })
        console.log(res)

        updateToken(res.data.token)
        router.push('/dashboard')
        toast.success('欢迎回来')
      } catch (e) {
        toast.error('登陆失败')
      }
    }

    return {
      // bgUrl: loaded.value ? bgUrl : '',
      bgUrl,
      loaded,
      user,
      password,
      handleLogin,
      input,
    }
  },
})

export default LoginView
</script>

<template>
  <div class="wrapper">
    <Avatar :src="user?.avatar as string" :size="80" />
    <form action="#" @submit.prevent="handleLogin">
      <div class="input-wrap">
        <input ref="input" v-model="password" type="password" autofocus />
      </div>
      <ParallaxButtonVue
        title="登录"
        class="p-button-raised p-button-rounded"
        @click="handleLogin"
      />
    </form>
  </div>
</template>

<style scoped="">
@import './index.css';
</style>
