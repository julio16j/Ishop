import api from './api'

export function listarItens (token) {
  return api.get(`/store/${token}/produtos-por-loja`)
}

export async function alterarItem (token, pedidoId, pedidoItemId, item) {
  const alterarItemModel = {
    Quantidade: item.quantidade,
    Valor: item.valorUnitario
  }
  try {
    const response = await api.put(`/store/${token}/pedido/${pedidoId}/${pedidoItemId}`, alterarItemModel)
    return response.data
  } catch (err) {
    return { data: { exception: 'Erro' } }
  }
}

export async function removerItem (token, pedidoId, pedidoItemId) {
  try {
    const response = await api.delete(`/store/${token}/pedido/${pedidoId}/${pedidoItemId}` )
    return response.data
  } catch (err) {
    return { data: { exception: 'Erro' } }
  }
}

export async function adicionarItem (token, pedidoId, produto) {
  const adicionarItemDTO = {
    PedidoId: pedidoId,
    ProdutoId: produto.produtoId,
    Quantidade: produto.quantidade
  }
  try {
    const response = await api.post(`/store/${token}/pedido/${pedidoId}/itens`, adicionarItemDTO)
    return response.data
  } catch (err) {
    return { data: { exception: 'Erro' } }
  }
}
