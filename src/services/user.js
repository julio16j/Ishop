import api from './api'
export async function login (Email, Senha, Device = 1) { 
  try {
    const response = await api.post('/store/signin',{Email, Senha, Device} )
    return response
  } catch (err) {
    return { data: { exception: 'Erro' } }
  }
}
export async function cadastrar (Email, Senha, Nome) {
  try {
    const response = await api.post('/store/signup',{Email, Senha, Nome} )
    return response
  } catch (err) { 
    return { data: { exception: 'Erro' } }
  }
}
export async function validarLogin (token) {
  try {
    const response = await api.get(`/store/${token}/is-valid`)
    return response.data
  } catch (err) {
    return false
  }
}
export async function confirmarEmail (Email) {
  try {
    const response = await api.get('/store/email-check/' + Email)
    return response.data
  } catch (err) {
    return { data: { exception: 'Erro' } }
  }
}
export async function logout (token) {
  try {
    const response = await api.delete('/store/' + token)
    return response.data
  } catch (err) {
    return { data: { exception: 'Erro' } }
  }
}