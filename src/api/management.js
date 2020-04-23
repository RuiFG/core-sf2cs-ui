import axios from './index'

const pre = "/management"
export const updatePerson = (id, data) => {
  return axios.request({
    url: `${pre}/person/${id}`,
    method: 'put',
    data: data
  })
}

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

export const getPersonByGatherId = gatherId => {
  return axios.request({
    url: `${pre}/gather/${gatherId}/person`,
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