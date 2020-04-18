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

export const getNoFacePersonByGatherId = gatherId => {
  return axios.request({
    url: `${pre}/gather/${gatherId}/person/no_face`,
    method: 'get',
  })
}