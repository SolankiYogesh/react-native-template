import type {ReactNode} from 'react'
import {memo} from 'react'
import type {PressableProps, StyleProp, TextStyle, ViewStyle} from 'react-native'
import {Pressable, StyleSheet, Text} from 'react-native'
import type {XmlProps} from 'react-native-svg'
import {SvgFromXml} from 'react-native-svg'

import {moderateScale, scale, verticalScale} from '@/Helpers'
import Utility from '@/Helpers/Utility'
import {Colors, Fonts} from '@/Theme'

type AppButtonProps = {
  title?: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  leftImage?: XmlProps
  backgroundColor?: string
  rippleColor?: string
  hintText?: string
  hintTextStyle?: StyleProp<TextStyle>
  children?: ReactNode
} & Omit<PressableProps, 'style'>

export default memo(
  ({
    title,
    textStyle = {},
    style = {},
    disabled = false,
    leftImage,
    backgroundColor = Utility.hexadecimal(Colors.primary)(80),
    rippleColor = Utility.hexadecimal(Colors.primary)(90),
    hintText,
    hintTextStyle = {},
    children,
    ...rest
  }: AppButtonProps) => {
    return (
      <Pressable
        {...rest}
        disabled={disabled}
        android_ripple={{color: disabled ? Colors.transparent : rippleColor}}
        style={({pressed}) => [
          styles.container,
          {backgroundColor},
          disabled && styles.disabledStyle,
          pressed && styles.pressedStyle,
          style
        ]}
      >
        {!!leftImage?.xml && <SvgFromXml {...leftImage} />}
        {!!title && <Text style={[styles.textStyle, textStyle]}>{title}</Text>}
        {!!hintText && <Text style={[styles.hintStyle, hintTextStyle]}>{hintText}</Text>}
        {children}
      </Pressable>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: moderateScale(12),
    columnGap: scale(15),
    flexDirection: 'row',
    height: verticalScale(45),
    justifyContent: 'center',
    paddingHorizontal: scale(15)
  },
  disabledStyle: {
    backgroundColor: Colors.grayD1D1
  },
  hintStyle: {
    color: Colors.whiteShadeFAFB,
    fontFamily: Fonts.ThemeRegular,
    fontSize: moderateScale(12)
  },
  pressedStyle: {
    opacity: 0.85
  },
  textStyle: {
    color: Colors.white,
    fontFamily: Fonts.ThemeRegular,
    fontSize: moderateScale(15)
  }
})
