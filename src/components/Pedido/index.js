import React, {useMemo} from 'react'
import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import styles from './styles'
import Item from '../Item'
export default function Pedido({pedido}) {  
  const total = useMemo(() => {
    return pedido.itens.reduce((acumulador, atual) => {
      return acumulador + atual.quantidade * atual.valorUnitario 
    }, 0)
  }, [pedido.itens])
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nome}>{pedido.nome}</Text>
        <View>
          <Text>{(pedido.bairro + ',' || 'Bessa,')}</Text>
          <Text>{( pedido.cep || '58036-385' )}</Text>
        </View>
      </View>
      <View style={styles.items}>
        <FlatList
          data={pedido.itens}
          renderItem= {item => (
            <Item item={item.item} />
          )}
          keyExtractor={(item)=>item.pedidoItemId}
        />
      </View>
      <View style={styles.total}>
          <Text>{total}</Text>
      </View>
      <View style={styles.options}>
        <TouchableOpacity>
          <Text>Confirmar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}