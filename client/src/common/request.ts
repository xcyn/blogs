import axios from 'axios'
import qs from 'qs'

const requestInterface = {
  url: String,
  params: Object,
  headers: Object,
  method: String,
  port:String
}
const request = function (option: any) {
  console.log('请求loading...')

  let sendUrl = process.env.VUE_APP_BASE_API + option.url
  var params:string = ''

  let method = option.method.toLocaleLowerCase()
  if (option.method === 'get') {
    params = qs.stringify(option.params)
    sendUrl += '?' + option.params
  }
  if(!option.headers) {
    option.headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
  console.log('option.headers', option.headers, option.params)
  return axios({
    method,
    url: sendUrl,
    data: method === 'get' ? null : option.params,
    headers: option.headers,
  })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log('请求失败...')
    }).finally(() => {
      console.log('toasthide...')
    })
}

export default request
