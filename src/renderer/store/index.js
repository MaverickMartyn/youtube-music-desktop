import Vue from 'vue'
import Vuex from 'vuex'

// import { createPersistedState, createSharedMutations } from 'vuex-electron'
import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState({
      blacklist: ['ytmIsLoggedIn', 'currentTrack', 'currentTrackTime']
    }),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
