import axios from 'axios'

const api = axios.create({
  baseURL:'https://ishop.delivery/App/api'
})
export default api