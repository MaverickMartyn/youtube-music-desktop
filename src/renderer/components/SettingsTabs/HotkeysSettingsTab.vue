<template>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    v-if="!!value"
  >
    <v-layout row wrap>
      <v-flex xs12>
        <v-checkbox
          v-on:change="$emit('settings-changed')"
          v-model="value.enabled"
          label="Enable hotkeys"
        ></v-checkbox>
      </v-flex>
      <hotkey-picker :activeHotkeyAction="activeHotkeyAction" label="Play/pause" :value="value.playpause" action="playpause" v-on:hotkeyChanged="hotkeyChangedHandler" v-on:recordingStateChanged="recordingStateChangedHandler" ref="playpause"></hotkey-picker>
      <hotkey-picker :activeHotkeyAction="activeHotkeyAction" label="Next track" :value="value.next" action="next" v-on:hotkeyChanged="hotkeyChangedHandler" v-on:recordingStateChanged="recordingStateChangedHandler" ref="next"></hotkey-picker>
      <hotkey-picker :activeHotkeyAction="activeHotkeyAction" label="Previous track" :value="value.previous" action="previous" v-on:hotkeyChanged="hotkeyChangedHandler" v-on:recordingStateChanged="recordingStateChangedHandler" ref="previous"></hotkey-picker>
      <hotkey-picker :activeHotkeyAction="activeHotkeyAction" label="Like" :value="value.like" action="like" v-on:hotkeyChanged="hotkeyChangedHandler" v-on:recordingStateChanged="recordingStateChangedHandler" ref="like"></hotkey-picker>
      <hotkey-picker :activeHotkeyAction="activeHotkeyAction" label="Dislike" :value="value.dislike" action="dislike" v-on:hotkeyChanged="hotkeyChangedHandler" v-on:recordingStateChanged="recordingStateChangedHandler" ref="dislike"></hotkey-picker>
    </v-layout>
  </v-form>
</template>

<script>
import HotkeyPicker from '../Shared/HotkeyPicker'
export default {
  name: 'hotkeys-settings',
  props: ['value'],
  mounted () {
  },
  data: function () {
    return {
      valid: false,
      activeHotkeyAction: null
    }
  },
  methods: {
    hotkeyChangedHandler (e) {
      console.log(e)
      this.$emit('hotkey-binding-changed', e)
      // this.$emit('settings-changed')
    },
    recordingStateChangedHandler (e) {
      console.log(e)
      if (e.isRecording) {
        this.activeHotkeyAction = e.action
      } else {
        this.activeHotkeyAction = null
      }
    }
  },
  components: {
    'hotkey-picker': HotkeyPicker
  }
}
</script>

<style>
</style>
