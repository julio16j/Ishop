import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import styles from '../../styles'
import { pedidosConfirmados } from '../../../../services/pedido'
import store from '../../../../store'
import Pedido from '../../../../components/Pedido'
import RenderCondicional from '../../../../components/RenderCondicional'
import Header from '../../../../components/header'
import { useNavigation } from '@react-navigation/native'
export default function Disponiveis() {
  const [pedidos, setPedidos] = useState([])
  const navigation = useNavigation()
  const token = store.getState().user.token

  async function catchPedidos() {
    try {
      setPedidos(await pedidosConfirmados(token))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    try {
      catchPedidos()
    } catch (error) {
      console.log(error)
    }
    setInterval(catchPedidos, 1000)
  }, [])

  function detalhar(pedido) {
    navigation.navigate('pedidoDetail', {pedido})
  }

  return (
    <View style={styles.container}>
      <Header />
      <RenderCondicional
        condicao={pedidos.length > 0}
        funcao1={
          <FlatList
            showsVerticalScrollIndicator={false}
            data={pedidos}
            renderItem={pedido => {
              return (<Pedido pedido={pedido.item} token={token} detalhar={detalhar} />)
            }}
            keyExtractor={(pedido) => pedido.pedidoId}
          />
        }
        funcao2={
          <Text style={{ fontSize: 19, fontWeight: "bold", alignSelf: "center", marginBottom: 100 }}>
            Não temos pedidos confirmados.
            </Text>
        }
      />
    </View>
  )
}