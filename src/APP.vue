<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
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