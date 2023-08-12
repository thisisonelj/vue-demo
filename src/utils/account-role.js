/** 有关角色信息相关api */
import http from './cross-access'
const roleApi = {}
roleApi.add = (data) => {
  return http.post('/rest/account/role/add', data)
}
roleApi.queryall = (data) => {
  return http.post('/rest/account/role/queryall', data)
}
roleApi.update = (data) => {
  return http.post('/rest/account/role/update', data)
}
roleApi.delete = (data) => {
  return http.post('/rest/account/role/delete', data)
}
export default roleApi
