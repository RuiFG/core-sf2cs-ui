import * as authAPI from '_api/authorization'
import {Role} from '_u/role'
import * as util from '_u/util'

import _ from 'lodash'

const state = {
  token: null,
  // 授权信息，来源于 checkToken
  auth: null,
  role: []
}
const getters = {
  isAuth: state => {
    return (state.token !== null && state.auth !== null) && (state.me !== null)
  },
  role: state => {
    return state.role[0]
  },
  token: state => {
    return state.token
  },
  username: state => {
    return state.auth.alias
  },
  me: state => {
    return state.auth
  },
  avatar: state => {
    let avatar = state.auth.faceData
    if (avatar == null) {
      return "~@/assets/avatar.png"
    } else {
      return 'data:image/png;base64,' + avatar;
    }
  }
}
const mutations = {
  SET_TOKEN(state, params) {
    state.token = params
  },
  SET_AUTH(state, auth) {
    state.auth = auth
    state.role = []
    auth.authorities.forEach((item) => {
      if (_.has(Role, item)) {
        state.role.push(Role[item])
      }
    })
    state.token = auth.accessToken
  },
  // logout
  LOGOUT(state) {
    state.token = null
    state.auth = null
    state.role = []
  }

}
const actions = {
  getToken(store, {code}) {
    return new Promise((resolve, reject) => {
      authAPI.postAccessToken(code)
        .then(data => {
          store.commit('SET_AUTH', data)
          resolve(data);
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getMe(store) {
    return new Promise(((resolve, reject) => {
      authAPI.getMe().then(data => {
        store.commit('SET_AUTH', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    }))
  },
  logout({commit}) {
    commit('LOGOUT')
    util.routeToName("index")
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}