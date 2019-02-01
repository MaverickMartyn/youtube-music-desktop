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
      // blacklist: ['ytmIsLoggedIn', 'currentTrack', 'currentTrackTime', 'isFullscreen', 'isHtml5Fullscreen']
      // blacklist: ['ytm']
      // paths: ['ytm']
      // blacklist: (mutation) => {
      //   var mutationsBlacklist = ['YTM_SET_HTML5_FULLSCREEN', 'YTM_SET_FULLSCREEN', 'YTM_SET_CURRENT_TRACK_TIME', 'YTM_SET_CURRENT_TRACK', 'YTM_SET_IS_PLAYING', 'YTM_SET_IS_LOGGED_IN']
      //   if (mutationsBlacklist.includes(mutation.type)) {
      //     console.log('Mutation blocked: ' + mutation.type + '. Value below:')
      //     console.log(mutation)
      //     return true
      //   }
      //   console.log('Mutation blocked: ' + mutation.type + '.')
      //   return false
      // }
      ignoredPaths: ['ytm'],
      blacklist: [
        'YTM_SET_HTML5_FULLSCREEN',
        'YTM_SET_FULLSCREEN',
        'YTM_SET_CURRENT_TRACK_TIME',
        'YTM_SET_CURRENT_TRACK',
        'YTM_SET_IS_PLAYING',
        'YTM_SET_IS_LOGGED_IN',
        'YTM_SET_DISPLAY_FULLSCREEN_VIDEO_CONTROLS'
      ]
    }),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
