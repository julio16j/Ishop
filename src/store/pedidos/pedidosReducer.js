import { createSlice } from '@reduxjs/toolkit'

export const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState: {
    shouldUpdate: false,
    alterado: false
  },
  reducers: {
    setShoudUpdate: (state, payload) => {
      state.shouldUpdate = payload
    },
    setAlterado: (state, payload) => {
      state.alterado = payload
    }
  }
})

export const { setShoudUpdate, setAlterado } = pedidosSlice.actions
export default pedidosSlice.reducer