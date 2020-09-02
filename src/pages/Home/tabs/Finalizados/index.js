import React from 'react'
import {View, Text} from 'react-native'
import Header from '../../../../components/header'
import styles from './styles'

export default function Finalizados() {
  return (
    <View style={styles.container}>
        <Header />
        <Text >
         Finalizados
        </Text>
    </View>
  )
}