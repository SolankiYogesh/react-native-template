import {createMMKV} from 'react-native-mmkv'
import type {StateStorage} from 'zustand/middleware'

const storage = createMMKV({id: 'ProjectName'})

export const zustandStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    storage.set(name, value)
  },
  getItem: (name: string) => {
    return storage.getString(name) ?? null
  },
  removeItem: (name: string) => {
    storage.remove(name)
  }
}

export const AppStorageKeys = {TOKEN: '@token'}

export default storage
