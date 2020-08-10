import React, {useState, useEffect} from 'react'
import {View, Text, TouchableWithoutFeedbackComponent, FlatList} from 'react-native'
import styles from './styles'
import {pedidosFechados, confirmarPedido, rejeitarPedido} from '../../../../services/pedido'
import store from '../../../../store'
import Pedido from '../../../../components/Pedido'
import {successMessage, errorMessage} from '../../../../services/alerts'
export default function Disponiveis() {
  const [pedidos, setPedidos] = useState(null)
  const token = store.getState().user.token
  const [loading, setLoading] = useState(false)
  async function ConfirmarPedido(token, pedidoId) {
    setLoading(true)
    try {
      const response = await confirmarPedido(token, pedidoId)
      if (response.status === 200) {
        setPedidos(pedidos.filter(pedido => pedido.pedidoId !== response.data.pedidoId))
        successMessage('Perdido Confirmado')
      }
    } catch (err) {
      console.log(err)
      errorMessage('Erro ao Confirmar Pedido')
    } finally {
      setLoading(false)
    }
  }
  async function RejeitarPedido(token, pedidoId) {
    setLoading(true)
    try {
      const response = await rejeitarPedido(token, pedidoId)
      if (response.status === 200) {
        setPedidos(pedidos.filter(pedido => pedido.pedidoId !== response.data.pedidoId))
        sucessMessage('Perdido Rejeitado')
      }
    } catch {
      errorMessage('Erro ao Reijeitar Pedido')
    } finally {
      setLoading(false)
    }
  }
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
            return (<Pedido pedido={pedido.item} confirmar={ConfirmarPedido} rejeitar={RejeitarPedido} token={token} loading={loading} />)
          }}
          keyExtractor={(pedido)=>pedido.pedidoId}
          />
        }
    </View>
  )
}