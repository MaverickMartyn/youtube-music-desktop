const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const { mmGetLyrics } = require('./src/musixMatch.js')
const log = require('electron-log');
const { autoUpdater } = require("electron-updater")

  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';
  log.info('App starting...');
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  let settingsWin
  
  function createWindow () {
    autoUpdater.checkForUpdatesAndNotify();
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600, frame: false })
  
    // and load the index.html of the app.
    // win.loadURL(`https://music.youtube.com`)
    win.loadURL(`file://${__dirname}/index.html`)
  
    // Open the DevTools.
    // win.webContents.openDevTools()
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })

    var registered = globalShortcut.register('medianexttrack', function () {
      win.webContents.send("media:next");
    });
    if (!registered) {
      console.log('medianexttrack registration failed');
    } else {
      console.log('medianexttrack registration bound!');
    }
    
    registered = globalShortcut.register('mediaprevioustrack', function () {
      win.webContents.send("media:previous");
    });
    if (!registered) {
      console.log('mediaprevioustrack registration failed');
    } else {
      console.log('mediaprevioustrack registration bound!');
    }
    registered = globalShortcut.register('mediaplaypause', function () {
      win.webContents.send("media:playpause");
    });
    if (!registered) {
      console.log('mediaplaypause registration failed');
    } else {
      console.log('mediaplaypause registration bound!');
    }
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  // Quit app when signal is recieved.
  ipcMain.on('win:quit', (event) => {
    BrowserWindow.fromWebContents(event.sender).close();
  })
  ipcMain.on('win:toggle-maximize', (event) => {
    var bw = BrowserWindow.fromWebContents(event.sender);
    if (bw.isMaximized()) {
      bw.unmaximize();
    }
    else {
      bw.maximize();
    }
    event.sender.send("win:toggled-maximize", bw.isMaximized());
  })
  ipcMain.on('win:minimize', (event) => { BrowserWindow.fromWebContents(event.sender).minimize() })
  ipcMain.on('win:togglefullscreen', (event, forcedValue) => {
    var bw = BrowserWindow.fromWebContents(event.sender)
    if (!!forcedValue) {
      bw.setFullScreen(forcedValue);
    }
    else {
      bw.setFullScreen(!bw.isFullScreen());
    }
    event.sender.send("win:toggled-fullscreen", bw.isFullScreen());
  })
  ipcMain.on('win:toggled-fullscreen', (event, args) => {
    win.webContents.send("win:toggled-fullscreen", args);
  })
  
  ipcMain.on('ytm:track-changed', (event, args) => { mmGetLyrics(args).catch((err) => console.log(err)).then((data) => {
      var parseString = require('xml2js').parseString;
      parseString(data, function (err, result) {
        event.sender.send("mm:lyrics-changed", result)
      });
    });
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })

  ipcMain.on('app:open-settings', (event, arg) => {
    createSettingsWindow();
  })

  function createSettingsWindow () {
    autoUpdater.checkForUpdatesAndNotify();
    // Create the browser window.
    settingsWin = new BrowserWindow({ width: 800, height: 600, frame: false })
  
    // and load the index.html of the app.
    settingsWin.loadURL(`file://${__dirname}/settings.html`)
  
    // Emitted when the window is closed.
    settingsWin.on('closed', () => {
      settingsWin = null
    })
  }