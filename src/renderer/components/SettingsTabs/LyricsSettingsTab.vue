<template>
  <v-layout row>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    v-if="!!value"
    style="width: 100%"
  >
  <v-expansion-panel
      expand
    >
      <!-- <v-expansion-panel-content :class="(useDarkTheme) ? 'custom-dark' : ''">
        <div slot="header">MusixMatch (Broken - To be fixed)</div>
        <v-card>
          <v-card-text>
            <v-checkbox
              v-on:change="$emit('settings-changed')"
              v-model="value.musixmatch.enabled"
              disabled
              label="Enable MusixMatch Lyrics (Broken - To be fixed)"
            ></v-checkbox>
            <v-checkbox
              v-on:change="$emit('settings-changed')"
              v-model="value.musixmatch.subtitlesStyle"
              label="Use subtitle-style lyrics"
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content> -->
      <v-expansion-panel-content :class="(useDarkTheme) ? 'custom-dark' : ''">
        <div slot="header">Lyrics.ovh</div>
        <v-card>
          <v-card-text>
            <v-checkbox
              v-on:change="$emit('settings-changed')"
              v-model="value.lyricsOvh.enabled"
              label="Enable Lyrics.ovh"
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content :class="(useDarkTheme) ? 'custom-dark' : ''">
        <div slot="header">APISEEDS Lyrics</div>
        <v-card>
          <v-card-text>
            <v-checkbox
              v-on:change="$emit('settings-changed')"
              v-model="value.apiseeds.enabled"
              label="Enable lyrics from APISEEDS"
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content :class="(useDarkTheme) ? 'custom-dark' : ''">
        <div slot="header">Miscelaneous</div>
        <v-card>
          <v-card-text>
            <v-checkbox
              v-on:change="$emit('settings-changed')"
              v-model="value.misc.autoScrollLyrics"
              label="Automatically scroll lyrics as the song plays."
            ></v-checkbox>
            <!-- <v-slider v-model="value.misc.autoScrollDelay" label="Delay before autoscrolling (in seconds)" min="0" max="4"></v-slider> -->
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  <!-- musixmatch: {
      enabled: false,
      subtitlesStyle: false
    } -->
    </v-form>
  </v-layout>
</template>

<script>
export default {
  name: 'lyrics-settings',
  props: ['value'],
  mounted () {
  },
  data: function () {
    return {
      valid: false
    }
  },
  methods: {
  },
  computed: {
    useDarkTheme: function () {
      return this.$store.getters.settings.general.darkMode
    }
  },
  components: {
  }
}
</script>

<style>
.custom-dark{
  background: #232323 !important;
}
</style>
