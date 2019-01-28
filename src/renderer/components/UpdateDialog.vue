<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="800" v-if="info != null">
      <v-card>
        <v-card-title class="headline">Update {{ info.version }} - {{ info.releaseName }} is available!</v-card-title>
        <v-card-text v-html="info.releaseNotes + '<p>Released: ' + info.releaseDate + '</p>'"></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" flat @click="dialog = false">Not now, thanks</v-btn>
          <v-btn flat @click="update">Update now</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  // import { app, BrowserWindow, ipcMain } from 'electron'
  // import { autoUpdater } from 'electron-updater'
  // const log = require('electron-log')

  // autoUpdater.logger = log
  // autoUpdater.logger.transports.file.level = 'info'

  export default {
    name: 'update-dialog',
    props: ['info'],
    mounted () {
    },
    data: function () {
      return {
        dialog: false
      }
    },
    methods: {
      show: function (infoObject) {
        this.info = infoObject
        this.dialog = true
      },
      update: function () {
        this.dialog = false
        this.$electron.send('update:update-now')
      }
    },
    components: {
    }
  }
</script>

<style>
</style>
