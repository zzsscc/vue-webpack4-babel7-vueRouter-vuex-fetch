<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        transitionName: null
      }
    },
    created() {
      document.querySelector('body').style.margin = 0;
    }
  };
</script>

<style lang="scss" scoped>
html, body, #app {
  height: 100vh;
}
</style>