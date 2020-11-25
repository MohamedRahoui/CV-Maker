import { Module } from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import { StateInterface } from 'src/store'
import { EducationState } from '@models/education'

const experiences: Module<EducationState, StateInterface> = {
  namespaced: false,
  getters,
  mutations,
  actions,
  state
}
export default experiences
