<template>
  <div>
    example
    <p @click="back">back</p>
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
    props: ['id'],  // 通过props[]也可以获取到this.$route.params.id
    mounted() {
      console.log('params id', this.$route.params.id)
      console.log('props id', this.id)
    },
    methods: {
      back() {
        if (window.history.length <= 1) {
          this.$router.push({ path: '/' })
          return false
        } else {
          this.$router.go(-1)
        }
        // 上面都没执行就说明卡在当前页不是最后一条， histroy记录数量大于1，又没有回退记录，只能返回首页，
        // 如果上面都执行了 页面都跳走了，这个也就不用管了
        setTimeout(() => {
          this.$router.push({ path: '/' })
        }, 500)
      },
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