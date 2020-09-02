import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  CheckBox,
  Dimensions,
  TextInput
} from "react-native";
import { BorderlessButton, ScrollView, RectButton } from 'react-native-gesture-handler';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native'
import RenderCondicional from "../../components/RenderCondicional";
import styles from './styles';
import { alterarItem } from "../../services/item";
import store from "../../store";

export default function PedidoDetail() {
  const { height, width } = Dimensions.get("screen")
  const [itens, setItens] = useState([0])
  const [pagamento, setPagamento] = useState([0])
  const [registros, setRegistros] = useState()
  const [pedidoAtual, setPedidoAtual] = useState({ pagtos: [] })
  const [quantidade, setQuantidade] = useState(0)
  const route = useRoute()
  const token = store.getState().user.token
  const navigation = useNavigation()
  function navigateBack() {
    navigation.navigate('home')
  }
  function adicionarItens() {
    navigation.navigate('produtos', { pedido: pedidoAtual })
  }

  function alterarValor() {
    pedidoAtual.pagtos[0].valor = 0
    itens.map(ele => {
      pedidoAtual.pagtos[0].valor += ele.quantidade * ele.valorUnitario
    })
  }

  function alterarPedido() {
    setItens(itens.map(ele => {
      alterarItem(token, pedidoAtual.pedidoId, ele.pedidoItemId, ele)
      return ele
    }))
    alterarValor()
    Alert.alert("Seu pedido foi alterado")
  }

  function updateQuantidade(item, quantidade) {
    setItens(itens.map(ele => {
      if (ele.pedidoItemId === item.pedidoItemId) ele.quantidade = Number(quantidade)
      return ele
    }))
    alterarValor()
  }

  function aumentarQuantidade(item) {
    setItens(itens.map(ele => {
      if (ele.pedidoItemId === item.pedidoItemId) ele.quantidade += 1
      return ele
    }))
    alterarValor()
  }

  function diminuirQuantidade(item) {
    setItens(itens.map(ele => {
      if (ele.pedidoItemId === item.pedidoItemId) ele.quantidade -= 1
      return ele
    }))
    alterarValor()
  }
  useEffect(() => {
    if (route.params) {
      setPedidoAtual(route.params.pedido)
      setItens(route.params.pedido.itens)
      setPagamento(route.params.pedido.pagtos)
      setRegistros(route.params.pedido.registros)
    }
  }, [])

  return (
    <View style={styles.centeredView}>
      <ScrollView style={{ flex: 1, width: '95%' }} >
        <View style={styles.header}>
          <Text style={styles.cardTitle}>{pedidoAtual.nome}</Text>
          <TouchableOpacity onPress={navigateBack}>
            <Ionicons name="ios-close" size={40} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.cardTitle}>Endereço de entrega</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>Endereço :</Text>
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

        <Text style={styles.cardTitle}>Forma de pagamento</Text>
        <View style={styles.card}>
          {pedidoAtual.pagtos.map((pagamento, index) => {
            return (
              <View style={styles.payForm} key={index}>
                <Text style={styles.cardText}>{pagamento.descricao}</Text>
              </View>
            )
          })}
        </View>

        <Text style={styles.cardTitle}>Meus itens</Text>
        <View style={styles.card, { padding: 0 }}>
          {itens.map((item, index) => {
            return (
              <View style={styles.item} key={index}>
                <RenderCondicional
                  condicao={item.imagemId}
                  funcao1={<Image source={item.imagemId} style={styles.itemImg} />}
                  funcao2={<View style={styles.itemImg} />}
                />
                <View style={styles.itemFooter}>
                  <Text style={styles.cardText}>{item.titulo}</Text>
                  <View style={styles.itemButtonsContainer}>
                    <TouchableOpacity style={styles.itemButton} onPress={() => { diminuirQuantidade(item) }} disabled={pedidoAtual.situacao > 2}>
                      <Text style={styles.itemButtonText}>-</Text>
                    </TouchableOpacity>

                    <TextInput
                      style={styles.cardText}
                      onChangeText={(quantidade) => { updateQuantidade(item, quantidade) }}
                      editable={pedidoAtual.situacao <= 2}
                    >
                      {item.quantidade}
                    </TextInput>

                    <TouchableOpacity style={styles.itemButton} onPress={() => { aumentarQuantidade(item) }} disabled={pedidoAtual.situacao > 2}>
                      <Text style={styles.itemButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.itemCost}>
                    R$ {item.valorUnitario * item.quantidade}
                  </Text>
                </View>
              </View>
            )
          })}
        </View>
        <View style={{ backgroundColor: "white", marginBottom: 50 }}>
          <TouchableOpacity style={{ ...styles.button, backgroundColor: "orange" }} onPress={adicionarItens} >
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <RenderCondicional
          condicao={pedidoAtual.situacao <= 2}
          funcao1={
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={{ ...styles.buttonDisponivel, backgroundColor: "green" }}
                onPress={alterarPedido}
              >
                <Text style={styles.buttonText}>Alterar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.buttonDisponivel, backgroundColor: "red" }}
                onPress={() => rejeitar(token, pedidoAtual.pedidoId)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.cardText}>Total :</Text>
        <Text style={styles.totalValue}>R$ {pedidoAtual.pagtos[0] ? pedidoAtual.pagtos[0].valor : 0}</Text>
      </View>
    </View>
  );
}