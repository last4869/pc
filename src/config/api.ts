import axios from 'axios'

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

export default function http (url: string, query?: object, method?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: <'post'>method,
      data: query
    }).then((res: any) => {
      console.log(res)
      resolve(res)
    }).catch((err: any) => {
      reject(err)
    })
  })
}
