import http from '@/utils/request.js'

export const loginService = (data) => {
  return http.post('/login', data)
}
