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
  Dimensions
} from "react-native";
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import {useRoute, useNavigation} from '@react-navigation/native'
import RenderCondicional from "../../components/RenderCondicional";
import styles from './styles';

export default function DisponivelModal() {
  const {height, width} = Dimensions.get("screen")
  const [itens, setItens] = useState([0])
  const [pagamento, setPagamento] = useState([0])
  const [registros, setRegistros] = useState()
  const [pedidoAtual, setPedidoAtual] = useState({pagtos:[]})
  const route = useRoute()
  const navigation = useNavigation()
  function navigateBack () {
    navigation.navigate('home')
  }
  function adicionarItens () {
    navigation.navigate('produtos', {pedido: pedidoAtual})
  }
  useEffect(() => {
    if (route.params) {
      setPedidoAtual(route.params.pedido)
      setItens(route.params.pedido.itens)
      setPagamento(route.params.pedido.pagtos[0])
      setRegistros(route.params.pedido.registros)
    }
  }, [])

  return (
    <View style={styles.centeredView}>
      <ScrollView style={{flex: 1, width: width}} >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigateBack() }}>
            <Ionicons name="ios-close" size={40} color="red" />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardTitle}>Meus itens</Text>
        {itens.map((item) => {
          return (
            <View style={styles.card, { padding: 0 }}>
              <View style={styles.item}>
                <RenderCondicional
                  condicao={item.imagemId}
                  funcao1={<Image source={item.imagemId} style={styles.itemImg} />}
                  funcao2={<View style={styles.itemImg} />}
                />
                <View style={styles.itemFooter}>
                  <Text style={styles.cardText}>{item.titulo}</Text>
                  <Text style={styles.itemAmount}>-  {item.quantidade}  +</Text>
                  <Text style={styles.itemCost}>
                    R$ {item.valorUnitario * item.quantidade}
                  </Text>
                </View>
              </View>
            </View>
          )
        })}

        <TouchableOpacity style={{ ...styles.button, backgroundColor: "orange" }} onPress={adicionarItens} >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>

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
            <CheckBox />
          </View>
        </View>

        <Text style={styles.cardTitle}>Forma de pagamento</Text>
        <View style={styles.card}>
          <View style={styles.payForm}>
            <Text style={styles.cardText}>Cartão de crédito</Text>
            <Feather name="credit-card" size={30} />
          </View>
          <View style={styles.payForm}>
            <Text style={styles.cardText}>Dinheiro</Text>
            <FontAwesome5 name="money-bill-wave" size={30} color="green" />
          </View>
        </View>

        <TouchableHighlight
          style={{ ...styles.button }}
          onPress={() => {
            navigateBack()
          }}
        >
          <Text style={styles.buttonText}>Fechar</Text>
        </TouchableHighlight>

      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.cardText}>Total :</Text>
        <Text style={styles.totalValue}>R$ {pedidoAtual.pagtos[0] ? pedidoAtual.pagtos[0].valor : 0}</Text>
      </View>
    </View>
  );
}