import { ActionTree } from 'vuex'
import Auth from 'src/models/auth'
import { StateInterface } from 'src/store'

const actions: ActionTree<Auth, StateInterface> = {
  login ({ commit }, data) {
    commit('login', data)
  },
  logout ({ commit }) {
    commit('logout')
  }
}

export default actions
