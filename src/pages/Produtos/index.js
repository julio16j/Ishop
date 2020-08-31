import React, {useState} from 'react'
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'
import RenderCondicional from '../../components/RenderCondicional'
import styles from './styles'
export default function () {
  const [produtos, setProdutos] = useState([
    { titulo: 'Leite Quente', valorUnitario: 10 },
    { titulo: 'Achocolatado', valorUnitario: 8.50},
    { titulo: 'Manteiga', valorUnitario: 3.50}])
  return (
    <View style={styles.container}>
      <View style={styles.nav} >
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={21} />
        </TouchableOpacity>
        <Text style={styles.navTitle} >Produtos</Text>
      </View>
      <View style={styles.itensContainer}>
          <FlatList data={produtos} numColumns={2} renderItem={(item) => {
            return (
              <TouchableOpacity style={[styles.card]}>
                <View style={styles.item}>
                  <RenderCondicional
                    condicao={item.item.imagemId}
                    funcao1={<Image source={item.item.imagemId} style={styles.itemImg} />}
                    funcao2={<View style={styles.itemImg} />}
                  />
                  <View style={styles.itemFooter}>
                    <Text style={styles.cardText}>{item.item.titulo}</Text>
                    <Text style={styles.itemCost}>
                      R$ {item.item.valorUnitario}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}/>
      </View>
    </View>
  )
}