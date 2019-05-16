<template>
  <v-layout row>
    <v-card style="width: 100%">
      <v-card-title primary-title :class="(useDarkTheme) ? 'custom-dark' : ''"><h3 class="header mb-0">About YouTube Music for Desktop</h3></v-card-title>
      <v-card-text>
        <p>You are currently running version {{ value.version }} of YouTube Music for Desktop.</p>
        <h4 class="header">Latest changelog:</h4>
        <blockquote class="blockquote" v-html="value.releaseNotes"></blockquote>
        <p>Released on {{ value.releaseDate }}<br />
        This software was created by {{ value.author }}. I hope you enjoy it!</p>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'about-settings',
  props: ['value'],
  mounted () {
  },
  data: function () {
    return {
      valid: false
    }
  },
  computed: {
    useDarkTheme: function () {
      return this.$store.getters.settings.general.darkMode
    }
  },
  methods: {
  },
  components: {
  }
}
// about: {
//   version: '2.1',
//   author: 'Martyn Aaby Finnerup',
//   releaseNotes: '<p>Test release.<br />Not a real release.</p>',
//   releaseDate: '12/05/2018'
// }
</script>

<style>
.custom-dark{
  background: #232323 !important;
}
</style>
