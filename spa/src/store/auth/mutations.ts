import { MutationTree } from 'vuex'
import { get } from 'lodash'
import Auth from 'src/models/auth'
import User from '@models/user'

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
  },
  updateUser (state: Auth, user: User) {
    state.user = user
  }
}
export default mutation
