import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import styles from '../../styles'
import { pedidosFechados, confirmarPedido, rejeitarPedido } from '../../../../services/pedido'
import store from '../../../../store'
import { setShoudUpdate } from '../../../../store/pedidos/pedidosReducer'
import Pedido from '../../../../components/Pedido'
import { sucessMessage, erroMessage, infoMessage } from '../../../../services/alerts'
import RenderCondicional from '../../../../components/RenderCondicional'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Audio } from 'expo-av';
import Header from '../../../../components/header'
var listaPedidos = []
export default function Disponiveis() {
  const [pedidos, setPedidos] = useState([])
  const token = store.getState().user.token
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  async function ConfirmarPedido(token, pedidoId) {
    setLoading(true)
    try {
      const response = await confirmarPedido(token, pedidoId)
      if (response.status === 200) {
        setPedidos(pedidos.filter(pedido => pedido.pedidoId !== response.data.pedidoId))
        sucessMessage('Perdido Confirmado')
      }
    } catch (err) {
      console.log(err)
      erroMessage('Erro ao Confirmar Pedido')
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
      erroMessage('Erro ao Reijeitar Pedido')
    } finally {
      setLoading(false)
    }
  }
  async function catchPedidos() {
    try {
      const pedidosDisponiveis = await pedidosFechados(token)
      let shouldUpdate = store.getState().pedidos.shouldUpdate
      let shouldDetalhar = novosPedidos(pedidosDisponiveis)
      if ( shouldDetalhar  || shouldUpdate) {
        atualizarPedidos(pedidosDisponiveis, shouldDetalhar)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function atualizarPedidos(pedidos, shouldDetalhar) {
    const pedidosOrdenados = pedidos.sort((a, b) => new Date(b.emissao) - new Date(a.emissao))
    store.dispatch(setShoudUpdate(false))
    await setPedidos(pedidosOrdenados)
    listaPedidos = pedidosOrdenados
    if (shouldDetalhar) {
      await playSongAsync()
      infoMessage('Novo Pedido !')
      detalhar(pedidosOrdenados[0])
    }
  }

  function novosPedidos(pedidosNovos) {
    let pedidosDiferentes = pedidosNovos.filter(pedido => {
      const bool = !isOnList(listaPedidos, pedido, 'pedidoId')
      return bool
    })
    const retorno = pedidosDiferentes.length > 0 ? true : false
    return retorno
  }

  function isOnList(lista, item, id) {
    let isOn = false
    lista.forEach(ele => {
      if (ele[id] == item[id]) isOn = true
    })
    return isOn
  }

  async function playSongAsync () {
    const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(require('../../../../assets/caixaRegistradora.mp3'))
        await soundObject.playAsync();
      } catch {}
  }

  useEffect(() => {
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
    navigation.navigate('pedidoDetail', { pedido })
  }

  function fechar() {
    navigation.navigate('home')
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
              return (<Pedido pedido={pedido.item} confirmar={ConfirmarPedido} rejeitar={RejeitarPedido} token={token} loading={loading} detalhar={detalhar} />)
            }}
            keyExtractor={(pedido) => pedido.pedidoId}
          />
        }
        funcao2={
          <Text style={{ fontSize: 19, fontWeight: "bold", alignSelf: "center", marginBottom: 100 }}>
            Estamos sem pedidos no momento!
          </Text>
        }
      />
    </View>
  )
}