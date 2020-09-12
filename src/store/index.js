import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userReducer'
import pedidosReducer from './pedidos/pedidosReducer'

export default configureStore({
  reducer: {
    user: userReducer,
    pedidos: pedidosReducer
  }
})