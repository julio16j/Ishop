import React, { useMemo, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

import Item from '../Item'
import RenderCondicional from '../RenderCondicional'

import styles from './styles'

export default function Pedido({ pedido, confirmar, rejeitar, token, loading = false, detalhar }) {
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
        textStyle={{ color: '#FFF' }}
      />
      <TouchableOpacity onPress={() => detalhar(pedido)}>
        <View style={styles.header}>
          <Text style={styles.nome}>{pedido.nome}</Text>
          <View style={styles.info}>
            <Text style={styles.textInfo}>{(pedido.bairro || 'Bessa, ')}</Text>
            <Text style={styles.textInfo}>{(pedido.cep || '58036-385')}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.items}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={pedido.itens}
          renderItem={item => (
            <Item item={item.item} />
          )}
          keyExtractor={(item) => item.pedidoItemId}
        />
      </View>
      <View style={styles.total}>
        <Text style={{ fontSize: 18, color: "#BFBFBF" }}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(total)}</Text>
      </View>

      <RenderCondicional
        condicao={pedido.situacao === 2}
        funcao1={
          <View style={styles.options}>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => rejeitar(token, pedido.pedidoId)}>
                <Text style={styles.textOption}>Rejeitar</Text>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => confirmar(token, pedido.pedidoId)}>
                <Text style={styles.textOption}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </View>
  )
}