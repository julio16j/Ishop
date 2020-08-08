import React, {useState} from 'react'
import {View, Text, Image, TouchableOpacity, CheckBox, ScrollView} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Input from '../../components/input'
import Button from '../../components/button'
import Spinner from 'react-native-loading-spinner-overlay'
import logoImg from '../../assets/ishopLogoPreta.png'
import { cadastrar } from '../../services/user'
import { successMessage, errorMessage } from '../../services/alerts'
import { stringNotNull } from '../../services/utils'
import styles from './styles'

export default function Cadastrar() {
  const navigation = useNavigation()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [nome, setNome] = useState()
  const [selecionado,setSelecionado] = useState(false)
  const [loading, setLoading] = useState(false)
  async function signup (nome, email, password, confirmPassword, selecionado) {
    setLoading(true)
    if (!validaCadastro(nome, email, password, confirmPassword, selecionado)) {
      setLoading(false)
      return
    }
    try {
      const response = await cadastrar(email, password, nome)
      if (response.data.exception !== undefined) {
        setLoading(false)
        successMessage('Loja Cadastrada com sucesso')
        NavigateLogin()
      }
      else errorMessage(response.data.exception)
    } catch (err) {
      console.log(err)
      errorMessage('Cadastro Inválido')
    }
    setLoading(false)
  }
  function NavigateLogin () {
    navigation.navigate('Login')
  }
  function validaCadastro (nome, email, password, confirmPassword, selecionado) {
    if (!selecionado) {
      errorMessage('Por favor aceite os termos de uso')
      return false
    }
    if (!stringNotNull(nome)) {
      errorMessage('Nome não poder nulo')
      return false
    }
    if (!stringNotNull(email)) {
      errorMessage('Email não poder nulo')
      return false
    }
    if (!stringNotNull(password)) {
      errorMessage('Senha não poder nula')
      return false
    } else {
      if (!stringNotNull(confirmPassword)) {
        errorMessage('Confirme a senha não pode ser nulo')
        return false
      } else {
        if (password !== confirmPassword) {
          errorMessage('Senhas não coincidem')
          return false
        }
      }
    }
    return true
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
            <Text style={styles.p}>Informe seus dados</Text>
        </View>
        <View>
          <Input updateField={setNome} placeholder={'Nome'} style={{marginTop: 10, width: 300}} />
          <Input updateField={setEmail} placeholder={'Email'} style={{marginTop: 10, width: 300}} />
          <Input updateField={setPassword} placeholder={'Senha'} hidden={true} style={{marginTop: 10, width: 300}} />
          <Input updateField={setConfirmPassword} placeholder={'Confirme a senha'} hidden={true} style={{marginTop: 10, width: 300}} />
          <View style={{marginTop:10, width:300, flexDirection:'row'}}>
            <CheckBox
            value={selecionado}
            onValueChange={setSelecionado}
            style={{alignSelf:'center'}}
            />
            <Text style={{margin:8}}>Aceite os termos de uso</Text>
        </View>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <TouchableOpacity style={{marginTop: 10, width: '50%'}} onPress={() => NavigateLogin()}>
              <Text >Ir para login</Text>
            </TouchableOpacity>
          </View>
          <Button label={'Cadastrar'} click={() => signup(nome, email, password, confirmPassword, selecionado)} style={{width: 300}}/>
        </View>
      </View>
    </ScrollView>
  )
}

  
  