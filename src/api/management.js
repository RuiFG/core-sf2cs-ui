import axios from './index'

const pre = "/management"
export const updatePerson = (id, data) => {
  return axios.request({
    url: `${pre}/person/${id}`,
    method: 'post',
    data: data
  })
}

export const getOnline = () => {
  return axios.request({
    url: `${pre}/recognition/online`,
    method: 'get'
  })
}