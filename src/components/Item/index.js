import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles'
export default function Item({item}) {
  return (
    <View style={styles.item}>
      <View style={styles.esquerda}>
        <Text>{item.quantidade}</Text>
        <Text>{item.titulo}</Text>
      </View>
      <Text>{item.quantidade * item.valorUnitario}</Text>
    </View>
  )
}