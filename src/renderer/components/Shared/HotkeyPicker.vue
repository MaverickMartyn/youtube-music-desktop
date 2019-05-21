<template>
    <v-hover>
        <v-flex xs12 sm6 slot-scope="{ hover }">
            <v-flex ma-1 :class="`elevation-${hover ? 12 : 2}`">
                <v-card :class="(isRecording) ? 'recording' : ''">
                    <v-card-text align-center justify-space-around>
                        <v-layout align-center>
                            <v-flex>
                                <v-layout column>
                                    <span d-block :class="(isDisabled) ? 'grey--text' : 'white--text'" class="title mb-1">{{ label }} <span d-block class="subheading ma-0 red--text" v-if="isRecording">(RECORDING...)</span></span>
                                    <span d-block class="subheading ma-0" :class="(isDisabled) ? 'grey--text' : 'white--text'">{{ (currentHotkey.length > 0) ? currentHotkey : 'Hotkey not bound' }}</span>
                                </v-layout>
                            </v-flex>
                            <v-flex>
                                <v-hover>
                                    <v-btn
                                    :disabled="isDisabled"
                                    small
                                    slot-scope="{ hover }"
                                    :color="`${hover ? 'red accent-4' : 'grey'}`"
                                    class="d-block mr-0 my-0 ml-auto"
                                    @click="toggleRecording"
                                    ><v-icon>{{ (isRecording) ? 'save' : 'edit' }}</v-icon>{{ (isRecording) ? 'Save hotkey' : 'Edit hotkey' }}</v-btn>
                                </v-hover>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-flex>
    </v-hover>
</template>

<script>
export default {
  name: 'hotkey-picker',
  props: ['value', 'action', 'activeHotkeyAction', 'label'],
  mounted () {
    this.currentHotkey = this.value
  },
  data: function () {
    return {
      currentHotkey: '',
      isRecording: false
    }
  },
  methods: {
    clear () {
      this.currentHotkey = ''
    },
    toggleRecording () {
      this.isRecording = !this.isRecording
      this.$emit('recordingStateChanged', { action: this.action, isRecording: this.isRecording })
      if (!this.isRecording) {
        this.$emit('hotkeyChanged', { action: this.action, newHotkey: this.currentHotkey })
      }
      if (this.isRecording) {
        document.body.onkeydown = (event) => {
          // event.target.value = (() => {
          // e.target.parentElement.parentElement.parentElement.parentElement.__vue__.value
          // e.target.parentElement.parentElement.parentElement.parentElement.__vue__.$options._parentVnode.data.ref
          this.currentHotkey = (() => {
            // ((event.shiftKey) ? 'shiftKey' : '') + ((event.ctrlKey) ? 'ctrlKey' : '') + ((event.altKey) ? 'altKey' : '') + ((event.metaKey) ? 'metaKey' : '') + event.keyCode.toString()
            var keyCombo = ''
            if (event.key !== 'Alt' &&
              event.key !== 'Shift' &&
              event.key !== 'Control') {
              keyCombo = event.key.toUpperCase()
            }
            if (event.altKey) {
              keyCombo = 'ALT + ' + keyCombo
            }
            if (event.shiftKey) {
              keyCombo = 'SHIFT + ' + keyCombo
            }
            if (event.ctrlKey) {
              keyCombo = 'CTRL + ' + keyCombo
            }
            return keyCombo
          })()
        }
      }
    }
  },
  computed: {
    isDisabled: function () {
      return this.activeHotkeyAction !== this.action && this.activeHotkeyAction != null
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card__text {
    cursor: pointer;
}
.v-card.recording {
    box-shadow: 0 3px 1px -2px rgba(255,0,0,.2), 0 2px 2px 0 rgba(255,0,0,.14), 0 1px 5px 0 rgba(255,0,0,.12);
}
</style>
