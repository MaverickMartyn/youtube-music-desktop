// import { ipcMain, ipcRenderer } from 'electron'
import { ipcMain } from 'electron'
import store from './../renderer/store'

/**
 *  Handles incoming events from YouTube Music
 **/
// exports.functionnamehere = function (parameterhere) {
// }

ipcMain.on('ytm:isLoggedInChanged', function (e, isLoggedIn) {
  store.dispatch('setIsLoggedIn', isLoggedIn)
  // ipcRenderer.send('console-log', isLoggedIn, store.state.ytm.ytmIsLoggedIn)
  // console.log('setIsLoggedIn should now be ' + isLoggedIn)
})

ipcMain.on('ytm:displayFullscreenVideoControlsChanged', function (e, displayFullscreenVideoControls) {
  store.dispatch('setDisplayFullscreenVideoControls', displayFullscreenVideoControls)
})

ipcMain.on('ytm:play', function (e, args) {
  store.dispatch('setIsPlaying', true)
  // console.log('isPlaying should now be true')
})

ipcMain.on('ytm:pause', function (e, args) {
  store.dispatch('setIsPlaying', false)
  // console.log('isPlaying should now be false')
})

ipcMain.on('ytm:timeupdated', function (e, args) {
  store.dispatch('setCurrentTrackTime', args)
  // console.log('Current track time:')
  // console.log(args)
})

ipcMain.on('ytm:trackChanged', function (e, args) {
  store.dispatch('setCurrentTrack', args)
  // console.log('Current track:')
  // console.log(args)
})

ipcMain.on('ytm:updateVideoBounds', function (e, videoBounds) {
  store.dispatch('setVideoBounds', videoBounds)
})

// ipcRenderer.send('console-log', 'test', 'test2')
