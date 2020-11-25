import { MutationTree } from 'vuex'
import Vue from 'vue'
import Education, { EducationState } from '@models/education'

const mutation: MutationTree<EducationState> = {
  addEducation (state, education: Education) {
    state.educations.unshift(education)
  },
  deleteEducation (state, id: Education['id']) {
    state.educations = state.educations.filter(x => x.id !== id)
  },
  fetchEducations (state, educations: Education[]) {
    state.educations = educations
    state.fetched = true
  },
  updateEducation (state, education: Education) {
    Vue.set(
      state.educations,
      state.educations.findIndex(x => x.id === education.id),
      education
    )
  }
}
export default mutation
