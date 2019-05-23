<template>
  <v-card class="window-frame">
    <v-card-title :class="'title-bar red white--text' + ((isFullscreen) ? ' fullscreen' : '')">
      <span class="title">YouTube Music for Desktop</span>

      <v-spacer></v-spacer>

      <v-menu bottom left class="clickable">
        <v-btn
          slot="activator"
          dark
          icon
          small
          @click="sendMessageToRpc('win:togglefullscreen')"
        >
          <v-icon>fullscreen</v-icon>
        </v-btn>
        <v-btn
          slot="activator"
          dark
          icon
          small
          @click="sendMessageToRpc('win:minimize')"
        >
          <v-icon>minimize</v-icon>
        </v-btn>
        <v-btn
          slot="activator"
          dark
          icon
          small
          @click="sendMessageToRpc('win:toggle-maximize')"
        >
          <v-icon><!--branding_watermark-->maximize</v-icon>
        </v-btn>
        <v-btn
          slot="activator"
          dark
          icon
          small
          @click="sendMessageToRpc('win:quit', false)"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-menu>
    </v-card-title>

    <slot>

    </slot>
  </v-card>
</template>

<script>
export default {
  name: 'window-frame',
  data: function () {
    return {
    }
  },
  computed: {
    isFullscreen: function () {
      return this.$store.state.ytm.isFullscreen
    }
  }
}
</script>

<style lang="scss" scoped>
.window-frame {
  height: 100vh;
  width: 100vw;
}
.title-bar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
  height: 32px;
  transition: padding 1s, height 1s, opacity 1s;
}
.clickable {
  -webkit-user-select: auto;
  -webkit-app-region: no-drag;
}

.title, .v-icon {
  transition: font-size 1s;
}
.title-bar.fullscreen {
  -webkit-app-region: no-drag;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999999999;
}

.title-bar.fullscreen:not(:hover) {
  height: 2px !important;
  opacity: 0;
  padding: 0;
  .title, .v-icon {
    font-size: 0 !important;
  }
}
</style>
