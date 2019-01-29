<template>
  <v-layout v-if="this.$store.state.ytm.currentTrack" row text-md-center justify-center>
    <v-flex ref="lyricsPopup" :class="'lyrics-popup pa-3' + ((this.showLyricsDialog) ? ' open' : '')">
      <p v-for="lyric in lyrics" :ref="'lyricLine' + lyric.id" :key="lyric.id" v-html="lyric._" :class="lyricClass(lyric)"></p>
      <p v-if="!lyrics" class="lyrics-status-message">{{ status }}</p>
    </v-flex>
  </v-layout>
</template>

<script>
  import MusixMatch from './../../MusixMatch.js'
  export default {
    name: 'musixmatch-lyrics',
    props: ['value'],
    mounted () {
      // Watch for changes to the current track
      this.$store.watch(
        (state) => {
          return this.$store.state.ytm.currentTrack // could also put a Getter here
        },
        (newTrack, oldTrack) => {
          this.updateLyrics(newTrack)
        },
        // Optional Deep if you need it
        {
          // deep:true
        }
      )
    },
    data: function () {
      return {
        valid: false,
        showLyricsDialog: false,
        lyrics: null,
        status: 'No musiXmatch lyrics found'
      }
    },
    methods: {
      toggle () {
        this.showLyricsDialog = !this.showLyricsDialog
        if (this.showLyricsDialog) {
          this.updateLyrics(this.$store.state.ytm.currentTrack)
        }
      },
      updateLyrics (newTrack) {
        if (newTrack !== null) {
          if (newTrack.videoId !== null) {
            // Update lyrics using the video id
            console.log('Updated MusixMatch lyrics')
            this.lyrics = null
            this.status = 'Getting your lyrics...'
            var self = this
            MusixMatch.mmGetLyrics(newTrack && newTrack.videoId).then((response) => {
              if (response === '') {
                self.status = 'No musiXmatch lyrics found'
                return
              }
              var parseString = require('xml2js').parseString
              parseString(response, function (err, result) {
                if (err) {
                  console.log(err.stack)
                  self.status = 'No musiXmatch lyrics found'
                }
                self.lyrics = (result && result.transcript && result.transcript.text) || null
                for (let i = 0; i < self.lyrics.length; i++) {
                  self.lyrics[i].id = i
                }
              })
            })
          }
        }
      },
      lyricClass (lyric) {
        // console.log(this.$store.state.ytm.currentTrackTime)
        // console.log(lyric)
        if (!this.lyrics) {
          return ''
        }
        var shouldEmphasize = (Number(lyric.$.start) <= this.$store.state.ytm.currentTrackTime && (Number(lyric.$.start) + Number(lyric.$.dur)) > this.$store.state.ytm.currentTrackTime)
        if (shouldEmphasize) {
          if (this.$refs['lyricLine' + lyric.id]) {
            this.$refs['lyricLine' + lyric.id][0].scrollIntoView({
              behavior: 'auto',
              block: 'center',
              inline: 'center'
            })
          }
        }
        return shouldEmphasize ? 'lyric-line current' : 'lyric-line'
      }
    },
    computed: {
      // useDarkTheme: function () {
      //   return this.$store.getters.settings.general.darkMode
      // },
      trackTime: function () {
        return this.$store.state.ytm.currentTrackTime
      }
    },
    components: {
    }
  }
</script>

<style scoped>
  @import './../../assets/lyrics.css';
</style>
