<template>
  <div>
    <webview id="ytm_webview" :class="(this.isFullscreen) ? ' fullscreen' : ''" src="https://music.youtube.com" :preload="preload"></webview>
    <v-flex :class="'d-flex ui_buttons' + ((!this.isLoggedIn) ? ' btns-logged-out' : '') + ((this.isHtml5Fullscreen) ? ' htmlfullscreen' : '') + ((!this.displayFullscreenVideoControls) ? ' hidden' : '')">
      <apiseeds-lyrics-btn v-if="isApiSeedsLyricsEnabled" @apiseeds-toggle-lyrics="apiSeedsLyricsToggle"></apiseeds-lyrics-btn>
      <lyricsovh-lyrics-btn v-if="isLyricsOvhLyricsEnabled" @lyricsovh-toggle-lyrics="lyricsOvhToggle"></lyricsovh-lyrics-btn>
      <!-- <musixmatch-lyrics-btn v-if="isMusixMatchEnabled" @musixmatch-toggle-lyrics="musixMatchToggle"></musixmatch-lyrics-btn> -->
      <settings-window-btn @toggle-show-settings="toggleShowSettings"></settings-window-btn>
    </v-flex>
    <!-- <musixmatch-lyrics ref="musixMatchLyrics" v-if="isMusixMatchEnabled"></musixmatch-lyrics> -->
    <lyricsovh-lyrics ref="lyricsOvhLyrics" v-if="isLyricsOvhLyricsEnabled"></lyricsovh-lyrics>
    <apiseeds-lyrics ref="apiSeedsLyrics" v-if="isApiSeedsLyricsEnabled"></apiseeds-lyrics>
  </div>
</template>

<script>
// import MusixMatchBtn from './MusixMatchLyricsBtn.vue'
import LyricsOvhLyricsBtn from './LyricsOvhLyricsBtn.vue'
import ApiSeedsLyricsBtn from './ApiSeedsLyricsBtn.vue'
import SettingsWindowBtn from './SettingsWindowBtn.vue'
// import MusixMatchLyrics from './Lyrics/MusixMatch'
import LyricsOvhLyrics from './Lyrics/LyricsOvhLyrics'
import ApiSeedsLyrics from './Lyrics/ApiSeedsLyrics'
// const { ipcRenderer } = require('electron')

export default {
  name: 'main-window',
  mounted () {
    var webview = document.getElementById('ytm_webview')

    // Passes events to webview
    this.$electron.ipcRenderer.on('towebview', (event, eventToPass, data) => {
      webview.send(eventToPass)
    })

    var that = this
    webview.addEventListener('ipc-message', function (event) {
      var args = event.args
      that.$electron.ipcRenderer.send(event.channel, ...args)
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
    },
    isApiSeedsLyricsEnabled: function () {
      return this.$store.state.settings.lyrics.apiseeds.enabled
    },
    isFullscreen: function () {
      return this.$store.state.ytm.isFullscreen
    },
    isHtml5Fullscreen: function () {
      return this.$store.state.ytm.isHtml5Fullscreen
    },
    displayFullscreenVideoControls: function () {
      return this.$store.state.ytm.displayFullscreenVideoControls
    }
  },
  components: {
    // 'musixmatch-lyrics-btn': MusixMatchBtn,
    'lyricsovh-lyrics-btn': LyricsOvhLyricsBtn,
    'apiseeds-lyrics-btn': ApiSeedsLyricsBtn,
    'settings-window-btn': SettingsWindowBtn,
    // 'musixmatch-lyrics': MusixMatchLyrics,
    'lyricsovh-lyrics': LyricsOvhLyrics,
    'apiseeds-lyrics': ApiSeedsLyrics
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
    },
    apiSeedsLyricsToggle () {
      this.$refs.apiSeedsLyrics.toggle()
    },
    toggleShowSettings () {
      this.$emit('toggle-show-settings')
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
    #ytm_webview.fullscreen {
      height: 100vh;
    }
  }
  .ui_buttons {
    position: absolute;
    top: 9px;
    right: 56px;
    min-width: 200px;
    flex-direction: row;
    justify-content: flex-end;
  }
  .ui_buttons.htmlfullscreen {
    bottom: 21px;
    top: unset;
    right: 227px;
  }

  .ui_buttons > div {
    max-width: fit-content;
  }

  .btns-logged-out:not(.htmlfullscreen) {
    right: calc(56px + 96px) !important;
  }
  .ui_buttons.hidden.htmlfullscreen {
    display: none !important;
  }
</style>
