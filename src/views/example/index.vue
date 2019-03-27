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
        // id: this.$route.params.id
      }
    },
    props: ['id'],
    mounted() {
      console.log('params id', this.$route.params.id)
      console.log('props id', this.id)
    },
    methods: {
      toDetail() {
        this.$router.push({ path: `/example${this.id ? `/${this.id}` : ''}/detail/${100}` })
      },
      toList() {
        this.$router.push({ path: `/example${this.id ? `/${this.id}` : ''}/list` })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>