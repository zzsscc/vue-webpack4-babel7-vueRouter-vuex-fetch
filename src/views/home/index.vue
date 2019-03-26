<template>
  <div @click="toExample">
    home
  </div>
</template>

<script>
  export default {
    name: 'home',
    methods: {
      toExample() {
        this.$router.push({ name: 'example' })
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>