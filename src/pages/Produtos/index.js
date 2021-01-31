import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useRoute, useNavigation } from '@react-navigation/native'
import { listarItens } from '../../services/item'
import RenderCondicional from '../../components/RenderCondicional'
import store from '../../store'
import styles from './styles'
export default function () {
  const token = store.getState().user.token
  const navigation = useNavigation()
  const route = useRoute()
  const [pedidoAtual, setPedidoAtual] = useState({})
  const [produtos, setProdutos] = useState([])
  function navigateToProdutoDetail (produto) {
    navigation.navigate('produtoDetail', {pedido: pedidoAtual, produto})
  }
  async function listarItens () {
    try {
      const response = await listarItens(token)
      if (response.data && response.data.length > 0) {
        setProdutos(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (route.params) {
      if (route.params.pedido) setPedidoAtual(route.params.pedido)
    }
    listarItens()
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
              <TouchableOpacity style={styles.card} onPress={() => navigateToProdutoDetail(item.item)}>
                <View style={styles.item}>
                  <View style={styles.alignCenter}>
                    <RenderCondicional
                      condicao={item.item.imagemId}
                      funcao1={<Image source={item.item.imagemId} style={styles.itemImg} />}
                      funcao2={<View style={styles.itemImg} />}
                    />
                  </View>
                  <View style={styles.itemFooter}>
                    <View style={styles.header} >
                      <Text style={styles.cardTitle}>{item.item.titulo}</Text>
                    </View>
                    <Text style={styles.cardSubtitle}>{item.item.descricao}</Text>
                    <Text style={styles.itemCost}>
                      {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(item.item.valorUnitario)}
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