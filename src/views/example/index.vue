<template>
  <div>
    example
    <p @click="toDetail">detail</p>
    <p @click="toList">list</p>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'example',
    data() {
      return {
        id: this.$route.params.id
      }
    },
    mounted() {
      console.log(this.id)
      console.log(this.$route)
    },
    methods: {
      toDetail() {
        const { path } = this.$route
        this.$router.push({ path: `/example/${this.id}/detail/${100}` })
      },
      toList() {
        const { path } = this.$route
        this.$router.push({ path: `/example/${this.id}/list` })
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>