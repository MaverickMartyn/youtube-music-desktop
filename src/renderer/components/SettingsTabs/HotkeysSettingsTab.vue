<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-checkbox
        v-on:change="$emit('settings-changed')"
        v-model="value.enabled"
        label="Enable hotkeys"
      ></v-checkbox>
    </v-flex>
    <v-flex xs12 sm6>
        <v-text-field
          v-model="value.playpause"
          label="Play/pause"
          readonly
        ></v-text-field>
      </v-flex>
    <v-flex xs12 sm6>
        <v-text-field
          v-model="value.next"
          label="Next track"
          readonly
        ></v-text-field>
      </v-flex>
    <v-flex xs12 sm6>
        <v-text-field
          v-model="value.previous"
          label="Previous track"
          readonly
        ></v-text-field>
      </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'hoykeys-settings',
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
    components: {
    }
  }
</script>

<style>
</style>
