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
import { BorderlessButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';

import RenderCondicional from "../RenderCondicional";

import styles from './styles';

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
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.header}>
                <Text style={styles.cardTitle}>{pedidoAtual.nome}</Text>
                <BorderlessButton onPress={() => { fechar() }}>
                  <Ionicons name="ios-close" size={40} color="white" />
                </BorderlessButton>
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
                {pedidoAtual.pagtos.map((pagamento) => {
                  return (
                    <View style={styles.payForm}>
                      <Text style={styles.cardText}>{pagamento.descricao}</Text>
                    </View>
                  )
                })}
              </View>

              <Text style={styles.cardTitle}>Meus itens</Text>
              <View style={styles.card, { padding: 0 }}>
                {pedidoAtual.itens.map((item) => {
                  return (
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
                  )
                })}
              </View>
              <View style={{ backgroundColor: "white" }}>
                <TouchableOpacity style={{ ...styles.button, backgroundColor: "orange" }}>
                  <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>

              <RenderCondicional
                condicao={pedidoAtual.situacao >= 2}
                funcao1={
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={{ ...styles.buttonDisponivel, backgroundColor: "green" }}>
                      <Text style={styles.buttonText}>Confirmar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.buttonDisponivel, backgroundColor: "red" }}>
                      <Text style={styles.buttonText}>Rejeitar</Text>
                    </TouchableOpacity>
                  </View>
                }
              />

              <TouchableHighlight
                style={{ ...styles.button, marginBottom: 50 }}
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

          </View>
        </View>
      </Modal>
    </View>
  );
}