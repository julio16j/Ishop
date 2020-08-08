import axios from 'axios'

const api = axios.create({
  baseURL:'https://excelta.com.br/App/api'
})
export default api