<template>
  <div @click.self="toExample">
    home
    {{count}}
    {{countAlias}}
    {{countPlusLocalState}}
    {{full}}
    {{dataNum}}
    <p @click="handleToAdd">+</p>
    <p @click="handleToPush">></p>
    <p @click="mapMutationsToAdd">mapMutations +</p>
    <p @click="mapMutationsToPush">mapMutations ></p>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  import { ADDCOUNT_MUTATION, PUSHDATA_MUTATION } from 'store/mutation-types'
  export default {
    name: 'home',
    data() {
      return {
        localCount: 100,
        baseAdd: 3
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
      },
      // 直接使用store.commit调用store.mutation注册的方法
      handleToAdd() {
        // commit多参数风格提交, mutation方法名以第一个参数传入，自定义参数作为第二个参数以对象的形式传入
        this.$store.commit(ADDCOUNT_MUTATION, { count: this.baseAdd || 0 })
      },
      handleToPush() {
        // commit对象风格提交，mutation方法名以对象type字段传入，自定义参数作为对象的其他字段传入
        this.$store.commit({
          type: PUSHDATA_MUTATION,
          data: [9, 10]
        })
      },
      // 使用mapMutations映射将store的mutation映射到本地this.方法
      ...mapMutations([
        ADDCOUNT_MUTATION,
        PUSHDATA_MUTATION
      ]),
      // 在方法中使用被mapMutations映射的方法
      mapMutationsToAdd() {
        this[ADDCOUNT_MUTATION]()
      },
      mapMutationsToPush() {
        this[PUSHDATA_MUTATION]({ data: [21, 22] })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
