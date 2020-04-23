import axios from './index'

const pre = "/authorization"
/**
 * 保存或者更新
 *
 * @returns {Promise<unknown>}
 * @param code
 */
export const login = (data) => {
  return axios.request({
    url: `${pre}/login`,
    method: 'post',
    data: data
  })
}

export const getMe = () => {
  return axios.request({
    url: `${pre}/me`,
    method: 'get'
  })
}