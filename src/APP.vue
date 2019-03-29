<template>
  <div id="app" :style="{ backgroundColor: config.global && config.bgc }">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'app',
    data() {
      return {
        transitionName: null
      }
    },
    computed: {
      ...mapState([
        'config'
      ])
    },
    created() {
      document.querySelector('body').style.margin = 0
    }
  }
</script>

<style lang="scss" scoped>
html, body, #app {
  height: 100vh;
}
</style>
