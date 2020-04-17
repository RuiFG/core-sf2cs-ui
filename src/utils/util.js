import router from '_router'

export const getQueryString = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return null
}
export const routeToName = (name, params) => {
  router.push({name: name, params: params})
}
export const routeBack = () => {
  router.back()
}
//转换图片使用
export const arrayBufferToBase64 = (buffer) => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (var i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return 'data:image/png;base64,' + window.btoa(binary);
}

export const formatTime = (localTime) => {
  return localTime.substring(0, localTime.length - 7).replace("T", " ")
}