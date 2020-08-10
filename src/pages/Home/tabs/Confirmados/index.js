import React, {useState, useEffect} from 'react'
import {View, Text, TouchableWithoutFeedbackComponent, FlatList} from 'react-native'
import styles from './styles'
import {pedidosConfirmados} from '../../../../services/pedido'
import store from '../../../../store'
import Pedido from '../../../../components/Pedido'
export default function Disponiveis() {
  const [pedidos, setPedidos] = useState(null)
  const token = store.getState().user.token
  const [loading, setLoading] = useState(false)

  async function catchPedidos () {
    try {
      setLoading(true)
      setPedidos(await pedidosConfirmados(token))        
    }catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }
  useEffect( () => {
    catchPedidos()
    }, [])
  
  
  
  return (
      <View style={styles.container}>
        { pedidos !== null &&
          <FlatList
          data={pedidos}
          renderItem= {pedido => {
            return (<Pedido pedido={pedido.item} token={token} />)
          }}
          keyExtractor={(pedido)=>pedido.pedidoId}
          />
        }
    </View>
  )
}