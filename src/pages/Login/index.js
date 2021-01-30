import React, {useState, useEffect} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Input from '../../components/input'
import Button from '../../components/button'
import logoImg from '../../assets/ishopLogoPreta.png'
import { stringNotNull, getSistema } from '../../services/utils'
import { login, validarLogin } from '../../services/user'
import Spinner from 'react-native-loading-spinner-overlay'
import { errorMessage } from '../../services/alerts'
import AsyncStorage from '@react-native-community/async-storage';
import store from '../../store' 
import { setToken } from '../../store/user/userReducer'
import styles from './styles' 
export default function Login() {
  const navigation = useNavigation()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect( () => {
    async function getToken () {
      try {
        const token = await AsyncStorage.getItem('token')
        if (token !== null) {
          store.dispatch(setToken(token))
          NavigateHome()
        }
      } catch (error) {
        console.log('useEffect Error retrieving token')
        console.log(error)
      }
    }
    getToken()
  }, [])
  async function logar (email, password) {
    setLoading(true)
    if (!validaLogin(email, password)) {
      setLoading(false)
      return
    }
    const loginResponse = await login(email, password, getSistema())
    try {
      const isValidLogin = await validarLogin(loginResponse.data.token)
      if (isValidLogin === true) {
        setLoading(false)
        await AsyncStorage.setItem('token', loginResponse.data.token)
        store.dispatch(setToken(loginResponse.data.token))
        setEmail(null)
        setPassword(null)
        NavigateHome()
      }
      else {
        setLoading(false)
        errorMessage(loginResponse.data.exception)
      }
    } catch (error) {
      console.log(error)
      errorMessage('Login Inválido')
    }
    setLoading(false)
  }
  function validaLogin (email, password) {
    if (!stringNotNull(email)) {
      errorMessage('Email não poder nulo')
      return false
    }
    if (!stringNotNull(password)) {
      errorMessage('Senha não poder nula')
      return false
    }
    return true
  }
  function NavigateHome () {
    navigation.navigate('home')
  }
  function NavigateCadastrar () {
    navigation.navigate('cadastrar')
  }
  return (
    <ScrollView  style={styles.container} >
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
      <View style={[styles.header, styles.center]} >        
          <Image source={logoImg} style={styles.logoImg} />
      </View>
      <View style={[styles.center, styles.body]}>
        <View>
            <Text style={{...styles.p}}>Bem vindo,</Text>
            <Text style={styles.p}>Informe seus dados de acesso.</Text>
        </View>
        <View>
          <Input updateField={setEmail} placeholder={'Email'} style={{marginTop: 10, width: 300}} value={email}/>
          <Input updateField={setPassword} placeholder={'Senha'} hidden={true} style={{marginTop: 10, width: 300}} value={password} />
          <View style={{width: '100%', flexDirection: 'row'}}>
            <TouchableOpacity style={{marginTop: 10, width: '50%'}} onPress={() => console.log('esqueci a senha')}>
              <Text >Esqueci a senha</Text>
            </TouchableOpacity>
          </View>
          <Button label={'Entrar'} click={() => logar(email, password)} style={{width: 300}}/>
        </View>
      </View>
    </ScrollView>
  )
}