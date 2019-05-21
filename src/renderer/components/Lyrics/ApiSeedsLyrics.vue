<template>
  <v-layout v-if="this.$store.state.ytm.currentTrack" row text-md-center justify-center>
    <v-flex ref="lyricsPopup" :class="'lyrics-popup pa-3' + ((this.showLyricsDialog) ? ' open' : '')">
      <p v-for="lyric in lyrics" :ref="'lyricLine' + lyric.id" :key="lyric.id" v-html="lyric.text" class="lyric-line"></p>
      <p v-if="!lyrics" class="lyrics-status-message">{{ status }}</p>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
// import { scrollToSmoothly } from './../../AutoScroller.js'

export default {
  name: 'apiseeds-lyrics',
  props: ['value'],
  mounted () {
    // Watch for changes to the current track
    this.$store.watch(
      (state) => {
        return this.$store.state.ytm.currentTrack // could also put a Getter here
      },
      (newTrack, oldTrack) => {
        this.updateLyrics(newTrack)
      }
    )
  },
  data: function () {
    return {
      valid: false,
      showLyricsDialog: false,
      lyrics: null,
      status: 'No APISEEDS lyrics found'
    }
  },
  methods: {
    toggle: function () {
      this.showLyricsDialog = !this.showLyricsDialog
      if (this.showLyricsDialog) {
        this.updateLyrics(this.$store.state.ytm.currentTrack)
      }
    },
    updateLyrics (newTrack) {
      if (newTrack !== null) {
        // Update lyrics using the video id
        console.log('Updated APISEEDS lyrics')
        this.lyrics = null
        this.status = 'Getting your APISEEDS lyrics...'
        axios.get('https://orion.apiseeds.com/api/music/lyric/' + newTrack.artist + '/' + newTrack.title + '?apikey=DTVxJf2pAVdC44swi2JhQpqgYCN2B3uiz845ETtSBJdpyl0rhBvdm1MjDtEhrYrq')
          .then((response) => {
            this.lyrics = response.data.result.track.text.split('\n')
            for (let i = 0; i < this.lyrics.length; i++) {
              this.lyrics[i] = { id: i, text: this.lyrics[i] }
            }
            // console.log(this.$refs.lyricsPopup.scrollHeight)
            // window.testtest = this.$refs.lyricsPopup this.$refs['lyricLine' + this.lyrics[this.lyrics.length-1].id][0]
            // scrollToSmoothly(this.$refs.lyricsPopup.scrollHeight, 100)
          }).catch(() => {
            this.status = 'No APISEEDS lyrics found'
          })
      }
    }
  },
  computed: {
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

  .lyric-line {
    color: rgba(255, 255, 255, 1);
  }
</style>
