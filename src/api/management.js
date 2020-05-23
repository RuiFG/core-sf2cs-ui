import axios from './index'

const pre = "/management"

export const getOnline = () => {
  return axios.request({
    url: `${pre}/recognition/online`,
    method: 'get'
  })
}
export const getHistory = () => {
  return axios.request({
    url: `${pre}/recognition/history`,
    method: 'get'
  })
}
export const getHistoryDetail = (id) => {
  return axios.request({
    url: `${pre}/recognition/history/${id}`,
    method: 'get'
  })
}

export const getPersonByNotInGatherId = gatherId => {
  return axios.request({
    url: `${pre}/gather/${gatherId}/not-in/person`,
    method: 'get',
  })
}

export const getStudentByGatherId = gatherId => {
  return axios.request({
    url: `${pre}/gather/${gatherId}/student`,
    method: 'get',
  })
}

export const getTeacherByGatherId = gatherId => {
  return axios.request({
    url: `${pre}/gather/${gatherId}/teacher`,
    method: 'get',
  })
}

export const getMe = () => {
  return axios.request({
    url: `${pre}/me`,
    method: 'get'
  })
}
export const setMe = (data) => {
  return axios.request({
    url: `${pre}/me`,
    method: 'put',
    data: data
  })
}

export const createGather = (gather) => {
  return axios.request({
    url: `${pre}/admin/gather`,
    method: 'post',
    data: gather
  })
}
export const addGatherManager = (gatherId, personId) => {
  return axios.request({
    url: `${pre}/admin/gather/${gatherId}/manager/${personId}`,
    method: 'post'
  })
}
export const delGatherManager = (gatherId, personId) => {
  return axios.request({
    url: `${pre}/admin/gather/${gatherId}/manager/${personId}`,
    method: 'delete'
  })
}

export const getAdminGathers = () => {
  return axios.request({
    url: `${pre}/admin/gather`,
    method: 'get'
  })
}

export const updatePerson = (id, data) => {
  return axios.request({
    url: `${pre}/admin/person/${id}`,
    method: 'put',
    data: data
  })
}

export const updateGather = (id, gather) => {
  return axios.request({
    url: `${pre}/admin/gather/${id}`,
    method: 'put',
    data: gather
  })
}

export const addGather = (name) => {
  return axios.request({
    url: `${pre}/admin/gather`,
    method: 'post',
    data: {name: name}
  })
}

export const getDevices = () => {
  return axios.request({
    url: `${pre}/admin/device`,
    method: 'get'
  })
}
export const addDevice = (name) => {
  return axios.request({
    url: `${pre}/admin/device`,
    method: 'post',
    data: {name: name}
  })
}

export const getStudentHistory = () => {
  return axios.request({
    url: `${pre}/student/attendance`,
    method: 'get'
  })
}