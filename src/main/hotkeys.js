import { globalShortcut } from 'electron'
import store from './../renderer/store'

function hotkeyToAccelerator (hotkey) {
  var accelerator = hotkey.replace('CTRL', 'ControlOrCommand').replace('SHIFT', 'Shift').replace('ALT', 'Alt')
  console.log(accelerator)
  return accelerator
}

store.watch((state) => state.settings.hotkeys, (oldValue, newValue) => {
  globalShortcut.unregisterAll()
  // console.log(newValue)

  if (newValue.playpause.length > 0) {
    console.log('Registering Play/Pause hotkey.')
    globalShortcut.register(hotkeyToAccelerator(newValue.playpause), function () { console.log('playpause hotkey pressed') })
  }
  if (newValue.next.length > 0) {
    console.log('Registering Next hotkey.')
    globalShortcut.register(hotkeyToAccelerator(newValue.next), () => { console.log('next hotkey pressed') })
  }
  if (newValue.previous.length > 0) {
    console.log('Registering Previous hotkey.')
    globalShortcut.register(hotkeyToAccelerator(newValue.previous), () => { console.log('previous hotkey pressed') })
  }
})
