import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import FlashMessage from "react-native-flash-message"
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastrar from './pages/Cadastrar'
import PedidoDetail from './pages/PedidoDetail'
import Produtos from './pages/Produtos'
import ProdutoDetail from './pages/ProdutoDetail'
import Header from "./components/header"
const AppStack = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }} >
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen name="home" component={Home} />
        <AppStack.Screen name="cadastrar" component={Cadastrar} />
        <AppStack.Screen name="pedidoDetail" component={PedidoDetail} />
        <AppStack.Screen name="produtos" component={Produtos} />
        <AppStack.Screen name="produtoDetail" component={ProdutoDetail} />
      </AppStack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}