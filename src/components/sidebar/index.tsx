import { API_URL } from 'constants/env'
import { NIcon as Icon, NLayoutContent } from 'naive-ui'
import type { PropType } from 'vue'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Hamburger from '~icons/material-symbols/menu'

import { useStoreRef } from '~/hooks/use-store-ref'
import { configs } from '~/settings'
import { useUserStore } from '~/stores/auth/user'

import type { MenuModel } from '../../utils/build-menus'
import { buildMenus } from '../../utils/build-menus'
import { Avatar } from '../avatar'
import styles from './index.module.css'

console.log(API_URL)

export const Sidebar = defineComponent({
  name: 'SidebarComp',
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    onCollapseChange: {
      type: Function as PropType<{ (status: boolean): void }>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    const { user } = useStoreRef(useUserStore)
    const route = computed(() => router.currentRoute.value)
    const menus = ref<MenuModel[]>([])
    onMounted(() => {
      // @ts-expect-error
      menus.value = buildMenus(router.getRoutes())
    })

    const _index = ref(0)

    function updateIndex(index: number) {
      if (index === _index.value) {
        _index.value = -1
        return
      }
      _index.value = index
    }

    function handleRoute(item: MenuModel, index?: number) {
      if (item.subItems?.length) {
        console.log(item.fullPath)
      } else {
        router.push({
          path: item.fullPath,
          query: item.query,
        })
        if (index) {
          updateIndex(index)
        }
      }
    }

    const title = configs.title

    return () => (
      <div
        class={[styles['root'], props.collapse ? styles['collapse'] : null]}
        style={{
          width: !props.collapse && props.width ? `${props.width}px` : '',
        }}
      >
        <div
          class={`fixed left-0 top-0 h-screen overflow-hidden z-10 text-white ${styles['sidebar']}`}
        >
          <div class={'title relative font-medium text-center text-2xl'}>
            <h1 class="py-6" style={{ display: props.collapse ? 'none' : '' }}>
              {title}
            </h1>
            <button
              class={styles['collapse-button']}
              onClick={() => {
                props.onCollapseChange?.(!props.collapse)
              }}
            >
              <Icon>
                <Hamburger />
              </Icon>
            </button>
          </div>

          <NLayoutContent class={styles['menu']} nativeScrollbar={false}>
            <div class={styles['items']}>
              {menus.value.map((item, index) => {
                return (
                  <div
                    class={[
                      'py-2',
                      route.value.fullPath === item.fullPath ||
                      route.value.fullPath.startsWith(item.fullPath)
                        ? styles['active']
                        : '',

                      styles['item'],
                    ]}
                    data-path={item.fullPath}
                  >
                    <button
                      key={item.title}
                      class={'py-2 flex w-full items-center'}
                      onClick={
                        item.subItems?.length
                          ? () => updateIndex(index)
                          : () => handleRoute(item, index)
                      }
                    >
                      <span
                        style={{ flexBasis: '3rem' }}
                        class="flex justify-center"
                      >
                        {item.icon}
                      </span>
                      <span class={styles['item-title']}>{item.title}</span>
                    </button>
                    {item.subItems && (
                      <ul
                        class={[
                          `overflow-hidden  ${
                            item.subItems.length ? styles['has-child'] : ''
                          }`,
                          _index.value === index ? styles['expand'] : '',
                        ]}
                        style={{
                          maxHeight:
                            _index.value === index
                              ? `${item.subItems.length * 3.5}rem`
                              : '0',
                        }}
                      >
                        {item.subItems.map((child) => {
                          return (
                            <li
                              key={child.path}
                              // data-fullPath={child.fullPath}
                              class={[
                                route.value.fullPath === child.fullPath ||
                                route.value.fullPath.startsWith(child.fullPath)
                                  ? styles['active']
                                  : '',
                                styles['item'],
                              ]}
                            >
                              <button
                                onClick={() => handleRoute(child)}
                                class={'flex w-full items-center py-4'}
                              >
                                <span
                                  class="flex justify-center items-center"
                                  style={{ flexBasis: '3rem' }}
                                >
                                  {child.icon}
                                </span>
                                <span class={styles['item-title']}>
                                  {child.title}
                                </span>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          </NLayoutContent>

          <button
            class={[
              'bottom-bar flex space-x-2 items-center  transform translate-y-1/3 phone:hidden',
              props.collapse ? 'px-8' : 'px-12',
            ]}
            onClick={() => {
              window.open(API_URL)
            }}
          >
            <Avatar src={user.value?.avatar as string} size={40} />
            {!props.collapse ? (
              <span class="pl-12">{user.value?.name}</span>
            ) : null}
          </button>
          <button
            class="hidden phone:flex w-full items-center justify-center absolute bottom-0 pb-4"
            onClick={() => {
              window.open(API_URL)
            }}
          >
            <Avatar src={user.value?.avatar as string} size={40} />
          </button>
        </div>
      </div>
    )
  },
})
