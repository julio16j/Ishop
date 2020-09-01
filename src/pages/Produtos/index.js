import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useRoute, useNavigation } from '@react-navigation/native'
import RenderCondicional from '../../components/RenderCondicional'
import styles from './styles'
export default function () {
  const navigation = useNavigation()
  const route = useRoute()
  const [pedidoAtual, setPedidoAtual] = useState({})
  const [produtos, setProdutos] = useState([
    { titulo: 'Leite Quente', descricao: 'lorem ipsum dolor', valorUnitario: 10 },
    { titulo: 'Achocolatado', descricao: 'lorem ipsum dolor', valorUnitario: 8.50},
    { titulo: 'Manteiga', descricao: 'lorem ipsum dolor', valorUnitario: 3.50}
  ])
  function navigateToProdutoDetail (produto) {
    navigation.navigate('produtoDetail', {pedido: pedidoAtual, produto})
  }
  useEffect(() => {
    if (route.params) {
      if (route.params.pedido) setPedidoAtual(route.params.pedido)
    }
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.nav} >
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={21} />
        </TouchableOpacity>
        <Text style={styles.navTitle} >Produtos</Text>
      </View>
      <View style={styles.itensContainer}>
          <FlatList data={produtos} numColumns={2} renderItem={(item) => {
            return (
              <TouchableOpacity style={[styles.card]} onPress={() => navigateToProdutoDetail(item.item)}>
                <View style={styles.item}>
                  <View style={styles.alignCenter}>
                    <RenderCondicional
                      condicao={item.item.imagemId}
                      funcao1={<Image source={item.item.imagemId} style={styles.itemImg} />}
                      funcao2={<View style={styles.itemImg} />}
                    />
                  </View>
                  <View style={styles.itemFooter}>
                    <View style={styles.alignCenter} >
                      <Text style={styles.cardTitle}>{item.item.titulo}</Text>
                    </View>
                    <Text style={styles.cardSubtitle}>{item.item.descricao}</Text>
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