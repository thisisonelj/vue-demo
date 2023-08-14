import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8089'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token')
    if (token) {
      config.headers.token = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
const http = {}
http.get = (url, config) => new Promise((resolve, reject) => {
  axios.get(url, config).then((response) => {
    resolve(response.data)
  }).catch(reject)
})

http.post = (url, param, config) => new Promise((resolve, reject) => {
  axios.post(url, param, config).then((response) => {
    resolve(response.data)
  }).catch(reject)
})

http.delete = (url, config) => new Promise((resolve, reject) => {
  axios.delete(url, config).then((response) => {
    resolve(response.data)
  }).catch(reject)
})

http.put = (url, param, config) => new Promise((resolve, reject) => {
  axios.put(url, param, config).then((response) => {
    resolve(response.data)
  }).catch(reject)
})
export default http
