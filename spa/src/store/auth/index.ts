import { Module } from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import Auth from 'src/models/auth'
import { StateInterface } from 'src/store'

const auth: Module<Auth, StateInterface> = {
  namespaced: false,
  getters,
  mutations,
  actions,
  state
}
export default auth
