import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Login() {
  const navigation = useNavigation()
  function NavigateHome () {
    navigation.navigate('home')
  }  
  return (
    <View  style={styles.container} >
        <TouchableOpacity onPress={() => NavigateHome()} >
          <Feather name="arrow-left" size={28} color="#e82041"/>
        </TouchableOpacity>
    </View>
  );
}