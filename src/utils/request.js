import axios from 'axios'
import store from '@/store'

const errorHandler = (code) => {
  switch (code) {
    case 400:
      console.log('400')
      break
    case 401:
      console.log('401')
      break
    default:
      console.log('nothing')
  }
}

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

instance.interceptors.request.use(
  (config) => {
    const token = store.getters.token
    token && (config.headers.Authorization = token)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
