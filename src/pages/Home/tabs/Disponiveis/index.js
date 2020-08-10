import React, {useState, useEffect} from 'react'
import {View, Text, TouchableWithoutFeedbackComponent, FlatList} from 'react-native'
import styles from './styles'
import {pedidosFechados} from '../../../../services/pedido'
import store from '../../../../store'
import Pedido from '../../../../components/Pedido'
export default function Disponiveis() {
  const [pedidos, setPedidos] = useState(null)
  const token = store.getState().user.token
  useEffect( () => {
    async function catchPedidos () {
      try {
        setPedidos(await pedidosFechados(token))        
      }catch (error) {
        console.log(error)
      }
    }
    catchPedidos()
    }, [])
  return (
      <View style={styles.container}>
        { pedidos !== null &&
          <FlatList
          data={pedidos}
          renderItem= {pedido => {
            return (<Pedido pedido={pedido.item} />)
            }}
          keyExtractor={(pedido)=>pedido.pedidoId}
          />
        }
    </View>
  )
}