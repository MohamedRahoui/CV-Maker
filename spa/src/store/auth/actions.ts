import { ActionTree } from 'vuex'
import Auth from 'src/models/auth'
import { StateInterface } from 'src/store'
import { API } from 'src/boot/axios'
import User, { ProfileURL } from 'src/models/user'

const actions: ActionTree<Auth, StateInterface> = {
  login ({ commit }, data) {
    commit('login', data)
  },
  logout ({ commit }) {
    commit('logout')
  },
  updateUser ({ commit }, user: User) {
    return new Promise((resolve, reject) => {
      API.patch(`${ProfileURL}/${user.id}`, user).then(response => {
        commit('updateUser', response.data)
        resolve(response.data)
      }, error => {
        reject(error)
      })
    })
  },
  patchProfile ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      API.patch(`${ProfileURL}/${payload.id}`, payload.data).then(response => {
        commit('updateUser', response.data)
        resolve(response.data)
      }, error => {
        reject(error)
      })
    })
  }
}

export default actions
