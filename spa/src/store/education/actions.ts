import { ActionTree } from 'vuex'
import { StateInterface } from 'src/store'
import Education, {
  EducationState,
  EducationURL
} from 'src/models/education'
import { API } from 'src/boot/axios'

const actions: ActionTree<EducationState, StateInterface> = {
  fetchEducations ({ commit, state }) {
    if (!state.fetched) {
      return new Promise((resolve, reject) => {
        API.get(EducationURL).then(response => {
          commit('fetchEducations', response.data)
          resolve(response.data)
        }, error => {
          reject(error)
        })
      })
    }
  },
  updateEducation ({ commit }, education: Education) {
    return new Promise((resolve, reject) => {
      API.put(`${EducationURL}/${education.id}`, education).then(response => {
        commit('updateEducation', response.data)
        resolve(response.data)
      }, error => {
        reject(error)
      })
    })
  },
  deleteEducation ({ commit }, id: Education['id']) {
    return new Promise((resolve, reject) => {
      API.delete(`${EducationURL}/${id}`).then(response => {
        commit('deleteEducation', id)
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  createEducation ({ commit }, education: Education) {
    return new Promise((resolve, reject) => {
      API.post(EducationURL, education).then(response => {
        commit('addEducation', response.data)
        resolve(response.data)
      }, error => {
        reject(error)
      })
    })
  }
}

export default actions
