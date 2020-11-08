import { MutationTree } from 'vuex'
import Experience, { ExperienceState } from '@models/experience'
import Vue from 'vue'

const mutation: MutationTree<ExperienceState> = {
  addExperience (state: ExperienceState, experience: Experience) {
    state.experiences.unshift(experience)
  },
  deleteExperience (state, id: Experience['id']) {
    state.experiences = state.experiences.filter(x => x.id !== id)
  },
  fetchExperiences (state, experiences: Experience[]) {
    state.experiences = experiences
    state.fetched = true
  },
  updateExperience (state, experience: Experience) {
    Vue.set(
      state.experiences,
      state.experiences.findIndex(x => x.id === experience.id),
      experience
    )
  }
}
export default mutation
