import React from 'react'
import { View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useRoute, useNavigation } from '@react-navigation/native'
import styles from './styles'
export default function ProdutoDetail () {
  const navigation = useNavigation()
  const route = useRoute()
  return (
    <View style={styles.container} >
      <View style={styles.nav} >
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={21} />
        </TouchableOpacity>
        <Text style={styles.navTitle} >Produtos</Text>
      </View>
    </View>
  )
}