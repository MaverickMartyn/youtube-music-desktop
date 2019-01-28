<template>
  <v-layout row>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    v-if="!!value"
    style="width: 100%"
  >
      <v-checkbox
        v-on:change="$emit('settings-changed')"
        v-model="value.startWithWindows"
        label="Start YouTube Music for Desktop along with Windows"
      ></v-checkbox>
      <v-checkbox
        v-on:change="$emit('settings-changed')"
        v-model="value.darkMode"
        label="Use dark mode"
      ></v-checkbox>
    </v-form>
  </v-layout>
</template>

<script>
  export default {
    name: 'general-settings',
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
