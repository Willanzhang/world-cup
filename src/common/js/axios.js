import axios from 'axios'
import qs from 'qs'
import getUrl from './baseUrl'
import intance from '../../main.js'
// import { getLogin } from '@/api/home'
// 配置axios的config
// let language = localStorage.getItem('ELEMENT_LANGUAGE') ? localStorage.getItem('ELEMENT_LANGUAGE') : 'mx'
let lkey = localStorage.getItem('lkeyNBA')
let config = {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseURL: getUrl(),
  withCredentials: true,
  headers: {
    // 设置
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    data = qs.stringify(data)
    return data
  }],
  data: {
    // 全局参数
    channelType: '1',
    channelTag: '1',
    lkey: lkey
  }
}
// 拦截请求
axios.interceptors.request.use((config) => {
  // console.log(config)
  return config
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use((data) => {
  if (data.data.errCode === 3 && data.data.retCode === 3) {
    console.log('未登录11111111111111111111111')
    intance.$loading({
      state: false
    })
    intance.$vux.toast.show({
      position: 'middle',
      type: 'text',
      width: '16em',
      time: 1500,
      text: '未登录',
      isShowMask: true
    })
    // let language = localStorage.getItem('ELEMENT_LANGUAGE')
    console.log(intance.$router.push({name: 'home'}), 'intance.$router.push')
  }
  return data
}, error => {
  // console.log(error, 'errconfig')
  return Promise.reject(error)
})

const get = (url, params) => {
  url = urlEncode(url, {params, ...config.data})
  return axios.get(url, config)
}

const post = (url, params, con) => {
  return axios.post(url, params, config)
}

// 用来拼接get请求的时候的参数
let urlEncode = (url, data) => {
  if (typeof (url) === 'undefined' || url === null || url === '') return ''
  if (typeof (data) === 'undefined' || data === null || typeof (data) !== 'object') return url
  url += (url.indexOf('?') !== -1) ? '' : '?'
  for (let k in data) {
    url += ((url.indexOf('=') !== -1) ? '&' : '') + k + '=' + encodeURI(data[k])
  }
  return url
}

export {
  get,
  post
}
