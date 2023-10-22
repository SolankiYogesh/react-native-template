import {View, Text} from 'react-native'
import React from 'react'
import AppLoader from './src/Components/AppLoader'
import Loader from './src/Components/Loader'
import AppNavigation from './src/Router/AppNavigation'

const App = () => {
  return (
    <>
      <AppNavigation />
      <AppLoader ref={(ref) => Loader.setLoader(ref)} />
    </>
  )
}

export default App
