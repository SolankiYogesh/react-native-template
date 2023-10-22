import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native'
import Colors from '../Constants/Colors'

interface AppContainerProps {
  isTopSafeArea?: boolean
  isBottomSafeArea?: boolean
  bottomStyle?: StyleProp<ViewStyle>
  topStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  barStyle?: StatusBarStyle
  translucent?: boolean
  statusbarColor?: string
}

const AppContainer = (props: AppContainerProps) => {
  const {
    isTopSafeArea,
    isBottomSafeArea,
    bottomStyle = {},
    barStyle = 'dark-content',
    topStyle = {},
    style,
    children,
    translucent = false,
    statusbarColor = Colors.white
  } = props
  const TopComponent = isTopSafeArea ? SafeAreaView : View
  const BottomComponent = isBottomSafeArea ? SafeAreaView : View
  return (
    <View style={[styles.container, style]}>
      <StatusBar translucent={translucent} backgroundColor={statusbarColor} barStyle={barStyle} />
      <TopComponent style={topStyle} />
      <View style={styles.container}>{children}</View>
      <BottomComponent style={bottomStyle} />
    </View>
  )
}

export default AppContainer

AppContainer.defaultProps = {
  isTopSafeArea: true,
  isBottomSafeArea: false,
  statusBarColor: Colors.white,
  isLightStatusBar: true,
  topStyle: {
    backgroundColor: Colors.white
  },
  bottomStyle: {
    backgroundColor: Colors.white
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  }
})
