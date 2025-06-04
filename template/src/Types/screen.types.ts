import type {RouteProp} from '@react-navigation/native'

import type {RootStackParamList} from './types'

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>
