import http from '@/utils/request.js'

export const loginService = (data: any) => {
  return http.post('/login', data)
}
