import axios from 'axios'
import { Message } from 'element-ui'

axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

axios.create({
  baseURL: 'http://78.141.200.3:3000/api',
  timeout: 5000
})

export default function http (url: string, method?: string, query?: object): Promise<any> {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: <'post'>method,
      data: query
    }).then((res: any) => {
      console.log(res)
      if (res.data.status === 1) {
        resolve(res.data)
      } else {
        reject(res.data)
        Message({
          message: res.data.message,
          type: 'warning'
        })
      }
    })
  })
}
