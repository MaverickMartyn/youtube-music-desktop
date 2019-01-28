<template>
  <v-layout v-if="this.$store.state.ytm.currentTrack" row text-md-center justify-center>
    <v-flex :class="'lyrics-popup' + ((this.showLyricsDialog) ? ' open' : '')">
      <p v-for="lyric in lyrics" :key="lyric.id" v-html="lyric._" :class="lyricClass(lyric)"></p>
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
          if (newTrack !== null) {
            if (newTrack.videoId !== null) {
              // Update lyrics using the video id
              console.log('Updated MusixMatch lyrics')
              MusixMatch.mmGetLyrics(newTrack && newTrack.videoId).then((response) => {
                var parseString = require('xml2js').parseString
                parseString(response, (err, result) => {
                  if (err) {
                    console.log(err.stack)
                  }
                  this.lyrics = (result && result.transcript && result.transcript.text) || null
                  for (let i = 0; i < this.lyrics.length; i++) {
                    this.lyrics[i].id = i
                  }
                })
              })
            }
          }
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
        lyrics: null
      }
    },
    methods: {
      toggle: function () {
        this.showLyricsDialog = !this.showLyricsDialog
      },
      lyricClass: function (lyric) {
        console.log(this.$store.state.ytm.currentTrackTime)
        console.log(lyric)
        return (Number(lyric.$.start) <= this.$store.state.ytm.currentTrackTime && (Number(lyric.$.start) + Number(lyric.$.dur)) > this.$store.state.ytm.currentTrackTime) ? 'current' : ''
        // return (startTime <= this.trackTime) ? 'current' : ''
      }
    },
    computed: {
      // useDarkTheme: function () {
      //   return this.$store.getters.settings.general.darkMode
      // },
      // lyrics: function () {
      //   MusixMatch.mmGetLyrics(this.$store.state.ytm.currentTrack && this.$store.state.ytm.currentTrack.videoId)
      // },
      trackTime: function () {
        return this.$store.state.ytm.currentTrackTime
      },
      syncedLyrics: function () {
        return (this.lyrics || []).forEach((el) => { el.isCurrent = true })
      }
    },
    components: {
    }
  }
</script>

<style scoped>
.lyrics-popup{
  display: none;
  top: 3.5em;
  left: 3.5em;
  right: 3.5em;
  bottom: 3.5em;
  position: absolute;
  background: rgba(0, 0, 0, .8);
  overflow-y: scroll;
}
.current, .true {
  font-size: 2em;
}
.open {
  display: block;
}
</style>
