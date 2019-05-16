'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import store from './../renderer/store'
import './YTMInterop'
const log = require('electron-log')

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
log.info('App starting...')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    frame: false,
    show: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.once('ready-to-show', () => {
    // mainWindow.on('enter-html-full-screen', function () {
    //   console.log('Entered full screen from HTML5 API')
    //   store.dispatch('setHtml5Fullscreen', true)
    // })
    mainWindow.on('enter-full-screen', function () {
      console.log('Entered full screen from Electron')
      store.dispatch('setFullscreen', true)
    })
    // mainWindow.on('leave-html-full-screen', function () {
    //   console.log('Left full screen from HTML5 API')
    //   store.dispatch('setHtml5Fullscreen', false)
    // })
    mainWindow.on('leave-full-screen', function () {
      console.log('Left full screen from Electron')
      store.dispatch('setFullscreen', false)
    })
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// Quit app when signal is recieved.
ipcMain.on('win:quit', (event) => {
  console.log('Quitting.')
  BrowserWindow.fromWebContents(event.sender).close()
})
ipcMain.on('win:toggle-maximize', (event) => {
  console.log('Toggling maximization.')
  var bw = BrowserWindow.fromWebContents(event.sender)
  if (bw.isMaximized()) {
    bw.unmaximize()
  } else {
    bw.maximize()
  }
  event.sender.send('win:toggled-maximize', bw.isMaximized())
})
ipcMain.on('win:minimize', (event) => { console.log('Minimizing.'); BrowserWindow.fromWebContents(event.sender).minimize() })
ipcMain.on('win:togglefullscreen', (event, forcedValue) => {
  console.log('Asked to toggle fullscreen.')
  var bw = BrowserWindow.fromWebContents(event.sender)
  if (forcedValue) {
    bw.setFullScreen(forcedValue)
  } else {
    bw.setFullScreen(!bw.isFullScreen())
  }
  event.sender.send('win:toggled-fullscreen', bw.isFullScreen())
})
ipcMain.on('win:toggled-fullscreen', (event, args) => {
  console.log('Toggling fullscreen.')
  mainWindow.webContents.send('win:toggled-fullscreen', args)
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

autoUpdater.on('update-downloaded', (info) => {
  mainWindow.webContensts.send('app:update-downloaded', info)
  // autoUpdater.quitAndInstall()
})

ipcMain.on('update:update-now', (event, forcedValue) => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
