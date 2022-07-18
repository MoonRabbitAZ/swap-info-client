<template>
  <div v-if="isAppInitialized" id="app">
    <main class="app__main">
      <app-header />
      <div class="app__main-content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import config from '@/config'
import AppHeader from '@/vue/components/AppHeader.vue'

export default Vue.extend({
  name: 'app',
  components: { AppHeader },
  data () {
    return {
      isAppInitialized: false,
    }
  },

  async created () {
    this.setAppTitle()
    this.isAppInitialized = true
  },

  methods: {
    setAppTitle () : void {
      document.title = config.APP_NAME
    },
  },
})
</script>
<style lang="scss" scoped>
.app__main {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.app__main-content {
  display: flex;
  flex: 1;
  background: url('~@static/images/bg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>
