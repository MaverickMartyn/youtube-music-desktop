<template>
  <v-layout v-if="this.$store.state.ytm.currentTrack" row text-md-center justify-center>
    <v-flex ref="lyricsPopup" :class="'lyrics-popup' + ((this.showLyricsDialog) ? ' open' : '')">
      <v-switch v-if="autoScrollingEnabled" class="scroll-pause-switch" label="Pause auto-scrolling" v-model="autoScrollingPaused"></v-switch>
      <v-tabs fixed-tabs>
        <v-tab class="flex-col" href="#tab-ovh">
          <div class="lyric-tab-icon">
            <v-img :src="ovhIcon"></v-img>
          </div>
          <span class="provider-name">Lyrics.Ovh</span>
        </v-tab>
        <v-tab class="flex-col" href="#tab-apiseeds">
          <div class="lyric-tab-icon">
            <v-img :src="apiseedsIcon"></v-img>
          </div>
          <span class="provider-name">APISEEDS</span>
        </v-tab>
        <v-tabs-items v-model="currentProvider" v-on:change="tabChanged">
          <v-tab-item value="tab-ovh">
            <p>OVH</p>
          </v-tab-item>
          <v-tab-item value="tab-apiseeds">
            <p>APISEEDS</p>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
      <div class="pa-3">
        <p v-for="lyric in lyrics" :ref="'lyricLine' + lyric.id" :key="lyric.id" v-html="lyric.text" class="lyric-line"></p>
        <p v-if="!lyrics" class="lyrics-status-message">{{ status }}</p>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import mmlImage from '../../assets/mml.png'
import ovhImage from '../../assets/lyrics.ovh.png'
import apiseedsImage from '../../assets/apiseeds-lyrics.png'

export default {
  name: 'lyrics',
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
      mmlIcon: mmlImage,
      ovhIcon: ovhImage,
      apiseedsIcon: apiseedsImage,
      valid: false,
      showLyricsDialog: false,
      lyrics: null,
      currentProvider: null,
      status: 'No lyrics found',
      lyricsScrollerAnimationFrameHandle: null,
      autoScrollingPaused: false
    }
  },
  methods: {
    toggle: function () {
      this.showLyricsDialog = !this.showLyricsDialog
      // if (this.showLyricsDialog) {
      //   this.updateLyrics(this.$store.state.ytm.currentTrack)
      // }
    },
    tabChanged: function () {
      this.updateLyrics(this.$store.state.ytm.currentTrack)
    },
    scrollLyrics: function () {
      let that = this
      var prevFrameTime = null
      // var prevScrollPosition = null
      window.cancelAnimationFrame(this.lyricsScrollerAnimationFrameHandle)
      var step = function (frameTime) {
        if (prevFrameTime === null) {
          prevFrameTime = frameTime
        }
        // var deltaTime = frameTime - prevFrameTime

        // var remainingTime = that.trackLengthInSeconds - that.$store.state.ytm.currentTrackTime
        var songProgess = (that.$store.state.ytm.currentTrackTime / that.trackLengthInSeconds)
        // var remainingDistance = that.$refs.lyricsPopup.scrollHeight - (that.$refs.lyricsPopup.clientHeight + that.$refs.lyricsPopup.scrollTop)
        var newLyricsProgress = that.$refs.lyricsPopup.scrollHeight * songProgess
        // var distanceToMoveEachFrame = (remainingDistance / (remainingTime * 1000)) * deltaTime
        // distanceToMoveEachFrame = 0.5
        // prevScrollPosition += distanceToMoveEachFrame

        if (that.$store.state.settings.lyrics.misc.autoScrollLyrics && !that.autoScrollingPaused) {
          window.scrollBy({
            top: that.$refs.lyricsPopup.scrollTop = newLyricsProgress - (that.$refs.lyricsPopup.clientHeight / 2),
            left: 0,
            behavior: 'smooth'
          })
        }

        prevFrameTime = frameTime
        that.lyricsScrollerAnimationFrameHandle = window.requestAnimationFrame(step)
      }
      this.lyricsScrollerAnimationFrameHandle = window.requestAnimationFrame(step)
    },
    updateLyrics (newTrack) {
      if (newTrack !== null) {
        // Update lyrics using the video id
        console.log('Updated lyrics')
        this.lyrics = null
        switch (this.currentProvider) {
          case 'tab-ovh':
            this.status = 'Getting your Lyrics.ovh lyrics...'
            axios.get('https://api.lyrics.ovh/v1/' + newTrack.artist + '/' + newTrack.title)
              .then((response) => {
                this.lyrics = response.data.lyrics.split('\n')
                for (let i = 0; i < this.lyrics.length; i++) {
                  this.lyrics[i] = { id: i, text: this.lyrics[i] }
                }
                // console.log(this.$refs.lyricsPopup.scrollHeight)
                // window.testtest = this.$refs.lyricsPopup this.$refs['lyricLine' + this.lyrics[this.lyrics.length-1].id][0]
                // scrollToSmoothly(this.$refs.lyricsPopup.scrollHeight, 100)
                this.scrollLyrics()
              }).catch(() => {
                this.status = 'No Lyrics.ovh lyrics found'
              })
            break

          case 'tab-apiseeds':
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
                this.scrollLyrics()
              }).catch(() => {
                this.status = 'No APISEEDS lyrics found'
              })
            break

          default:
            this.status = 'Invalid lyrics provider. Please report this issue on GitHub.'
            break
        }
      }
    }
  },
  computed: {
    trackTime: function () {
      return this.$store.state.ytm.currentTrackTime
    },
    autoScrollingEnabled: function () {
      return this.$store.state.settings.lyrics.misc.autoScrollLyrics
    },
    trackLengthInSeconds: function () {
      var durArr = this.$store.state.ytm.currentTrack.duration.split(':')
      return (Number(durArr[0]) * 60) + Number(durArr[1])
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

  .lyric-tab-icon {
    width: 28px;
    height: 28px;
  }

  span.provider-name {
    font-size: 12px;
  }
</style>

<style lang="scss">
  .flex-col a {
    flex-direction: column;
  }
  .scroll-pause-switch {
    position: fixed;
    top: 4.5em;
    right: 4.5em;
    z-index: 1;
  }
</style>
