declare namespace RouteKey {
  // root route key
  type Root = 'root'
  // not found route key
  type Exception = 'not-found' | '403' | '404' | '500'
  // common route key
  type Common = 'about' | 'login'
  // auth roue key
  type Auth = 'documents' | 'logout'
}
