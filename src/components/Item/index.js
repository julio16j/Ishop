import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles'
export default function Item({item}) {
  return (
    <View style={styles.item}>
      <View style={styles.esquerda}>
        <Text style={{marginRight:3, fontWeight:"bold", color: "#BFBFBF"}}>{item.quantidade} </Text>
        <Text style={{color: "#BFBFBF"}}>{item.titulo}</Text>
      </View>
      <View style={{flexDirection:"row"}}>
        <Text style={{fontWeight:"bold",color:"#BFBFBF"}}>R$</Text>
        <Text style={{color:"#BFBFBF"}}>{item.quantidade * item.valorUnitario}</Text>
      </View>
    </View>
  )
}