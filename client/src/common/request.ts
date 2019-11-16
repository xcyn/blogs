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

  let sendUrl = process.env.VUE_APP_BASE_API + option.url
  var params:string = ''
  let method = option.method.toLocaleLowerCase()
  if (option.method === 'get') {
    params = qs.stringify(option.params)
    sendUrl += '?' + params
  }
  if(!option.headers) {
    option.headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
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
    }).finally(() => {
    })
}

export default request
