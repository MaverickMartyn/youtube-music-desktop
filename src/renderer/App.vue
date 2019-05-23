<template>
  <v-app :dark="useDarkTheme">
    <window-frame>
      <v-content>
        <main-window v-show="!showSettings" @toggle-show-settings="toggleShowSettings" ref="mainWindow"></main-window>
        <settings-window v-show="showSettings" @toggle-show-settings="toggleShowSettings" ref="settingsWindow"></settings-window>
      </v-content>
    </window-frame>
    <update-dialog ref="updateDialog"></update-dialog>
  </v-app>
</template>

<script>
import WindowFrame from './components/WindowFrame'
import MainWindow from './components/MainWindow'
import SettingsWindow from './components/SettingsWindow'
import UpdateDialog from './components/UpdateDialog.vue'

export default {
  name: 'youtube-music-desktop',
  mounted () {
    setInterval(() => {
      this.$electron.ipcRenderer.send('ping')
    }, 1000)
    this.$refs.updateDialog.show({ version: '2.1', releaseName: 'New UI', releaseNotes: '<p>This is not a real release.<br />Please press anything you want.</p>', releaseDate: '21/05/2018' })

    this.$electron.ipcRenderer.on('app:update-downloaded', (event, data) => {
      // this.$refs
    })
  },
  methods: {
    toggleShowSettings: function () {
      this.showSettings = !this.showSettings
    }
  },
  data: function () {
    return {
      showSettings: false
    }
  },
  computed: {
    useDarkTheme: function () {
      return this.$store.getters.settings.general.darkMode
    }
  },
  components: {
    'window-frame': WindowFrame,
    'main-window': MainWindow,
    'settings-window': SettingsWindow,
    'update-dialog': UpdateDialog
  }
}
</script>

<style>
  html {
    overflow: hidden;
    height: 100vh;
    width: 100vw;
  }

  .v-overlay:before {
    top: 32px;
  }
  /* CSS */
</style>
