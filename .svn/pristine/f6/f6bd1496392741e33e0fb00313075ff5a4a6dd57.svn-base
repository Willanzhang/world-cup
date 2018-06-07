import * as axios from '../common/js/axios.js'
// 登录
const getLogin = params => axios.post('/index.php/account/nbaUnioLogin', params)

// 首页信息
const getHomeInfo = params => axios.post('/index.php/nbamatch/getMatchDetails', params)

// 解锁关卡
const openIssuePass = params => axios.post('/index.php/deal/openIssuePass', params)

// 投注
const getJoinGuess = params => axios.post('/index.php/deal/mixJoinGuess', params)

// 获取比赛列表
const getMatchList = params => axios.post('/index.php/nbamatch/getIndexMatchList', params)

export {
  getLogin,
  getHomeInfo,
  getJoinGuess,
  openIssuePass,
  getMatchList
}
