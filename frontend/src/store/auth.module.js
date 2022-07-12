// authentication

import AuthService from '../services/auth.service'
const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      try {
        const res = await AuthService.login(user)
        commit('loginSuccess', res)
        return res
      } catch (error) {
        commit('loginFailure')
        return error
      }
    },
    logout({ commit }) {
      AuthService.logout()
      commit('logout')
    },
    async register({ commit }, user) {
      const res = await AuthService.register(user)
      try {
        commit('registerSuccess')
        return res.data
      } catch (error) {
        commit('registerFailure')
        return error
      }
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    loginFailure(state) {
      state.status.loggedIn = false
      state.user = null
    },
    logout(state) {
      state.status.loggedIn = false
      state.user = null
    },
    registerSuccess(state) {
      state.status.loggedIn = false
    },
    registerFailure(state) {
      state.status.loggedIn = false
    },
  },
}
