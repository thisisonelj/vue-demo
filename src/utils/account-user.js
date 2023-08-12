/** 有关用户信息相关api */
import http from './cross-access'
const userApi = {}
userApi.add = (data) => {
  return http.post('/rest/account/user/add', data)
}
userApi.queryall = (data) => {
  return http.post('/rest/account/user/queryall', data)
}
userApi.update = (data) => {
  return http.post('/rest/account/user/update', data)
}
userApi.delete = (data) => {
  return http.post('/rest/account/user/delete', data)
}
export default userApi
