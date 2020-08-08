import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/input'
import Button from '../../components/button'
import logoImg from '../../assets/ishopLogoPreta.png';
import styles from './styles';

export default function Login() {
  const navigation = useNavigation()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  function NavigateHome () {
    navigation.navigate('home')
  }
  function NavigateCadastrar () {
    navigation.navigate('cadastrar')
  }
  return (
    <ScrollView  style={styles.container} >
      <View style={[styles.header, styles.center]} >        
          <Image source={logoImg} style={styles.logoImg} />
      </View>
      <View style={[styles.center, styles.body]}>
        <View>
            <Text style={{...styles.p}}>Bem vindo,</Text>
            <Text style={styles.p}>Informe seus dados de acesso.</Text>
        </View>
        <View>
          <Input updateField={setEmail} placeholder={'Email'} style={{marginTop: 10, width: 300}} />
          <Input updateField={setPassword} placeholder={'Senha'} hidden={true} style={{marginTop: 10, width: 300}} />
          <View style={{width: '100%', flexDirection: 'row'}}>
            <TouchableOpacity style={{marginTop: 10, width: '50%'}} onPress={() => console.log('esqueci a senha')}>
              <Text >Esqueci a senha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 10}} onPress={() => NavigateCadastrar()}>
              <Text >Cadastre-se</Text>
            </TouchableOpacity>
          </View>
          <Button label={'Entrar'} click={() => console.log(email, password)} style={{width: 300}}/>
        </View>
      </View>
    </ScrollView>
  );
}