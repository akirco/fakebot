import { decrypto, encrypto } from '../crypto'

interface StorageData<T> {
  val: T
  expires: number | null
}

const Storage = <T extends StorageInterface.Local>() => {
  const Expires_TIME = 60 * 60 * 24 * 7
  function set<K extends keyof T>(
    key: K,
    val: T[K],
    expires: number | null = Expires_TIME,
  ) {
    const data: StorageData<T[K]> = {
      val,
      expires: expires !== null ? new Date().getTime() + expires * 1000 : null,
    }
    localStorage.setItem(key as string, encrypto(data))
  }
  function get<K extends keyof T>(key: K) {
    const cipherText = localStorage.getItem(key as string)
    let originalData = null
    if (cipherText) {
      try {
        originalData = decrypto(cipherText)
      } catch (error) {
        console.error(error)
      }
      if (originalData) {
        const { val, expires } = originalData
        if (expires === null || expires > Date.now()) {
          return val
        }
      }
      remove(key)
      return null
    }
    return null
  }
  function remove(key: keyof T) {
    localStorage.removeItem(key as string)
  }
  function clear() {
    localStorage.clear()
  }
  return {
    set,
    get,
    remove,
    clear,
  }
}
export const lsg = Storage()
