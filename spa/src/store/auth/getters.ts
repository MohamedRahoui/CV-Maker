import { GetterTree } from 'vuex'
import Auth from 'src/models/auth'
import { StateInterface } from 'src/store'

const getters: GetterTree<Auth, StateInterface> = {
  loggedIn (state) {
    return !!state.token
  },
  token (state) {
    return state.token
  },
  user (state) {
    return state.user
  }
}

export default getters
