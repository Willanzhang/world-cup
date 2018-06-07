const getCookie = function (name) {
  let arr = []
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}

const setCookie = function (name, value) {
  document.cookie = `${name} = ${value};path=/`
}

export {
  getCookie,
  setCookie
}
