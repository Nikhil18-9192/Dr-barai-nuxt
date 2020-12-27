import Cookies from 'js-cookie'
export const state = () => ({
  user: false,
  jwt: false,
  addPatientModal: false,
  patients: [],
  loading: false,
})

export const getters = {
  getUser: (state) => {
    return state.user
  },
  getPatients: (state) => {
    return state.patients
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
    state.addPatientModal = !state.addPatientModal
  },
  SET_PATIENTS: (state, patients) => {
    state.patients = patients
  },
  ADD_NEW_PATIENT: (state, patient) => {
    state.patients.unshift(patient)
  },
  SET_LOADING: (state) => {
    state.loading = true
  },
  UNSET_LOADING: (state) => {
    state.loading = false
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
      this.$toast.error(error.message)
    }
  },
}
