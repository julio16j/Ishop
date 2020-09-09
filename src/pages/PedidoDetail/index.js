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

export default function PedidoDetail() {
  const { height, width } = Dimensions.get("screen")
  const [itens, setItens] = useState([0])
  const [pagamento, setPagamento] = useState([0])
  const [registros, setRegistros] = useState()
  const [pedidoAtual, setPedidoAtual] = useState({ pagtos: [] })
  const [quantidade, setQuantidade] = useState(0)
  const [loading, setLoading] = useState(false)
  const route = useRoute()
  const token = store.getState().user.token
  const navigation = useNavigation()
  function navigateBack() {
    navigation.navigate('home')
  }
  function adicionarItens() {
    navigation.navigate('produtos', { pedido: pedidoAtual })
  }

  async function excluirItem(token, pedidoId, pedidoItemId) {
    setLoading(true)
    try {
      const response = await removerItem(token, pedidoId, pedidoItemId)
      sucessMessage('Item removido')
    } catch {
      erroMessage('Erro ao remover item')
    } finally {
      setLoading(false)
    }
  }

  const total = useMemo(() => {
    return itens.reduce((acumulador, atual) => {
      return acumulador + atual.quantidade * atual.valorUnitario
    }, 0)
  }, [itens])

  function alterarPedido() {
    setLoading(true)
    try {
      setItens(itens.map(ele => {
        alterarItem(token, pedidoAtual.pedidoId, ele.pedidoItemId, ele)
        return ele
      }))
      alterarValorTotal()
    } catch {
      erroMessage('Erro ao alterar pedido')
    } finally {
      setLoading(false)
    }
  }

  function updateQuantidade(item, quantidade) {
    setItens(itens.map(ele => {
      if (ele.pedidoItemId === item.pedidoItemId) ele.quantidade = Number(quantidade)
      return ele
    }))
  }

  function updateValor(item, valor) {
    setItens(itens.map(ele => {
      if (ele.pedidoItemId === item.pedidoItemId) ele.valorUnitario = Number(valor)
      return ele
    }))
  }

  function aumentarQuantidade(item) {
    setItens(itens.map(ele => {
      if (ele.pedidoItemId === item.pedidoItemId) ele.quantidade += 1
      return ele
    }))

  }

  function diminuirQuantidade(item) {
    setItens(itens.map(ele => {
      if (ele.pedidoItemId === item.pedidoItemId) ele.quantidade -= 1
      return ele
    }))
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

  useEffect(() => {
    if (route.params) {
      setPedidoAtual(route.params.pedido)
      setItens(route.params.pedido.itens)
      setPagamento(route.params.pedido.pagtos)
      setRegistros(route.params.pedido.registros)
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
          {itens.map((item, index) => {
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
                    <Text style={styles.itemCostText}>R$</Text>
                    <TextInput
                      style={styles.itemCostText}
                      onChangeText={(valor) => { updateValor(item, valor) }}
                      keyboardType="numeric"
                      editable={pedidoAtual.situacao <= 2}
                    >
                      {item.valorUnitario}
                    </TextInput>
                  </View>
                </View>
              </View>
            )
          })}
          <View style={styles.total}>
            <Text style={styles.cardText}>Total :</Text>
            <Text style={styles.totalValue}>R$ {total ? total : 0.00}</Text>
          </View>
          <TouchableOpacity style={{ ...styles.button, backgroundColor: "orange" }} onPress={adicionarItens} >
            <Text style={styles.buttonText}>Adicionar itens</Text>
          </TouchableOpacity>
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
          condicao={pedidoAtual.situacao <= 2}
          funcao1={
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.buttonDisponivel}
                onPress={() => RejeitarPedido(token, pedidoAtual.pedidoId)}
              >
                <Text style={{ ...styles.buttonText, color: "#F2CB07" }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonDisponivel}
                onPress={alterarPedido}
              >
                <Text style={{ ...styles.buttonText, color: "#F2CB07" }}>Confirmar alteração</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </ScrollView>
    </View>
  );
}