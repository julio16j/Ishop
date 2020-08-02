import React, { useState } from 'react';
import {View} from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
export default function (props) {
  const [form, setState] = useState({
    email: '',
    senha: ''
  });
  const updateField = (field, value) => {
    setState({
      ...form,
      [field]: value
    });
  };
  return (
    <Container style={{backgroundColor:'white', alignItems: 'center'}}>
      <Content >
        <Form style={{justifyContent: 'center', alignItems: 'center'}} >
          <Item floatingLabel style={{width: 300, marginLeft: 0}} >
            <Label>Email</Label>
            <Input              
              onChangeText={text => updateField('email', text)} />
          </Item>
          <Item floatingLabel style={{width: 300, marginLeft: 0}} >
            <Label>Senha</Label>
            <Input onChangeText={text => updateField('senha', text)} secureTextEntry={true} />
          </Item>
        </Form>
        <View>
          <Button onPress={() => props.submit(form)}
            style={{marginTop: 30, backgroundColor:'#F2CB07', width: 300 ,justifyContent: 'center'}} >
            <Text>Entrar</Text>
          </Button>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Item floatingLabel style={{width: 300, marginLeft: 0}} >
            <Label>Senha</Label>
            <Input onChangeText={text => updateField('senha', text)} secureTextEntry={true} />
          </Item>
          <Button style={{backgroundColor: 'white', marginTop: 5}}
            onPress={()=>props.cadastrar()}>
            <Text style={{fontSize: 10, color: 'black'}}>Cadastre-se</Text>
          </Button>
          <Button style={{backgroundColor: 'white', marginTop: 5}}
            onPress={()=>props.forgotPassword()}>
            <Text style={{fontSize: 10, color: 'black'}}>Esqueceu a senha ?</Text>
          </Button>
        </View>
      </Content>
    </Container>
  )
}