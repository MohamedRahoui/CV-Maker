import { MutationTree } from 'vuex'
import { get } from 'lodash'
import Auth from 'src/models/auth'

const mutation: MutationTree<Auth> = {
  login (state: Auth, data) {
    state.user = get(data, 'user', {
      username: '',
      email: ''
    })
    state.token = get(data, 'token', null)
  },
  logout (state) {
    state.user = {
      username: '',
      email: ''
    }
    state.token = ''
  }
}
export default mutation
