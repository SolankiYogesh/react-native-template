import {StyleSheet, Text} from 'react-native'
import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Screens from '../Constants/Screens'
import LoginScreen from '../Screens/Auth/LoginScreen/LoginScreen'
import HomeNavigation from './HomeNavigation'
import AuthNavigation from './AuthNavigation'
const Stack = createNativeStackNavigator()
const AppNavigation = () => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen name={Screens.Auth} component={AuthNavigation} />
        <Stack.Screen name={Screens.Home} component={HomeNavigation} />
      </Stack.Navigator>
    </SafeAreaProvider>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})
