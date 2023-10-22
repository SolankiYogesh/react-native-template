import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react'
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native'
import ReactNativeModal from 'react-native-modal'

import Loader from './Loader'
import {CommonStyle} from '../Helpers/CommonStyle'
import Colors from '../Constants/Colors'
import {moderateScale, verticalScale} from '../Helpers/Responsive'

const AppLoader = forwardRef((props, ref) => {
  const [isVisible, setISVisible] = useState(false)
  const isCallBackRef = useRef(false)
  const {height} = Dimensions.get('screen')

  useImperativeHandle(ref, () => ({
    showLoader(state: boolean, isCallBack = false) {
      setISVisible(state)
      isCallBackRef.current = isCallBack
    }
  }))

  return (
    <ReactNativeModal
      statusBarTranslucent
      onModalHide={() => {
        if (Loader?.onModalHideCallback && isCallBackRef.current) {
          Loader?.onModalHideCallback()
        }
      }}
      isVisible={isVisible}
      deviceHeight={height}
      animationInTiming={300}
      animationOutTiming={300}
      style={[CommonStyle.modalStyle, CommonStyle.centerItem]}
    >
      <View style={styles.contianer}>
        <ActivityIndicator size={'large'} color={Colors.ThemeColor} />
      </View>
    </ReactNativeModal>
  )
})

export default AppLoader

const styles = StyleSheet.create({
  contianer: {
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
  }
})
