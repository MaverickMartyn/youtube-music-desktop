<template>
  <div>
    <v-btn icon :class="'lyric-btn' + ((!this.isLoggedIn) ? ' logged-out' : '')" v-on:click="$emit('apiseeds-toggle-lyrics')"><v-img :src="icon"></v-img></v-btn>
  </div>
</template>

<script>
import image from '../assets/apiseeds-lyrics.png'
export default {
  name: 'apiseeds-lyrics-btn',
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
.lyric-btn .v-image {
  border-radius: 100%;
}
</style>
