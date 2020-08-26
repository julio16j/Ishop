import React, {useState, useEffect} from 'react'
import {View, Text, TouchableWithoutFeedbackComponent, FlatList} from 'react-native'
import styles from './styles'
import {pedidosConfirmados} from '../../../../services/pedido'
import store from '../../../../store'
import Pedido from '../../../../components/Pedido'
import PedidoDetail from '../../../../components/DisponivelModal'
import { TapGestureHandler } from 'react-native-gesture-handler'
export default function Disponiveis() {
  const [pedidos, setPedidos] = useState([])
  const [pedidoAtual,setPedidoAtual] = useState()
  const token = store.getState().user.token
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  
  async function catchPedidos () {
    try {      
      setPedidos(await pedidosConfirmados(token))        
    }catch (error) {
      console.log(error)
    }
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
      
      {visible === true && 
      <PedidoDetail visible={visible} fechar={fechar} pedidoAtual={pedidoAtual}> </PedidoDetail> 
      }
       
        { pedidos.length > 0 ?
            <FlatList
            showsVerticalScrollIndicator= {false}
            data={pedidos}
            renderItem= {pedido => {
              return (<Pedido pedido={pedido.item} token={token} detalhar={detalhar} />)
            }}
            keyExtractor={(pedido)=>pedido.pedidoId}
            />
          :
            <Text style={{fontSize: 19, fontWeight: "bold", alignSelf: "center", marginBottom:100}}>
              Não temos pedidos confirmados.
            </Text>
        }
      </View>
  )
}