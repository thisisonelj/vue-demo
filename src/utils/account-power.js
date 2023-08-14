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
powerApi.selectList = (data) => {
  return http.post('/rest/account/power/selectlist', data)
}
powerApi.import = (data) => {
  return http.post('/rest/account/power/import', data)
}
powerApi.export = (data) => {
  return http.post('/rest/account/power/export', data, {
    responseType: 'blob'
  })
}
export default powerApi
