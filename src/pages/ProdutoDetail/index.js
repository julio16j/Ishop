import React, { useState, useEffect} from 'react'
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useRoute, useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import RenderCondicional from "../../components/RenderCondicional"
import { adicionarItem } from '../../services/item'
import store from '../../store'
import { sucessMessage, erroMessage } from '../../services/alerts'
import Spinner from 'react-native-loading-spinner-overlay'
import styles from './styles'
export default function ProdutoDetail () {
  const navigation = useNavigation()
  const route = useRoute()
  const token = store.getState().user.token
  const [produto, setProduto] = useState({})
  const [pedido, setPedido] = useState()
  const [loading, setLoading] = useState(false)

  useEffect( () => {
    if (route.params) {
      setProduto(route.params.produto)
      setPedido(route.params.pedido)
    }
  }, [])

  async function addProduto () {
    setLoading(true)
    try {
      const pedidoAtual = await adicionarItem(token, pedido.pedidoId, produto)
      console.log(pedidoAtual)
      navigation.navigate('pedidoDetail', { pedido: pedidoAtual })
      sucessMessage('Item adicionado com Sucesso')
    } catch {
      erroMessage('Erro ao adicionar Item')
    } finally {
      setLoading(false)
    }
  }

  function alterarQuantidade (funcaoAlteracao) {
    return function () {
      setProduto({...produto, quantidade: funcaoAlteracao()})
    }
  }
  const diminuirQuantidade = alterarQuantidade(() => produto.quantidade - 1)
  const aumentarQuantidade = alterarQuantidade(() => produto.quantidade + 1)
  const setQuantidade = (novaQuantidade) => alterarQuantidade(() => novaQuantidade ) ()
  return (
    <View style={styles.container} >
      <Spinner 
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}} 
      />
      <View style={styles.nav} >
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={21} />
        </TouchableOpacity>
        <Text style={styles.navTitle} >Produtos</Text>
      </View>
      <ScrollView>
        <View style={styles.bodyContainer}>
          <View style={styles.viewDetail}>
            <RenderCondicional
              condicao={produto.imagemId}
              funcao1={<Image source={produto.imagemId} style={styles.produtoImg} />}
              funcao2={<View style={styles.produtoImg} />}
            />
            <View style={styles.headerDetail}>
              <Text style={styles.itemButtonAdicionar}> {produto.titulo} </Text>
              <Text style={styles.preco}> R$ {produto.valorUnitario} </Text>
            </View>
            <View style={styles.bodyDetail}>
              <Text style={styles.descricaoProduto}> {produto.descricao}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.quantidadeProduto}>
          <TouchableOpacity style={styles.itemButton} onPress={diminuirQuantidade}>
            <Text style={styles.itemButtonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.valorTotal}
            keyboardType={"numeric"}
            onChangeText={novaQuantidade => setQuantidade(novaQuantidade)}>
            {produto.quantidade}
          </TextInput>
          <TouchableOpacity style={styles.itemButton} onPress={aumentarQuantidade}>
            <Text style={styles.itemButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addProduto} onPress={addProduto}>
          <Text style={styles.valorTotal}> R$ {produto.quantidade * produto.valorUnitario} </Text>
          <Text style={{fontSize: 18}} > - </Text>
          <Text style={styles.itemButtonAdicionar}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}