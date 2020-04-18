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
export const arrayToBase64 = (buffer) => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  console.log(bytes)
  for (var i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}
export const base64ToArray = (base64) => {
  var binary_string = window.atob(base64)
  var len = binary_string.length
  var bytes = new Uint8Array(len)
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i)
  }
  return Array.prototype.slice.call(bytes);
}

export const formatTime = (localTime) => {
  return localTime.substring(0, localTime.length - 7).replace("T", " ")
}

import _ from 'lodash'

export const toRecognitionResult = (data) => {
  let recognitionResult = {}
  if (_.isString(data)) {
    data = JSON.parse(data)
  }
  recognitionResult.id = data.id
  recognitionResult.persons = []
  if (!_.isEmpty(data.persons)) {
    data.persons.forEach((value) => {
      let person = {}
      person.id = value.personId
      person.faceImg = 'data:image/png;base64,' + arrayToBase64(value.faceImgData)
      person.compareScore = value.compareScore
      recognitionResult.persons.push(person)
    })
  }
  return recognitionResult
}