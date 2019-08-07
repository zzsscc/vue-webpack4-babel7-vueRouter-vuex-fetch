<template>
  <div class="color">
    1234
    <a href="http://www.baidu.com">123</a>
    <img class="image" :src="header" alt="">
  </div>
</template>

<script>
  import header from 'images/header.png'
  export default {
    name: 'test',
    data() {
      return {
        header
      }
    }
  }
</script>

<style lang="scss" scoped>
@import 'styles/common/index.scss';

$color: red;
.color {
  color: $color
}
.image {
  display: block;
  width: 100px;
}
</style>