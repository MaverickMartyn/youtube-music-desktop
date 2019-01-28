import Vue from 'vue'
import store from './store'
import Vuetify from 'vuetify'
import axios from 'axios'
import 'vuetify/dist/vuetify.min.css'

import App from './App'
import router from './router'
import { ipcRenderer } from 'electron'
Vue.use(Vuetify)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
// Vue

/* Mixins */
Vue.mixin({
  methods: {
    sendMessageToRpc: function (message, args) {
      console.log('Sending ' + message + ' and ' + args + ' to main process.')
      this.$electron.ipcRenderer.send(message, args)

      ipcRenderer.on('console-log', function (e, isLoggedIn, ytmIsLoggedIn) {
        console.log(isLoggedIn + ' -:- ' + ytmIsLoggedIn)
      })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
