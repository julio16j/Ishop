import React, {useState, useEffect} from 'react'
import {View, Text, TouchableWithoutFeedbackComponent, FlatList} from 'react-native'
import styles from './styles'
import {pedidosFechados} from '../../../../services/pedido'
import store from '../../../../store'
export default function Confirmados() {
  const [pedidos,setPedidos] = useState()
  const token = store.getState.user.token
  useEffect( () => async function catchPedidos () {
    try {
      setPedidos(pedidosFechados(token))
    }catch {
      console.log('ERRO AO ENCONTRAR PEDIDO')
    }
    }, [])

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity style={[styles.item, style]}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
  const renderItem = ({pedido}) => {
    return (
      <Item item={item}/>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList 
      data={pedidos.itens}
      renderItem= {renderItem}
      keyExtractor={(item)=>item.id}
      />

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});