import Cookies from 'js-cookie'
export const state = () => ({
  user: false,
  jwt: false,
  addPatientModal: false,
})

export const getters = {
  getUser: (state) => {
    return state.user
  },
}

export const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_JWT: (state, token) => {
    state.jwt = token
  },
  TOGGALE_PATIENT_MODAL: (state) => {
    console.log('test')
    state.addPatientModal = !state.addPatientModal
  },
}

export const actions = {
  async nuxtClientInit({ commit }, { redirect }) {
    const jwt = await Cookies.get('jwt')
    if (!jwt) {
      return
    }
    this.$axios.setToken(jwt, 'bearer')
    try {
      const user = await this.$axios.$get('/users/me')
      commit('SET_USER', { email: user.email })
      commit('SET_JWT', jwt)
    } catch (error) {
      console.error(error.message)
    }
  },
}
