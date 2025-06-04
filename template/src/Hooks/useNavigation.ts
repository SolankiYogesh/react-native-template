import {useNavigation as useNative} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Types';

export default () => useNative<NativeStackNavigationProp<RootStackParamList>>();
