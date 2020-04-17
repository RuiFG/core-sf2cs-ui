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
    url: `${pre}/oauth/code/${code}`,
    method: 'get',
  })
}
export const getMe = () => {
  return axios.request({
    url: `${pre}/auth/me`,
    method: 'get'
  })
}