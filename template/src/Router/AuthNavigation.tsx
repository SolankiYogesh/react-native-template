import {StyleSheet} from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Screens from '../Constants/Screens'
import LoginScreen from '../Screens/Auth/LoginScreen/LoginScreen'
const Stack = createNativeStackNavigator()

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Screens.LoginScreen} component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigation

const styles = StyleSheet.create({})
