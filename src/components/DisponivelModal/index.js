import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  CheckBox
} from "react-native";
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';

import Leitinho from "../../assets/leite.jpeg";

import Item from "../Item";
import RenderCondicional from "../RenderCondicional";

import styles from './styles';

/* nome, endereco, data, forma de pagamento
  se o pedido estiver em disponiveis*/

export default function PedidoDetail({ visible, fechar, pedidoAtual }) {
  const [itens, setItens] = useState([0])
  const [pagamento, setPagamento] = useState([0])
  const [registros, setRegistros] = useState()

  useEffect(() => {
    setItens(pedidoAtual.itens[0])
    setPagamento(pedidoAtual.pagtos[0])
    setRegistros(pedidoAtual.registros)
  }, [])

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <View style={styles.header}>
                <BorderlessButton onPress={() => { fechar() }}>
                  <Ionicons name="ios-close" size={40} color="red" />
                </BorderlessButton>
              </View>

              <Text style={styles.cardTitle}>Meus itens</Text>
              {pedidoAtual.itens.map((item) => {
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


              <TouchableHighlight style={{ ...styles.button, backgroundColor: "orange" }}>
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableHighlight>

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
                  fechar()
                }}
              >
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableHighlight>

            </ScrollView>

            <View style={styles.footer}>
              <Text style={styles.cardText}>Total :</Text>
              <Text style={styles.totalValue}>R$ {pedidoAtual.pagtos[0].valor}</Text>
            </View>

            {/*<RenderCondicional
              condicao={pedidoAtual.lojaNome}
              funcao1={
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Nome da Loja: </Text>
                  <Text>{pedidoAtual.lojaNome}</Text>
                </View>
              }
              funcao2={
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Nome da Loja: </Text>
                  <Text>Carrefour</Text>
                </View>
              }
            />

            <RenderCondicional
              condicao={pagamento}
              funcao1={
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Valor: </Text>
                  <Text>100</Text>
                </View>
              }
              funcao2={
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Valor: </Text>
                  <Text>0</Text>
                </View>
              }
            />

            <RenderCondicional
              condicao={pedidoAtual.bairro}
              funcao1={
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Bairro: </Text>
                  <Text>{pedidoAtual.bairro}</Text>
                </View>
              }
              funcao2={
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Bairro: </Text>
                  <Text>Bessa</Text>
                </View>
              }
            />

            <RenderCondicional
              condicao={pedidoAtual.clienteNome}
              funcao1={
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Nome: </Text>
                  <Text>{pedidoAtual.clienteNome}</Text>
                </View>
              }
              funcao2={
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Nome: </Text>
                  <Text>Anônimo</Text>
                </View>
              }
            />

            <RenderCondicional
              condicao={pedidoAtual.emissao}
              funcao1={
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Data: </Text>
                  <Text>{pedidoAtual.emissao}</Text>
                </View>
              }
              funcao2={
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Data: </Text>
                  <Text>--/--/----</Text>
                </View>
              }
            />

            <RenderCondicional
              condicao={pedidoAtual.pagtos[0]}
              funcao1={
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Forma de pagamento: </Text>
                  <Text>{pedidoAtual.pagtos[0]}</Text>
                </View>
              }
              funcao2={
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Forma de pagamento: </Text>
                  <Text>Money</Text>
                </View>
              }
            />*/}

          </View>
        </View>
      </Modal>
    </View>
  );
}