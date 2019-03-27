<template>
  <div @click="toExample">
    home
    {{count}}
    {{countAlias}}
    {{countPlusLocalState}}
    {{full}}
    {{dataNum}}
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'home',
    data() {
      return {
        localCount: 100
      }
    },
    computed: {
      full() {
        return this.$store.getters.fullName('z')
      },
      ...mapState({
        // 箭头函数可使代码更简练
        count: state => state.count,
        // 传字符串参数 'count' 等同于 `state => state.count`
        countAlias: 'count',
        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState(state) {
          return state.count + this.localCount
        }
      }),
      ...mapGetters([
        'dataNum'
      ])
    },
    created() {
      console.log(this.$store)
    },
    methods: {
      toExample() {
        this.$router.push({ name: 'example' })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
