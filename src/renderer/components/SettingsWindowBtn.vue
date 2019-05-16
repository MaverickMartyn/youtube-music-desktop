<template>
  <div>
    <v-btn icon :class="'settings-btn' + ((!this.isLoggedIn) ? ' logged-out' : '')" v-on:click="$emit('toggle-show-settings')"><v-img :src="icon"></v-img></v-btn>
  </div>
</template>

<script>
import image from '../assets/settings.png'
export default {
  name: 'settings-dialog-btn',
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
.settings-btn {
  margin-top: 4px;
  width: 32px;
  height: 32px;
  cursor: pointer;
}
</style>
