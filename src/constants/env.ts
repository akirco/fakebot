export const API_URL = (() => {
  const url =
    parseUrlencode(new URLSearchParams(location.search).get('__api')) ||
    localStorage.getItem('__api') ||
    window.injectData.BASE_API ||
    (import.meta.env.VITE_APP_BASE_API as string) ||
    ''

  return url.endsWith('/') ? url.slice(0, -1) : url
})()
export const bgUrl =
  window.injectData.LOGIN_BG ||
  (import.meta.env.VITE_APP_LOGIN_BG as string) ||
  localStorage.getItem('LOGIN_BG') ||
  'https://w.wallhaven.cc/full/o5/wallhaven-o5x9pp.png'

function parseUrlencode(url: string | null) {
  return url ? decodeURIComponent(url) : null
}
