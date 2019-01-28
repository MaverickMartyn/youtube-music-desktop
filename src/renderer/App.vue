<template>
  <v-app :dark="useDarkTheme">
    <window-frame>
      <v-content>
        <router-view></router-view>
      </v-content>
    </window-frame>
    <update-dialog ref="updateDialog"></update-dialog>
  </v-app>
</template>

<script>
  import WindowFrame from './components/WindowFrame'
  import UpdateDialog from './components/UpdateDialog.vue'

  export default {
    name: 'youtube-music-desktop',
    mounted () {
      setInterval(() => {
        this.$electron.ipcRenderer.send('ping')
      }, 1000)
      this.$refs.updateDialog.show({version: '2.1', releaseName: 'New UI', releaseNotes: '<p>This is not a real release.<br />Please press anything you want.</p>', releaseDate: '21/05/2018'})

      this.$electron.ipcRenderer.on('app:update-downloaded', (event, data) => {
        // this.$refs
      })
    },
    methods: {
      // showSettings: function () {
      //   this.$refs.settingsDialog.show()
      // }
    },
    data: function () {
      return {
      }
    },
    computed: {
      useDarkTheme: function () {
        return this.$store.getters.settings.general.darkMode
      }
    },
    components: {
      'window-frame': WindowFrame,
      'update-dialog': UpdateDialog
    }
  }
</script>

<style>
  html {
    overflow: hidden;
  }

  .v-overlay:before {
    top: 32px;
  }
  /* CSS */
</style>
