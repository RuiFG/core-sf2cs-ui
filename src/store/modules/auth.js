import * as managementAPI from '_api/management'
import * as authAPI from '_api/authorization'
import {Role} from '_u/role'
import _ from 'lodash'
import * as util from '_u/util'

const state = {
  token: null,
  // 授权信息，来源于 checkToken
  user: null,
  role: [],
  person: null
}
const getters = {
  isAuth: state => {
    return (state.token !== null && state.user !== null && state.person !== null)
  },
  role: state => {
    return state.role[0]
  },
  token: state => {
    return state.token
  },
  username: state => {
    return state.person.alias
  },
  me: state => {
    return state.person
  },
  avatar: state => {
    return util.toAvatarSrc(state.person.avatar)
  }
}
const mutations = {
  SET_TOKEN(state, params) {
    state.token = params
  },
  SET_USER(state, user) {
    state.user = user
    state.role = []
    user.authorities.forEach((item) => {
      if (_.has(Role, item)) {
        state.role.push(Role[item])
      }
    })
    state.token = user.accessToken
    console.log(state.token)
  },
  SET_PERSON(state, person) {
    state.person = person
  },
  // logout
  LOGOUT(state) {
    state.token = null
    state.user = null
    state.person = null
    state.role = []
  }

}
const actions = {
  login(store, {data}) {
    return new Promise((resolve, reject) => {
      authAPI.login(data)
        .then(data => {
          store.commit('SET_USER', data.user)
          store.commit('SET_PERSON', data.person)
          resolve(data);
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getUser(store) {
    return new Promise((resolve, reject) => {
      authAPI.getMe()
        .then(data => {
          store.commit('SET_USER', data)
          resolve(data);
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getPerson(store) {
    return new Promise(((resolve, reject) => {
      managementAPI.getMe().then(data => {
        store.commit('SET_PERSON', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    }))
  },
  logout({commit}) {
    commit('LOGOUT')
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}