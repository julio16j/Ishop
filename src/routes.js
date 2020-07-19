import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './pages/Home';
import Login from './pages/Login';
const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>

      <AppStack.Navigator screenOptions={{ headerShown: false }} >
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen name="home"  component={Home} />
      </AppStack.Navigator>

    </NavigationContainer>
  );
}