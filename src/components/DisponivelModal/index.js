import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import styles from './styles'
import RenderCondicional from "../RenderCondicional";
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
            <RenderCondicional
              condicao={pedidoAtual.lojaNome}
              funcao1={<Text style={styles.modalText}>Nome da Loja: {pedidoAtual.lojaNome}</Text>}
              funcao2={<Text style={styles.modalText}>Nome da Loja: Carrefour</Text>}
            />

            <RenderCondicional
              condicao={pagamento}
              funcao1={<Text style={styles.modalText}>Valor: 100</Text>}
              funcao2={<Text style={styles.modalText}>Valor: 0</Text>}
            />

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                fechar()
              }}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}