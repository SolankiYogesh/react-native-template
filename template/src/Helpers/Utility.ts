import NetInfo from '@react-native-community/netinfo'
import _ from 'lodash'

const deepClone = (val: any) => {
  return _.cloneDeep(val)
}

const wait = (seconds = 1000): Promise<void> => {
  return new Promise((resolve: () => void) => {
    setTimeout(resolve, seconds)
  })
}

const isInternet = () => {
  return new Promise<boolean>(async (resolve) => {
    try {
      const response = await NetInfo.fetch()
      if (response.isConnected) {
        resolve(true)
      } else {
        // Utility.showAlert('No Internet Connection')
        resolve(false)
      }
    } catch (error) {
      // Utility.showAlert('No Internet Connection')
      resolve(false)
    }
  })
}

const isValidEmail = (value: string) => {
  const reg = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
  return !value.trim() || !reg.test(value.trim())
}

const secondsToMMSS = (seconds: number) => {
  return new Date(seconds * 1000).toISOString().substring(14, 19)
}

const isEmpty = (value: string) => {
  return Boolean(value && _.trim(value))
}

const Utility = {
  deepClone,
  secondsToMMSS,
  isEmpty,
  isInternet,
  wait
}

export default Utility
