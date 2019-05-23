import { globalShortcut } from 'electron'
import store from './../renderer/store'

function hotkeyToAccelerator (hotkey) {
  var accelerator = hotkey
    .replace('CTRL', 'CommandOrControl')
    .replace('SHIFT', 'Shift')
    .replace('SUPER', 'Super')
    .replace('ALT', 'Alt')
    // Most numpad keys are not working. Leaving it in case that changes.
    // .replace('NumpadDecimal', 'numdec')
    // .replace('NumpadAdd', 'numadd')
    // .replace('NumpadSubtract', 'numsub')
    // .replace('NumpadMultiply', 'nummult')
    // .replace('NumpadDivide', 'numdiv')
    // .replace('Numpad', 'num')
    .replace('NumpadEnter', 'Enter')
    .replace(/\s/g, '')
  console.log(accelerator)
  return accelerator
}

export default { initializeHotKeys, hotkeyToAccelerator }

function initializeHotKeys (mainWindow) {
  store.watch((state) => state.settings.hotkeys, (oldValue, newValue) => {
    registerAllKeys(mainWindow, newValue)
  })
  registerAllKeys(mainWindow, store.state.settings.hotkeys)
}

function registerAllKeys (mainWindow, hotKeySettings) {
  var hotkeys = [
    {
      action: 'playpause',
      func: function () {
        mainWindow.webContents.send('media:playpause')
        console.log('playpause hotkey pressed')
      }
    },
    {
      action: 'next',
      func: function () {
        mainWindow.webContents.send('media:next')
        console.log('next hotkey pressed')
      }
    },
    {
      action: 'previous',
      func: function () {
        mainWindow.webContents.send('media:previous')
        console.log('previous hotkey pressed')
      }
    },
    {
      action: 'like',
      func: function () {
        mainWindow.webContents.send('ytm:like')
        console.log('like hotkey pressed')
      }
    },
    {
      action: 'dislike',
      func: function () {
        mainWindow.webContents.send('ytm:dislike')
        console.log('dislike hotkey pressed')
      }
    }
  ]

  try {
    globalShortcut.unregisterAll()

    hotkeys.forEach(hotkey => {
      if (hotKeySettings.enabled && hotKeySettings[hotkey.action] && hotKeySettings[hotkey.action].length > 0) {
        console.log('Registering ' + hotkey.action + ' hotkey.')
        var registered = globalShortcut.register(hotkeyToAccelerator(hotKeySettings[hotkey.action]), hotkey.func)
        console.log(hotkey.action + ' hotkey registration ' + ((registered) ? 'bound.' : 'failed.'))
      }

      switch (hotkey.action) {
        case 'playpause':
          console.log('Registering ' + hotkey.action + ' media key.')
          registered = globalShortcut.register('MediaPlayPause', hotkey.func)
          console.log(hotkey.action + '  media key registration ' + ((registered) ? 'bound.' : 'failed.'))
          break

        case 'next':
          console.log('Registering ' + hotkey.action + ' media key.')
          registered = globalShortcut.register('MediaNextTrack', hotkey.func)
          console.log(hotkey.action + '  media key registration ' + ((registered) ? 'bound.' : 'failed.'))
          break

        case 'previous':
          console.log('Registering ' + hotkey.action + ' media key.')
          registered = globalShortcut.register('MediaPreviousTrack', hotkey.func)
          console.log(hotkey.action + '  media key registration ' + ((registered) ? 'bound.' : 'failed.'))
          break

        default:
          break
      }
    })
  } catch (err) {
    // Invalid hotkey given.
    console.log('Invalid hotkey given.')
    globalShortcut.unregisterAll()
    // TODO: Inform user of failed hotkey registration, or retry.
  }
}
