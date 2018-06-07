import * as axios from '../common/js/axios.js'
// 比赛列表
const getFooterGuessMatch = params => axios.get('/index.php/match/getIndexMatchList', params)

// 首页信息
const getFooterGuessInfo = params => axios.get('/index.php/match/getIndexTopInfo', params)

// 个人中心信息
const getFooterUserInfo = params => axios.get('/index.php/account/getUserCentral', params)

// 提现页面
// 提款接口
const fetchKiting = params => axios.post('/index.php/finance/drawMoney', params)

// 绑定手机号
const fetchBindPhone = params => axios.get('/index.php/account/bindPhone', params)

// 绑定姓名身份信息
const fetchBindName = params => axios.get('/index.php/account/bindIdentityNo', params)

// 绑定提款账号
const fetchAcount = params => axios.post('/index.php/account/bindDrawAccount', params)

// 获取提款页信息
const fetchKitingInfo = params => axios.post('/index.php/finance/getDrawInfo', params)

// 我的道具页
// 获取我的道具
const fetchMyProps = params => axios.get('/index.php/goods/queryPropsList', params)

// 记录列表页
// 获取记录
const fetchMyList = params => axios.get('/index.php/match/getTopGuessRecordList', params)

// 竞猜内页
// 获取竞猜内页详情
const getMatchDetails = params => axios.get('/index.php/match/getMatchDetails', params)

// 竞猜内页
// 下单接口
const joinGuess = params => axios.get('/index.php/deal/joinGuess', params)

// 竞猜记录接口
const getGuessRecordList = params => axios.post('/index.php/xzmatch/getGuessRecordList', params)

export {
  getFooterGuessMatch,
  getFooterGuessInfo,
  getFooterUserInfo,
  fetchBindPhone,
  fetchBindName,
  fetchAcount,
  fetchMyProps,
  fetchKitingInfo,
  fetchMyList,
  getMatchDetails,
  joinGuess,
  fetchKiting,
  getGuessRecordList
}
