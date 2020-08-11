import React, {useMemo} from 'react'
import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import styles from './styles'
import Item from '../Item'
import Spinner from 'react-native-loading-spinner-overlay'
export default function Pedido({pedido, confirmar, rejeitar, token, loading = false}) {  
  const total = useMemo(() => {
    return pedido.itens.reduce((acumulador, atual) => {
      return acumulador + atual.quantidade * atual.valorUnitario 
    }, 0)
  }, [pedido.itens])

  return (
    <View style={styles.card}>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
        <View style={styles.header}>
          <Text style={styles.nome}>{pedido.nome}</Text>
          <View style={styles.info}>
            <Text style={styles.textInfo}>{(pedido.bairro || 'Bessa, ')}</Text>
            <Text style={styles.textInfo}>{( pedido.cep || '58036-385' )}</Text>
          </View>
        </View>
        <View style={styles.items}>
          <FlatList
            showsVerticalScrollIndicator= {false}
            data={pedido.itens}
            renderItem= {item => (
                <Item item={item.item} />
            )}
            keyExtractor={(item)=>item.pedidoItemId}
          />
        </View>
        <View style={styles.total}>
              <Text style={{fontWeight:"bold", fontSize:18, color:"#BFBFBF"}}>R$</Text>
              <Text style={{fontSize:18, color:"#BFBFBF"}}>{total}</Text>
        </View>
      {
        pedido.situacao===2 &&
        <View style={styles.options}>
        <View style={{alignItems: "center"}}>
          <TouchableOpacity onPress={() => confirmar(token, pedido.pedidoId)}>
            <Text style={styles.textOption}>Confirmar</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: "center"}}>
        <TouchableOpacity onPress={() => rejeitar(token, pedido.pedidoId)}>
            <Text style={styles.textOption}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View> 
      }
      
    </View>
  )
}