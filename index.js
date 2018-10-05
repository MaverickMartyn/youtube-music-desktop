const { app, BrowserWindow, ipcMain } = require('electron')
const { mmGetLyrics } = require('./musixMatch.js')
const { autoUpdater } = require("electron-updater")

autoUpdater.checkForUpdatesAndNotify()
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  
  function createWindow () {
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
  ipcMain.on('app:quit', () => { app.quit() })
  ipcMain.on('app:toggle-maximize', (event, arg) => {
    if (win.isMaximized()) {
      win.unmaximize();
    }
    else {
      win.maximize();
    }
    event.sender.send("app:toggled-maximize", win.isMaximized());
  })
  ipcMain.on('app:minimize', () => { win.minimize() })
  ipcMain.on('app:togglefullscreen', (event, arg) => {
    win.setFullScreen(!win.isFullScreen());
    event.sender.send("app:toggled-fullscreen", win.isFullScreen());
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
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
  