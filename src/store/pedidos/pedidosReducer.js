import { createSlice } from '@reduxjs/toolkit'

export const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState: {
    shouldUpdate: false,
  },
  reducers: {
    setShoudUpdate: (state, payload) => {
      state.shouldUpdate = payload
    }
  }
})

export const { setShoudUpdate } = pedidosSlice.actions
export default pedidosSlice.reducer