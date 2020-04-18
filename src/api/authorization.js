import axios from './index'

const pre = "/authorization"
/**
 * 保存或者更新
 *
 * @returns {Promise<unknown>}
 * @param code
 */
export const postAccessToken = (code) => {
  return axios.request({
    url: `${pre}/code/${code}`,
    method: 'get',
  })
}
export const getMe = () => {
  return axios.request({
    url: `${pre}/me`,
    method: 'get'
  })
}