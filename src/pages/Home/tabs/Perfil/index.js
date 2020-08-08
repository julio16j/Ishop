import React from 'react'
import {View, Text, TouchableWithoutFeedback} from 'react-native'
import styles from './styles'
import {
  SimpleLineIcons,
  Ionicons,
  FontAwesome5
} from '@expo/vector-icons'
import { errorMessage } from '../../../../services/alerts'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import store from '../../../../store'
import { setToken } from '../../../../store/user/userReducer'
export default function Perfil() {
  const navigation = useNavigation();
  function NavigateLogin() {
    navigation.navigate('Login')
  }
  async function logout () {
    try{
      await AsyncStorage.removeItem('token')
      store.dispatch(setToken(null))
      NavigateLogin()
    }catch (error) {
      console.log(error);
      errorMessage('Falha ao deslogar')
    }
  }
  return (
    <View style={styles.container}>
        <TouchableWithoutFeedback >
          <View style={styles.option}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.icon}>
                <Ionicons name="md-contact" size={24} color="#666666" />
              </View>
              <View style={{marginLeft:10}}>              
                <Text style={styles.optionText}> 
                  Perfil
                </Text>
              </View>
            </View>
            <View>
              <Ionicons name="ios-arrow-forward" size={24} color="#666666" />
            </View>
          </View>
            
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback >
          <View style={styles.option}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.icon}>
              <FontAwesome5 name="map-marked-alt" size={24} color="#666666" />
            </View>
              <View style={{marginLeft:10}}>              
                <Text style={styles.optionText}> 
                  Endereços
                </Text>
              </View>
            </View>
            <View>
              <Ionicons name="ios-arrow-forward" size={24} color="#666666" />
            </View>
          </View>
            
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback >
          <View style={styles.option}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.icon}>
              <Ionicons name="md-notifications" size={24} color="#666666" />
            </View>
              <View style={{marginLeft:10}}>              
                <Text style={styles.optionText}> 
                  Notificações
                </Text>
              </View>
            </View>
            <View>
              <Ionicons name="ios-arrow-forward" size={24} color="#666666" />
            </View>
          </View>
            
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback >
          <View style={styles.option}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.icon}> 
                <SimpleLineIcons name="settings" size={24} color="#666666" />
              </View>
              <View style={{marginLeft:10}}>              
                <Text style={styles.optionText}> 
                  Configurações
                </Text>
              </View>
            </View>
            <View>
              <Ionicons name="ios-arrow-forward" size={24} color="#666666" />
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => logout()}>
          <View style={styles.option}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.icon}>
                <SimpleLineIcons name="logout" size={24} color="#666666" />
              </View>
              <View style={{marginLeft:10}}>              
                <Text style={styles.optionText}> 
                  Sair
                </Text>
              </View>
            </View>
            <View>
              <Ionicons name="ios-arrow-forward" size={24} color="#666666" />
            </View>
          </View>
        </TouchableWithoutFeedback>

    </View>
  )
}