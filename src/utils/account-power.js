/** 有关权限信息相关api */
import http from './cross-access'
const powerApi = {}
powerApi.add = (data) => {
  return http.post('/rest/account/power/add', data)
}
powerApi.queryall = (data) => {
  return http.post('/rest/account/power/queryall', data)
}
powerApi.update = (data) => {
  return http.post('/rest/account/power/update', data)
}
powerApi.delete = (data) => {
  return http.post('/rest/account/power/delete', data)
}
export default powerApi
