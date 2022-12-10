import { NIcon as Icon } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import UilTachometerFast from '~icons/uil/tachometer-fast'

import { RouteName } from '~/enum'
import HomeView from '~/views/home/index.vue'

import DashBoardView from '../views/dashboard'

export const routeForMenu: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    component: DashBoardView,
    name: RouteName.Dashboard,
    meta: {
      title: '仪表盘',
      icon: (
        <Icon>
          <UilTachometerFast />
        </Icon>
      ),
    },
  },
]

export const router = createRouter({
  history: __DEV__ ? createWebHistory() : createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
      name: RouteName.Home,
      redirect: '/dashboard',
      children: [...routeForMenu],
    },
    // {
    //   component: SetupLayout,
    //   path: '/',
    //   children: [
    //     {
    //       path: '/setup-api',
    //       meta: { isPublic: true, title: '设置接口地址' },
    //       component: () => import('../views/setup/setup-api'),
    //     },
    //     {
    //       path: '/login',
    //       name: RouteName.Login,
    //       meta: { isPublic: true, title: '登陆' },
    //       component: LoginView,
    //     },
    //   ],
    // },

    {
      path: '/:pathMatch(.*)*',
      name: '404',
      meta: { isPublic: true },
      redirect: '/',
    },
  ],
})
