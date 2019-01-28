<template>
  <div>
    <webview id="ytm_webview" src="https://music.youtube.com" :preload="preload"></webview>
    <musixmatch-lyrics-btn v-if="isMusixMatchEnabled" @musixmatch-toggle-lyrics="musixMatchToggle"></musixmatch-lyrics-btn>
    <settings-window-btn></settings-window-btn>
    <musixmatch-lyrics ref="musixMatchLyrics" v-if="isMusixMatchEnabled"></musixmatch-lyrics>
  </div>
</template>

<script>
  import MusixMatchBtn from './MusixMatchLyricsBtn.vue'
  import SettingsWindowBtn from './SettingsWindowBtn.vue'
  import MusixMatchLyrics from './Lyrics/MusixMatch'
  // const { ipcRenderer } = require('electron')

  export default {
    name: 'main-window',
    mounted () {
      var webview = document.getElementById('ytm_webview')
      var that = this
      webview.addEventListener('ipc-message', function (event) {
        // console.log(event.channel + ' with args:')
        // console.log(event.args)
        var args = event.args
        that.$electron.ipcRenderer.send(event.channel, ...args)
        // if (event.channel === 'isLoggedInChanged') {
        //   console.log('Setting isloggedin to ' + event.args[0])

        //   that.$store._modules.root._children.ytm.context.dispatch('setIsLoggedIn', event.args[0])
        // }
      })
    },
    data: function () {
      return {
        preload: `file:${require('path').resolve(__dirname, '../YTMInterop.js')}`
      }
    },
    computed: {
      isLoggedIn: function () {
        return this.$store.state.ytm.ytmIsLoggedIn
      },
      isMusixMatchEnabled: function () {
        return this.$store.state.settings.lyrics.musixmatch.enabled
      }
    },
    components: {
      'musixmatch-lyrics-btn': MusixMatchBtn,
      'settings-window-btn': SettingsWindowBtn,
      'musixmatch-lyrics': MusixMatchLyrics
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      musixMatchToggle () {
        this.$refs.musixMatchLyrics.toggle()
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  body {
    margin: 0;
    padding: 0;
    #ytm_webview {
      width: 100vw;
      height: calc(100vh - 32px);
    }
  }
</style>
