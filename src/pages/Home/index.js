import React, { useEffect } from 'react'
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Disponiveis from "./tabs/Disponiveis"
import Confirmados from "./tabs/Confirmados"
import EmTransito from "./tabs/EmTransito"
import Finalizados from "./tabs/Finalizados"
import Perfil from "./tabs/Perfil"
export default function Home() {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator>
      <Tab.Screen name="disponiveis" component={Disponiveis} options={{
          tabBarLabel: 'Disponiveis',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" size={size} color={color} />
          ),
        }} />
      <Tab.Screen name="confirmados" component={Confirmados} options={{
          tabBarLabel: 'Confirmados',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="check" size={size} color={color} />
          ),
        }} />
        <Tab.Screen name="emTransito" component={EmTransito} options={{
          tabBarLabel: 'Em Trânsito',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="motorbike" size={size} color={color} />
          ),
        }} />
        <Tab.Screen name="finalizados" component={Finalizados} options={{
          tabBarLabel: 'Finalizados',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="assignment" size={size} color={color} />
          ),
        }} />
        <Tab.Screen name="perfil" component={Perfil} options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }} />
    </Tab.Navigator>
  )
}