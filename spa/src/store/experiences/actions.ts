import { ActionTree } from 'vuex'
import { StateInterface } from 'src/store'
import Experience, {
  ExperienceState,
  ExperienceURL
} from 'src/models/experience'
import { API } from 'src/boot/axios'

const actions: ActionTree<ExperienceState, StateInterface> = {
  fetchExperiences ({ commit, state }) {
    if (!state.fetched) {
      return new Promise((resolve, reject) => {
        API.get(ExperienceURL).then(response => {
          commit('fetchExperiences', response.data)
          resolve(response)
        }, error => {
          reject(error)
        })
      })
    }
  },
  updateExperience ({ commit }, experience: Experience) {
    return new Promise((resolve, reject) => {
      API.put(`${ExperienceURL}${experience.id}/`, experience).then(response => {
        commit('updateExperience', response.data)
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  deleteExperience ({ commit }, id: Experience['id']) {
    return new Promise((resolve, reject) => {
      API.delete(`${ExperienceURL}${id}/`).then(response => {
        commit('deleteExperience', id)
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  createExperience ({ commit }, experience: Experience) {
    return new Promise((resolve, reject) => {
      API.post(ExperienceURL, experience).then(response => {
        commit('createExperience', response.data)
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  }
}

export default actions
