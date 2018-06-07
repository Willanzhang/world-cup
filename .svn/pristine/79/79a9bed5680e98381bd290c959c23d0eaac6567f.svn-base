// import * as api from 'api/home'
import * as types from './mutation-types'
// Promise
// const setUserInfo = ({commit, state}, userInfo) => {
//   // api.getHomeInfo
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       commit(types.SET_LKEY, '888')
//       reject(new Error('再见'))
//       console.log('lkey', '888')
//     }, 5000)
//   })
// }
// const geMyInfo = ({commit, dispatch}, myInfo) => {
//   dispatch('setUserInfo').then((res) => {
//     commit(types.SET_LKEY, '999')
//     console.log('999')
//   }, (err) => {
//     console.log('reject', err)
//   })
// }

// async await
async function setUserInfo ({commit, state}, userInfo) {
  commit(types.SET_LKEY, await asyncFunc1())
}
async function geMyInfo ({commit, dispatch}, myInfo) {
  // setUserInfo 字符串
  await dispatch('setUserInfo')
  commit(types.SET_LKEY, await asyncFunc2())
}
const asyncFunc1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('6666')
    }, 5000)
  })
}
const asyncFunc2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('7777')
    }, 5000)
  })
}

console.log(typeof setUserInfo, 'setUserInfo')
export {
  setUserInfo,
  geMyInfo
}
