const state = {
  general: {
    startWithWindows: false,
    darkMode: true
  },
  lyrics: {
    musixmatch: {
      enabled: true,
      subtitlesStyle: false
    },
    lyricsOvh: {
      enabled: false,
      subtitlesStyle: false
    }
  },
  lastfm: {
    enabled: false
  },
  hotkeys: {
    enabled: true,
    playpause: 'CTRL + ALT + L'
  },
  about: {
    version: '2.1',
    author: 'Martyn Aaby Finnerup',
    releaseNotes: '<p>Test release.<br />Not a real release.</p>',
    releaseDate: '12/05/2018'
  }
}

const mutations = {
  UPDATE_GENERAL (state, newSettings) {
    Object.assign(state.general, newSettings)
  },
  UPDATE_LYRICS (state, newSettings) {
    Object.assign(state.lyrics, newSettings)
  },
  UPDATE_LASTFM (state, newSettings) {
    Object.assign(state.lastfm, newSettings)
  },
  UPDATE_ABOUT (state, newSettings) {
    Object.assign(state.about, newSettings)
  },
  UPDATE_SETTINGS: function (state, {field, value}) {
    Object.assign(state, {
      [field]: value
    })
  }
}

const actions = {
  updateGeneral: ({commit}, payLoad) => {
    commit('UPDATE_GENERAL', payLoad)
  },
  updateLyrics: ({commit}, payLoad) => {
    commit('UPDATE_LYRICS', payLoad)
  },
  updateLastFM: ({commit}, payLoad) => {
    commit('UPDATE_LASTFM', payLoad)
  },
  updateAbout: ({commit}, payLoad) => {
    commit('UPDATE_ABOUT', payLoad)
  },
  updateSettings: ({commit}, payLoad) => {
    commit('UPDATE_SETTINGS', payLoad)
  }
}

const getters = {
  settings (state) {
    return JSON.parse(JSON.stringify(state))
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
