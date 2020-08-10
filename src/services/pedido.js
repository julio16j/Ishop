import api from './api'

async function getPedidos (token,param) {
  try {
      const response = await api.get(`/store/${token}/` + param)
      return response.data
    } catch (err) {
      return { data: { exception: 'Erro' } }
    }
}

export function pedidosConfirmados (token) {
    return getPedidos(token,"confirmados")
  }

export async function pedidosColetados (token) {
    return getPedidos(token,"coletados")
  }
export async function pedidosEntregues (token) {
    return getPedidos(token,"entregues")
  }
export async function pedidosFechados (token) {
    return getPedidos(token,"fechados")
  }
export async function confirmarPedido (token, pedidoId) {
  try {
    const response = await api.get(`/store/${token}/pedido/${pedidoId}/confirmar` )
    return response
  } catch (err) {
    console.log(err)
    return { data: { exception: 'Erro' } } 
  }
}
export async function rejeitarPedido (token, pedidoId) {
  try {
    const response = await api.get(`/store/${token}/pedido/${pedidoId}/rejeitar` )
    return response
  } catch (err) {
    console.log(err)
    return { data: { exception: 'Erro' } } 
  }
}
