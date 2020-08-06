import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, CheckBox} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/input'
import Button from '../../components/button'
import logoImg from '../../assets/ishopLogoPreta.png';
import styles from './styles';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [nome, setNome] = useState();
  const [sobrenome, setSobrenome] = useState();
  const [selecionado,setSelecionado] = useState(false);
  function NavigateHome () {
      
    console.log(email, password, nome, sobrenome)
    navigation.navigate('home')
  }
  function NavigateLogin () {
    navigation.navigate('Login')
  }
  return (
    <View  style={styles.container} >
      <View style={[styles.header, styles.center]} >        
          <Image source={logoImg} style={styles.logoImg} />
      </View>
      <View style={[styles.center, styles.body]}>
        <View>
            <Text style={{...styles.p}}>Bem vindo,</Text>
            <Text style={styles.p}>Informe seus dados para cadastro.</Text>
        </View>
        <View>
          <Input updateField={setNome} placeholder={'Nome'} style={{marginTop: 10, width: 300}} />
          <Input updateField={setSobrenome} placeholder={'Sobrenome'}  style={{marginTop: 10, width: 300}} />
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
          <Button label={'Cadastrar'} click={() => NavigateHome() } style={{width: 300}}/>
        </View>
      </View>
    </View>
  );
};

  
  