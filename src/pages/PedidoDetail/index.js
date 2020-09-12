import React, { useState, useEffect, useMemo } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  CheckBox,
  Dimensions,
  TextInput
} from "react-native";
import { ScrollView } from 'react-native-gesture-handler'
import Spinner from 'react-native-loading-spinner-overlay'
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons'
import { useRoute, useNavigation } from '@react-navigation/native'
import RenderCondicional from "../../components/RenderCondicional"
import Header from '../../components/header'
import styles from './styles'
import { alterarItem, removerItem } from "../../services/item"
import { rejeitarPedido } from '../../services/pedido'
import { sucessMessage, erroMessage } from '../../services/alerts'
import store from "../../store"
import { setShoudUpdate, setAlterado } from "../../store/pedidos/pedidosReducer"
export default function PedidoDetail() {
  const [pedidoAtual, setPedidoAtual] = useState({ pagtos: [], itens: [] })
  const [loading, setLoading] = useState(false)
  const route = useRoute()
  const token = store.getState().user.token
  const alterado = store.getState().pedidos.alterado.payload
  const navigation = useNavigation()
  function navigateBack() {
    store.dispatch(setShoudUpdate(true))
    store.dispatch(setAlterado(false))
    navigation.navigate('home')
  }
  function adicionarItens() {
    store.dispatch(setAlterado(true))
    navigation.navigate('produtos', { pedido: pedidoAtual })
  }

  function addItem (novoItem) {
    let atualizouItem = false
    setItens(pedidoAtual.itens.map(ele => {
      if (ele.pedidoItemId === novoItem.pedidoItemId) {
        atualizouItem = true
        return novoItem
      }
      return ele
    }))
    if (!atualizouItem) setItens([ ...pedidoAtual.itens, novoItem ])
  }

  function setItens (novaLista) {
    setPedidoAtual({...pedidoAtual, itens: novaLista})
  }

  async function excluirItem(token, pedidoId, pedidoItemId) {
    setLoading(true)
    try {
      const response = await removerItem(token, pedidoId, pedidoItemId)
      if ( response ) setItens(pedidoAtual.itens.filter(pedido => pedido.pedidoItemId !== pedidoItemId))
      sucessMessage('Item removido')
    } catch {
      erroMessage('Erro ao remover item')
    } finally {
      setLoading(false)
    }
  }

  const total = useMemo(() => {
    return pedidoAtual.itens.reduce((acumulador, atual) => {
      return acumulador + atual.quantidade * atual.valorUnitario
    }, 0)
  }, [pedidoAtual.itens])

  async function alterarPedido() {
    setLoading(true)
    try {
      let promises = []
      const novosItens = pedidoAtual.itens.map(ele => {
        promises.push(alterarItem(token, pedidoAtual.pedidoId, ele.pedidoItemId, ele))
        return ele
      })
      setItens(novosItens)
      await Promise.all(promises)
      store.dispatch(setAlterado(false))
      navigateBack()
      sucessMessage('Pedido Alterado com Sucesso')
    } catch {
      erroMessage('Erro ao alterar pedido')
    } finally {
      setLoading(false)
    }
  }

  function updateQuantidade(item, quantidade) {
    setItens(pedidoAtual.itens.map(ele => {
      if (ele.pedidoItemId === item.pedidoItemId) ele.quantidade = Number(quantidade)
      return ele
    }))
    store.dispatch(setAlterado(true))
  }

  function updateValor(item, valor) {
    setItens(pedidoAtual.itens.map(ele => {
      if (ele.pedidoItemId === item.pedidoItemId) ele.valorUnitario = Number(valor)
      return ele
    }))
    store.dispatch(setAlterado(true))
  }

  function aumentarQuantidade(item) {
    setItens(pedidoAtual.itens.map(ele => {
      if (ele.pedidoItemId === item.pedidoItemId) {
        ele.quantidade += 1
      }
      return ele
    }))
    store.dispatch(setAlterado(true))
  }

  function diminuirQuantidade(item) {
    setItens(pedidoAtual.itens.map(ele => {
      if (ele.pedidoItemId === item.pedidoItemId) ele.quantidade -= 1
      return ele
    }))
    store.dispatch(setAlterado(true))
  }

  async function RejeitarPedido () {
    setLoading(true)
    try {
      const response = await rejeitarPedido(token, pedidoAtual.pedidoId)
      if (response.status === 200) {
       navigateBack()
       successMessage('Perdido Rejeitado')
      }
    } catch {
      erroMessage('Erro ao Reijeitar Pedido')
    } finally {
      setLoading(false)
    }
  }

  async function ConfirmarPedido () {
    setLoading(true)
    try {
      const response = await confirmarPedido(token, pedidoAtual.pedidoId)
      if (response.status === 200) {
        navigateBack()
        successMessage('Perdido Confirmado')
      }
    } catch (err) {
      console.log(err)
      errorMessage('Erro ao Confirmar Pedido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (route.params) {
      setPedidoAtual({ ...route.params.pedido })
      if (route.params.novoItem) addItem(route.params.novoItem)
    }
  }, [route.params])

  return (
    <View style={styles.centeredView}>
      <Header />
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, width: '100%' }} >
        <View style={styles.header}>
          <Text style={{ ...styles.cardTitle, paddingBottom: 12, borderBottomWidth: 0 }}>{pedidoAtual.nome}</Text>
          <TouchableOpacity onPress={navigateBack}>
            <Ionicons name="ios-close" size={40} color="#7a7a7a" />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Meus itens</Text>
          {pedidoAtual.itens.map((item, index) => {
            return (
              <View style={styles.item} key={index}>
                <RenderCondicional
                  condicao={item.imagemId}
                  funcao1={<Image source={item.imagemId} style={styles.itemImg} />}
                  funcao2={<View style={styles.itemImg} />}
                />
                <View style={styles.itemFooter}>
                  <Text style={{ ...styles.cardText, margin: 0 }}>{item.titulo}</Text>
                  <View style={styles.itemButtonsContainer}>
                    <RenderCondicional
                      condicao={item.quantidade > 1}
                      funcao1={
                        <TouchableOpacity style={styles.itemButton} onPress={() => { diminuirQuantidade(item) }} disabled={pedidoAtual.situacao > 2}>
                          <FontAwesome name="minus" size={20} color="#7a7a7a" />
                        </TouchableOpacity>
                      }
                      funcao2={
                        <TouchableOpacity style={styles.itemButton} onPress={() => { excluirItem(token, pedidoAtual.pedidoId, item.pedidoItemId) }} disabled={pedidoAtual.situacao > 2}>
                          <Feather name="trash" size={20} color="#7a7a7a" />
                        </TouchableOpacity>
                      }
                    />

                    <TextInput
                      style={{ ...styles.cardText, textAlign: "center", fontSize: 18, margin: 0 }}
                      onChangeText={(quantidade) => { updateQuantidade(item, quantidade) }}
                      keyboardType="numeric"
                      editable={pedidoAtual.situacao <= 2}
                    >
                      {item.quantidade}
                    </TextInput>

                    <TouchableOpacity style={styles.itemButton} onPress={() => { aumentarQuantidade(item) }} disabled={pedidoAtual.situacao > 2}>
                      <FontAwesome name="plus" size={20} color="#7a7a7a" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.itemCost}>
                    <TextInput
                      style={styles.itemCostText}
                      onChangeText={(valor) => { updateValor(item, valor) }}
                      keyboardType="numeric"
                      editable={pedidoAtual.situacao <= 2}
                    >
                      {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(item.valorUnitario)}
                    </TextInput>
                  </View>
                </View>
              </View>
            )
          })}
          <View style={styles.total}>
            <Text style={styles.cardText}>Total :</Text>
            <Text style={styles.totalValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(total ? total : 0.00)}</Text>
          </View>
          <RenderCondicional
            condicao={pedidoAtual.situacao === 2}
            funcao1={
              <TouchableOpacity style={{ ...styles.button, backgroundColor: "orange" }} onPress={adicionarItens} >
                <Text style={styles.buttonText}>Adicionar itens</Text>
              </TouchableOpacity>
            }/>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Endereço de entrega</Text>
          <Text style={{ ...styles.cardText, marginLeft: 10 }}>Endereço :</Text>
          <RenderCondicional
            condicao={pedidoAtual.logradouro}
            funcao1={
              <View>
                <Text style={styles.addressText}>{pedidoAtual.logradouro}, {pedidoAtual.numero}</Text>
                <Text style={styles.addressText}>{pedidoAtual.cidadeId} / {pedidoAtual.estado}</Text>
                <Text style={styles.addressText}>{pedidoAtual.compl}</Text>
                <View style={styles.addressFooter}>
                  <Text style={styles.cardText}>{pedidoAtual.referencia}</Text>
                </View>
              </View>
            }
            funcao2={<Text style={styles.addressText}>Não informado</Text>}
          />
          <View style={styles.addressFooter}>
            <Text style={styles.cardText}>Vou retirar na loja</Text>
            <CheckBox disabled={true} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Forma de pagamento</Text>
          {pedidoAtual.pagtos.map((pagamento, index) => {
            return (
              <View style={styles.payForm} key={index}>
                <Text style={styles.cardText}>{pagamento.descricao}</Text>
              </View>
            )
          })}
        </View>

        <RenderCondicional
          condicao={pedidoAtual.situacao === 2}
          funcao1={
            <RenderCondicional
              condicao={alterado}
              funcao1={
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.buttonDisponivel}
                    onPress={navigateBack}
                  >
                    <Text style={{ ...styles.buttonText, color: "#F2CB07" }}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonDisponivel}
                    onPress={alterarPedido}
                  >
                    <Text style={{ ...styles.buttonText, color: "#F2CB07" }}>Alterar</Text>
                  </TouchableOpacity>
                </View>
              } 
              funcao2={
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.buttonDisponivel}
                    onPress={RejeitarPedido}
                  >
                    <Text style={{ ...styles.buttonText, color: "#F2CB07" }}>Rejeitar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonDisponivel}
                    onPress={ConfirmarPedido}
                  >
                    <Text style={{ ...styles.buttonText, color: "#F2CB07" }}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
              }
              />
          }
        />
      </ScrollView>
    </View>
  );
}