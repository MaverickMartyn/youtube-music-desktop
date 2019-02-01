const state = {
  ytmIsLoggedIn: false,
  isPlaying: false,
  currentTrack: null,
  currentTrackTime: 0,
  isFullscreen: false,
  isHtml5Fullscreen: false,
  displayFullscreenVideoControls: false,
  videoBounds: null
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
  },
  YTM_SET_FULLSCREEN (state, isFullscreen) {
    // Sets whether we are in Electron fullscreen.
    state.isFullscreen = isFullscreen
  },
  YTM_SET_HTML5_FULLSCREEN (state, isHtml5Fullscreen) {
    // Sets whether we are in HTML5 fullscreen.
    state.isHtml5Fullscreen = isHtml5Fullscreen
  },
  YTM_SET_DISPLAY_FULLSCREEN_VIDEO_CONTROLS (state, displayFullscreenVideoControls) {
    state.displayFullscreenVideoControls = displayFullscreenVideoControls
  },
  YTM_SET_VIDEO_BOUNDS (state, videoBounds) {
    state.videoBounds = videoBounds
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
  },
  setFullscreen: ({commit}, payLoad) => {
    commit('YTM_SET_FULLSCREEN', payLoad)
  },
  setHtml5Fullscreen: ({commit}, payLoad) => {
    commit('YTM_SET_HTML5_FULLSCREEN', payLoad)
  },
  setDisplayFullscreenVideoControls: ({commit}, payLoad) => {
    commit('YTM_SET_DISPLAY_FULLSCREEN_VIDEO_CONTROLS', payLoad)
  },
  setVideoBounds: ({commit}, payLoad) => {
    commit('YTM_SET_VIDEO_BOUNDS', JSON.parse(JSON.stringify(payLoad)))
  }
}

export default {
  state,
  mutations,
  actions
}
