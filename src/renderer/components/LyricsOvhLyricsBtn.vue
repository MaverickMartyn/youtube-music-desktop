<template>
  <div>
    <v-btn icon :class="'lyric-btn' + ((!this.isLoggedIn) ? ' logged-out' : '')" v-on:click="$emit('lyricsovh-toggle-lyrics')"><v-img :src="icon"></v-img></v-btn>
  </div>
</template>

<script>
  import image from '../assets/mml.png'
  export default {
    name: 'lyricsovh-lyrics-btn',
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
</style>
