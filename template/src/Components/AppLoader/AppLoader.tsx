import React, {forwardRef, useImperativeHandle, useRef} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'

import {moderateScale, verticalScale} from '@/Helpers/Responsive'
import {Colors, CommonStyle} from '@/Theme'

const AppLoader = forwardRef<AppLoaderRefType>((_, ref) => {
  const viewRef = useRef<View>(null)

  useImperativeHandle(ref, () => ({
    showLoader(state: boolean) {
      viewRef.current?.setNativeProps({
        style: {
          display: state ? 'flex' : 'none'
        }
      })
    }
  }))

  return (
    <View ref={viewRef} style={styles.modalStyle}>
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={Colors.blue} />
      </View>
    </View>
  )
})

export default AppLoader

const styles = StyleSheet.create({
  container: {
    width: verticalScale(100),
    height: verticalScale(100),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  modalStyle: {
    backgroundColor: Colors.backdrop,
    ...StyleSheet.absoluteFillObject,
    ...CommonStyle.centerFlex,
    display: 'none',
    zIndex: 999999999999999
  }
})
