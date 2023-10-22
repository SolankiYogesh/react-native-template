import React, {memo, useState} from 'react'
import {ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import FastImage, {ResizeMode} from 'react-native-fast-image'

import LoadingView from './LoadingView'
import {CommonStyle} from '../Helpers/CommonStyle'

export interface AppLoadingImageProps {
  url?: string
  imageStyle?: StyleProp<ImageStyle>
  style?: StyleProp<ViewStyle>
  isLoadingView?: boolean
  resizeMode?: ResizeMode
  borderRadius?: number
  isImageLocal?: boolean
}

const AppLoadingImage = (props: AppLoadingImageProps) => {
  const {imageStyle = {}, style = {}, url, resizeMode, isImageLocal = false} = props
  const [loading, setLoading] = useState(false)

  return (
    <View style={[CommonStyle.centerItem, style]}>
      <FastImage
        resizeMode={resizeMode || 'cover'}
        source={(isImageLocal ? url : {uri: url}) as any}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        style={[styles.image, imageStyle]}
      />
      {loading && <LoadingView style={StyleSheet.absoluteFill} />}
    </View>
  )
}

export default memo(AppLoadingImage)

AppLoadingImage.defaultProps = {
  url: '',
  imageStyle: {},
  style: {},
  isLoadingView: true,
  resizeMode: 'cover'
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  }
})
