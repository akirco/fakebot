import AES from 'crypto-js/aes'
import Encoder from 'crypto-js/enc-utf8'

const CryptoSecret = '__CryptoJS_Secret__'

export const encrypto = (data: any) => {
  const val = JSON.stringify(data)
  return AES.encrypt(val, CryptoSecret).toString()
}

export const decrypto = (cipherText: string) => {
  const bytes = AES.decrypt(cipherText, CryptoSecret)
  const originalVal = bytes.toString(Encoder)
  if (originalVal) return JSON.parse(originalVal)
  return null
}
