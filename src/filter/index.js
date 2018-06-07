/**
 * fmt 格式 'yyyy-MM-dd' 'yyyy-MM-dd hh:mm:ss'
 *时间格式化
 */
export let timeFormat = (val, fmt) => {
  let data = new Date(val * 1000)
  let o = {
    'M+': data.getMonth() + 1, // 月份
    'd+': data.getDate(), // 日
    'h+': data.getHours(), // 小时
    'm+': data.getMinutes(), // 分
    's+': data.getSeconds(), // 秒
    'q+': Math.floor((data.getMonth() + 3) / 3), // 季度
    'S': data.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

// 价格过滤器
export let currency = (value, prefix = '', type) => {
  if (value === undefined) {
    return ''
  } else {
    let money = (value / 100).toFixed(2)
    if (type === 2) {
      money = money.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }
    return prefix + money
  }
}

// 某一天的初始化时间
export let getDayInitTime = (value, type) => {
  let tmp = timeFormat(value / 1000, 'yyyy-MM-dd')
  if (type === 1) { // 某天起始时间
    tmp += '-0-0-0'
  } else if (type === 2) { // 某天结束时间
    tmp += '-23-59-59'
  }
  tmp = tmp.split('-').map(v => Number(v))
  return new Date(tmp[0], tmp[1] - 1, tmp[2], tmp[3], tmp[4], tmp[5]).getTime()
}

// 性别过滤器
export let sexFilter = (value) => {
  let sexStr = ''
  switch (value) {
    case 0:
      sexStr = '默认'
      break
    case 1:
      sexStr = '男'
      break
    case 2:
      sexStr = '女'
      break
    default:
      sexStr = '未知'
      break
  }
  return sexStr
}
// 比赛过滤器
export let matchStateType = (value, matchTime) => {
  let sexStr = ''
  switch (value) {
    case 0:
      sexStr = timeFormat(matchTime, 'M/d hh:mm')
      break
    case 1:
      sexStr = '第一节'
      break
    case 2:
      sexStr = '第二节'
      break
    case 3:
      sexStr = '第三节'
      break
    case 4:
      sexStr = '第四节'
      break
    case 5:
      sexStr = '中场休息'
      break
    case 6:
      sexStr = '全场结束'
      break
    case 7:
      sexStr = '加时赛1'
      break
    case 8:
      sexStr = '加时赛2'
      break
    case 9:
      sexStr = '加时赛3'
      break
    default:
      sexStr = '未开赛'
      break
  }
  return sexStr
}

// 证件过滤器
export let idTypeFilter = (value) => {
  let idTypeStr = ''
  switch (value) {
    case 0:
      idTypeStr = '默认'
      break
    case 1:
      idTypeStr = '身份证'
      break
    case 2:
      idTypeStr = '其他'
      break
    default:
      idTypeStr = '未知'
      break
  }
  return idTypeStr
}

export let getNow = (useTime) => { // 获取的是否是今天...
  console.log(useTime)
  let uTime = parseInt(useTime) * 1000
  let nowTime = new Date()
  let chineaseData = ''
  let mistiming = Math.abs(uTime - nowTime)
  let day = new Date(uTime).getDate() - nowTime.getDate()
  if (mistiming > 1209600000) {
    chineaseData = timeFormat(useTime, 'yyyy-mm-dd')
    // chineaseData = ''
  } else {
    switch (day) {
      case 0:
        chineaseData = '今天'
        break
      case 1:
        chineaseData = '明天'
        break
      case 2:
        chineaseData = '后天'
        break
      default:
        chineaseData = timeFormat(useTime, 'yyyy-mm-dd')
        break
    }
  }
  return chineaseData
}

// 现在距离比赛的时间 h
export let distanceNow = (matchTime) => {
  let nowTime = (new Date().getTime()) / 1000
  let hourTime
  if (nowTime >= matchTime) {
    hourTime = -1
    return hourTime
  } else {
    hourTime = matchTime / 3600 - nowTime / 3600
    return Math.ceil(hourTime)
  }
}
