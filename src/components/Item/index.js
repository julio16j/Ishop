import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

export default function Item({ item }) {
  return (
    <View style={styles.item}>
      <View style={styles.esquerda}>
        <Text style={styles.info}>{item.quantidade}</Text>
        <Text style={styles.valor}>{item.titulo}</Text>
      </View>
      <View style={styles.esquerda}>
        <Text style={styles.valor}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(item.quantidade * item.valorUnitario)}</Text>
      </View>
    </View>
  )
}
