import React from 'react';
import { View } from 'react-native'

export default function RenderCondicional({ condicao, funcao1, funcao2 }) {
  return (
    condicao
      ? <View>{funcao1}</View>
      : <View>{funcao2}</View>
  )
}