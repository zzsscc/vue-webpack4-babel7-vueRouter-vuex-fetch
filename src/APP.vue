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
    components: {
      Test
    }
  };
</script>

<style lang="scss" scoped>
</style>