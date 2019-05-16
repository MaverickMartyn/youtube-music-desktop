<template>
  <v-layout row>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    v-if="!!value"
  >
      <v-checkbox
        v-on:change="$emit('settings-changed')"
        v-model="value.enabled"
        label="Enable Last.FM"
      ></v-checkbox>
    </v-form>
  </v-layout>
</template>

<script>
export default {
  name: 'lastfm-settings',
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
