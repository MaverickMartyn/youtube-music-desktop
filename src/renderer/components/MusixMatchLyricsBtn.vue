<template>
  <div v-if="false"><!-- Disabled, because broken. TODO: Fix this, or remove it completely. -->
    <v-btn icon :class="'lyric-btn' + ((!this.isLoggedIn) ? ' logged-out' : '') + ((this.isFullscreen) ? ' fullscreen' : '')" v-on:click="$emit('musixmatch-toggle-lyrics')"><v-img :src="icon"></v-img></v-btn>
  </div>
</template>

<script>
import image from '../assets/mml.png'
export default {
  name: 'musix-match-lyrics-btn',
  props: ['isFullscreen'],
  data: function () {
    return {
      icon: image
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.state.ytm.ytmIsLoggedIn
    }
  }
}
</script>

<style lang="scss" scoped>
.lyric-btn {
  width: 28px;
  height: 28px;
  cursor: pointer;
}
.lyric-btn.fullscreen {
  width: 12px;
  height: 12px;
}
</style>
