import {StyleSheet} from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Screens from '../Constants/Screens'
const Stack = createNativeStackNavigator()

const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Screens.HomeScreen} component={HomeNavigation} />
    </Stack.Navigator>
  )
}

export default HomeNavigation

const styles = StyleSheet.create({})
