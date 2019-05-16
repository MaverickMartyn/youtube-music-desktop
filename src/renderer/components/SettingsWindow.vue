<template>
  <div>
    <v-toolbar
      color="#232323"
      dark
      tabs
    >
      <v-btn icon dark v-on:click="$emit('toggle-show-settings')">
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-toolbar-title>Settings</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn color="primary" @click="save">
        <span><v-icon>save</v-icon> Save</span>
      </v-btn> -->

      <!-- <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn> -->

      <!-- <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn> -->

      <v-tabs
        slot="extension"
        v-model="currentItem"
        color="transparent"
        fixed-tabs
        slider-color="yellow"
      >
        <v-tab
          v-for="item in tabs"
          :href="'#' + item.name"
          :key="item.name"
          :disabled="!item.enabled"
        >
          {{ item.name }}
        </v-tab>

        <!-- <v-menu
          v-if="more.length"
          bottom
          class="v-tabs__div"
          left
        >
          <a slot="activator" class="v-tabs__item">
            more
            <v-icon>arrow_drop_down</v-icon>
          </a>

          <v-list>
            <v-list-tile
              v-for="item in more"
              :key="item"
              @click="addItem(item)"
            >
              {{ item }}
            </v-list-tile>
          </v-list>
        </v-menu> -->
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="currentItem">
      <v-tab-item
        v-for="item in tabs"
        :value="item.name"
        :key="item.name"
      >
        <v-card flat>
          <v-card-text>
            <!-- <h2>{{ item.name }}</h2> -->
            <component :is="item.component" v-model="settings[item.settingsKey]" v-on:settings-changed="save(item)"></component>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import GeneralSettingsTab from './SettingsTabs/GeneralSettingsTab'
import LyricsSettingsTab from './SettingsTabs/LyricsSettingsTab'
import LastFMSettingsTab from './SettingsTabs/LastFMSettingsTab'
import HotkeysSettingsTab from './SettingsTabs/HotkeysSettingsTab'
import AboutSettingsTab from './SettingsTabs/AboutSettingsTab'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    currentItem: 'General',
    tabs: [
      {
        name: 'General',
        enabled: true,
        settingsKey: 'general',
        component: GeneralSettingsTab
      },
      {
        name: 'Lyrics',
        enabled: true,
        settingsKey: 'lyrics',
        component: LyricsSettingsTab
      },
      {
        name: 'Last.FM',
        enabled: false,
        settingsKey: 'lastfm',
        component: LastFMSettingsTab
      },
      {
        name: 'Hotkeys',
        enabled: false,
        settingsKey: 'hotkeys',
        component: HotkeysSettingsTab
      },
      {
        name: 'About',
        enabled: true,
        settingsKey: 'about',
        component: AboutSettingsTab
      }
    ]
    // items: [
    //   'General', 'Lyrics', 'Last.FM', 'About'
    // ],
    // more: [
    // ],
    // more: [
    //   'News', 'Maps', 'Books', 'Flights', 'Apps'
    // ],
    // text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }),

  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'settings'
      // ...
    ])
  },

  methods: {
    save: function (item) {
      // console.log('Saving...')
      this.$store.dispatch('updateSettings', { field: item.settingsKey, value: this.settings[item.settingsKey] })
    }
  }
}
</script>
