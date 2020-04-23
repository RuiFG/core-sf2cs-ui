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

export const toAvatarSrc = (name) => {
  return `api/img/avatar/${name}`
}
export const toFaceSrc = (name) => {
  return `api/img/face/${name}`
}