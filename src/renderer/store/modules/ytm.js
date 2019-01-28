const state = {
  ytmIsLoggedIn: false,
  isPlaying: false,
  currentTrack: null,
  currentTrackTime: 0
}

const mutations = {
  YTM_SET_IS_LOGGED_IN (state, isLoggedIn) {
    state.ytmIsLoggedIn = isLoggedIn
  },
  YTM_SET_IS_PLAYING (state, isPlaying) {
    state.isPlaying = isPlaying
  },
  YTM_SET_CURRENT_TRACK (state, currentTrack) {
    // Sets the current track
    state.currentTrack = currentTrack
  },
  YTM_SET_CURRENT_TRACK_TIME (state, currentTrackTime) {
    // Sets the current positin in the curent track
    // if (state.currentTrack !== null) {
    state.currentTrackTime = currentTrackTime
    // }
  }
}

const actions = {
  setIsLoggedIn: ({commit}, payLoad) => {
    commit('YTM_SET_IS_LOGGED_IN', payLoad)
  },
  setIsPlaying: ({commit}, payLoad) => {
    commit('YTM_SET_IS_PLAYING', payLoad)
  },
  setCurrentTrack: ({commit}, payLoad) => {
    commit('YTM_SET_CURRENT_TRACK', payLoad)
  },
  setCurrentTrackTime: ({commit}, payLoad) => {
    commit('YTM_SET_CURRENT_TRACK_TIME', payLoad)
  }
}

export default {
  state,
  mutations,
  actions
}
