<template>
  <div @click.self="toExample" :style="{ backgroundColor: config.bgc }">
    home
    {{count}}
    {{countAlias}}
    {{countPlusLocalState}}
    {{full}}
    {{dataNum}}
    {{config}}
    <p @click="handleToAdd">+ base</p>
    <p @click="handleToPush">></p>
    <p @click="mapMutationsToAdd">mapMutations + default</p>
    <p @click="mapMutationsToPush">mapMutations ></p>
    <p @click="handleAction">action</p>
    <p @click="handleAction2">action2</p>
    <p @click="handleFetchConfigAction">fetchConfigAction</p>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import {
    ADDCOUNT_MUTATION,
    PUSHDATA_MUTATION,
    CHANGECONFIG_MUTATION
  } from 'store/mutation-types'
  import {
    TEST_ACTION,
    ASYNCCHANGECONFIG_ACTION
  } from 'store/action-types'

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
      ...mapState([
        'config'
      ]),
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
        // commit以载荷形式风格提交, mutation方法名以第一个参数传入，自定义参数作为第二个参数以对象的形式传入
        this.$store.commit(ADDCOUNT_MUTATION, { count: this.baseAdd || 0 })
      },
      handleToPush() {
        // commit以对象风格提交，mutation方法名以对象type字段传入，自定义参数作为对象的其他字段传入
        this.$store.commit({
          type: PUSHDATA_MUTATION,
          data: [9, 10]
        })
      },
      // 使用mapMutations[]映射将store的mutation映射到本地this.方法
      ...mapMutations([
        ADDCOUNT_MUTATION,
        PUSHDATA_MUTATION
      ]),
      // 在本地方法中使用被mapMutations映射的方法
      mapMutationsToAdd() {
        this[ADDCOUNT_MUTATION]() // this[ADDCOUNT_MUTATION]() => this.$store.commit(ADDCOUNT_MUTATION)
      },
      mapMutationsToPush() {
        this[PUSHDATA_MUTATION]({ data: [21, 22] }) // this[PUSHDATA_MUTATION]({ data: [21, 22] }) => this.$store.commit(PUSHDATA_MUTATION, { data: [21, 22] })
      },
      // 另一种使用是使用mapMutations{}映射将store的mutation映射到本地指定this[fun]方法
      ...mapMutations({
        handleMapMutationsFetchConfig: CHANGECONFIG_MUTATION // this.handleMapMutationsFetchConfig({ ... }) => this.$store.commit(CHANGECONFIG_MUTATION, { ... })
      }),
      // action
      async handleAction() {
        // dispatch以载荷形式风格提交, action方法名以第一个参数传入，自定义参数作为第二个参数以对象的形式传入
        await this.$store.dispatch(TEST_ACTION, { count: 4 })
      },
      async handleAction2() {
        // dispatch以对象风格提交，action方法名以对象type字段传入，自定义参数作为对象的其他字段传入
        await this.$store.dispatch({
          type: TEST_ACTION,
          count: 5
        })
      },
      // 使用mapActions[]映射将store的action映射到本地this.方法
      ...mapActions([
        ASYNCCHANGECONFIG_ACTION
      ]),
      // 在本地方法中使用被mapActions映射的方法
      handleFetchConfigAction() {
        this[ASYNCCHANGECONFIG_ACTION]({ global: true })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
