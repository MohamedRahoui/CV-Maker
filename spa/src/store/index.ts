import { store } from 'quasar/wrappers'
import Vuex, { Store } from 'vuex'
import VuexPersist from 'vuex-persist'
import auth from 'src/store/auth'
import experiences from 'src/store/experiences'
import educations from 'src/store/education'
import Auth from 'src/models/auth'
import { ExperienceState } from 'src/models/experience'

export interface StateInterface {
  auth: Auth;
  experience: ExperienceState;
}

const vuexStorage = new VuexPersist({
  key: 'camipa',
  storage: localStorage,
  reducer: (state: StateInterface) => ({
    auth: {
      token: state.auth.token,
      user: state.auth.user
    }
  })
})
let myStore: Store<StateInterface>
export default store(function ({ Vue }) {
  Vue.use(Vuex)

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      auth,
      experiences,
      educations
    },
    plugins: [vuexStorage.plugin],
    strict: !!process.env.DEBUGGING
  })
  myStore = Store
  return Store
})

export { myStore }
