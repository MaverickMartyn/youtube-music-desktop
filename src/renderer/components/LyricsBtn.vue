<template>
  <div>
    <v-btn icon :class="'lyric-btn' + ((!this.isLoggedIn) ? ' logged-out' : '')" v-on:click="$emit('toggle-lyrics')"><v-img :src="icon"></v-img></v-btn>
  </div>
</template>

<script>
import image from '../assets/lyrics.svg'
export default {
  name: 'lyrics-btn',
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
  color: white;
  cursor: pointer;
}
.lyric-btn .v-image {
  border-radius: 100%;
}
.v-image__image.v-image__image--cover {
  background-size: 60% !important;
  background-color: #3e3e3e !important;
}
</style>
