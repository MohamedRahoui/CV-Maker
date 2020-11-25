import { GetterTree } from 'vuex'
import { StateInterface } from 'src/store'
import { ExperienceState } from '@models/experience'

const getters: GetterTree<ExperienceState, StateInterface> = {
  experiences (state) {
    return state.experiences
  },
  fetchedExperiences (state) {
    return state.fetched
  }
}

export default getters
