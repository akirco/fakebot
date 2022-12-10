import type { RouteRecordRaw } from 'vue-router'

declare namespace RouteType {
  // RootRouteKey
  type RootRouteKey = RouteKey.Root
  // ExceptionRouteKey
  type ExceptionRouteKey = RouteKey.Exception
  // CommonRouteKey
  type CommonRouteKey = RouteKey.Common
  // AuthRouteKey
  type AuthRouteKey = RouteKey.Auth
  // AllRouteKey
  type AllRouteKey =
    | RootRouteKey
    | ExceptionRouteKey
    | CommonRouteKey
    | AuthRouteKey
  // rootPath
  type RootRoutePath = '/'
  // exceptionPath
  type ExceptionRoutePath = '/:pathMatch(.*)*'
  // all route path
  type AllRoutePath<K extends AllRouteKey = AllRouteKey> =
    AuthRouteUtils.GetRoutePath<K>
  // all component
  type RouteComponentType = ''

  // interface routeMETA
  interface RouteMeta {
    title: string
    requiresAuth?: boolean
    permissions?: Auth.RoleType[]
    keepAlive?: boolean
    icon?: string
    hidden?: boolean
    order?: number
    activeMenu?: AuthRouteKey
  }
  type Route<K extends AllRouteKey = AllRouteKey> = K extends AllRouteKey
    ? {
        /** 路由名称(路由唯一标识) */
        name: K
        /** 路由路径 */
        path: AuthRouteUtils.GetRoutePath<K>
        /** 路由重定向 */
        redirect?: AuthRouteUtils.GetRoutePath

        component?: RouteComponentType
        /** 子路由 */
        children?: Route[]
        /** 路由描述 */
        meta: RouteMeta
      } & Omit<
        RouteRecordRaw,
        'name' | 'path' | 'redirect' | 'component' | 'children' | 'meta'
      >
    : never
}

declare namespace AuthRouteUtils {
  /** 路由key层级分割符 */
  type RouteKeySplitMark = '_'

  /** 路由path层级分割符 */
  type RoutePathSplitMark = '/'
}
