<template>
  <v-card class="window-frame">
    <v-card-title class="title-bar red white--text">
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
    }
  }
</script>

<style lang="scss" scoped>
.window-frame {
  height: 100vh;
  overflow: hidden;
}
.title-bar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
  height: 32px;
}
.clickable {
  -webkit-user-select: auto;
  -webkit-app-region: no-drag;
}
</style>
