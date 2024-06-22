import {StyleSheet} from 'react-native'

import Colors from './Colors'

export default StyleSheet.create({
  centerFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black
  },
  flex: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
