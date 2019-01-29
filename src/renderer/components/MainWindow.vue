<template>
  <div>
    <webview id="ytm_webview" src="https://music.youtube.com" :preload="preload"></webview>
    <v-flex id="ui_buttons" :class="'d-flex' + ((!this.isLoggedIn) ? ' btns-logged-out' : '')">
      <lyricsovh-lyrics-btn v-if="isLyricsOvhLyricsEnabled" @lyricsovh-toggle-lyrics="lyricsOvhToggle"></lyricsovh-lyrics-btn>
      <musixmatch-lyrics-btn v-if="isMusixMatchEnabled" @musixmatch-toggle-lyrics="musixMatchToggle"></musixmatch-lyrics-btn>
      <settings-window-btn></settings-window-btn>
    </v-flex>
    <musixmatch-lyrics ref="musixMatchLyrics" v-if="isMusixMatchEnabled"></musixmatch-lyrics>
    <lyricsovh-lyrics ref="lyricsOvhLyrics" v-if="isLyricsOvhLyricsEnabled"></lyricsovh-lyrics>
  </div>
</template>

<script>
  import MusixMatchBtn from './MusixMatchLyricsBtn.vue'
  import LyricsOvhLyricsBtn from './LyricsOvhLyricsBtn.vue'
  import SettingsWindowBtn from './SettingsWindowBtn.vue'
  import MusixMatchLyrics from './Lyrics/MusixMatch'
  import LyricsOvhLyrics from './Lyrics/LyricsOvhLyrics'
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
      },
      isLyricsOvhLyricsEnabled: function () {
        return this.$store.state.settings.lyrics.lyricsOvh.enabled
      }
    },
    components: {
      'musixmatch-lyrics-btn': MusixMatchBtn,
      'lyricsovh-lyrics-btn': LyricsOvhLyricsBtn,
      'settings-window-btn': SettingsWindowBtn,
      'musixmatch-lyrics': MusixMatchLyrics,
      'lyricsovh-lyrics': LyricsOvhLyrics
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      musixMatchToggle () {
        this.$refs.musixMatchLyrics.toggle()
      },
      lyricsOvhToggle () {
        this.$refs.lyricsOvhLyrics.toggle()
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
  #ui_buttons {
    position: absolute;
    top: 9px;
    right: 56px;
    min-width: 200px;
    flex-direction: row;
    justify-content: flex-end;
  }

  #ui_buttons > div {
    max-width: fit-content;
  }

  .btns-logged-out {
    right: calc(56px + 96px) !important;
  }
</style>
