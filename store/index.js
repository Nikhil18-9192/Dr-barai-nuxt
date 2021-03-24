import Cookies from 'js-cookie'
export const state = () => ({
  user: false,
  jwt: false,
  loading: false,
  menuState: false,
  notifyModal: false,
  patientModal: false,
})

export const getters = {
  getUser: (state) => {
    return state.user
  },
  getMenuState: (state) => {
    return state.menuState
  },
  getJwt: (state) => state.jwt,
}

export const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_JWT: (state, token) => {
    state.jwt = token
  },
  SET_LOADING: (state) => {
    state.loading = true
  },
  UNSET_LOADING: (state) => {
    state.loading = false
  },
  toggleMenuState(state) {
    state.menuState = !state.menuState
  },
  toggleNotifyModal(state) {
    state.notifyModal = !state.notifyModal
  },
  togglePatientModal(state) {
    state.patientModal = !state.patientModal
  },
}

export const actions = {
  async nuxtClientInit({ commit }, { redirect }) {
    const jwt = await Cookies.get('jwt')
    commit('SET_JWT', jwt)

    if (!jwt) {
      return
    }
    this.$axios.setToken(jwt, 'bearer')
    try {
      const user = await this.$axios.$get('/users/me')
      commit('SET_USER', { email: user.email })
    } catch (error) {
      Cookies.remove('jwt')
      redirect('/login')
    }
  },
}
