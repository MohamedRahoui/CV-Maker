import { GetterTree } from 'vuex'
import { StateInterface } from 'src/store'
import { EducationState } from '@models/education'

const getters: GetterTree<EducationState, StateInterface> = {
  educations (state) {
    return state.educations
  },
  fetchedEducation (state) {
    return state.fetched
  }
}

export default getters
