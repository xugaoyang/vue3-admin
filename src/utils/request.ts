import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'

const errorHandler = (status: number) => {
  switch (status) {
    case 400:
      ElMessage.error('请求错误:Bad Request')
      break
    case 401:
      ElMessage.error('未授权重新登录:Unauthorized')
      // TODO: 登录跳转
      break
    case 403:
      ElMessage.error('拒绝访问:Forbidden')
      break
    case 404:
      ElMessage.error('请求出错:Not Found')
      // TODO:404页面跳转
      break
    case 500:
      ElMessage.error('服务器错误:Internal Server Error')
      // TODO:500页面跳转
      break
    default:
      ElMessage.error(`连接出错:${status}`)
  }
}

const instance = axios.create({
  baseURL: '/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  // 在向服务器发送请求前，序列化请求数据
  transformRequest: [
    function (data) {
      data = JSON.stringify(data)
      return data
    },
  ],
  // 在传递给 then/catch 前，修改响应数据
  transformResponse: [
    function (data) {
      if (typeof data === 'string' && data.startsWith('{')) {
        data = JSON.parse(data)
      }
      return data
    },
  ],
})

instance.interceptors.request.use(
  (config) => {
    const token = store.getters.token
    token && (config.headers.Authorization = token)
    return config
  },
  (error) => {
    error.data = {}
    error.data.msg = '服务器异常，请联系管理员！'
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data.code !== 0) {
      ElMessage.error(data.msg)
    }
    return data
  },
  (error) => {
    const status = error.response.status
    errorHandler(status)
    return Promise.reject(error)
  }
)

// TODO:多类型的请求封装
const contentTypes = {
  json: 'application/json;charset=UTF-8',
  urlencoded: 'application/x-www-form-urlencoded;charset=UTF-8',
  form: 'multipart/form-data',
}
console.log(contentTypes)

export default instance
