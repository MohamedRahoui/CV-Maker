import { GetterTree } from 'vuex'
import { StateInterface } from 'src/store'
import { ExperienceState } from '@models/experience'

const getters: GetterTree<ExperienceState, StateInterface> = {
  experiences (state) {
    return state.experiences
  }
}

export default getters
