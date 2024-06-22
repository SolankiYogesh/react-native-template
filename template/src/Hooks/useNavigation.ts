import {useNavigation as useNative} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

function useNavigation() {
  return useNative<NativeStackNavigationProp<RootStackParamList>>()
}
export default useNavigation
