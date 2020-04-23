import Vue from 'vue'
import axios from 'axios'
import store from '_store'
import {baseURL} from '_api/config'

import * as util from '_u/util'

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    // 请求队列
    this.queue = {}
  }

  /**
   * 请求的全局配置
   *
   * @returns {{headers: {}, baseURL: *}}
   */
  getGlobalConfig() {
    return {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
  }

  /**
   * 队列销毁
   *
   * @param url
   */
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // iView.Spin.hide()
    }
  }

  /**
   * 拦截器
   *
   * @param instance 实例
   * @param url
   */
  interceptors(instance, url) {
    // 请求拦截器
    instance.interceptors.request.use(config => {
      if (Object.keys(this.queue).length) {
        // iView.Spin.show()
      }
      this.queue[url] = true
      // 如果有token 在header里加authorization
      if (store.getters['auth/isAuth']) {
        config.headers.Authorization = 'Bearer ' + store.getters['auth/token']
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截器
    instance.interceptors.response.use(res => {
      this.destroy(url)
      return res.data
    }, error => {
      this.destroy(url)
      let message = '未知错误'
      console.log(error)
      if (typeof (error.response) === 'undefined') {
        message = '未经授权:访问由于凭据无效被拒绝'
        util.routeToName("logout")
        this.queue = {}
      } else {
        switch (error.response.status) {
          case 400:
            message = '请求错误:'
            break
          case 401:
            message = '未经授权:'
            util.routeToName("logout")
            this.queue = {}
            break
          case 403:
            message = '鉴权失败:'
            break
          case 404:
            message = '资源未找到:'
            break
          case 500:
            message = '服务错误:'
            break
        }
        message += Vue.prototype._.get(error, "response.data", "未知")
      }
      Vue.prototype.$message(message, 'error')
      return Promise.reject(error.response)
    })
  }

  /**
   * 创建请求实例
   *
   * @param options 请求参数
   * @returns {*} 结果
   */
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getGlobalConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest