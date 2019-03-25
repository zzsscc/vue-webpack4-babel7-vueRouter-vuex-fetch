<template>
  <div id="app">
    <Test />
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
  import Test from 'views/test'
  export default {
    name: 'app',
    created() {
      document.querySelector('body').style.margin = 0;
    },
    components: {
      Test
    }
  };
</script>

<style lang="scss" scoped>
html, body, #app {
  height: 100vh;
}
</style>