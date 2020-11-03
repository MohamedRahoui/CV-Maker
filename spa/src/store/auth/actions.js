export function login({commit}, data) {
    commit('login', data)
}

export function logout({commit}) {
    commit('logout')
}
