<template>
  <div>
    <v-btn icon :class="'lyric-btn' + ((!this.isLoggedIn) ? ' logged-out' : '')" v-on:click="$emit('musixmatch-toggle-lyrics')"><v-img :src="icon"></v-img></v-btn>
  </div>
</template>

<script>
  import image from '../assets/mml.png'
  export default {
    name: 'musix-match-lyrics-btn',
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
  position: absolute;
  top: 12px;
  right: calc(56px + 32px);
  width: 28px;
  height: 28px;
  cursor: pointer;
}

.logged-out {
  right: calc(56px + 32px + 86px);
}
</style>
