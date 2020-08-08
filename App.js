import React, {useEffect, useState} from 'react'
import { View } from 'react-native'
import Routes from './src/routes'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
export default function App() {
  const [isReady, setIsReady] = useState(false)
  async function getFonts() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
  }
  useEffect(() => {
    if(!isReady) getFonts().then(() => setIsReady(true))
  }, [])
  if(!isReady) return <AppLoading />
  return (
    <Routes />
  )
}