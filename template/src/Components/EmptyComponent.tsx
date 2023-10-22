import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {CommonStyle} from '../Helpers/CommonStyle'
import Colors from '../Constants/Colors'
import {moderateScale} from '../Helpers/Responsive'
import {Fonts} from '../Constants/Fonts'

interface EmptyComponentProps {
  title?: string
}

const EmptyComponent = (props: EmptyComponentProps) => {
  return (
    <View style={[CommonStyle.flex, CommonStyle.centerItem]}>
      <Text style={styles.textStyle}>{props?.title}</Text>
    </View>
  )
}

export default EmptyComponent
const styles = StyleSheet.create({
  textStyle: {
    color: Colors.black,
    fontSize: moderateScale(15),
    fontFamily: Fonts.ThemeBold
  }
})
