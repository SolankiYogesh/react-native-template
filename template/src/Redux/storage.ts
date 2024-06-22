import {MMKV} from 'react-native-mmkv'
import {Storage} from 'redux-persist'

const s = new MMKV()

const storage: Storage = {
  setItem: (key, value) => {
    s.set(key, value)
    return Promise.resolve(true)
  },
  getItem: (key) => {
    const value = s.getString(key)
    return Promise.resolve(value)
  },
  removeItem: (key) => {
    s.delete(key)
    return Promise.resolve()
  }
}
export default storage
