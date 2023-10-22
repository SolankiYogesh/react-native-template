import {Platform} from 'react-native'
import {EventEmitter} from 'fbemitter'

// common variable
export const emitter = new EventEmitter()

const Plans = {
  Free: 'Free',
  Plus: 'Plus',
  Pro: 'Pro'
}

const isIOS = Platform.OS === 'ios'
const isAndroid = Platform.OS === 'android'
const isDebug = __DEV__

export default {
  Plans,
  isIOS,
  isDebug,
  isAndroid
}
