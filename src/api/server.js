import axios from "./index";

const pre = "/server"
export const detect = (file) => {
  let param = new FormData()
  param.append('file', file)
  return axios.request({
    url: `${pre}/detect`,
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data: param
  })
}