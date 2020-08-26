import React, {useState, useEffect} from 'react'
import {View, Text, TouchableWithoutFeedbackComponent, FlatList} from 'react-native'
import styles from './styles'
import {pedidosFechados, confirmarPedido, rejeitarPedido} from '../../../../services/pedido'
import store from '../../../../store'
import Pedido from '../../../../components/Pedido'
import PedidoDetail from '../../../../components/DisponivelModal'
import {successMessage, errorMessage} from '../../../../services/alerts'
var listaPedidos = []
export default function Disponiveis() {
  const [pedidos, setPedidos] = useState([])
  const [pedidoAtual,setPedidoAtual] = useState()
  const token = store.getState().user.token
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
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
  async function catchPedidos () {
    try {
      const pedidosDisponiveis = await pedidosFechados(token)
      if (novosPedidos(pedidosDisponiveis)) {
        atualizarPedidos(pedidosDisponiveis)
      }
    }catch (error) {
      console.log(error)
    }
  }
  
  async function atualizarPedidos (pedidos) {
    const pedidosOrdenados = pedidos.sort((a, b) => new Date(b.emissao) - new Date(a.emissao))
    setPedidoAtual(pedidosOrdenados[0])
    setVisible(true)
    await setPedidos(pedidosOrdenados)
    listaPedidos = pedidosOrdenados
  }

  function novosPedidos (pedidosNovos) {
    let pedidosDiferentes = pedidosNovos.filter(pedido => {
      const bool = !isOnList(listaPedidos, pedido, 'pedidoId')
      return bool
    })
    const retorno = pedidosDiferentes.length > 0 ? true : false
    return retorno
  }

  function isOnList(lista, item, id) {
    console.log(lista)
    console.log(item)
    let isOn = false
    lista.forEach(ele => {
      if (ele[id] == item[id]) isOn = true
    })
    return isOn
  }

  useEffect( () => {
    setLoading(true)    
    try {
      catchPedidos()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
    setInterval(catchPedidos, 1000)
    }, [])

  function detalhar(pedido) {
    setPedidoAtual(pedido)
    setVisible(true)
    
  }
  function fechar() {
    setVisible(false)
  }
  return (
      <View style={styles.container}>
        {
          visible===true &&
          <PedidoDetail visible={visible} fechar={fechar} pedidoAtual={pedidoAtual}> </PedidoDetail>
        }
        
        {
          pedidos.length > 0 ?
          <FlatList
          showsVerticalScrollIndicator={false}
          data={pedidos}
          renderItem= {pedido => {
            return (<Pedido pedido={pedido.item} confirmar={ConfirmarPedido} rejeitar={RejeitarPedido} token={token} loading={loading} detalhar={detalhar} />)
          }}
          keyExtractor={(pedido)=>pedido.pedidoId}
          />
          :
          <Text style={{fontSize: 19, fontWeight: "bold", alignSelf: "center", marginBottom:100}}>
              Estamos sem pedidos no momento!
          </Text>
        }
    </View>
  )
}